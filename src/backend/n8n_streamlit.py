import streamlit as st
import json
import os
import httpx
from datetime import datetime, date, time, timedelta
from uuid import UUID
from sqlalchemy import create_engine, select, func
from sqlalchemy.orm import Session, joinedload

from database.models import Account, MediaAssets, Scheduled, MediaState, MediaType

st.set_page_config(page_title="Agency Prod Dashboard", layout="wide")

st.title("Agency Prod Dashboard")
st.caption("n8n workflow integration with database scheduling")

API_BASE = "http://localhost:8000"

# ── Sync DB engine for Streamlit ───────────────────────────────────────────────

def get_db_url():
    from database.db import DATABASE_URL
    return DATABASE_URL.replace("postgresql+asyncpg://", "postgresql+psycopg2://").replace("postgresql+psycopg2+asyncpg://", "postgresql+psycopg2://")

engine = create_engine(get_db_url(), pool_pre_ping=True)

def get_session():
    return Session(engine)

# ── Sync helpers ───────────────────────────────────────────────────────────────

def get_accounts():
    with get_session() as db:
        return db.execute(select(Account).order_by(Account.name)).scalars().all()

def get_scheduled_posts(account_id=None, limit=50):
    with get_session() as db:
        q = select(Scheduled).order_by(Scheduled.scheduled_at.desc()).limit(limit)
        if account_id:
            q = q.where(Scheduled.account_id == UUID(account_id))
        return db.execute(q).scalars().all()

def get_upcoming_queue(account_id=None):
    with get_session() as db:
        q = select(Scheduled).options(joinedload(Scheduled.asset)).where(
            Scheduled.state.not_in([MediaState.PUBLISHED, MediaState.FAILED]),
            Scheduled.scheduled_at >= datetime.now(),
        ).order_by(Scheduled.scheduled_at.asc())
        if account_id:
            q = q.where(Scheduled.account_id == UUID(account_id))
        return db.execute(q).scalars().all()

def get_stats(account_id=None):
    with get_session() as db:
        base = select(func.count(Scheduled.id))
        total_q = base
        published_q = base.where(Scheduled.state == MediaState.PUBLISHED)
        scheduled_q = base.where(Scheduled.scheduled_at >= datetime.now(), Scheduled.state.not_in([MediaState.PUBLISHED, MediaState.FAILED]))
        if account_id:
            total_q = total_q.where(Scheduled.account_id == UUID(account_id))
            published_q = published_q.where(Scheduled.account_id == UUID(account_id))
            scheduled_q = scheduled_q.where(Scheduled.account_id == UUID(account_id))
        total = db.execute(total_q).scalar() or 0
        published = db.execute(published_q).scalar() or 0
        upcoming = db.execute(scheduled_q).scalar() or 0
        return {"total": total, "published": published, "upcoming": upcoming}

def get_account_name(account_id):
    with get_session() as db:
        a = db.execute(select(Account).where(Account.id == UUID(account_id))).scalar_one_or_none()
        return a.name if a else "Unknown"

# ── Init session state ─────────────────────────────────────────────────────────

if "accounts" not in st.session_state:
    st.session_state.accounts = []
if "selected_account" not in st.session_state:
    st.session_state.selected_account = None

# ── Sidebar: Account switcher ──────────────────────────────────────────────────

with st.sidebar:
    st.header("Account")
    if st.button("Refresh Accounts", type="tertiary", use_container_width=True):
        st.session_state.accounts = get_accounts()

    if not st.session_state.accounts:
        st.session_state.accounts = get_accounts()

    account_options = {str(a.id): f"{a.name} (@{a.account_handle})" for a in st.session_state.accounts}
    selected_id = st.selectbox(
        "Switch Account",
        options=[""] + list(account_options.keys()),
        format_func=lambda x: "All Accounts" if x == "" else account_options.get(x, ""),
        key="account_selector",
    )
    st.session_state.selected_account = selected_id if selected_id else None
    st.session_state.selected_account_label = account_options.get(selected_id, "") if selected_id else ""

    st.divider()
    st.markdown("Dashboard (this page)")

    st.divider()
    st.caption("Agency Prod v1")

# ── Dashboard stats ────────────────────────────────────────────────────────────

stats = get_stats(st.session_state.selected_account)
col1, col2, col3 = st.columns(3)
col1.metric("Total Scheduled", stats["total"])
col2.metric("Published", stats["published"])
col3.metric("Upcoming", stats["upcoming"])

# ── Tabs ───────────────────────────────────────────────────────────────────────

tab1, tab2, tab3, tab4, tab5 = st.tabs(["Publishing Queue", "Calendar", "Trigger Workflow", "Upload Media", "Brand Guidelines"])

# ═══════════════════════════════════════════════════════════════════════════════
# TAB 1: PUBLISHING QUEUE
# ═══════════════════════════════════════════════════════════════════════════════

with tab1:
    queue = get_upcoming_queue(st.session_state.selected_account)

    st.subheader(f"Upcoming Posts ({len(queue)})")

    if not queue:
        st.info("No upcoming scheduled posts.")
    else:
        for item in queue:
            with st.container(border=True):
                c1, c2, c3 = st.columns([2, 3, 1])
                account_label = "?"
                if st.session_state.selected_account:
                    account_label = account_options.get(st.session_state.selected_account, "?")
                else:
                    try:
                        account_label = get_account_name(item.account_id)
                    except Exception:
                        pass

                c1.markdown(f"**{item.scheduled_at.strftime('%b %d, %Y %H:%M')}**  \n{account_label}")
                c2.markdown(f"`{item.media_type.value}` · Status: **{item.status}**  \n{item.caption[:120] + '...' if item.caption and len(item.caption) > 120 else item.caption or '*no caption*'}")
                c3.metric("State", item.state.value if item.state else "—")
                
                with st.expander("Preview & Edit"):
                    if item.asset:
                        media_src = item.asset.internal_url if item.asset.internal_url and os.path.exists(item.asset.internal_url) else item.asset.external_url
                        
                        preview_col, edit_col = st.columns([1, 2])
                        
                        with preview_col:
                            if media_src:
                                if item.media_type.value in ["VIDEO", "REELS", "STORY"]:
                                    st.video(media_src)
                                else:
                                    st.image(media_src)
                            else:
                                st.info("No media source found.")
                                
                        with edit_col:
                            with st.form(f"edit_caption_form_{item.id}"):
                                new_caption = st.text_area("Caption", value=item.caption or "", height=150)
                                submitted = st.form_submit_button("Save Caption", type="primary")
                                if submitted:
                                    try:
                                        resp = httpx.post(f"{API_BASE}/caption", params={"caption": new_caption, "media_asset_id": str(item.media_asset_id)}, timeout=10)
                                        if resp.status_code == 200:
                                            st.success("Caption updated successfully! Please refresh.")
                                        else:
                                            st.error(f"Failed to update caption: HTTP {resp.status_code} - {resp.text}")
                                    except Exception as e:
                                        st.error(f"Error: {e}")

# ═══════════════════════════════════════════════════════════════════════════════
# TAB 2: CALENDAR
# ═══════════════════════════════════════════════════════════════════════════════

with tab2:
    try:
        from streamlit_calendar import calendar
    except ImportError:
        st.error("`streamlit-calendar` not installed. Run: `pip install streamlit-calendar`")
        st.stop()

    all_scheduled = get_scheduled_posts(st.session_state.selected_account, limit=200)

    STATUS_COLORS = {
        "PUBLISHED": "#00b894",
        "SCHEDULED": "#fdcb6e",
        "POSTPONED": "#fd79a8",
        "FAILED": "#e17055",
        "CAPTIONED": "#74b9ff",
    }

    calendar_events = []
    for s in all_scheduled:
        if s.scheduled_at:
            try:
                account_label = get_account_name(s.account_id)
            except Exception:
                account_label = ""
            color = STATUS_COLORS.get(s.status, "#a29bfe")
            calendar_events.append({
                "title": f"[{s.media_type.value}] {account_label[:20]}",
                "start": s.scheduled_at.strftime("%Y-%m-%dT%H:%M:%S"),
                "end": (s.scheduled_at + timedelta(hours=1)).strftime("%Y-%m-%dT%H:%M:%S"),
                "color": color,
                "textColor": "#1a1a2e",
                "borderColor": color,
                "extendedProps": {
                    "status": s.status,
                    "media_type": s.media_type.value,
                    "account": account_label,
                    "caption": (s.caption[:80] + "...") if s.caption else "",
                },
            })

    col_mode, col_legend = st.columns([1, 2])
    with col_mode:
        cal_view = st.radio("View", ["month", "week", "day"], horizontal=True, label_visibility="collapsed")
    with col_legend:
        st.markdown(
            " ".join(
                f'<span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:{c};margin:0 4px 0 12px;vertical-align:middle"></span>'
                f'<span style="font-size:13px;vertical-align:middle">{s}</span>'
                for s, c in STATUS_COLORS.items()
            ),
            unsafe_allow_html=True,
        )

    cal = calendar(
        events=calendar_events,
        options={
            "initialView": {"month": "dayGridMonth", "week": "timeGridWeek", "day": "timeGridDay"}[cal_view],
            "headerToolbar": {
                "left": "prev,next today",
                "center": "title",
                "right": "dayGridMonth,timeGridWeek,timeGridDay",
            },
            "selectable": True,
            "editable": False,
            "slotMinTime": "06:00:00",
            "slotMaxTime": "23:00:00",
            "height": 650,
            "eventTimeFormat": {"hour": "2-digit", "minute": "2-digit"},
            "slotLabelFormat": {"hour": "2-digit", "minute": "2-digit"},
            "nowIndicator": True,
            "buttonText": {
                "today": "Today",
                "month": "Month",
                "week": "Week",
                "day": "Day",
            },
        },
        custom_css="""
        .fc { font-family: 'Inter', system-ui, sans-serif; }
        .fc .fc-toolbar-title { font-size: 1.25rem; font-weight: 600; }
        .fc .fc-button-primary {
            background: #f0f0f5; border: 1px solid #e0e0e8;
            color: #333; font-weight: 500; font-size: 13px;
            transition: all 0.15s ease;
        }
        .fc .fc-button-primary:not(:disabled):hover { background: #e0e0eb; }
        .fc .fc-button-primary:not(:disabled).fc-button-active {
            background: #6c5ce7; border-color: #6c5ce7; color: #fff;
        }
        .fc .fc-button-primary:disabled { opacity: 0.5; }
        .fc .fc-daygrid-day.fc-day-today { background: #e8f4fd !important; box-shadow: inset 0 0 0 2px #4a9eff; }
        .fc .fc-timegrid-col.fc-day-today { background: #e8f4fd !important; }
        .fc .fc-day-today .fc-daygrid-day-number { background: #4a9eff; color: #fff; border-radius: 50%; width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; padding: 0; margin: 4px; }
        .fc .fc-day-other .fc-daygrid-day-top { opacity: 0.5; }
        .fc .fc-day-other { background: #1a2332 !important; }
        .fc .fc-non-business { background: transparent !important; }
        .fc .fc-scrollgrid, .fc .fc-scrollgrid-section > td,
        .fc .fc-daygrid-body, .fc .fc-timegrid-body,
        .fc .fc-daygrid-day, .fc .fc-daygrid-day-frame,
        .fc .fc-timegrid-col, .fc .fc-timegrid-col-frame,
        .fc .fc-axes-lane, .fc .fc-timegrid-slots table,
        .fc .fc-timegrid-slot, .fc .fc-timegrid-slot-label,
        .fc .fc-timegrid-axis-frame, .fc .fc-daygrid-day-bg,
        .fc .fc-timegrid-slot-lane,
        .fc .fc-scrollgrid-section > td > div,
        .fc .fc-daygrid-more-link { background: #1e293b !important; }
        .fc .fc-timegrid-slot-minor { border-top-color: #334155; }
        .fc .fc-col-header-cell { background: #0f172a !important; }
        .fc .fc-timegrid-axis { background: #0f172a !important; }
        .fc .fc-daygrid-day.fc-day-today {
            background: #2563eb !important;
            box-shadow: inset 0 0 0 3px #1d4ed8;
        }
        .fc .fc-timegrid-col.fc-day-today { background: #2563eb !important; }
        .fc .fc-day-today .fc-daygrid-day-number {
            background: #1d4ed8; color: #fff; border-radius: 50%;
            width: 28px; height: 28px; display: inline-flex;
            align-items: center; justify-content: center; padding: 0; margin: 4px;
        }
        .fc .fc-day-today .fc-daygrid-day-top { color: #fff; }
        .fc, .fc .fc-toolbar-title, .fc .fc-col-header-cell-cushion,
        .fc .fc-daygrid-day-number, .fc .fc-timegrid-slot-label-cushion,
        .fc .fc-timegrid-axis-cushion, .fc .fc-daygrid-more-link,
        .fc .fc-popover-title, .fc .fc-popover-header { color: #f1f5f9 !important; }
        .fc .fc-day-other .fc-daygrid-day-number { color: #64748b !important; }
        .fc .fc-button-primary {
            background: #334155; border: 1px solid #475569;
            color: #f1f5f9; font-weight: 500; font-size: 13px;
            transition: all 0.15s ease;
        }
        .fc .fc-button-primary:not(:disabled):hover { background: #475569; }
        .fc .fc-button-primary:not(:disabled).fc-button-active {
            background: #2563eb; border-color: #2563eb; color: #fff;
        }
        .fc .fc-button-primary:disabled { opacity: 0.4; }
        .fc .fc-event {
            border-radius: 6px; padding: 2px 6px; font-size: 12px;
            font-weight: 500; border-left: 3px solid rgba(0,0,0,0.2);
            transition: transform 0.15s ease;
        }
        .fc .fc-event:hover { transform: scale(1.02); z-index: 10; }
        .fc .fc-more-popover { border-radius: 10px; box-shadow: 0 8px 32px rgba(0,0,0,0.12); }
        .fc .fc-popover-header { background: #f8f6ff; border-radius: 10px 10px 0 0; }
        .fc .fc-col-header-cell { font-weight: 600; font-size: 13px; padding: 8px 0; }
        .fc .fc-daygrid-day-number { font-size: 14px; font-weight: 500; padding: 6px; }
        """,
    )

    if cal.get("callback") == "eventClick" and cal.get("eventClick"):
        ev = cal["eventClick"]["event"]
        title = ev.get("title", "")
        extra = ev.get("extendedProps", {})
        with st.expander("Event Details", expanded=True):
            c1, c2 = st.columns(2)
            c1.write(f"**{title}**")
            c2.write(f"Status: **{extra.get('status', '—')}**")
            st.write(f"Account: {extra.get('account', '—')}")
            st.write(f"Caption: {extra.get('caption', '—')}")

# ═══════════════════════════════════════════════════════════════════════════════
# TAB 3: TRIGGER WORKFLOW
# ═══════════════════════════════════════════════════════════════════════════════

with tab3:
    st.subheader("Trigger an n8n Workflow")

    if not st.session_state.selected_account:
        st.warning("Please select an account from the sidebar first.")
    else:
        workflow_file = st.selectbox("Workflow", ["", "Creating Caption", "Instagram Comments replies", "Schedule Post"])

        selected_acct_id = st.session_state.selected_account

        with st.form("trigger_form"):
            data = {}

            if "Creating Caption" in workflow_file:
                data["media_asset_id"] = st.text_input("Media Asset ID")
                data["date"] = st.date_input("Schedule Date", value=date.today())
                data["time"] = st.time_input("Time", value=time(12, 0))
                data["platform"] = st.selectbox("Platform", ["TikTok", "Instagram", "YouTube Shorts"])

            elif "Instagram Comments" in workflow_file:
                data["comment_id"] = st.text_input("Comment ID")
                data["comment_text"] = st.text_area("Comment Text")
                data["user_handle"] = st.text_input("User Handle")

            elif "Schedule Post" in workflow_file:
                st.info("Schedule Post is cron-driven — it auto-polls for CAPTIONED posts. Use the Upload tab to queue media.")

            submitted = st.form_submit_button("Trigger Workflow", type="primary")

        if submitted and workflow_file:
            webhook_url = ""
            payload = {}
            if "Creating Caption" in workflow_file:
                webhook_url = "http://localhost:5678/webhook/7b01cc19-f3be-46b9-965a-98358a438ce2"
                payload = {
                    "media_asset_id": data.get("media_asset_id"),
                    "date": f"{data['date'].strftime('%Y-%m-%d')} {data['time'].strftime('%H:%M:%S')}",
                    "platform": data["platform"],
                    "account_id": selected_acct_id,
                }
            elif "Instagram Comments" in workflow_file:
                webhook_url = "http://localhost:5678/webhook/ea7d37ac-9e82-40d7-bbb3-e9b7ce180fc9"
                payload = {
                    "comment_id": data.get("comment_id"),
                    "comment_text": data.get("comment_text"),
                    "user_handle": data.get("user_handle"),
                    "account_id": selected_acct_id,
                }
            else:
                payload = {"account_id": selected_acct_id}

            if "Schedule Post" not in workflow_file:
                with st.spinner("Triggering workflow..."):
                    try:
                        resp = httpx.post(webhook_url, json=payload, timeout=15)
                        if resp.status_code == 200:
                            st.success("Workflow triggered successfully!")
                            st.json(resp.json())
                        else:
                            st.error(f"HTTP {resp.status_code}: {resp.text}")
                    except Exception as e:
                        st.error(f"Connection failed: {e}")

# ═══════════════════════════════════════════════════════════════════════════════
# TAB 4: UPLOAD MEDIA (via existing API)
# ═══════════════════════════════════════════════════════════════════════════════

with tab4:
    st.subheader("Upload Media & Schedule via API")

    if not st.session_state.selected_account:
        st.warning("Please select an account from the sidebar first.")
    else:
        with st.form("upload_form"):
            uploaded_file = st.file_uploader("Choose a file", type=["mp4", "mov", "avi", "jpg", "jpeg", "png", "gif"])
            media_type = st.selectbox("Media Type", [t.value for t in MediaType])
            media_state = st.selectbox("Initial State", [s.value for s in MediaState])
            sched_date = st.date_input("Schedule Date", value=date.today())
            sched_time = st.time_input("Schedule Time", value=time(12, 0))
            submitted = st.form_submit_button("Upload & Schedule", type="primary")

        if submitted and uploaded_file:
            files = {"file": (uploaded_file.name, uploaded_file.getvalue(), uploaded_file.type)}
            params = {
                "media_type": media_type,
                "media_state": media_state,
                "account_handle": next((a.account_handle for a in st.session_state.accounts if str(a.id) == st.session_state.selected_account), ""),
                "schedule_date": sched_date.strftime("%Y-%m-%d") + " " + sched_time.strftime("%H:%M:%S"),
            }
            with st.spinner("Uploading..."):
                try:
                    resp = httpx.post(f"{API_BASE}/webhook", files=files, params=params, timeout=60)
                    if resp.status_code == 200:
                        st.success("Uploaded and scheduled!")
                        st.json(resp.json())
                    else:
                        st.error(f"HTTP {resp.status_code}: {resp.text}")
                except Exception as e:
                    st.error(f"API call failed: {e}")

# ═══════════════════════════════════════════════════════════════════════════════
# TAB 5: BRAND GUIDELINES
# ═══════════════════════════════════════════════════════════════════════════════

with tab5:
    st.subheader("Brand Guidelines")
    
    if not st.session_state.selected_account:
        st.warning("Please select an account from the sidebar first.")
    else:
        selected_id = st.session_state.selected_account
        account = next((a for a in st.session_state.accounts if str(a.id) == selected_id), None)
        if account is None:
            st.error("Selected account not found in session.")
            st.stop()
        account_handle = account.account_handle or ""
        
        # Fetch current guidelines
        current_guidelines = "{}"
        try:
            resp = httpx.get(f"{API_BASE}/get_brand_guidelines", params={"account_handle": account_handle}, timeout=10)
            if resp.status_code == 200:
                data = resp.json()
                bg_data = data.get("brand_guidelines")
                if bg_data:
                    # If it's already a dict/list, dump it. If it's a string, maybe it's valid JSON.
                    if isinstance(bg_data, (dict, list)):
                        current_guidelines = json.dumps(bg_data, indent=2)
                    else:
                        try:
                            # Try parsing string to format it nicely
                            parsed = json.loads(bg_data)
                            current_guidelines = json.dumps(parsed, indent=2)
                        except:
                            current_guidelines = str(bg_data)
            elif resp.status_code == 404:
                # Might just have no guidelines yet
                current_guidelines = "{}"
            else:
                st.error(f"Failed to fetch guidelines: HTTP {resp.status_code}")
        except Exception as e:
            st.error(f"API call failed: {e}")
            
        with st.form("brand_guidelines_form"):
            st.markdown("Edit Brand Guidelines (JSON format recommended):")
            guidelines_text = st.text_area("Guidelines", value=current_guidelines, height=300)
            submitted = st.form_submit_button("Update Guidelines", type="primary")
            
        if submitted:
            # Try to validate JSON
            try:
                json.loads(guidelines_text)
                is_valid_json = True
            except json.JSONDecodeError:
                is_valid_json = False
                st.warning("Note: The input is not valid JSON. Saving as raw string.")
                
            body = {"account_handle": account_handle, "brand_guidelines": guidelines_text}
            with st.spinner("Updating..."):
                try:
                    resp = httpx.post(f"{API_BASE}/brand_guidelines", json=body, timeout=10)
                    if resp.status_code == 200:
                        st.success("Brand guidelines updated successfully!")
                    else:
                        st.error(f"Failed to update: HTTP {resp.status_code} - {resp.text}")
                except Exception as e:
                    st.error(f"API call failed: {e}")


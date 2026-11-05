const commentList = [
  { user: "@maris.linden", text: "These textures look incredible in person, truly high-end craftsmanship. Will there be a restock of the obsidian coat?", source: "NORTHBOUND", time: "2M AGO", status: "PENDING", statusColor: "bg-secondary-container/20 text-secondary-fixed border-secondary-container/40", unread: true, selected: true },
  { user: "@jonny_v_visuals", text: "Can we use these assets for a moodboard? Tagged you guys in my latest process reel!", source: "NORTHBOUND", time: "15M AGO", status: "NEW", statusColor: "bg-outline-variant text-on-surface-variant", unread: true, selected: false },
  { user: "@echo_studio_", text: "Does the summer collection drop includes the eco-linen series?", source: "ECO-LIVING", time: "44M AGO", status: "NEW", statusColor: "bg-outline-variant text-on-surface-variant", unread: true, selected: false },
  { user: "@creative_ops", text: "Loving the new branding direction...", source: null, time: "1H AGO", status: null, statusColor: null, unread: false, selected: false },
  { user: "@urban_minimalist", text: "Shipping to Berlin available?", source: null, time: "2H AGO", status: null, statusColor: null, unread: false, selected: false },
];

const suggestedReplies = [
  { text: '"Thank you for the kind words, Maris! The obsidian coat is a favorite."', selected: false },
  { text: '"Thank you so much! We\'re glad you like the quality. We have a restock scheduled for next Tuesday!"', selected: true },
  { text: '"So happy you\'re pleased! The obsidian series is limited edition but more are coming."', selected: false },
];

export default function InboxPage() {
  return (
    <div className="h-[calc(100vh-56px-24px)] flex flex-col">
      {/* Header & Filter Bar */}
      <section className="p-gutter flex flex-col gap-sm border-b border-outline-variant bg-surface-container-low flex-shrink-0">
        <div className="flex items-baseline gap-md">
          <h1 className="font-headline-lg text-headline-lg font-label-mono uppercase tracking-widest text-on-surface">Comments</h1>
          <span className="font-label-mono text-label-mono text-secondary px-sm py-xs bg-secondary/10 border border-secondary/20">47 UNREAD</span>
        </div>
        <div className="flex items-center gap-gutter flex-wrap">
          <div className="flex gap-xs items-center bg-surface-container-highest/50 p-xs border border-outline-variant">
            <span className="font-label-mono text-[10px] px-xs text-on-surface-variant">CLIENTS</span>
            <span className="px-sm py-[2px] bg-primary text-on-primary font-label-mono text-label-mono rounded-xs cursor-pointer">ALL</span>
            <span className="px-sm py-[2px] bg-surface-container-high text-on-surface-variant font-label-mono text-label-mono border border-outline-variant hover:text-on-surface transition-colors cursor-pointer">NORTHBOUND</span>
          </div>
          <div className="flex gap-xs items-center bg-surface-container-highest/50 p-xs border border-outline-variant">
            <span className="font-label-mono text-[10px] px-xs text-on-surface-variant">PLATFORM</span>
            <div className="px-sm py-[2px] bg-surface-container-high text-on-surface-variant font-label-mono text-label-mono border border-outline-variant hover:text-on-surface transition-colors cursor-pointer flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">public</span> ALL
            </div>
            <div className="px-sm py-[2px] bg-surface-container-high text-on-surface-variant font-label-mono text-label-mono border border-outline-variant hover:text-on-surface transition-colors cursor-pointer flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">photo_camera</span> IG
            </div>
          </div>
          <div className="flex gap-xs items-center bg-surface-container-highest/50 p-xs border border-outline-variant ml-auto">
            <span className="font-label-mono text-[10px] px-xs text-on-surface-variant">STATUS</span>
            <span className="px-sm py-[2px] text-on-surface-variant font-label-mono text-label-mono hover:text-on-surface transition-colors cursor-pointer">RESOLVED</span>
            <span className="px-sm py-[2px] text-on-surface font-label-mono text-label-mono hover:text-on-surface transition-colors cursor-pointer border-b border-primary">UNRESOLVED</span>
          </div>
        </div>
      </section>

      {/* Three Column Layout */}
      <section className="flex flex-1 overflow-hidden">
        {/* Column 1: Comment List (32%) */}
        <div className="w-[32%] border-r border-outline-variant flex flex-col bg-surface-dim">
          <div className="flex-1 overflow-y-auto">
            {commentList.map((c) => (
              <div
                key={c.user}
                className={`p-gutter border-b border-outline-variant cursor-pointer transition-colors ${
                  c.selected
                    ? "bg-primary-container/10 relative border-r-2 border-r-primary"
                    : c.unread
                    ? "hover:bg-surface-container-high"
                    : "opacity-60"
                }`}
              >
                <div className="flex justify-between items-start mb-xs">
                  <span className={`font-label-mono ${c.unread ? "text-primary" : "text-on-surface-variant"}`}>{c.user}</span>
                  {c.unread && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                </div>
                <p className={`text-body-md line-clamp-2 mb-sm leading-tight ${c.selected ? "text-on-surface" : "text-on-surface-variant"}`}>{c.text}</p>
                <div className="flex justify-between items-center">
                  {c.source ? (
                    <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">{c.source} &bull; {c.time}</span>
                  ) : (
                    <div className="font-label-mono text-[10px] text-on-surface-variant">{c.time}</div>
                  )}
                  {c.status && (
                    <span className={`px-xs py-[1px] text-[10px] border ${c.statusColor}`}>{c.status}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Reply View (42%) */}
        <div className="w-[42%] border-r border-outline-variant flex flex-col bg-background">
          <div className="flex-1 overflow-y-auto p-lg">
            {/* Post Context Card */}
            <div className="bg-surface-container border border-outline-variant p-md flex gap-md mb-xl">
              <div className="w-20 h-20 flex-shrink-0 border border-outline-variant bg-surface-variant"></div>
              <div className="flex flex-col justify-center">
                <span className="font-label-mono text-[10px] text-on-surface-variant uppercase mb-xs">ORIGINAL POST &bull; MAY 12</span>
                <h3 className="font-headline-md text-on-surface mb-xs leading-none">Spring Editorial: Shadow &amp; Silk</h3>
                <div className="flex gap-md">
                  <span className="font-data-point text-on-surface-variant flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">favorite</span> 1.2k</span>
                  <span className="font-data-point text-on-surface-variant flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">chat_bubble</span> 47</span>
                </div>
              </div>
            </div>

            {/* Original Comment */}
            <div className="mb-xl relative pl-xl">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary/20"></div>
              <div className="flex items-center gap-sm mb-sm">
                <div className="w-6 h-6 rounded-full border border-outline-variant bg-surface-variant"></div>
                <span className="font-label-mono text-primary">@maris.linden</span>
                <span className="font-label-mono text-[10px] text-on-surface-variant">2M AGO</span>
              </div>
              <div className="text-body-lg text-on-surface leading-relaxed mb-md">
                These textures look incredible in person, truly high-end craftsmanship. Will there be a restock of the obsidian coat?
              </div>
              <div className="flex gap-sm">
                <span className="px-sm py-xs bg-green-500/10 text-green-400 text-[10px] font-label-mono border border-green-500/20 uppercase tracking-tighter">SENTIMENT: POSITIVE</span>
                <span className="px-sm py-xs bg-primary/10 text-primary text-[10px] font-label-mono border border-primary/20 uppercase tracking-tighter">INTENT: INQUIRY</span>
              </div>
            </div>

            {/* Suggested Replies */}
            <div className="mb-xl">
              <h4 className="font-label-mono text-[10px] text-on-surface-variant uppercase mb-sm">Suggested Replies (AI Analysis)</h4>
              <div className="grid gap-sm">
                {suggestedReplies.map((reply, i) => (
                  <div
                    key={i}
                    className={`p-sm cursor-pointer transition-colors text-body-md ${
                      reply.selected
                        ? "bg-primary-container/10 border border-primary text-on-surface"
                        : "bg-surface-container border border-outline-variant hover:border-primary text-on-surface-variant"
                    }`}
                  >
                    {reply.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Reply Editor */}
            <div className="bg-surface-container border border-outline-variant overflow-hidden flex flex-col">
              <div className="bg-surface-container-high px-md py-xs border-b border-outline-variant flex justify-between">
                <div className="flex gap-md">
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px] cursor-pointer">format_bold</span>
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px] cursor-pointer">format_italic</span>
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px] cursor-pointer">link</span>
                </div>
                <span className="font-label-mono text-[10px] text-on-surface-variant">REP: BOT-A2</span>
              </div>
              <textarea
                className="w-full bg-transparent border-none p-md text-body-md text-on-surface placeholder-outline focus:ring-0 min-h-[120px]"
                placeholder="Type your response..."
                defaultValue="Thank you so much! We're glad you like the quality. We have a restock scheduled for next Tuesday at 10 AM EST. Stay tuned!"
              />
              <div className="p-md flex justify-between items-center bg-surface-container-high/30">
                <div className="flex items-center gap-sm">
                  <input type="checkbox" defaultChecked className="w-4 h-4 bg-background border-outline-variant text-primary focus:ring-0" />
                  <span className="font-label-mono text-[10px] text-on-surface-variant">AUTO-RESOLVE CASE</span>
                </div>
                <button className="bg-primary text-on-primary font-label-mono text-label-mono px-xl py-sm hover:opacity-90 active:scale-95 transition-all uppercase tracking-widest flex items-center gap-2">
                  Send Reply <span className="material-symbols-outlined text-[16px]">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Context Panel (26%) */}
        <aside className="w-[26%] bg-surface-container-low flex flex-col">
          <div className="flex-1 overflow-y-auto p-gutter flex flex-col gap-xl">
            {/* Profile Info */}
            <div>
              <h4 className="font-label-mono text-[10px] text-on-surface-variant uppercase mb-md border-b border-outline-variant pb-xs">User Profile</h4>
              <div className="flex items-center gap-md mb-md">
                <div className="w-12 h-12 border border-outline-variant p-xs bg-surface-variant"></div>
                <div>
                  <div className="font-headline-md text-on-surface leading-none">Maris Linden</div>
                  <div className="font-label-mono text-primary text-[10px]">@maris.linden</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-sm">
                <div className="bg-surface-container border border-outline-variant p-sm">
                  <div className="font-label-mono text-[10px] text-on-surface-variant">FOLLOWERS</div>
                  <div className="font-data-point text-headline-md text-on-surface">4.8k</div>
                </div>
                <div className="bg-surface-container border border-outline-variant p-sm">
                  <div className="font-label-mono text-[10px] text-on-surface-variant">COMMENTS</div>
                  <div className="font-data-point text-headline-md text-on-surface">12</div>
                </div>
              </div>
            </div>

            {/* Post Context */}
            <div>
              <h4 className="font-label-mono text-[10px] text-on-surface-variant uppercase mb-md border-b border-outline-variant pb-xs">Post Context</h4>
              <div className="space-y-sm">
                <div className="flex justify-between items-center text-body-md">
                  <span className="text-on-surface-variant">Reach</span>
                  <span className="font-data-point text-on-surface">24,502</span>
                </div>
                <div className="flex justify-between items-center text-body-md">
                  <span className="text-on-surface-variant">Engagement Rate</span>
                  <span className="font-data-point text-on-surface">4.2%</span>
                </div>
                <div className="h-1 bg-surface-container-highest w-full overflow-hidden">
                  <div className="h-full bg-primary w-[42%]"></div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h4 className="font-label-mono text-[10px] text-on-surface-variant uppercase mb-md border-b border-outline-variant pb-xs">Recent Activity</h4>
              <div className="space-y-md">
                <div className="flex gap-sm">
                  <div className="w-1 bg-outline-variant"></div>
                  <div>
                    <div className="text-body-md text-on-surface leading-tight">Replied to "Summer Solstice"</div>
                    <div className="font-label-mono text-[10px] text-on-surface-variant">3 DAYS AGO</div>
                  </div>
                </div>
                <div className="flex gap-sm">
                  <div className="w-1 bg-outline-variant"></div>
                  <div>
                    <div className="text-body-md text-on-surface leading-tight">Shared post to story</div>
                    <div className="font-label-mono text-[10px] text-on-surface-variant">1 WEEK AGO</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h4 className="font-label-mono text-[10px] text-on-surface-variant uppercase mb-md border-b border-outline-variant pb-xs">Quick Actions</h4>
              <div className="grid grid-cols-1 gap-xs">
                {[
                  { icon: "person_add", label: "Follow User" },
                  { icon: "report", label: "Flag for Review" },
                  { icon: "block", label: "Mute @maris.linden" },
                ].map((action) => (
                  <button key={action.label} className="flex items-center gap-sm px-sm py-xs bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant transition-colors text-body-md">
                    <span className="material-symbols-outlined text-[18px]">{action.icon}</span> {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* Status Bar */}
      <footer className="h-8 bg-surface-dim border-t border-outline-variant flex items-center px-lg justify-between flex-shrink-0">
        <div className="flex items-center gap-md">
          <div className="flex items-center gap-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">Inbox synced 30s ago</span>
          </div>
          <div className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-[14px] text-on-surface-variant">speed</span>
            <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">Latency: 14ms</span>
          </div>
        </div>
        <div className="flex items-center gap-md">
          <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">Node: US-EAST-1</span>
          <span className="font-label-mono text-[10px] text-on-surface-variant uppercase cursor-pointer hover:text-primary">Refresh stream</span>
        </div>
      </footer>
    </div>
  );
}

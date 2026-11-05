const queueItems = [
  { platform: "Instagram Feed", time: "Today, 14:00", caption: "Embrace the chill with our new heavy...", status: "Pending Review", statusColor: "bg-secondary-container", selected: true, hasImage: true },
  { platform: "X (Twitter)", time: "Tomorrow, 09:30", caption: "Thread: The sustainability metrics of...", status: "Pending Review", statusColor: "bg-secondary-container", selected: false, hasImage: false },
  { platform: "LinkedIn", time: "Oct 24, 11:00", caption: "Announcing our Q4 sustainable initiatives...", status: "Pending Review", statusColor: "bg-secondary-container", selected: false, hasImage: true },
  { platform: "Instagram Story", time: "Oct 24, 15:00", caption: "Behind the scenes: Winter shoot...", status: "Draft Needs Work", statusColor: "bg-[#ffb4ab]", selected: false, hasImage: false },
];

const activityLog = [
  { icon: null, dotColor: "bg-secondary-container", label: "Moved to Review", by: "Jane Smith", time: "Today, 11:42 AM", hasLine: true },
  { icon: "edit", dotColor: null, label: "Draft updated (V2)", by: "Jane Smith", time: "Today, 11:30 AM", hasLine: true },
  { icon: "add", dotColor: null, label: "Draft created", by: "System", time: "Yesterday, 09:00 AM", hasLine: false },
];

const hashtags = ["#NorthboundApparel", "#Winter24", "#SustainableFashion", "#MinimalStyle"];

export default function CaptionStudioPage() {
  return (
    <div className="h-[calc(100vh-56px-24px)] flex gap-gutter">
      {/* COL A: Review Queue (22%) */}
      <div className="w-[22%] purposeful-panel flex flex-col h-full overflow-hidden">
        <div className="panel-header">
          <div className="font-label-mono text-on-surface flex items-center gap-xs text-label-mono">
            <span className="material-symbols-outlined text-[14px]">view_list</span>
            REVIEW QUEUE
            <span className="bg-surface-variant text-on-surface-variant rounded-full px-1.5 py-0.5 text-[10px] ml-1">10</span>
          </div>
          <button className="text-on-surface-variant hover:text-primary">
            <span className="material-symbols-outlined text-[16px]">filter_list</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {queueItems.map((item) => (
            <div
              key={item.caption}
              className={`rounded p-2 cursor-pointer transition-colors ${
                item.selected
                  ? "bg-primary-fixed-dim/10 border border-primary/30 relative"
                  : "bg-surface-container hover:bg-surface-container-high border border-outline-variant/30"
              }`}
            >
              {item.selected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l"></div>}
              <div className={`flex justify-between items-start mb-1 ${item.selected ? "pl-1" : ""}`}>
                <span className={`font-label-mono text-[10px] uppercase ${item.selected ? "text-primary" : "text-on-surface-variant"}`}>{item.platform}</span>
                <span className="font-data-point text-on-surface-variant text-[11px]">{item.time}</span>
              </div>
              <div className={`flex gap-2 ${item.selected ? "pl-1" : ""}`}>
                <div className={`w-10 h-10 rounded bg-surface-variant overflow-hidden shrink-0 ${!item.hasImage ? "flex items-center justify-center border border-outline-variant/50 text-on-surface-variant" : ""}`}>
                  {!item.hasImage && <span className="material-symbols-outlined text-[16px]">description</span>}
                </div>
                <div className="flex flex-col justify-between overflow-hidden">
                  <p className="text-data-point text-on-surface truncate w-full">{item.caption}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className={`w-2 h-2 rounded-full ${item.statusColor}`}></div>
                    <span className={`text-[10px] uppercase tracking-wider ${item.statusColor === "bg-[#ffb4ab]" ? "text-[#ffb4ab]" : "text-on-surface-variant"}`}>{item.status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COL B: Editor (52%) */}
      <div className="w-[52%] purposeful-panel flex flex-col h-full overflow-hidden">
        <div className="panel-header">
          <div className="flex items-center gap-sm text-data-point">
            <span className="text-on-surface-variant hover:text-on-surface cursor-pointer">Northbound Apparel</span>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-medium">Instagram Feed</span>
          </div>
          <span className="bg-surface-container px-2 py-1 rounded text-[10px] font-label-mono uppercase border border-outline-variant flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-secondary-container"></div>
            Review
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-lg flex flex-col gap-lg bg-surface-container-lowest">
          {/* Post Context */}
          <div className="flex gap-md bg-surface-container p-md rounded border border-outline-variant/50">
            <div className="w-32 h-32 rounded bg-surface-variant overflow-hidden shrink-0 border border-outline-variant/30"></div>
            <div className="flex flex-col flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-headline-md text-on-surface m-0">Winter Collection Hero</h3>
                <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined text-[18px]">open_in_full</span></button>
              </div>
              <p className="text-data-point text-on-surface-variant mt-1 mb-3">Asset ID: NA-AW24-001 &bull; 1080x1080px (1:1)</p>
              <div className="mt-auto">
                <label className="font-label-mono text-[10px] text-on-surface-variant uppercase mb-1 block">Platform Constraints</label>
                <div className="flex gap-2">
                  <span className="text-data-point bg-surface-container-highest px-2 py-1 rounded border border-outline-variant/30 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">link</span> Max 30 Hashtags
                  </span>
                  <span className="text-data-point bg-surface-container-highest px-2 py-1 rounded border border-outline-variant/30 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">alternate_email</span> Mentions allowed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Editor Surface */}
          <div className="flex-1 flex flex-col min-h-[300px]">
            <div className="flex justify-between items-end mb-2">
              <label className="font-label-mono text-on-surface uppercase">Caption Text</label>
              <span className="font-data-point text-on-surface-variant">138 / 2,200</span>
            </div>
            <div className="border border-outline-variant focus-within:border-primary focus-within:ring-1 focus-within:ring-primary rounded flex flex-col bg-[#1A1C20] flex-1 transition-colors">
              {/* Formatting Bar */}
              <div className="border-b border-outline-variant/50 p-2 flex gap-1 bg-surface-container rounded-t">
                {["format_bold", "format_italic"].map((icon) => (
                  <button key={icon} className="p-1 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded transition-colors">
                    <span className="material-symbols-outlined text-[18px]">{icon}</span>
                  </button>
                ))}
                <div className="w-px h-4 bg-outline-variant/50 my-auto mx-1"></div>
                {["sentiment_satisfied", "alternate_email", "tag"].map((icon) => (
                  <button key={icon} className="p-1 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded transition-colors">
                    <span className="material-symbols-outlined text-[18px]">{icon}</span>
                  </button>
                ))}
                <div className="ml-auto flex gap-1">
                  <button className="p-1 text-primary hover:bg-primary/10 rounded transition-colors flex items-center gap-1 text-[12px] font-label-mono uppercase">
                    <span className="material-symbols-outlined text-[16px]">magic_button</span> AI Enhance
                  </button>
                </div>
              </div>
              <textarea
                className="flex-1 w-full bg-transparent border-none focus:ring-0 text-body-lg text-on-surface p-4 resize-none leading-relaxed placeholder-on-surface-variant/50"
                placeholder="Write your caption here..."
                defaultValue={`Embrace the chill. ❄️\n\nOur new heavyweight boucle coat is engineered for deep winter while keeping a clean, architectural silhouette. Crafted from 100% recycled wool blend.\n\nAvailable online and in flagship stores tomorrow at 9AM EST.`}
              />
              {/* Hashtag Row */}
              <div className="p-2 border-t border-outline-variant/50 bg-surface-container-lowest rounded-b flex items-center gap-2 overflow-x-auto">
                <span className="material-symbols-outlined text-[14px] text-on-surface-variant shrink-0">tag</span>
                {hashtags.map((tag) => (
                  <span key={tag} className="bg-surface-variant text-on-surface px-2 py-0.5 rounded text-data-point border border-outline-variant/50 cursor-pointer hover:border-primary/50 whitespace-nowrap">{tag}</span>
                ))}
                <button className="text-primary hover:text-primary-container text-[12px] font-medium ml-1 whitespace-nowrap shrink-0">+ Add Suggested</button>
              </div>
            </div>
          </div>

          {/* AI Suggestion */}
          <div className="border-l-2 border-[#ea9f00] bg-surface-container p-md rounded-r relative mt-4 shadow-sm">
            <div className="absolute top-2 right-2 flex gap-1">
              <button className="p-1 text-on-surface-variant hover:text-primary rounded"><span className="material-symbols-outlined text-[16px]">check</span></button>
              <button className="p-1 text-on-surface-variant hover:text-error rounded"><span className="material-symbols-outlined text-[16px]">close</span></button>
            </div>
            <div className="flex items-center gap-2 mb-2 text-[#ea9f00]">
              <span className="material-symbols-outlined text-[18px]">model_training</span>
              <span className="font-label-mono text-[10px] uppercase font-bold tracking-wider">Tone Adjustment Suggestion</span>
            </div>
            <p className="text-data-point text-on-surface-variant mb-2">
              The current text leans slightly descriptive. To align with the <span className="text-on-surface border-b border-dashed border-outline-variant">"Elevated Minimalist"</span> brand tone, consider being more declarative:
            </p>
            <div className="bg-surface-container-lowest p-3 rounded border border-outline-variant/50 text-body-md text-on-surface italic">
              "Architectural warmth. The heavy boucle coat. Engineered for the deep cold from 100% recycled wool blend. Online and flagships tomorrow, 9AM EST."
            </div>
          </div>
        </div>
      </div>

      {/* COL C: Details & Actions (26%) */}
      <div className="w-[26%] purposeful-panel flex flex-col h-full overflow-hidden">
        <div className="panel-header">
          <div className="font-label-mono text-on-surface uppercase">Properties</div>
        </div>
        <div className="flex-1 overflow-y-auto p-md space-y-xl bg-surface-container-lowest">
          {/* Metadata Fields */}
          <div className="space-y-4">
            <div>
              <label className="font-label-mono text-[10px] text-on-surface-variant uppercase block mb-1">Client / Brand</label>
              <div className="w-full bg-surface-container border border-outline-variant rounded p-2 text-data-point text-on-surface flex justify-between items-center cursor-not-allowed opacity-80">
                Northbound Apparel
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">lock</span>
              </div>
            </div>
            <div>
              <label className="font-label-mono text-[10px] text-on-surface-variant uppercase block mb-1">Campaign</label>
              <select className="w-full bg-surface-container border border-outline-variant rounded p-2 text-data-point text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors appearance-none">
                <option>AW24 Core Collection</option>
                <option>Sustainability Push Q4</option>
                <option>Evergreen</option>
              </select>
            </div>
            <div>
              <label className="font-label-mono text-[10px] text-on-surface-variant uppercase block mb-1">Assigned To</label>
              <div className="flex items-center gap-2 bg-surface-container border border-outline-variant rounded p-1.5 pl-2">
                <div className="w-5 h-5 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-[10px] font-bold">JS</div>
                <span className="text-data-point text-on-surface flex-1">Jane Smith (Copywriter)</span>
                <button className="text-on-surface-variant hover:text-primary pr-1"><span className="material-symbols-outlined text-[16px]">edit</span></button>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-outline-variant/30"></div>

          {/* Schedule */}
          <div>
            <h4 className="font-label-mono text-on-surface uppercase mb-3 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">schedule</span> Scheduling
            </h4>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="font-label-mono text-[10px] text-on-surface-variant uppercase block mb-1">Date</label>
                <input type="date" defaultValue="2024-10-24" className="w-full bg-surface-container border border-outline-variant rounded p-2 text-data-point text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors dark:[color-scheme:dark]" />
              </div>
              <div>
                <label className="font-label-mono text-[10px] text-on-surface-variant uppercase block mb-1">Time</label>
                <input type="time" defaultValue="14:00" className="w-full bg-surface-container border border-outline-variant rounded p-2 text-data-point text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors dark:[color-scheme:dark]" />
              </div>
            </div>
            <div>
              <label className="font-label-mono text-[10px] text-on-surface-variant uppercase block mb-1">Timezone</label>
              <select className="w-full bg-surface-container border border-outline-variant rounded p-2 text-data-point text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors appearance-none">
                <option>EST (Eastern Standard Time)</option>
                <option>PST (Pacific Standard Time)</option>
                <option>UTC</option>
              </select>
            </div>
            <div className="mt-3 bg-primary-fixed-dim/10 border border-primary/20 rounded p-2 flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">info</span>
              <p className="text-[11px] text-on-surface-variant leading-tight">This time aligns with peak audience engagement for the NA Instagram account (historical data).</p>
            </div>
          </div>

          <div className="h-px w-full bg-outline-variant/30"></div>

          {/* Activity Log */}
          <div>
            <h4 className="font-label-mono text-on-surface uppercase mb-3 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">history</span> Activity
            </h4>
            <div className="space-y-4">
              {activityLog.map((entry, i) => (
                <div key={i} className="flex gap-2 relative">
                  {entry.hasLine && <div className="absolute left-2 top-6 bottom-[-16px] w-px bg-outline-variant/30 z-0"></div>}
                  <div className="w-4 h-4 rounded-full bg-surface-variant border border-outline-variant flex items-center justify-center shrink-0 z-10 mt-0.5">
                    {entry.dotColor ? (
                      <div className={`w-1.5 h-1.5 rounded-full ${entry.dotColor}`}></div>
                    ) : (
                      <span className="material-symbols-outlined text-[10px] text-on-surface-variant">{entry.icon}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-data-point text-on-surface">{entry.label}</p>
                    <p className="text-[10px] text-on-surface-variant">{entry.by} &bull; {entry.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="p-md border-t border-outline-variant bg-surface-container flex flex-col gap-2 shrink-0">
          <button className="w-full bg-primary text-on-primary font-label-mono uppercase py-2 rounded flex items-center justify-center gap-1 hover:bg-primary-container transition-colors shadow-[0_0_10px_rgba(176,211,255,0.1)]">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Approve &amp; Schedule
          </button>
          <div className="flex gap-2">
            <button className="flex-1 bg-transparent border border-outline-variant text-on-surface font-label-mono uppercase py-1.5 rounded text-[11px] hover:bg-surface-variant hover:text-on-surface transition-colors flex justify-center items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">comment</span> Request Changes
            </button>
            <button className="flex-1 bg-transparent border border-error/50 text-error font-label-mono uppercase py-1.5 rounded text-[11px] hover:bg-error/10 transition-colors flex justify-center items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">block</span> Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

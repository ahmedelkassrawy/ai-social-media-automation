const days = [
  { num: 26, empty: true }, { num: 27, empty: true }, { num: 28, empty: true },
  { num: 29, empty: true }, { num: 30, empty: true },
  { num: 1, posts: [{ platform: "public", color: "text-primary", time: "09:00", title: "Q3 performance metrics are in!" }] },
  { num: 2 },
  { num: 3 },
  { num: 4, posts: [{ platform: "photo_camera", color: "text-tertiary", time: "12:30", title: "Behind the scenes..." }] },
  { num: 5, posts: [
    { platform: "public", color: "text-primary", time: null, title: "Product Launch" },
    { platform: "public", color: "text-primary", time: null, title: "Press Release" },
  ]},
  { num: 6, today: true },
  { num: 7 }, { num: 8 }, { num: 9 },
  { num: 10 }, { num: 11 }, { num: 12 }, { num: 13 },
  { num: 14 }, { num: 15 }, { num: 16 },
];

export default function ContentCalendarPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-56px-24px)]">
      {/* Header */}
      <section className="flex justify-between items-end mb-gutter flex-shrink-0">
        <div className="space-y-1">
          <h1 className="font-label-mono text-[32px] font-bold tracking-tight text-on-surface">Content Calendar</h1>
          <p className="font-body-md text-on-surface-variant">October 2024 &bull; 12 posts scheduled</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-outline-variant text-on-surface-variant font-label-mono text-label-mono hover:bg-surface-container-high transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            Previous
          </button>
          <button className="px-4 py-2 border border-outline-variant text-on-surface-variant font-label-mono text-label-mono hover:bg-surface-container-high transition-colors flex items-center gap-2">
            Next
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
          <button className="px-4 py-2 bg-primary-container text-on-primary-container font-label-mono text-label-mono hover:brightness-110 active:scale-95 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">add</span>
            New Post
          </button>
        </div>
      </section>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-auto">
        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-outline-variant bg-surface-container">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="px-sm py-2 font-label-mono text-label-mono text-on-surface-variant uppercase text-center border-r border-outline-variant/30 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Body */}
        <div className="grid grid-cols-7 flex-1">
          {days.map((day, i) => (
            <div
              key={i}
              className={`min-h-[100px] p-sm border-b border-r border-outline-variant/30 flex flex-col gap-1 ${
                day.empty ? "bg-surface-container-lowest/50 opacity-40" :
                day.today ? "bg-primary/5 border-2 border-primary/20" :
                "bg-surface-dim"
              }`}
            >
              <span className={`font-label-mono text-label-mono ${
                day.today ? "text-primary font-bold" : "text-on-surface-variant"
              }`}>
                {day.num}{day.today ? " (Today)" : ""}
              </span>
              {day.posts?.map((post, j) => (
                <div
                  key={j}
                  className="bg-surface-container p-1.5 rounded border border-outline-variant/50 hover:border-primary/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-1">
                    <span className={`material-symbols-outlined text-[14px] ${post.color}`}>{post.platform}</span>
                    {post.time && <span className="font-label-mono text-[10px] text-on-surface-variant">{post.time}</span>}
                  </div>
                  <p className="font-label-mono text-[10px] text-on-surface truncate mt-0.5">{post.title}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const kpis = [
  { label: "Engagement Rate", value: "3.2%", points: "0,35 20,25 40,30 60,15 80,28 100,10 120,32 140,20 160,35 180,12 200,5" },
  { label: "Scheduled Posts", value: "12", points: "0,10 30,12 60,8 90,25 120,20 150,22 180,5 200,15" },
  { label: "Avg Response Time", value: "14m", points: "0,30 50,32 100,28 150,15 200,10" },
  { label: "Pending Approvals", value: "08", points: "0,5 25,15 50,10 75,30 100,35 125,25 150,20 175,10 200,5" },
];

const approvalQueue = [
  { title: "Q4 Launch Campaign", client: "Client Alpha", platform: "FB", platformColor: "bg-[#4267B2]/20 text-[#4267B2]", status: "Pending Approval", by: "@m_rossi", due: "14:00", selected: false },
  { title: "Weekly Recap Reel", client: "Global Logistics X", platform: "IG", platformColor: "bg-[#E1306C]/20 text-[#E1306C]", status: "Pending Approval", by: "@j_chen", due: "16:30", selected: true },
  { title: "Product Spotlight", client: "Zenith Gear", platform: "TW", platformColor: "bg-[#1DA1F2]/20 text-[#1DA1F2]", status: "Approved", by: "@l_vance", due: "DONE", selected: false },
  { title: "Hiring Announcement", client: "TechFlow Systems", platform: "LI", platformColor: "bg-[#0077B5]/20 text-[#0077B5]", status: "Pending Approval", by: "@j_doe", due: "18:15", selected: false },
  { title: "Client Testimonial", client: "Nexus Agency", platform: "IG", platformColor: "bg-[#E1306C]/20 text-[#E1306C]", status: "Pending Approval", by: "@s_park", due: "20:00", selected: false },
  { title: "Maintenance Alert", client: "Global Logistics X", platform: "TW", platformColor: "bg-[#1DA1F2]/20 text-[#1DA1F2]", status: "Pending Approval", by: "@j_chen", due: "21:30", selected: false },
];

const activityItems = [
  { icon: "photo_camera", time: "09:30 - IG POST", desc: "Product launch image successfully deployed to production servers.", active: true },
  { icon: "thumb_up", time: "11:15 - FB EVENT", desc: "Engagement spike detected (+24%) on 'Sustainable Tech' series.", active: true },
  { icon: "schedule", time: "15:00 - TW QUEUE", desc: "Automated thread scheduling initialized for EMEA timezone.", active: false },
];

const inboxAlerts = [
  { from: "@GLOBAL_ADMIN", subject: "EMERGENCY: ASSET RE-UPLOAD", preview: "Compression error detected on the latest campaign zip. Manual override...", unread: true },
  { from: "CLIENT_X", subject: "FEEDBACK RECEIVED: REEL V3", preview: "Client requested removal of transition at 0:12 due to brand guidelines...", unread: true },
  { from: "SYSTEM_BOT", subject: "DAILY SUMMARY READY", preview: "The automated report for yesterday is now available for review in...", unread: false },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-56px-24px)]">
      {/* KPI Strip */}
      <section className="grid grid-cols-4 gap-gutter mb-gutter flex-shrink-0">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-surface-container border border-outline-variant p-panel-padding flex flex-col justify-between h-[84px]">
            <div className="flex justify-between items-start">
              <span className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">{kpi.label}</span>
              <span className="text-primary font-headline-md">{kpi.value}</span>
            </div>
            <div className="h-6 w-full overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 200 40">
                <polyline fill="none" points={kpi.points} stroke="#b0d3ff" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        ))}
      </section>

      <div className="flex gap-gutter flex-1 min-h-0">
        {/* Approval Queue */}
        <section className="flex-1 bg-surface-container border border-outline-variant flex flex-col min-w-0">
          <header className="px-panel-padding py-base border-b border-outline-variant flex justify-between items-center bg-surface-container-high">
            <h2 className="font-label-mono text-label-mono font-bold tracking-widest uppercase">Approval Queue</h2>
            <span className="font-label-mono text-[10px] text-on-surface-variant">6 ENTRIES ACTIVE</span>
          </header>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left font-data-point text-data-point border-collapse">
              <thead className="bg-surface-container-lowest sticky top-0">
                <tr className="border-b border-outline-variant">
                  <th className="px-panel-padding py-2 font-label-mono text-[10px] text-on-surface-variant uppercase">Post / Client</th>
                  <th className="px-base py-2 font-label-mono text-[10px] text-on-surface-variant uppercase">Platform</th>
                  <th className="px-base py-2 font-label-mono text-[10px] text-on-surface-variant uppercase">Status</th>
                  <th className="px-base py-2 font-label-mono text-[10px] text-on-surface-variant uppercase">Requested by</th>
                  <th className="px-base py-2 font-label-mono text-[10px] text-on-surface-variant uppercase">Due</th>
                  <th className="px-panel-padding py-2 font-label-mono text-[10px] text-on-surface-variant uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {approvalQueue.map((item) => (
                  <tr
                    key={item.title}
                    className={`hover:bg-surface-container-high transition-colors ${
                      item.selected ? "bg-primary/10 border-l-2 border-primary" : ""
                    }`}
                  >
                    <td className="px-panel-padding py-3">
                      <div className="flex items-center gap-sm">
                        <div className="w-8 h-8 bg-outline-variant rounded"></div>
                        <div>
                          <div className="font-bold text-on-surface">{item.title}</div>
                          <div className="text-[11px] opacity-60">{item.client}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-base py-3">
                      <span className={`px-2 py-0.5 rounded-xs text-[10px] font-bold ${item.platformColor}`}>{item.platform}</span>
                    </td>
                    <td className="px-base py-3">
                      {item.status === "Approved" ? (
                        <span className="px-2 py-0.5 bg-on-surface-variant/10 text-on-surface-variant border border-on-surface-variant/20 rounded-xs text-[10px] uppercase font-bold tracking-tighter">Approved</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-secondary/10 text-secondary border border-secondary/20 rounded-xs text-[10px] uppercase font-bold tracking-tighter">Pending Approval</span>
                      )}
                    </td>
                    <td className="px-base py-3 text-on-surface-variant">{item.by}</td>
                    <td className="px-base py-3 font-label-mono">{item.due}</td>
                    <td className="px-panel-padding py-3 text-right">
                      <div className="flex justify-end gap-xs">
                        {item.status === "Approved" ? (
                          <>
                            <button className="p-1 text-primary opacity-50 cursor-not-allowed"><span className="material-symbols-outlined text-sm">check</span></button>
                            <button className="p-1 text-on-surface-variant hover:text-error transition-colors"><span className="material-symbols-outlined text-sm">delete</span></button>
                          </>
                        ) : (
                          <>
                            <button className="p-1 hover:text-primary transition-colors"><span className="material-symbols-outlined text-sm">check</span></button>
                            <button className="p-1 hover:text-error transition-colors"><span className="material-symbols-outlined text-sm">close</span></button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Right Panel */}
        <aside className="w-[300px] flex flex-col gap-gutter">
          {/* Today's Activity */}
          <div className="bg-surface-container border border-outline-variant flex flex-col h-1/2">
            <header className="px-panel-padding py-base border-b border-outline-variant flex justify-between items-center bg-surface-container-high">
              <h2 className="font-label-mono text-label-mono font-bold tracking-widest uppercase">Today's Activity</h2>
              <span className="material-symbols-outlined text-xs">more_vert</span>
            </header>
            <div className="flex-1 overflow-auto p-panel-padding">
              <div className="relative flex flex-col gap-md">
                <div className="absolute left-1.5 top-2 bottom-2 w-px bg-primary/30"></div>
                {activityItems.map((item) => (
                  <div key={item.time} className={`relative pl-base ${!item.active ? "opacity-50" : ""}`}>
                    <div className={`absolute left-0 top-1 w-3 h-3 border-2 border-surface-container rounded-full z-10 ${item.active ? "bg-primary" : "bg-outline-variant"}`}></div>
                    <div className="ml-base">
                      <div className={`flex items-center gap-xs font-bold text-xs uppercase font-label-mono ${item.active ? "text-primary" : "text-on-surface-variant"}`}>
                        <span className="material-symbols-outlined text-sm">{item.icon}</span>
                        {item.time}
                      </div>
                      <div className="text-on-surface-variant text-[11px] mt-xs">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Inbox Alerts */}
          <div className="bg-surface-container border border-outline-variant flex flex-col flex-1">
            <header className="px-panel-padding py-base border-b border-outline-variant flex justify-between items-center bg-surface-container-high">
              <h2 className="font-label-mono text-label-mono font-bold tracking-widest uppercase">Inbox Alerts</h2>
              <span className="px-2 py-0.5 bg-primary-container text-on-primary-container text-[10px] font-bold">3 NEW</span>
            </header>
            <div className="flex-1 overflow-auto p-xs">
              <div className="flex flex-col gap-xs">
                {inboxAlerts.map((alert) => (
                  <div key={alert.subject} className={`p-base bg-surface-container-high border border-outline-variant relative group cursor-pointer hover:border-primary transition-colors ${!alert.unread ? "opacity-60" : ""}`}>
                    {alert.unread && <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full"></div>}
                    <div className="font-label-mono text-[10px] text-primary mb-xs">FROM: {alert.from}</div>
                    <div className="font-bold text-on-surface text-[12px] line-clamp-1">{alert.subject}</div>
                    <div className="text-on-surface-variant text-[11px] mt-xs line-clamp-2">{alert.preview}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Status Bar */}
      <footer className="h-6 bg-surface-container-lowest border-t border-outline-variant flex items-center px-panel-padding justify-between flex-shrink-0 mt-gutter">
        <div className="flex items-center gap-md">
          <div className="flex items-center gap-xs">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="font-label-mono text-[9px] text-on-surface-variant uppercase tracking-tighter">System Nominal // v2.4.0</span>
          </div>
          <div className="flex items-center gap-xs">
            <span className="font-label-mono text-[9px] text-on-surface-variant uppercase tracking-tighter">Lat: 24ms</span>
          </div>
        </div>
        <div className="flex items-center gap-md">
          <span className="font-label-mono text-[9px] text-on-surface-variant uppercase tracking-tighter">Server: US-EAST-01</span>
        </div>
      </footer>
    </div>
  );
}

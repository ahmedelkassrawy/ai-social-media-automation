const clients = [
  { name: "Northbound Apparel", handle: "@northbound.co", platform: "IG", status: "Active", connection: "Connected · Healthy", lastPost: "2h ago", nextScheduled: "Today 16:00", followers: "48,210", selected: true },
  { name: "Harbor & Vine", handle: "@harborandvine", platform: "FB", status: "Active", connection: "Connected · Healthy", lastPost: "Yesterday", nextScheduled: "Tomorrow 09:00", followers: "102,400" },
  { name: "Maison Clair", handle: "@maisonclair", platform: "IG", status: "Needs Attention", connection: "Reconnect required", lastPost: "4d ago", nextScheduled: "—", followers: "29,100" },
  { name: "Oasis Botanicals", handle: "@oasis.bt", platform: "IG", status: "Active", connection: "Connected · Healthy", lastPost: "6h ago", nextScheduled: "Today 20:00", followers: "12,450" },
  { name: "Summit Gear", handle: "@summit.gear", platform: "FB", status: "Active", connection: "Connected · Healthy", lastPost: "3h ago", nextScheduled: "Tomorrow 11:00", followers: "88,200" },
  { name: "Arcane Studio", handle: "@arcane_std", platform: "IG", status: "Disconnected", connection: "API Token Expired", lastPost: "8d ago", nextScheduled: "—", followers: "5,400" },
  { name: "Velvet & Iron", handle: "@velvetiron", platform: "IG", status: "Active", connection: "Connected · Healthy", lastPost: "1h ago", nextScheduled: "Today 18:30", followers: "67,800" },
  { name: "Urban Drift", handle: "@urbandrift", platform: "FB", status: "Active", connection: "Connected · Healthy", lastPost: "Yesterday", nextScheduled: "Fri 10:00", followers: "41,200" },
  { name: "Kinetic Coffee", handle: "@kinetic.brew", platform: "IG", status: "Active", connection: "Connected · Healthy", lastPost: "12h ago", nextScheduled: "Today 22:00", followers: "19,300" },
  { name: "Nova Skincare", handle: "@novaskin", platform: "IG", status: "Needs Attention", connection: "Password change", lastPost: "2d ago", nextScheduled: "—", followers: "155,000" },
  { name: "Echo Media", handle: "@echo.media", platform: "FB", status: "Active", connection: "Connected · Healthy", lastPost: "5h ago", nextScheduled: "Tomorrow 08:00", followers: "9,800" },
  { name: "Driftwood Co", handle: "@driftwood", platform: "IG", status: "Active", connection: "Connected · Healthy", lastPost: "10h ago", nextScheduled: "Today 19:15", followers: "33,500" },
  { name: "Iron Peak", handle: "@ironpeak", platform: "FB", status: "Active", connection: "Connected · Healthy", lastPost: "Yesterday", nextScheduled: "Sat 12:00", followers: "142,000" },
  { name: "Solstice Labs", handle: "@solstice.labs", platform: "IG", status: "Active", connection: "Connected · Healthy", lastPost: "2h ago", nextScheduled: "Today 21:00", followers: "7,200" },
  { name: "Fable Agency", handle: "@fable.social", platform: "IG", status: "Active", connection: "Connected · Healthy", lastPost: "4h ago", nextScheduled: "Tomorrow 14:00", followers: "128,400" },
];

function StatusBadge({ status }) {
  if (status === "Active") {
    return (
      <div className="flex items-center gap-1.5 text-[#81c784]">
        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
        <span className="text-[11px] font-bold uppercase tracking-wider">Active</span>
      </div>
    );
  }
  if (status === "Needs Attention") {
    return (
      <div className="flex items-center gap-1.5 text-secondary">
        <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 bg-secondary/10 rounded">Needs Attention</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 text-error">
      <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 bg-error/10 rounded">Disconnected</span>
    </div>
  );
}

export default function ClientsPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-56px-24px)]">
      {/* Page Header */}
      <section className="flex justify-between items-end mb-gutter flex-shrink-0">
        <div className="space-y-1">
          <h1 className="font-label-mono text-[32px] font-bold tracking-tight text-on-surface">Clients</h1>
          <p className="font-body-md text-on-surface-variant">15 active accounts across Instagram and Facebook</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-primary-container text-primary-container font-label-mono text-label-mono hover:bg-primary-container/10 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">refresh</span>
            Refresh All
          </button>
          <button className="px-4 py-2 bg-primary-container text-on-primary-container font-label-mono text-label-mono hover:brightness-110 active:scale-95 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">add</span>
            + Add Client
          </button>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="pb-md flex justify-between items-center flex-shrink-0">
        <div className="flex gap-2">
          <button className="px-4 py-1.5 bg-surface-container-highest text-primary text-label-mono rounded-lg font-label-mono border border-outline-variant">All</button>
          <button className="px-4 py-1.5 text-on-surface-variant text-label-mono rounded-lg font-label-mono hover:bg-surface-container-high transition-colors">Instagram</button>
          <button className="px-4 py-1.5 text-on-surface-variant text-label-mono rounded-lg font-label-mono hover:bg-surface-container-high transition-colors">Facebook</button>
          <button className="px-4 py-1.5 text-on-surface-variant text-label-mono rounded-lg font-label-mono hover:bg-surface-container-high transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            Needs Attention
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-on-surface-variant font-label-mono text-label-mono">
            <span>Sort:</span>
            <div className="flex items-center gap-1 cursor-pointer hover:text-on-surface">
              Last activity
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </div>
          </div>
          <div className="flex bg-surface-container-lowest rounded border border-outline-variant p-0.5">
            <button className="p-1 bg-surface-container-highest text-primary rounded-sm">
              <span className="material-symbols-outlined text-[18px]">list</span>
            </button>
            <button className="p-1 text-on-surface-variant hover:text-on-surface">
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
            </button>
          </div>
        </div>
      </section>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead className="sticky top-0 bg-surface z-10">
            <tr className="border-b border-outline-variant text-on-surface-variant font-label-mono text-label-mono uppercase tracking-widest">
              <th className="py-3 px-4 font-medium">Client</th>
              <th className="py-3 px-4 font-medium">Handle</th>
              <th className="py-3 px-4 font-medium">Platform</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Connection</th>
              <th className="py-3 px-4 font-medium">Last Post</th>
              <th className="py-3 px-4 font-medium">Next Scheduled</th>
              <th className="py-3 px-4 font-medium text-right">Followers</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30">
            {clients.map((c) => (
              <tr
                key={c.handle}
                className={`h-[52px] group hover:bg-surface-bright transition-colors ${
                  c.selected ? "border-l-2 border-primary bg-primary/5 hover:bg-primary/10" : ""
                }`}
              >
                <td className="px-4 font-headline-md text-data-point text-on-surface">{c.name}</td>
                <td className="px-4 text-on-surface-variant font-data-point">{c.handle}</td>
                <td className="px-4">
                  <span className={`px-2 py-0.5 font-label-mono text-[10px] rounded ${
                    c.platform === "IG" ? "bg-on-tertiary-fixed-variant/20 text-tertiary" : "bg-blue-900/20 text-blue-400"
                  }`}>
                    {c.platform}
                  </span>
                </td>
                <td className="px-4"><StatusBadge status={c.status} /></td>
                <td className={`px-4 text-[11px] italic ${
                  c.status === "Needs Attention" ? "text-secondary" : c.status === "Disconnected" ? "text-error" : "text-on-surface-variant"
                }`}>
                  {c.connection}
                </td>
                <td className="px-4 text-on-surface-variant text-data-point">{c.lastPost}</td>
                <td className={`px-4 text-data-point ${c.nextScheduled !== "—" ? "text-primary" : "text-on-surface-variant"}`}>
                  {c.nextScheduled}
                </td>
                <td className="px-4 text-right font-data-point tabular-nums text-on-surface">{c.followers}</td>
                <td className="px-4 text-right">
                  <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-on-surface">more_vert</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Summary */}
      <footer className="h-10 bg-surface-container-lowest border-t border-outline-variant px-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2 text-on-surface-variant font-label-mono text-[10px] uppercase tracking-wider">
          <span>15 clients</span>
          <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
          <span>9 on Instagram</span>
          <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
          <span>6 on Facebook</span>
          <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
          <span className="text-primary/70">Last updated 2 minutes ago</span>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant font-label-mono text-[10px] uppercase tracking-wider">
          <span className="material-symbols-outlined text-[14px]">sync</span>
          Updated automatically
        </div>
      </footer>
    </div>
  );
}

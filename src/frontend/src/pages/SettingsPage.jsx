import { useState } from "react";

const settingsNav = [
  { section: "Workspace", items: [
    { label: "Connected Accounts", id: "accounts", active: true },
    { label: "General Settings", id: "general" },
    { label: "Branding", id: "branding" },
  ]},
  { section: "Team", items: [
    { label: "Members", id: "members", badge: "12" },
    { label: "Roles & Permissions", id: "roles" },
  ]},
  { section: "Billing", items: [
    { label: "Subscription", id: "subscription" },
    { label: "Invoices", id: "invoices" },
  ]},
  { section: "Account", items: [
    { label: "Profile", id: "profile" },
    { label: "Security", id: "security" },
  ]},
];

const accounts = [
  { icon: "campaign", iconColor: "text-primary", name: "Acme Corp Global", status: "Active", statusColor: "primary", date: "2023-10-12 14:30" },
  { icon: "photo_camera", iconColor: "text-tertiary", name: "Acme Corp Visuals", status: "Expiring", statusColor: "secondary-container", date: "2023-08-05 09:15" },
  { icon: "chat", iconColor: "text-[#1DA1F2]", name: "TechStart Inc HQ", status: "Active", statusColor: "primary", date: "2023-11-01 11:45" },
  { icon: "work", iconColor: "text-[#0A66C2]", name: "TechStart Inc Careers", status: "Active", statusColor: "primary", date: "2023-11-01 11:50" },
  { icon: "photo_camera", iconColor: "text-tertiary", name: "Oceanic Designs", status: "Disconnected", statusColor: "error", date: "2023-01-20 08:00" },
  { icon: "video_library", iconColor: "text-[#FF0000]", name: "Oceanic TV", status: "Active", statusColor: "primary", date: "2023-02-15 16:20" },
  { icon: "photo_camera", iconColor: "text-tertiary", name: "Zenith Consulting", status: "Expiring", statusColor: "secondary-container", date: "2023-07-22 10:05" },
  { icon: "campaign", iconColor: "text-primary", name: "Zenith Global", status: "Active", statusColor: "primary", date: "2023-07-22 10:10" },
];

function StatusBadge({ status, color }) {
  const styles = {
    primary: "bg-primary/10 text-primary",
    "secondary-container": "bg-secondary-container/10 text-secondary-container border border-secondary-container/30",
    error: "bg-error/10 text-error border border-error/30",
  };
  return (
    <span className={`px-2 py-1 rounded font-label-mono text-label-mono flex items-center gap-1 w-fit ${styles[color]}`}>
      <span className={`w-1.5 h-1.5 rounded-full bg-${color}`}></span> {status}
    </span>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("accounts");
  const [notifications, setNotifications] = useState({ email: true, inApp: true, mobile: false });

  return (
    <div className="flex gap-xl max-w-[1600px] mx-auto w-full">
      {/* Left Nav Column */}
      <aside className="w-[24%] flex flex-col gap-xl">
        {settingsNav.map((group) => (
          <div key={group.section} className="bg-surface-container border border-outline-variant rounded flex flex-col">
            <div className="px-panel-padding py-sm border-b border-outline-variant">
              <h3 className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">{group.section}</h3>
            </div>
            <div className="p-sm flex flex-col gap-xs">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-sm py-2 rounded font-body-md text-body-md flex items-center justify-between text-left w-full transition-colors ${
                    activeTab === item.id
                      ? "bg-surface-variant text-primary"
                      : "hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && <span className="bg-surface-variant px-2 py-0.5 rounded text-xs">{item.badge}</span>}
                  {activeTab === item.id && <span className="material-symbols-outlined text-[16px]">chevron_right</span>}
                </button>
              ))}
            </div>
          </div>
        ))}
      </aside>

      {/* Right Content Column */}
      <section className="w-[76%] flex flex-col gap-lg pb-xl">
        {/* Header */}
        <div className="flex flex-col gap-xs border-b border-outline-variant pb-md">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Connected Accounts</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Manage external platform connections and authorization status for your agency ecosystems.</p>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-3 gap-md">
          <div className="bg-surface-container border border-outline-variant rounded p-panel-padding flex flex-col gap-xs">
            <div className="flex items-center gap-xs text-primary">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="font-label-mono text-label-mono uppercase tracking-wider">Connected</span>
            </div>
            <span className="font-headline-lg text-headline-lg">24</span>
          </div>
          <div className="bg-surface-container border border-outline-variant rounded p-panel-padding flex flex-col gap-xs">
            <div className="flex items-center gap-xs text-secondary-container">
              <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
              <span className="font-label-mono text-label-mono uppercase tracking-wider">Need Attention</span>
            </div>
            <span className="font-headline-lg text-headline-lg">2</span>
          </div>
          <div className="bg-surface-container border border-outline-variant rounded p-panel-padding flex flex-col gap-xs">
            <div className="flex items-center gap-xs text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-outline"></span>
              <span className="font-label-mono text-label-mono uppercase tracking-wider">Disconnected</span>
            </div>
            <span className="font-headline-lg text-headline-lg">4</span>
          </div>
        </div>

        {/* Warning Callout */}
        <div className="bg-surface-container border border-outline-variant rounded p-panel-padding flex items-start gap-md">
          <div className="text-secondary-container mt-0.5">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
          </div>
          <div className="flex flex-col gap-xs flex-1">
            <h4 className="font-body-md text-body-md font-bold text-on-surface">Token Expiration Warning</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">Authentication tokens for 2 Instagram accounts are set to expire in the next 48 hours. Please re-authenticate to prevent posting disruptions.</p>
          </div>
          <button className="bg-surface-variant hover:bg-surface-bright text-on-surface px-4 py-2 rounded font-label-mono text-label-mono transition-colors border border-outline-variant">Re-auth All</button>
        </div>

        {/* Accounts List */}
        <div className="bg-surface-container border border-outline-variant rounded flex flex-col">
          <div className="px-panel-padding py-sm border-b border-outline-variant flex items-center justify-between">
            <h3 className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">Active Connections</h3>
            <button className="text-primary hover:text-primary-container transition-colors font-label-mono text-label-mono flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">add</span> Add Connection
            </button>
          </div>
          <div className="flex flex-col">
            {/* Header Row */}
            <div className="grid grid-cols-[60px_1fr_120px_160px_80px] gap-md px-panel-padding py-sm border-b border-outline-variant/50 bg-surface-variant/30">
              <div className="font-label-mono text-label-mono text-on-surface-variant">Platform</div>
              <div className="font-label-mono text-label-mono text-on-surface-variant">Client / Account</div>
              <div className="font-label-mono text-label-mono text-on-surface-variant">Status</div>
              <div className="font-label-mono text-label-mono text-on-surface-variant text-right">Connected On</div>
              <div className="font-label-mono text-label-mono text-on-surface-variant text-right">Actions</div>
            </div>
            {accounts.map((acc, i) => (
              <div
                key={acc.name}
                className={`grid grid-cols-[60px_1fr_120px_160px_80px] gap-md px-panel-padding py-3 border-b border-outline-variant/50 items-center hover:bg-surface-variant/20 transition-colors ${
                  i % 2 !== 0 ? "bg-surface-variant/10" : ""
                }`}
              >
                <div className="flex justify-center">
                  <span className={`material-symbols-outlined text-[20px] ${acc.iconColor}`}>{acc.icon}</span>
                </div>
                <div className="font-data-point text-data-point text-on-surface truncate">{acc.name}</div>
                <div><StatusBadge status={acc.status} color={acc.statusColor} /></div>
                <div className="font-data-point text-data-point text-on-surface-variant text-right">{acc.date}</div>
                <div className="flex justify-end gap-2">
                  <button className="text-on-surface-variant hover:text-on-surface transition-colors"><span className="material-symbols-outlined text-[18px]">sync</span></button>
                  <button className="text-on-surface-variant hover:text-error transition-colors"><span className="material-symbols-outlined text-[18px]">more_vert</span></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-surface-container border border-outline-variant rounded flex flex-col">
          <div className="px-panel-padding py-sm border-b border-outline-variant">
            <h3 className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">Notification Preferences</h3>
          </div>
          <div className="p-panel-padding flex flex-col gap-md">
            {[
              { key: "email", label: "Email Notifications", desc: "Receive alerts for disconnections and expiring tokens via email." },
              { key: "inApp", label: "In-app Alerts", desc: "Show prominent warnings within the Mission Control dashboard." },
              { key: "mobile", label: "Mobile Push", desc: "Send urgent push notifications to connected mobile devices." },
            ].map((pref, i) => (
              <div key={pref.key} className={`flex items-center justify-between ${i < 2 ? "border-b border-outline-variant/50 pb-md" : ""}`}>
                <div className="flex flex-col gap-1">
                  <span className="font-body-md text-body-md font-bold text-on-surface">{pref.label}</span>
                  <span className="font-body-md text-body-md text-on-surface-variant text-sm">{pref.desc}</span>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [pref.key]: !prev[pref.key] }))}
                  className={`relative w-10 h-5 rounded-full transition-colors ${notifications[pref.key] ? "bg-primary-container" : "bg-surface-variant"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
                    notifications[pref.key] ? "right-0.5 bg-primary" : "left-0.5 bg-surface-container-highest border border-outline"
                  }`}></div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-md pt-md border-t border-outline-variant mt-auto">
          <button className="px-4 py-2 rounded font-label-mono text-label-mono text-on-surface-variant border border-outline-variant hover:bg-surface-variant transition-colors">Discard Changes</button>
          <button className="px-4 py-2 rounded font-label-mono text-label-mono bg-primary text-on-primary hover:bg-primary-container transition-colors">Save Changes</button>
        </div>
      </section>
    </div>
  );
}

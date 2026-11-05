import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", icon: "group", label: "Clients" },
  { to: "/calendar", icon: "calendar_month", label: "Calendar" },
  { to: "/inbox", icon: "inbox", label: "Inbox" },
  { to: "/content", icon: "dashboard", label: "Content" },
  { to: "/reports", icon: "analytics", label: "Reports" },
];

export default function Sidebar() {
  return (
    <nav className="w-[72px] h-screen fixed left-0 top-0 flex flex-col bg-surface-container-lowest border-r border-outline-variant z-50">
      <div className="flex flex-col items-center py-lg space-y-md w-full h-full">
        {/* Brand */}
        <div className="mb-lg flex flex-col items-center group cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant overflow-hidden">
            <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome_motion</span>
          </div>
        </div>

        {/* Nav Items */}
        <div className="flex flex-col w-full space-y-sm">
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `w-full flex flex-col items-center justify-center py-sm transition-all duration-200 ease-in-out border-l-2 ${
                  isActive
                    ? "text-primary border-primary bg-surface-container-high"
                    : "text-on-surface-variant opacity-70 hover:bg-surface-container hover:text-on-surface border-transparent"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className="material-symbols-outlined text-[24px] mb-xs"
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {icon}
                  </span>
                  <span className="font-label-mono text-label-mono uppercase tracking-wider text-[10px]">
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="mt-auto w-full">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `w-full flex flex-col items-center justify-center py-sm transition-all duration-200 ease-in-out border-l-2 ${
                isActive
                  ? "text-primary border-primary bg-surface-container-high"
                  : "text-on-surface-variant opacity-70 hover:bg-surface-container hover:text-on-surface border-transparent"
              }`
            }
          >
            <span className="material-symbols-outlined text-[24px] mb-xs">settings</span>
            <span className="font-label-mono text-label-mono uppercase tracking-wider text-[10px]">Settings</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

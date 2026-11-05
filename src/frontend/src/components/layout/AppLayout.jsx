import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

export default function AppLayout() {
  return (
    <div className="flex bg-background min-h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-[72px] flex flex-col min-h-screen">
        <TopNav />
        <div className="flex-1 overflow-auto p-gutter">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

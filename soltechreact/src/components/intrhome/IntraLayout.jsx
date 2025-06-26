import { useState } from "react";
import IntraSidebar from "./IntraSidebar";
import IntraHeader from "./IntraHeader";
import { Outlet } from "react-router-dom";

export default function IntraLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex relative min-h-screen">
      <div
        className={`fixed left-0 w-72 h-[calc(100vh-3.5rem)] bg-[#6b46c1] z-40 transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <IntraSidebar />
      </div>

      <div
        className={`flex flex-col flex-1 bg-gray-50 transition-all duration-300
          ${sidebarOpen ? "ml-72" : "ml-0"}`}
      >
        <IntraHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto mt-14 bg-gray-100/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

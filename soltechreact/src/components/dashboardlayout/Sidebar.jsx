import { Mail, ClipboardList, Bell, BarChart3 } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-72 bg-gradient-to-b from-purple-100 to-purple-600 text-white flex flex-col">
      <div className="px-6 py-4">
        <img src="/mainImages/SolTech_Logo.png" alt="SOLTech Logo" className="h-10" />
      </div>

      <div className="px-6 py-4 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-200 mb-3" />
        <div className="text-lg font-semibold">최정희</div>
        <div className="text-sm text-blue-100">마케팅팀</div>
        <button className="mt-3 w-full rounded bg-white/1 py-1 text-sm">정보 변경</button>
      </div>

      <div className="flex-1 px-6 space-y-2">
        <button className="w-full py-2 rounded bg-blue-500">출근</button>
        <button className="w-full py-2 rounded bg-slate-600">퇴근</button>

        <nav className="mt-6 space-y-3 text-sm">
          <SideLink Icon={Mail} label="메일" />
          <SideLink Icon={ClipboardList} label="결재" />
          <SideLink Icon={Bell} label="알림" />
          <SideLink Icon={BarChart3} label="통계" />
        </nav>
      </div>
    </aside>
  );
}

function SideLink({ Icon, label }) {
  return (
    <a href="#" className="flex items-center gap-2 px-2 py-1 hover:bg-white/10 rounded">
      <Icon size={18} /> {label}
    </a>
  );
}

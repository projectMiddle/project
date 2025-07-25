import { Menu, Cog, HelpCircle, User } from "lucide-react";

export default function Topbar({ toggleSidebar }) {
  return (
    <header className="h-14 bg-white shadow fixed top-0 left-0 right-0 z-50 flex items-center px-6 justify-between">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-gray-600 hover:text-gray-900">
          <Menu size={20} />
        </button>
      </div>
      <nav className="flex gap-25 text-sm font-semibold text-gray-700">
        <a href="#">홈</a>
        <a href="#">메일</a>
        <a href="#">게시판</a>
        <a href="#">결재</a>
        <a href="#">스케줄</a>
        <a href="#">복지몰</a>
      </nav>
      <div className="flex gap-4 text-gray-600">
        <HelpCircle />
        <Cog />
        <User />
      </div>
    </header>
  );
}

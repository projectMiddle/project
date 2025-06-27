import {
  FaHome,
  FaCalendarAlt,
  FaMailBulk,
  FaBullhorn,
  FaChartBar,
  FaCalculator,
  FaBuilding,
  FaFileContract,
  FaClipboardList,
  FaFileAlt,
  FaDatabase,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";
import { MdLogout, MdOutlineMessage } from "react-icons/md";
import { LuFiles } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function IntraSidebar() {
  const topItems = [
    { label: "홈", icon: <FaHome />, to: "/intrasoltech" },
    { label: "공지사항", icon: <FaBullhorn />, to: "/intrasoltech/notices" },
    { label: "메일", icon: <FaMailBulk />, to: "/intrasoltech/mail" },
    { label: "메시지", icon: <MdOutlineMessage /> },
    { label: "스케줄", icon: <FaCalendarAlt />, to: "/intrasoltech/calendar" },
    { label: "출퇴근기록", icon: <FaClipboardList />, to: "/intrasoltech/attendance" },
    { label: "전자결재", icon: <FaFileContract />, to: "/intrasoltech/approval" },
    { label: "리포트", icon: <FaChartBar /> },
    { label: "급여명세서", icon: <FaCalculator />, to: "/intrasoltech/emppay" },
    { label: "부서목록", icon: <FaUsers />, to: "/intrasoltech/department" },
    { label: "복지몰", icon: <FaShoppingCart />, to: "https://www.coupang.com/" },
  ];

  const bottomItems = [
    { label: "관리", icon: <FaFileAlt />, marginTop: true },
    { label: "회사 설정", icon: <FaBuilding /> },
    { label: "감사 로그", icon: <FaDatabase /> },
  ];

  return (
    <aside className="fixed top-14 left-0 w-72 h-[calc(100vh-3.5rem)] bg-[#6b46c1] flex flex-col px-2 py-4 border-r border-gray-600 z-40 overflow-y-auto">
      {/* 상단 메뉴 */}
      <div className="mt-5 ml-2 mr-2">
        {topItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.to}
            className={`flex items-center gap-3 px-3 py-3 text-base text-gray-300 rounded-md text-left w-full
              ${item.disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-[#5e3cae]"}
            `}
            disabled={item.disabled}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
        {/* 하단 메뉴 */}
        {bottomItems.map((item, idx) => (
          <Link
            key={`bottom-${idx}`}
            className={`flex items-center gap-3 px-3 py-3 text-slate-300 text-base rounded-md text-left w-full
              ${item.marginTop ? "mt-20" : ""}
              hover:bg-[#5e3cae]
            `}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
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

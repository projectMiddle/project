import { Menu, Cog, HelpCircle, User } from "lucide-react";
import { useState } from "react";
import EmployeeSearchModal from "../../pages/intrahomeemployeepages/EmployeeSearchModal";

export default function Header({ toggleSidebar }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className="h-14 bg-white fixed top-0 left-0 right-0 z-50 flex items-center px-6 justify-between transition-transform duration-300  border-b border-gray-300 shadow-2xs">
        {/* 사이드바 토글 로고 */}
        <div className="flex gap-4">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="text-gray-600 hover:text-gray-900 cursor-pointer">
              <Menu size={23} />
            </button>
          </div>
          <img src="/mainImages/SolTech_Logo.png" alt="SOLTech Logo" className="h-8" />
        </div>

        {/* 메뉴 네비게이션 */}
        <nav className="flex gap-25 text-sm font-semibold text-gray-700"></nav>

        {/* 우측 아이콘들 */}
        <div className="flex gap-4 text-gray-600">
          <HelpCircle />
          <Cog />
          <button className="cursor-pointer" onClick={() => setShowModal(true)}>
            <User />
          </button>
        </div>
      </header>

      {/* 사원 검색 모달 */}
      <EmployeeSearchModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

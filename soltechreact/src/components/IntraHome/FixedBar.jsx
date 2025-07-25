import { Link } from "react-router-dom";
import React, { useState } from "react";
import { MdPersonSearch } from "react-icons/md";
import EmployeeSearchModal from "./EmployeeSearchModal";

const FixedBar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-purple-200">
        <header className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
          {/* 왼쪽: 로고 + 메뉴 */}
          <div className="flex items-center gap-6 ">
            {/* 로고 */}
            <div className="flex items-center gap-2 ">
              <img
                src="/mainImages/SolTech_Logo.png"
                alt="SOLTech"
                className="h-[45px] w-auto object-contain transform -translate-x-70 -translate-y-1.5"
              />
            </div>

            {/* 1차 메뉴 */}
            <nav className="hidden md:flex items-center space-x-35 text-lg font-bold text-gray-950">
              <a href="#" className="hover:underline">
                게시판
              </a>
              <a href="#" className="hover:underline">
                메일
              </a>
              <Link to="/yongjae/approval">결재</Link>
              <a href="#" className="hover:underline">
                스케줄
              </a>
            </nav>
          </div>

          {/* 오른쪽: 복지몰 & 사원검색 아이콘 */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-lg font-bold hover:underline transform translate-x-40">
              복지몰
            </a>

            {/* 🔍 사원 검색 아이콘 */}
            <button
              onClick={() => setShowModal(true)}
              className="text-purple-700 hover:text-purple-900 transform translate-x-50"
            >
              <MdPersonSearch size={26} />
            </button>
          </div>
        </header>
      </div>

      {/* 사원 검색 모달 */}
      <EmployeeSearchModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default FixedBar;

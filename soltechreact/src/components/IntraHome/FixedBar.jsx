import React from "react";
import { Link } from "react-router-dom";

const FixedBar = () => {
  return (
    <div className="bg-purple-200">
      <header className="max-w-7xl mx-auto  flex items-center justify-between px-4 py-2 ">
        {/* 왼쪽: 로고 + 메뉴 */}
        <div className="flex items-center gap-6">
          {/* 로고 */}
          <div className="flex items-center gap-2">
            {/* 이미지 대신 아이콘/텍스트로 표시 */}
            <img src="/mainImages/SolTech_Logo.png" alt="SOLTech" className="h-[35px] w-auto object-contain" />
          </div>

          {/* 1차 메뉴 */}
          <nav className="hidden md:flex items-center space-x-15 text-lg font-medium text-gray-700">
            <a href="#" className="hover:underline">
              게시판
            </a>
            <a href="#" className="hover:underline">
              메일
            </a>
            <Link to="/yongjae/approval">결재</Link>
            <a href="#" className="hover:underline">
              검색
            </a>
          </nav>
        </div>

        {/* 오른쪽: 복지몰 & 프로필 아이콘 */}
        <div className="flex items-center gap-4">
          <a href="#" className="text-lg font-medium hover:underline">
            복지몰
          </a>
          {/* <User2 className="w-6 h-6 cursor-pointer" />
          <LogOut className="w-6 h-6 cursor-pointer" /> */}
        </div>
      </header>
    </div>
  );
};

export default FixedBar;

import React from "react";
import { Mail, PenLine, Bell, BarChart3, User2 } from "lucide-react";

const FixedBar = () => {
  return (
    <div>
      <header className="w-full bg-purple-300 flex items-center justify-between px-4 py-2 shadow-sm">
        {/* 왼쪽: 로고 + 메뉴 */}
        <div className="flex items-center gap-6">
          {/* 로고 */}
          <div className="flex items-center gap-2">
            {/* 이미지 대신 아이콘/텍스트로 표시 */}
            <img src="/logo.svg" alt="SOLTech" className="w-6 h-6" />
            <h1 className="text-2xl font-extrabold tracking-tight">SOLTech</h1>
          </div>

          {/* 1차 메뉴 */}
          <nav className="hidden md:flex items-center gap-6 text-lg font-medium">
            <a href="#" className="hover:underline">
              게시판
            </a>
            <a href="#" className="hover:underline">
              메일
            </a>
            <a href="#" className="hover:underline">
              결재
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

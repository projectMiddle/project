// 전체 레이아웃 / 라우팅
import React from "react";
import MailSidebar from "../../components/mail/MailSidebar";
import { Outlet } from "react-router-dom";

const MailPage = () => {
  return (
    <div className="flex h-full">
      {/* 사이드 메뉴 */}
      <div className="w-64 border-r bg-gray-50">
        <MailSidebar />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MailPage;

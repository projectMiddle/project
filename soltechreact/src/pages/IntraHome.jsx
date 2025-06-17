import React from "react";
import { Mail, PenLine, Bell, BarChart3, User2 } from "lucide-react";
import "../pages/IntraHome.css";
import Information from "../components/IntraHome/Information";
import Notice from "../components/IntraHome/Notice";
import Approval from "../components/IntraHome/Approval";
import Calendar from "../components/IntraHome/Calendar";

function IntraHome() {
  return (
    <div className="w-full p-4 flex flex-col gap-4">
      {/* 상단: 프로필 정보 + 아이콘 */}
      <div className="min-h-[120px]">
        <Information />
      </div>

      {/* 중단: 공지 + 결재함 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 rounded-xl p-3 min-h-[100px] flex items-center justify-center text-gray-500 text-sm">
          공지 영역 (추후 구현)
        </div>
        <div className="bg-gray-100 rounded-xl p-3 min-h-[100px] flex items-center justify-center text-gray-500 text-sm">
          결재함 영역 (추후 구현)
        </div>
      </div>

      {/* 하단: 일정 안내 + 캘린더 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-center text-gray-400 text-sm ">
          일정 기능은 추후 구현 예정입니다.
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-3  overflow-hidden ">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default IntraHome;

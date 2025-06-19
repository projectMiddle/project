// 메일 리스트 데이터

import React from "react";

const MailItem = ({ mail }) => {
  const { title, sender, date, isRead } = mail;

  return (
    <div
      className={`flex items-center justify-between px-4 py-2 border rounded 
        ${isRead ? "bg-white" : "bg-gray-50 font-semibold"}`}
    >
      {/* 보낸 사람 + 제목 */}
      <div className="flex flex-col">
        <span className="text-sm text-gray-600">{sender}</span>
        <span className="text-base">{title}</span>
      </div>

      {/* 날짜 */}
      <div className="text-sm text-gray-500">{date}</div>
    </div>
  );
};

export default MailItem;

import React, { useState, useEffect } from "react";
import MailSidebar from "../../components/mail/MailSidebar";
import { Outlet } from "react-router-dom";
import { MailContext } from "../../contexts/MailContext";

const MailPage = () => {
  const [mails, setMails] = useState([]);

  // 최초 1회 데이터 불러오기
  useEffect(() => {
    fetch("/data/dummy_mail_list_30.json")
      .then((res) => res.json())
      .then((data) => {
        const mailsWithBox = data.map((m) => ({
          ...m,
          boxType: "inbox", // 기본 받은메일함
        }));
        const sorted = mailsWithBox.sort((a, b) => new Date(b.date) - new Date(a.date));
        setMails(sorted);
      });
  }, []);

  return (
    <MailContext.Provider value={{ mails, setMails }}>
      <div className="flex h-full">
        {/* 사이드 메뉴 */}
        <div className="w-64 border-r bg-gray-50">
          <MailSidebar />
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex-1 p-6 overflow-auto">
          <Outlet context={{ mails, setMails }} />
        </div>
      </div>
    </MailContext.Provider>
  );
};

export default MailPage;

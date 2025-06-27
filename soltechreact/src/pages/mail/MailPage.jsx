import React, { useState, useEffect } from "react";
import MailSidebar from "../../components/mail/MailSidebar";
import { Outlet } from "react-router-dom";
import { MailContext } from "../../contexts/MailContext";

const MailPage = () => {
  const [mails, setMails] = useState([]);

  // useEffect(() => {
  //   fetch("/data/dummy_mail_list_30.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const mailsWithBox = data.map((m) => ({
  //         ...m,
  //         boxType: "inbox",
  //       }));
  //       const sorted = mailsWithBox.sort((a, b) => new Date(b.date) - new Date(a.date));
  //       setMails(sorted);
  //     });
  // }, []);

  return (
    <MailContext.Provider value={{ mails, setMails }}>
      <div className="flex h-full">
        {/* 사이드 메뉴 */}

        <MailSidebar />

        {/* 메인 콘텐츠 */}
        <div className="flex-1 p-6 overflow-auto">
          <Outlet /> {/* ✅ 여기서 오른쪽 페이지가 렌더링됨 */}
        </div>
      </div>
    </MailContext.Provider>
  );
};

export default MailPage;

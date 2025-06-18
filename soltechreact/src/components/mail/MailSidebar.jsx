// 사이드
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MailSidebar = () => {
    const location = useLocation();  // 현 브라우저 경로 가져왕 하이라이트 칠해야 됑
    
    const menu = [
    { label: "메일쓰기", path: "/mail/compose" },
    { label: "받은메일함", path: "/mail" },
    { label: "보낸메일함", path: "/mail/sent" },
    { label: "휴지통", path: "/mail/trash" },
  ];
  return (
    <div className="flex flex-col gap-2 p-4 w-48 bg-white rounded shadow">
      {menu.map((item) => (
        <Link
          to={item.path}
          key={item.path}
          className={`block px-4 py-2 rounded hover:bg-gray-100 transition ${
            location.pathname === item.path ? "bg-gray-200 font-semibold" : ""
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};


export default MailSidebar;
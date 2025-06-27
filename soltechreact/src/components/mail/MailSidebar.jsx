import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IoMailUnreadOutline, // 메일작성
  IoMailOpenOutline, // 받은메일함
  IoSendOutline, // 보낸메일함
  IoTrashOutline, // 휴지통
} from "react-icons/io5";

const MailSidebar = () => {
  const location = useLocation();

  const menu = [
    { label: "메일작성", path: "/intrasoltech/mail/send", icon: <IoMailUnreadOutline /> },
    { label: "받은메일함", path: "/intrasoltech/mail/receiveList", icon: <IoMailOpenOutline /> },
    { label: "보낸메일함", path: "/intrasoltech/mail/sendList", icon: <IoSendOutline /> },
    { label: "휴지통", path: "/intrasoltech/mail/trash", icon: <IoTrashOutline /> },
  ];
  return (
    <aside className="w-56 bg-white shadow h-full rounded-xl p-4 flex flex-col gap-3 mt-30">
      {menu.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            to={item.path}
            key={item.path}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all
              ${isActive ? "bg-violet-200 text-violet-800 font-semibold" : "text-gray-700 hover:bg-violet-50"}`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </aside>
  );
};

export default MailSidebar;

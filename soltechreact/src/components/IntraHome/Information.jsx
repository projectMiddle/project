import React, { useEffect, useState } from "react";
import { Mail, PenLine, Bell, BarChart3, User2 } from "lucide-react";
import "../../css/employeeprofile.css";
import Calendar from "./Calendar";

import axios from "axios";

const Information = () => {
  // 더미
  const userName = "개똥벌레";
  const department = "인사팀";
  const isLoggedIn = true;

  const [user, setUser] = useState({
    name: "",
    department: "",
  });

  const iconList = [
    { icon: Mail, label: "새 메일" }, // 주소 생기면 href="/" 넣어주기
    { icon: PenLine, label: "미결함" },
    { icon: Bell, label: "업무 알림" },
    { icon: BarChart3, label: "재경 / 인사" },
  ];

  useEffect(() => {
    axios.get("경로").then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <>
      <div className="info-all-container">
        <div className="information-container">
          <div className="avatar-box">
            <User2 className="avatar-icon" />
          </div>
          <div className="profile-info">
            <div className="info">
              <div className="name-tag">
                <span>{userName}</span>
                {/* <span>{user.name}</span> */}

                {/* 불 반짝 */}
                {isLoggedIn && <span className="status-dot" />}
              </div>
              <div className="department">{department}</div>
              {/* <div className="department">{user.department}</div> */}
              <button className="profile-button">정보 변경</button>
            </div>
          </div>
        </div>

        <div className="icon-grid">
          {iconList.map(({ icon: Icon, label, href }, index) => (
            <a href={href} className="icon-item" key={index}>
              <Icon className="icon" />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Information;

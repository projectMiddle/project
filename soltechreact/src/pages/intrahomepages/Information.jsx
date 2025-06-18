import React, { useEffect, useState } from "react";
import { Mail, PenLine, Bell, BarChart3, User2 } from "lucide-react";
import "../../css/employeeprofile.css";
import Calendar from "./Calendar";
import axios from "axios";

const Information = () => {
  const [user, setUser] = useState({
    name: "",
    department: "",
  });

  const [isWorking, setIsWorking] = useState(false);

  const iconList = [
    { icon: Mail, label: "새 메일" },
    { icon: PenLine, label: "미결함" },
    { icon: Bell, label: "업무 알림" },
    { icon: BarChart3, label: "재경 / 인사" },
  ];
  const empNo = 1049; // 임시
  useEffect(() => {
    axios
      .get(`/attendance/user/info/${empNo}`)
      .then((res) => {
        console.log("출근 정보", res.data);
        const { name, department, attStatus } = res.data;
        setUser({ name, department });
        setIsWorking(attStatus === "WORK");
      })
      .catch((err) => {
        console.error("사용자 정보 조회 실패:", err);
      });
  }, []);

  return (
    <div className="info-all-container">
      <div className="information-container">
        <div className="avatar-box">
          <User2 className="avatar-icon" />
        </div>
        <div className="profile-info">
          <div className="info">
            <div className="name-tag">
              <span>{user.name || "로딩 중..."}</span>
              {isWorking && <span className="status-dot" />}
            </div>
            <div className="department">{user.department || "부서 없음"}</div>
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
  );
};

export default Information;

import React, { useEffect, useState } from "react";
import { Mail, PenLine, Bell, BarChart3, User2 } from "lucide-react";
import { fetchEmployeeInfo } from "../../api/employeeProfile";
import { fetchAttendanceStatus } from "../../api/attendanceApi";
import EditInfoModal from "../../components/intrahome/EditInfoModal";
import EmpInfoModal from "../../components/intrahome/EmpInfoModal"; // ✅ 상세 팝업 추가
import useAuth from "../../hooks/useAuth";

const Information = () => {
  const [user, setUser] = useState(null); // 전체 유저 정보
  const [isWorking, setIsWorking] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // ✅ 상세정보 모달
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { userInfo } = useAuth();
  const empNo = userInfo?.empNo; // 임시 값

  const iconList = [
    { icon: Mail, label: "새 메일" },
    { icon: PenLine, label: "미결함" },
    { icon: Bell, label: "업무 알림" },
    { icon: BarChart3, label: "재경 / 인사" },
  ];

  useEffect(() => {
    fetchEmployeeInfo(empNo)
      .then((data) => {
        console.log("직원 정보 조회 성공", data);
        setUser(data);
      })
      .catch((err) => {
        console.error("직원 정보 조회 실패:", err);
      });

    fetchAttendanceStatus(empNo)
      .then((data) => {
        console.log("불반짝 성공", data);
        setIsWorking(data.attStatus === "WORK");
      })
      .catch((err) => {
        console.error("근태 상태 조회 실패:", err);
      });
  }, []);

  if (!user) {
    return <div>🔄 직원 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="info-all-container">
      <div className="information-container">
        {/* 프로필 사진 클릭 → 상세 모달 열기 */}
        <div className="avatar-box cursor-pointer" onClick={() => setIsProfileModalOpen(true)}>
          <User2 className="avatar-icon" />
        </div>

        <div className="profile-info">
          <div className="info">
            <div className="name-tag">
              <span>{user.ename}</span>
              {isWorking && <span className="status-dot" />}
            </div>
            <div className="department">{user.deptName}</div>
            <button className="profile-button" onClick={() => setIsEditOpen(true)}>
              정보 변경
            </button>
          </div>
        </div>
      </div>

      <div className="icon-grid">
        {iconList.map(({ icon: Icon, label }, index) => (
          <div className="icon-item" key={index}>
            <Icon className="icon" />
            <span>{label}</span>
          </div>
        ))}
      </div>

      <EditInfoModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        empNo={user.empNo}
        initialData={{
          emobile: user.emobile,
          eaddress: user.eaddress,
          eaccount: user.eaccount,
          epassword: user.epassword,
        }}
        onUpdated={() => {
          // 수정 후 처리
        }}
      />
      {/* 👤 상세 프로필 모달 */}
      <EmpInfoModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} employee={user} />
    </div>
  );
};

export default Information;

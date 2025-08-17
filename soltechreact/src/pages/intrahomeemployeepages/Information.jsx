import React, { useEffect, useState } from "react";
import { Mail, PenLine, MessageSquare, BarChart3, User2, Settings } from "lucide-react";
import { fetchEmployeeInfo } from "../../api/employeeProfile";
import { fetchAttendanceStatus } from "../../api/attendanceApi";
import EditInfoModal from "./EditInfoModal";
import EmpInfoModal from "./EmpInfoModal"; // 상세 팝업 추가
import useAuth from "../../hooks/useAuth";
import { fetchApprovalCategoryCounts } from "../../api/approvalApi";
import { useNavigate } from "react-router-dom";
import { getReceivedNotes } from "../../api/noteApi";

const Information = () => {
  const [user, setUser] = useState(null); // 전체 유저 정보
  const [isWorking, setIsWorking] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // 상세정보 모달
  const [isEditOpen, setIsEditOpen] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const empNo = userInfo?.empNo;

  // 미결함 카운트
  const [counts, setCounts] = useState({ list: 0 });
  // 쪽지 카운트
  const [noteCount, setNoteCount] = useState(0);

  const iconList = [
    { icon: Mail, label: "메일", cnt: "5" },
    {
      icon: MessageSquare,
      label: "쪽지",
      cnt: `${noteCount}`,
      path: "/intrasoltech/note/receiveList"   // ✅ 수신함으로 이동
    },
    {
      icon: PenLine,
      label: "미결함",
      cnt: `${counts.list}`,
      path: "/intrasoltech/approval/confirm/list?category=전체문서",
    },
    { icon: BarChart3, label: "재경 / 인사" },
    { icon: Settings, label: "정보 변경" },
  ];

  useEffect(() => {
    fetchEmployeeInfo(empNo)
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error("직원 정보 조회 실패:", err);
      });

    fetchAttendanceStatus(empNo)
      .then((data) => {
        setIsWorking(data.attStatus === "WORK");
      })
      .catch((err) => {
        console.error("근태 상태 조회 실패:", err);
      });

    // 사이드바 뱃지용 미결함 수신결재 카운트
    fetchApprovalCategoryCounts(empNo)
      .then((data) => {
        setCounts({ list: data.list });
      })
      .catch((err) => {
        console.error("수신결재 수 조회 실패:", err);
      });

    // 쪽지함 개수 카운트
    getReceivedNotes(empNo)
      .then((data) => {
        setNoteCount(data.length);
      })
      .catch((err) => console.error("쪽지 수 조회 실패:", err));
  }, []);

  if (!user) {
    return <div>🔄 직원 정보를 불러오는 중입니다...</div>;
  }

  return (
    <>
      {/* 프로필 사진 클릭 → 상세 모달 열기 */}
      <div className="flex flex-col items-center justify-center">
        <div
          className="w-36 h-36 rounded-full bg-gray-200 flex flex-col items-center justify-end overflow-hidden cursor-pointer"
          onClick={() => setIsProfileModalOpen(true)}
        >
          {/* 👇 이미지가 원의 하단에 위치하도록 설정 */}
          <img
            src="/mainImages/soltech_character_3d_profile.png"
            alt="SOLTech Logo"
            className="w-32 h-32 object-cover"
          />
        </div>

        <div className="flex flex-row gap-5 w-full justify-center mt-5 items-end">
          <div className="rounded-md text-sm text-gray-200">
            <span className="text-2xl">{user.ename}</span>
            {isWorking && <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full align-middle" />}
          </div>
          <div className="rounded-md text-[16px] font-medium text-center text-gray-200">{user.deptName}</div>
        </div>
      </div>

      <div className="flex justify-between gap-4 w-full pt-8 border-t border-gray-200 mt-8">
        {iconList.map(({ icon: Icon, label, cnt, path }, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-xs gap-1 cursor-pointer"
            onClick={() => {
              if (label === "정보 변경") {
                setIsEditOpen(true); // 모달 열기
              } else if (path) {
                navigate(path); // 나머지는 경로 이동
              }
            }}
          >
            <Icon className="w-6 h-6 text-gray-200" />
            <span className="text-gray-200">{label}</span>
            <span className="text-gray-200 text-sm">{cnt}</span>
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
    </>
  );
};

export default Information;

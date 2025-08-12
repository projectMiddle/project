import { Mail, Bell, Users, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Cog, User, PowerOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { loginAttendance, logoutAttendance } from "../../api/attendanceApi";
import { fetchEmployeeInfo } from "../../api/employeeProfile";
import { NavLink } from "react-router-dom";
import IntraTopSection from "./IntraTopSection";
import IntraBottomSection from "./IntraBottomSection";
import EmployeeSearchModal from "../../pages/intrahomeemployeepages/EmployeeSearchModal";
import Information from "../../pages/intrahomeemployeepages/Information";
import useIsHR from "../../hooks/useIsHR";
// 사이드바용
function SideLink({ Icon, label, to }) {
  return (
    <Link to={to} className="flex items-center gap-2 px-2 py-1 text-black text-[16px] hover:bg-gray-300/20 rounded">
      <Icon size={18} /> {label}
    </Link>
  );
}

const IntraMainComponent = () => {
  // ===================== 사원 조회용 =====================
  const { userInfo } = useAuth();
  const empNo = userInfo?.empNo;
  const [profile, setProfile] = useState(null);
  const isHR = useIsHR();

  const handleGoToWork = async () => {
    try {
      const data = await loginAttendance(empNo);
      alert("출근 완료", data);
    } catch (err) {
      console.error("출근 실패", err);
      alert("출근 실패");
    }
  };
  const handleLeaveWork = async () => {
    try {
      const data = await logoutAttendance(empNo);
      alert("퇴근 완료", data);
    } catch (err) {
      console.error("퇴근 실패", err);
      alert("퇴근 실패");
    }
  };

  useEffect(() => {
    fetchEmployeeInfo(empNo)
      .then((datas) => {
        setProfile(datas);
      })
      .catch((err) => {
        console.log("사원정보 조회 실패", err);
      });
  }, [empNo]);

  // ===================== 사이드 바텀 =====================
  const [weekDays, setWeekDays] = useState(0);
  const [monthDays, setMonthDays] = useState(0);

  useEffect(() => {
    const today = new Date();

    // 이번 달 계산
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // 이번 주 계산 (월 ~ 일)
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (today.getDay() === 0 ? 6 : dayOfWeek - 1));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const countWeekdays = (start, end) => {
      let count = 0;
      const current = new Date(start);
      while (current <= end) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) count++;
        current.setDate(current.getDate() + 1);
      }
      return count;
    };

    setMonthDays(countWeekdays(startOfMonth, endOfMonth));
    setWeekDays(countWeekdays(startOfWeek, endOfWeek));
  }, []);

  // header 용
  const [showModal, setShowModal] = useState(false);
  const { setIsLoggedIn, setUserInfo } = useAuth();
  const navigate = useNavigate();

  // =================== 로그아웃 ===================
  const handleLogout = () => {
    // 토큰 삭제
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // 인증 상태 초기화
    setIsLoggedIn(false);
    setUserInfo(null);
    // SPA 내에서 리다이렉트
    navigate("/");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 헤더 */}
      <header className="pl-8 h-22 bg-[#6b46c1] fixed top-0 left-0 right-0 z-50 flex items-center px-6 justify-between transition-transform duration-300">
        <button className="text-white hover:text-gray-500">
          <img src="/mainImages/SolTech_Logo.png" alt="SOLTech Logo" className="h-10" />
        </button>

        <nav className="flex gap-25 text-lg font-semibold text-gray-100 pl-10">
          <Link to="/intrasoltech/notices">게시판</Link>
          <Link to="/intrasoltech/approval">결재</Link>
          <Link to="/intrasoltech/calendar">스케줄</Link>
          <Link to="/intrasoltech/attendance">출퇴근기록</Link>
          <NavLink to={isHR ? "/intrasoltech/emppay/HRPayDepartmentList" : "/intrasoltech/emppay"}>급여명세서</NavLink>
        </nav>

        <div className="flex gap-6 text-gray-600 items-center pr-8">
          <a
            href="/intrasoltech/welfaremall"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
          </a>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <User className="w-6 h-6" />
          </button>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow cursor-pointer">
            <Cog className="w-5 h-5" />
          </div>
          <button
            onClick={handleLogout}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow cursor-pointer"
          >
            <PowerOff className="w-5 h-5" />
          </button>
        </div>
        {/* 사원 검색 모달 */}
        <EmployeeSearchModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </header>

      <div className="flex flex-col flex-1">
        {/* 메인 탑 */}
        <main className="flex flex-row h-5/11 bg-gradient-to-b from-[#6b46c1] to-purple-400 mt-22">
          <div className="grid grid-cols-37 w-full bg-gradient-to-b from-[#6b46c1] to-purple-400">
            {/* 사이드 탑 */}
            <aside className="col-span-9 h-full bg-gradient-to-b from-[#6b46c1] to-purple-400 border-b border-gray-300">
              <div className="p-10 pt-15">
                <Information />
              </div>
            </aside>

            {/* 메인 탑 섹션 */}
            <IntraTopSection />

            {/* 오른쪽 색배경 */}
            <div className="col-span-1 h-full bg-gradient-to-b from-[#6b46c1] to-purple-400 border-b border-gray-300"></div>
          </div>
        </main>

        {/* 메인 바텀 */}
        <main className="flex flex-row h-6/11">
          <div className="grid grid-cols-37 w-full">
            {/* 사이드 바텀 */}
            <aside className="col-span-9 h-full bg-gray-100">
              <div className="flex-1 px-6 space-y-2 pt-5 bg-[#f5f5f5] h-15">
                <div className="flex gap-10 p-2">
                  <button
                    onClick={handleGoToWork}
                    className="w-full py-2 rounded-4xl text-white text-[18px] border-1 border-gray-300 font-bold bg-blue-500 cursor-pointer hover:bg-blue-600"
                  >
                    출근
                  </button>
                  <button
                    onClick={handleLeaveWork}
                    className="w-full py-2 rounded-4xl text-white text-[18px] border-1 border-gray-300 font-bold bg-red-600 cursor-pointer hover:bg-red-700"
                  >
                    퇴근
                  </button>
                </div>

                <div className="flex justify-center items-center gap-10 text-[13px] text-gray-800 mt-5">
                  {/* 좌측 시간 정보 */}
                  <div className="text-center text-base">
                    <div className="font-semibold text-[18px]">근무</div>
                    <div className="text-[12px] text-gray-500 mt-1">09:30 ~ 18:30</div>
                  </div>

                  {/* 우측 누적 근무시간 */}
                  <div className="flex flex-col gap-2">
                    <div>
                      <div className="text-gray-500 text-[14px]">금주 누적 근무시간</div>
                      <div className="w-40 h-2 bg-gray-200 rounded-full mt-1">
                        <div className="h-full bg-purple-400 rounded-full w-0" />
                      </div>
                      <div className="text-sm font-bold mt-1">0 / {weekDays * 8}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-[14px]">금월 누적 근무시간</div>
                      <div className="w-40 h-2 bg-gray-200 rounded-full mt-1">
                        <div className="h-full bg-purple-400 rounded-full w-0" />
                      </div>
                      <div className="text-sm font-bold mt-1">0 / {monthDays * 8}</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center my-4 mt-7">
                  <div className="bg-gray-300 h-[1.5px] w-full rounded-xl" />
                </div>

                <nav className="mt-6 space-y-3 text-sm grid grid-cols-2">
                  <SideLink Icon={Bell} label="알림" />
                  <SideLink Icon={Mail} label="메일" to={"/intrasoltech/mail"} />
                  <SideLink Icon={MessageSquare} label="메시지" to={"/intrasoltech/note"} />
                  <SideLink Icon={Users} label="부서목록" to="/intrasoltech/department" />
                </nav>
              </div>
            </aside>

            {/* 메인 바텀 섹션 */}
            <IntraBottomSection />

            {/* 오른쪽 흰배경 */}
            <div className="col-span-1 h-full bg-white"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default IntraMainComponent;

import { Mail, Bell, Users, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loginAttendance, logoutAttendance } from "../../api/attendanceApi";
import useAuth from "../../hooks/useAuth";
import { fetchEmployeeInfo } from "../../api/employeeProfile";
import Information from "./Information";
export default function Sidebar() {
  const [weekDays, setWeekDays] = useState(0);
  const [monthDays, setMonthDays] = useState(0);
  const { userInfo } = useAuth();
  const empNo = userInfo?.empNo;
  const [profile, setProfile] = useState(null);

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

  return (
    <aside className="w-100 text-white bg-gray-200 flex flex-col">
      <div className="justify-center px-6 py-4 h-2/5 bg-gradient-to-b from-[#6b46c1] to-purple-400 mt-20 border-b-1">
        <Information />
      </div>

      <div className="flex-1 px-6 space-y-2 pt-5 bg-[#f5f5f5] h-15">
        <div className="flex gap-5 p-3">
          <button
            onClick={handleGoToWork}
            className="w-full py-2 rounded-4xl text-[18px] border-1 border-gray-300 font-bold bg-blue-500 cursor-pointer hover:bg-blue-600"
          >
            출근
          </button>
          <button
            onClick={handleLeaveWork}
            className="w-full py-2 rounded-4xl text-[18px] border-1 border-gray-300 font-bold bg-red-600 cursor-pointer hover:bg-red-700"
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
          <SideLink Icon={MessageSquare} label="메시지" />
          <SideLink Icon={Users} label="부서목록" to="/intrasoltech/department" />
        </nav>
      </div>
    </aside>
  );
}

function SideLink({ Icon, label, to }) {
  return (
    <Link to={to} className="flex items-center gap-2 px-2 py-1 text-black text-[16px] hover:bg-gray-300/20 rounded">
      <Icon size={18} /> {label}
    </Link>
  );
}

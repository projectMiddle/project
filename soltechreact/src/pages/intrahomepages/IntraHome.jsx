import React, { useEffect } from "react";
import { Mail, PenLine, Bell, BarChart3, User2 } from "lucide-react";
import "../../css/intrahome.css";
import Information from "./Information";
import Notice from "./Notice";
import FixedBar from "../../components/intrahome/FixedBar";

import Calendar from "./Calendar";
import dayjs from "dayjs";
import useAuth from "../../hooks/useAuth";

function IntraHome() {
  const events = JSON.parse(localStorage.getItem("calendarEvents") || "[]");

  const { userInfo, isLoggedIn } = useAuth();

  useEffect(() => {
    console.log("✅ 로그인 여부:", isLoggedIn);

    if (userInfo) {
      console.log("✅ 사용자 정보:", userInfo);
      console.log("  🔹 역할(role):", userInfo.role);
      console.log("  🔹 이메일(email):", userInfo.email); // 회원인 경우
      console.log("  🔹 사번(empNo):", userInfo.empNo); // 사원인 경우
      console.log("  🔹 부서번호(deptNo):", userInfo.deptNo);
      console.log("  🔹 직책번호(jobNo):", userInfo.jobNo);
    } else {
      console.log("❌ 사용자 정보 없음 (userInfo is null)");
    }
  }, [isLoggedIn, userInfo]);

  return (
    <>
      <FixedBar />

      <div className="w-full p-4 flex flex-col gap-4">
        {/* 상단: 프로필 정보 + 아이콘 */}
        <div className="min-h-[120px]">
          <Information />
        </div>

        {/* 중단: 공지 + 결재함 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 rounded-xl p-3 min-h-[100px] flex items-center justify-center text-gray-500 text-sm">
            공지 영역 (추후 구현)
          </div>
          <div className="bg-gray-100 rounded-xl p-3 min-h-[100px] flex items-center justify-center text-gray-500 text-sm">
            결재함 영역 (추후 구현)
          </div>
        </div>

        {/* 하단: 일정 테이블 + 캘린더 */}
        <div className="grid grid-cols-2 gap-4">
          {/* 일정 테이블 */}
          <div className="bg-white border border-gray-200 rounded-xl p-3 overflow-auto">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 text-center">일정</h2>
            {events.length === 0 ? (
              <div className="text-sm text-gray-400 text-center py-4">일정이 없습니다.</div>
            ) : (
              <table className="w-full table-fixed text-sm text-left border-collapse">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 w-1/3">제목</th>
                    <th className="px-4 py-2 w-1/4">시작일</th>
                    <th className="px-4 py-2 w-1/4">종료일</th>
                    <th className="px-4 py-2 w-1/6">유형</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id} className="border-t">
                      <td className="px-4 py-2">{event.title}</td>
                      <td className="px-4 py-2">{dayjs(event.start).format("YYYY-MM-DD HH:mm")}</td>
                      <td className="px-4 py-2">{dayjs(event.end).format("YYYY-MM-DD HH:mm")}</td>
                      <td className="px-4 py-2">
                        {event.classNames?.includes("holiday-event")
                          ? "공휴일"
                          : event.type === "DEPARTMENT"
                          ? "부서일정"
                          : "개인일정"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* 캘린더 */}
          <div className="bg-white border border-gray-200 rounded-xl p-3 overflow-hidden">
            <Calendar />
          </div>
        </div>
      </div>
    </>
  );
}

export default IntraHome;

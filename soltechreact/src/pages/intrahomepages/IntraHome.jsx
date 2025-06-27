import dayjs from "dayjs";
import useAuth from "../../hooks/useAuth";
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import IntraNoticeBox from "./IntraNoticeBox";
import IntraApprovalBox from "./IntraApprovalBox";

function IntraHome() {
  const events = JSON.parse(localStorage.getItem("calendarEvents") || "[]");
  const [boxHeight, setBoxHeight] = useState(400); // 기본 fallback 높이
  const [page, setPage] = useState(1);

  useEffect(() => {
    const updateHeight = () => {
      const vh = window.innerHeight;
      const usable = vh - 200; // Topbar + margin 추정 (상황에 따라 조정 가능)
      const calculated = Math.floor(usable / 2);
      setBoxHeight(calculated);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const { userInfo, isLoggedIn } = useAuth();

  useEffect(() => {
    if (userInfo) {
      console.log("사용자 정보:", userInfo);
    } else {
      console.log("❌ 사용자 정보 없음 (userInfo is null)");
    }
  }, [isLoggedIn, userInfo]);

  return (
    <div className="w-full px-6 py-6">
      <div className="grid grid-cols-2 gap-4 w-full">
        {/* 공지 영역 */}
        <div style={{ height: boxHeight }} className="w-full">
          <IntraNoticeBox />
        </div>

        {/* 결재함 영역 */}
        <div
          style={{ height: boxHeight }}
          className="bg-white border border-gray-200 rounded-xl p-3 overflow-hidden w-full"
        >
          <IntraApprovalBox />
        </div>

        {/* 일정 테이블 */}
        <div
          style={{ height: boxHeight }}
          className="bg-white border border-gray-200 rounded-xl p-4 w-full flex flex-col"
        >
          <h2 className="mx-auto px-4 py-1 rounded-full font-semibold bg-[#6b46c1] text-white mb-3 text-center w-24">
            일정
          </h2>

          <div className="space-y-2 text-sm overflow-y-auto flex-1">
            {events.slice((page - 1) * 5, page * 5).map((event) => (
              <div
                key={event.id}
                className="block bg-white rounded-lg px-3 py-1 border border-gray-200 shadow-sm hover:bg-gray-50 transition"
              >
                <div className="flex items-center justify-between p-2.5 text-[13px] text-gray-700">
                  <div className="flex items-center gap-4 flex-1 min-w-0 truncate">
                    <span className="flex-1 font-medium text-gray-800 truncate">{event.title}</span>
                    <span className="w-[100px] text-gray-500 truncate">{dayjs(event.start).format("YYYY-MM-DD")}</span>
                    <span className="w-[100px] text-gray-500 truncate">{dayjs(event.end).format("YYYY-MM-DD")}</span>

                    {/* ✅ 일정 유형 배지 */}
                    <span
                      className={`w-[80px] text-[11px] font-semibold px-2 py-0.5 rounded-full text-center ${
                        event.classNames?.includes("holiday-event")
                          ? "bg-red-100 text-red-700"
                          : event.type === "DEPARTMENT"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {event.classNames?.includes("holiday-event")
                        ? "공휴일"
                        : event.type === "DEPARTMENT"
                        ? "부서일정"
                        : "개인일정"}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {events.length === 0 && <p className="text-center text-gray-400 text-sm">일정이 없습니다.</p>}
          </div>

          {/* 페이지네이션 */}
          <div className="flex justify-center mt-3 gap-1 text-xs">
            {Array.from({ length: Math.ceil(events.length / 5) }).map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => setPage(idx + 1)}
                className={`px-3 py-1 rounded font-semibold ${
                  page === idx + 1 ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* 캘린더 */}
        <div
          style={{ height: boxHeight }}
          className="bg-white border border-gray-200 rounded-xl p-3 overflow-hidden w-full"
        >
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default IntraHome;

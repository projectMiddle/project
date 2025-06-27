import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const IntraSchedule = () => {
  const events = JSON.parse(localStorage.getItem("calendarEvents") || "[]");
  const [boxHeight, setBoxHeight] = useState(400); // 기본 fallback 높이

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

  return (
    <div
      style={{ height: boxHeight }}
      className="bg-white border border-gray-200 rounded-xl p-3 overflow-hidden w-full flex flex-col"
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-3 text-center">
        일정
      </h2>
      <div className="overflow-auto flex-1">
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
                <td className="px-4 py-2">
                  {dayjs(event.start).format("YYYY-MM-DD HH:mm")}
                </td>
                <td className="px-4 py-2">
                  {dayjs(event.end).format("YYYY-MM-DD HH:mm")}
                </td>
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
      </div>
    </div>
  );
};

export default IntraSchedule;

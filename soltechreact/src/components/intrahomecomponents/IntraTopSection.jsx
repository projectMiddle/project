import React, { useLayoutEffect, useRef, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import dayjs from "dayjs";
import Calendar from "./Calendar";

const IntraTopSection = () => {
  // 왼쪽 섹션
  const [selectedTab, setSelectedTab] = useState("calendar");
  const [gradientStyle, setGradientStyle] = useState("");
  const containerRef = useRef(null);
  const calendarRef = useRef(null);
  const serviceRef = useRef(null);

  useLayoutEffect(() => {
    if (containerRef.current && calendarRef.current && serviceRef.current) {
      const containerWidth = containerRef.current.offsetWidth;

      const calLeft = calendarRef.current.offsetLeft;
      const calWidth = calendarRef.current.offsetWidth;
      const srvLeft = serviceRef.current.offsetLeft;
      const srvWidth = serviceRef.current.offsetWidth;

      const calStart = (calLeft / containerWidth) * 100;
      const calEnd = ((calLeft + calWidth) / containerWidth) * 100;

      const srvStart = (srvLeft / containerWidth) * 100;
      const srvEnd = ((srvLeft + srvWidth) / containerWidth) * 100;

      if (selectedTab === "calendar") {
        setGradientStyle(
          `linear-gradient(to right,
            #6b46c1 ${calStart}%,
            #6b46c1 ${calEnd}%,
            #d1d5db ${calEnd}%,
            #d1d5db 100%)`
        );
      } else {
        setGradientStyle(
          `linear-gradient(to right,
            #d1d5db 0%,
            #d1d5db ${srvStart}%,
            #6b46c1 ${srvStart}%,
            #6b46c1 ${srvEnd}%,
            #d1d5db ${srvEnd}%,
            #d1d5db 100%)`
        );
      }
    }
  }, [selectedTab]);

  // 로컬스토리지에 저장된 일정 데이터
  const events = JSON.parse(localStorage.getItem("calendarEvents") || "[]");

  return (
    <>
      {/* main 왼쪽 섹션 */}
      <section className="col-span-14 w-full p-10 rounded-tl-2xl bg-white border-t border-l border-gray-300">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-4 relative" ref={containerRef}>
            {/* 탭 */}
            <div className="flex space-x-5 w-full">
              <button
                ref={calendarRef}
                onClick={() => setSelectedTab("calendar")}
                className={`text-sm font-semibold pb-2 focus:outline-none ${
                  selectedTab === "calendar" ? "text-[#6b46c1]" : "text-gray-500"
                }`}
              >
                내 캘린더 일정
              </button>
              <button
                ref={serviceRef}
                onClick={() => setSelectedTab("service")}
                className={`text-sm font-semibold pb-2 focus:outline-none ${
                  selectedTab === "service" ? "text-[#6b46c1]" : "text-gray-500"
                }`}
              >
                서비스
              </button>
            </div>

            {/* 페이지 넘김 */}
            <div className="flex space-x-2">
              <button className="p-1 mb-2 rounded-full border text-[#6b46c1] border-gray-300 hover:bg-gray-100 transition">
                <MdChevronLeft className="w-6 h-6" />
              </button>
              <button className="p-1 mb-2 rounded-full border text-[#6b46c1] border-gray-300 hover:bg-gray-100 transition">
                <MdChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* 한 줄 gradient bar */}
            <div
              className="absolute bottom-0 left-0 h-0.5 w-full"
              style={{
                background: gradientStyle,
              }}
            ></div>
          </div>

          {/* 탭별 내용 */}
          <div className="text-sm text-gray-600">
            {selectedTab === "calendar" ? (
              <>
                <div className="bg-white mt-2 overflow-hidden">
                  {events.length === 0 ? (
                    <div className="text-sm text-gray-400 text-center py-6">일정이 없습니다.</div>
                  ) : (
                    <ul className="divide-y divide-gray-100">
                      {events.map((event) => (
                        <li
                          key={event.id}
                          className="flex items-center py-2 px-4 hover:bg-gray-50 transition justify-between"
                        >
                          {/* 유형 */}
                          <span
                            className={`text-xs font-semibold rounded-xl px-2 py-1 min-w-[70px] text-center select-none mr-2 flex-shrink-0
                                                            ${
                                                              event.classNames?.includes("holiday-event")
                                                                ? "bg-red-500 text-white"
                                                                : event.type === "DEPARTMENT"
                                                                ? "bg-purple-400 text-white"
                                                                : "bg-blue-400 text-white"
                                                            }
                                                        `}
                          >
                            {event.classNames?.includes("holiday-event")
                              ? "공휴일"
                              : event.type === "DEPARTMENT"
                              ? "부서일정"
                              : "개인일정"}
                          </span>
                          {/* 제목 (ellipsis) */}
                          <span className="flex-1 font-medium text-gray-700 truncate mx-2 min-w-[60px] max-w-[160px]">
                            {event.title}
                          </span>
                          <span className="mx-2 text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                            {event.classNames?.includes("holiday-event") ? "-" : "관리자"}
                          </span>
                          {/* 시작일 */}
                          <span className="text-xs text-gray-600 mx-2 min-w-[95px] text-center flex-shrink-0">
                            {dayjs(event.start).format("YYYY-MM-DD")}
                          </span>
                          {/* 종료일 (오른쪽 끝!) */}
                          <span className="text-xs text-gray-600 min-w-[95px] text-center flex-shrink-0">
                            {dayjs(event.end).format("YYYY-MM-DD")}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {console.log("캘린더 일정 탭에서 events: ", events)} {/* 콘솔 출력 */}
              </>
            ) : (
              "서비스 내용입니다."
            )}
          </div>
        </div>
      </section>
      {/* main 오른쪽 섹션 */}
      <section className="col-span-13 w-full p-10 rounded-tr-2xl bg-gray-50 border-t border-r border-gray-300">
        <div className="bg-white border border-gray-200 rounded-xl p-3 overflow-hidden">
          <Calendar />
        </div>
        {/* 일정 테이블은 이제 여기서 제거 */}
      </section>
    </>
  );
};

export default IntraTopSection;

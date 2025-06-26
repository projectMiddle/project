import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import "../../css/intrahome.css";
import dayjs from "dayjs";
// import CalendarView from "../CalendarView";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  // ✅ localStorage에서 일정 불러오기
  useEffect(() => {
    const savedEvents = localStorage.getItem("calendarEvents");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      // 로컬스토리지에 아무것도 없을 때 기본값
      setEvents([
        {
          id: "1",
          title: "프로젝트 1차 기안 작성 및 ppt 발표",
          start: dayjs("2025-06-09T09:00").toISOString(),
          end: dayjs("2025-06-18T10:00").toISOString(),
          type: "DEPARTMENT",
          color: "#D580F6",
        },
        {
          id: "2",
          title: "연차",
          start: dayjs("2025-06-16T13:00").toISOString(),
          end: dayjs("2025-06-18T14:00").toISOString(),
          type: "PERSONAL",
          color: "#2196F3",
        },
        {
          id: "3",
          title: "현충일",
          start: dayjs("2025-06-06T13:00").toISOString(),
          end: dayjs("2025-06-06T23:00").toISOString(),
          color: "#ED1115",
          classNames: ["holiday-event"],
        },
        {
          id: "4",
          title: "대통령 선거",
          start: dayjs("2025-06-02T13:00").toISOString(),
          end: dayjs("2025-06-02T23:00").toISOString(),
          color: "#ED1115",
          classNames: ["holiday-event"],
        },
      ]);
    }
  }, []);

  return (
    <div className="p-0">
      <div className="calendar-container border border-gray-200 rounded-xl overflow-hidden">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          buttonText={{
            today: "오늘",
            month: "월간",
            week: "주간",
            day: "일간",
          }}
          events={events}
          height="300px"
          contentHeight={250}
          expandRows={true}
          aspectRatio={1}
          displayEventTime={false}
          eventContent={(arg) => (
            <div style={{ fontSize: "11px", lineHeight: "1.2", padding: "0.2px" }}>{arg.event.title}</div>
          )}
        />
        <footer className="calendar-legend px-4 py-2 text-xs text-gray-500 bg-gray-50 flex gap-4 mt-1 rounded-b-xl border border-t-0 border-gray-200">
          <span>
            <span className="dot holiday"></span>공휴일
          </span>
          <span>
            <span className="dot personal"></span>개인일정
          </span>
          <span>
            <span className="dot department"></span>부서일정
          </span>
        </footer>
      </div>
    </div>
  );
};

export default Calendar;

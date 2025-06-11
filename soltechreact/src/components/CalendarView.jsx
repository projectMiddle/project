import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";
import dayjs from "dayjs";
import "../css/calendarview.css";

const CalendarView = () => {
  const [events, _setEvents] = useState([
    {
      id: "1",
      title: "프로젝트 1차 기안 작성 및 ppt 발표",
      start: dayjs("2025-06-09T09:00").toISOString(),
      end: dayjs("2025-06-18T10:00").toISOString(),
      type: "DEPARTMENT",
      color: "#D580F6", // 부서 일정 (초록색)
    },
    {
      id: "2",
      title: "연차",
      start: dayjs("2025-06-16T13:00").toISOString(),
      end: dayjs("2025-06-18T14:00").toISOString(),
      type: "PERSONAL",
      color: "#2196F3", // 개인 일정 (파랑)
    },
    {
      id: "3",
      title: "현충일",
      start: dayjs("2025-06-06T13:00").toISOString(),
      end: dayjs("2025-06-06T23:00").toISOString(),
      color: "#ED1115", // 공휴일 (빨강 )
      classNames: ["holiday-event"],
    },
    {
      id: "3",
      title: "대통령 선거",
      start: dayjs("2025-06-02T13:00").toISOString(),
      end: dayjs("2025-06-02T23:00").toISOString(),
      color: "#ED1115", // 공휴일 (빨강 )
      classNames: ["holiday-event"],
    },
  ]);

  return (
    <div className="p-4">
      <div className="calendar-container">
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
          height={"auto"}
          displayEventTime={false}
        />
        <footer className="calendar-legend">
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

export default CalendarView;

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";
import dayjs from "dayjs";
import "../css/calendarview.css";

const CalendarView = () => {
  const [events, setEvents] = useState([
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
      start: dayjs("2025-06-16T09:00").toISOString(),
      end: dayjs("2025-06-18T24:00").toISOString(),
      type: "PERSONAL",
      color: "#2196F3",
    },
    {
      id: "3",
      title: "현충일",
      start: dayjs("2025-06-06T00:00").toISOString(),
      end: dayjs("2025-06-06T24:00").toISOString(),
      color: "#ED1115",
      classNames: ["holiday-event"],
    },
    {
      id: "4",
      title: "대통령 선거",
      start: dayjs("2025-06-02T00:00").toISOString(),
      end: dayjs("2025-06-02T24:00").toISOString(),
      color: "#ED1115",
      classNames: ["holiday-event"],
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    id: null,
    title: "",
    start: "",
    end: "",
    type: "PERSONAL",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleAddOrUpdateEvent = () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) return;
    const color = newEvent.type === "DEPARTMENT" ? "#D580F6" : "#2196F3";

    if (isEditMode) {
      // 수정 모드
      setEvents(events.map((event) => (event.id === newEvent.id ? { ...newEvent, color } : event)));
    } else {
      // 추가 모드
      const id = String(events.length + 1);
      setEvents([...events, { ...newEvent, id, color }]);
    }
    setNewEvent({ id: null, title: "", start: "", end: "", type: "PERSONAL" });
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    if (event.classNames.includes("holiday-event")) {
      alert("공휴일은 수정하거나 삭제할 수 없습니다.");
      return;
    }
    setNewEvent({
      id: event.id,
      title: event.title,
      start: dayjs(event.start).format("YYYY-MM-DD"),
      end: dayjs(event.end).format("YYYY-MM-DD"),
      type: event.extendedProps.type,
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = () => {
    if (window.confirm("일정을 삭제하시겠습니까?")) {
      setEvents(events.filter((e) => e.id !== newEvent.id));
      setIsModalOpen(false);
      setIsEditMode(false);
    }
  };

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
          eventClick={handleEventClick}
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

        <div className="flex justify-end mt-4">
          <button
            onClick={() => {
              setNewEvent({ id: null, title: "", start: "", end: "", type: "PERSONAL" });
              setIsEditMode(false);
              setIsModalOpen(true);
            }}
            className="bg-purple-500 text-white px-4 py-2 rounded fc-button"
          >
            일정 추가
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">{isEditMode ? "일정 수정" : "일정 추가"}</h2>
              <input
                type="text"
                placeholder="제목"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="border px-2 py-1 rounded w-full mb-2"
              />
              <input
                type="date"
                value={newEvent.start}
                onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                className="border px-2 py-1 rounded w-full mb-2"
              />
              <input
                type="date"
                value={newEvent.end}
                onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                className="border px-2 py-1 rounded w-full mb-2"
              />
              <select
                value={newEvent.type}
                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                className="border px-2 py-1 rounded w-full mb-4"
              >
                <option value="PERSONAL">개인일정</option>
                <option value="DEPARTMENT">부서일정</option>
              </select>
              <div className="flex justify-between gap-2">
                {isEditMode && (
                  <button onClick={handleDeleteEvent} className="bg-red-500 text-white px-3 py-1 rounded">
                    삭제
                  </button>
                )}
                <div className="flex justify-end gap-2 ml-auto">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setIsEditMode(false);
                    }}
                    className="bg-gray-300 px-3 py-1 rounded"
                  >
                    취소
                  </button>
                  <button onClick={handleAddOrUpdateEvent} className="bg-purple-500 text-white px-3 py-1 rounded">
                    저장
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;

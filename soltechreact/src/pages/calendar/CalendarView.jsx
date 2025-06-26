import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "../../css/calendarView.css";

const CalendarView = () => {
  const [events, setEvents] = useState([]);

  const [newEvent, setNewEvent] = useState({
    id: null,
    title: "",
    start: "",
    end: "",
    type: "PERSONAL",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // ✅ localStorage 저장 함수
  const saveToLocalStorage = (updatedEvents) => {
    localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
  };

  // ✅ 컴포넌트 로드시 저장된 일정 불러오기
  useEffect(() => {
    const savedEvents = localStorage.getItem("calendarEvents");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      // 기본 일정 초기값 (최초 진입시 한 번만 설정)
      const defaultEvents = [
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
      ];
      setEvents(defaultEvents);
      saveToLocalStorage(defaultEvents);
    }
  }, []);

  const handleAddOrUpdateEvent = () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) return;
    const color = newEvent.type === "DEPARTMENT" ? "#D580F6" : "#2196F3";

    if (isEditMode) {
      const updated = events.map((event) => (event.id === newEvent.id ? { ...newEvent, color } : event));
      setEvents(updated);
      saveToLocalStorage(updated);
    } else {
      const id = String(events.length + 1);
      const newEventObj = { ...newEvent, id, color };
      const updated = [...events, newEventObj];
      setEvents(updated);
      saveToLocalStorage(updated);
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
      const updated = events.filter((e) => e.id !== newEvent.id);
      setEvents(updated);
      saveToLocalStorage(updated);
      setIsModalOpen(false);
      setIsEditMode(false);
    }
  };

  return (
    <div>
      <div className="bg-[#6b46c1] text-white font-bold text-[17px] pl-5 py-[14px] mb-10">스케줄</div>
      <div className="m-6 bg-white rounded-4xl p-10">
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
    </div>
  );
};

export default CalendarView;

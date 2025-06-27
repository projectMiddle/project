import dayjs from "dayjs";
import DashboardLayout from "./../components/dashboardlayout/DashboardLayout";
import Calendar from "./intrahomepages/Calendar";

export default function Dashboard() {
  const events = JSON.parse(localStorage.getItem("calendarEvents") || "[]");

  return (
    <DashboardLayout>
      <section className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 min-h-[100px]">공지 위젯</div>
        <div className="bg-white rounded-xl shadow-sm p-4 min-h-[100px]">결재 위젯</div>
      </section>

      <section className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-4 overflow-auto">
          <h2 className="text-lg font-semibold mb-4 text-center">일정</h2>
          {events.length === 0 ? (
            <p className="text-center text-gray-400">일정이 없습니다.</p>
          ) : (
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 w-1/3">제목</th>
                  <th className="px-4 py-2">시작</th>
                  <th className="px-4 py-2">종료</th>
                  <th className="px-4 py-2">유형</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e) => (
                  <tr key={e.id} className="border-t">
                    <td className="px-4 py-2">{e.title}</td>
                    <td className="px-4 py-2">{dayjs(e.start).format("MM/DD HH:mm")}</td>
                    <td className="px-4 py-2">{dayjs(e.end).format("MM/DD HH:mm")}</td>
                    <td className="px-4 py-2">
                      {e.classNames?.includes("holiday-event")
                        ? "공휴일"
                        : e.type === "DEPARTMENT"
                        ? "부서일정"
                        : "개인일정"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <Calendar />
        </div>
      </section>
    </DashboardLayout>
  );
}

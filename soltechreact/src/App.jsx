import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/schedule"
          element={
            <div className="App">
              <h1 style={{ textAlign: "left", margin: "20px" }}>캘린더</h1>
              <CalendarView />
            </div>
          }
        />
        {/* <Link to="/schedule">스케줄</Link> 메뉴에서 버튼으로 사용할때  */}
        {/* 메인 페이지용 Route (선택사항) */}
        <Route path="/" element={<h1 style={{ padding: "40px" }}>팀 공통 메인 페이지</h1>} />
        {/* 신승찬 경로 수정 중 */}
        {/* <Route path="/" element={<Navigate to="/notice" replace />} /> */}
        <Route path="/notice" element={<NoticeForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

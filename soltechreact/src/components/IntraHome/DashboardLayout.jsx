import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {

  return (
    <div className="flex h-screen overflow-hidden">
      {<Sidebar />}
      <div className="flex flex-col flex-1 bg-gray-50">
        <Topbar/>
        <main className="relative flex-1">
          {/* 1단계: 전체를 감싸는 div */}
          <div className="relative w-full h-full">
            {/* 2단계: 배경 색상 영역 */}
            <div className="absolute top-0 left-0 w-full h-2/5 z-10 bg-gradient-to-b from-[#6b46c1] to-purple-400 pr-5">
              {/* 배경 그라데이션 영역 (pr-5 오른쪽 여백만큼 배경색이 표시됨) */}
            </div>

            {/* 3단계: 여백에만 영향을 주는 div */}
            <div className="relative w-full h-full pr-5">
              {/* 4단계: Outlet을 감싸는 div */}
              <div className="relative z-20 bg-white rounded-t-4xl mt-20 h-full border-1 border-gray-300">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

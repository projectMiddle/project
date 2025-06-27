import { ShoppingCart, Cog, HelpCircle, User, PowerOff } from "lucide-react";
import { useState } from "react";
import EmployeeSearchModal from "./EmployeeSearchModal";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"

export default function Topbar() {
  const [showModal, setShowModal] = useState(false);
  const { setIsLoggedIn, setUserInfo } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 토큰 삭제
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // 인증 상태 초기화
    setIsLoggedIn(false);
    setUserInfo(null);
    // SPA 내에서 리다이렉트
    navigate("/");

  };

  return (
    <>
      <header className="h-20 bg-[#6b46c1] fixed top-0 left-0 right-0 z-50 flex items-center px-6 justify-between transition-transform duration-300">
        <button className="text-white hover:text-gray-500">
          <img
            src="/mainImages/SolTech_Logo.png"
            alt="SOLTech Logo"
            className="h-10"
          />
        </button>

        <nav className="flex gap-25 text-base font-semibold text-gray-100/90">
          <Link to="/intrasoltech/notices">게시판</Link>
          <Link to="/intrasoltech/approval">결재</Link>
          <Link to="/intrasoltech/calendar">스케줄</Link>
          <Link to="/intrasoltech/attendance">출퇴근기록</Link>
          <Link to="/intrasoltech/emppay">급여명세서</Link>
        </nav>

        <div className="flex gap-6 text-gray-600 items-center pr-8">
          <Link
            to="https://www.coupang.com/"
            target="_blank"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
          </Link>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <User className="w-6 h-6" />
          </button>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow cursor-pointer">
            <Cog className="w-5 h-5" />
          </div>
          <button onClick={handleLogout}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow cursor-pointer">
            <PowerOff className="w-5 h-5" />
          </button>
        </div>
      </header>
      {/* 사원 검색 모달 */}
      <EmployeeSearchModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

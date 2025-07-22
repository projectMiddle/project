import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // 전역 상태 가져오기

const MainHeader = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScrollY] = useState(0);
  const { isLoggedIn, userInfo, setIsLoggedIn, setUserInfo } = useAuth(); // ✅ 전역 상태

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false); // ✅ 전역 상태 초기화
    setUserInfo(null); // ✅ 전역 유저 정보 제거
    window.location.href = "/"; // ✅ 강제 리다이렉트
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScroll) {
      // 아래로 스크롤하면 숨김
      setShowHeader(false);
    } else {
      // 위로 스크롤하면 보이기
      setShowHeader(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 bg-white shadow-sm transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full">
        {/* 최대 폭 가운데 정렬 */}
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* 로고 */}
          <img src="/mainImages/SolTech_Logo.png" alt="Main Visual" className="h-[40px] w-auto object-contain" />

          {/* 메뉴 */}
          <ul className="flex space-x-20 text-base font-medium text-gray-700">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="aboutus">About Us</Link>
            </li>
            <li>Project</li>
            <li>
              <a
                href="https://www.notion.so/SOL-Tech-Project-211f85a884ab80c8b74fd63f210b04df"
                target="_blank"
                rel="noopener noreferrer"
              >
                Notion
              </a>
            </li>
            <li>FAQ</li>
            {/* ✅ Employee 로그인 시 IntraHome 노출 */}
            {isLoggedIn && userInfo?.role === "EMPLOYEE" && (
              <li>
                <Link to="/intrasoltech">임직원용</Link>
              </li>
            )}
          </ul>
          {/* 로그아웃 버튼 */}
          <div className="flex space-x-2">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="bg-red-400 text-white text-sm px-3 py-1 rounded">
                Logout
              </button>
            ) : (
              <>
                {/* 로그인 버튼들 */}
                <button className="text-sm text-gray-600">
                  <Link to="login">Log in</Link>
                </button>
                <button className="bg-purple-400 text-white text-sm px-3 py-1 rounded">
                  <Link to="signup">Sign Up</Link>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;

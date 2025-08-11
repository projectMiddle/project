import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // 전역 상태 가져오기

const MainHeader = () => {
  const showHeader = useState(true);
  const { isLoggedIn, userInfo, setIsLoggedIn, setUserInfo } = useAuth(); // 전역 상태

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false); // 전역 상태 초기화
    setUserInfo(null); // 전역 유저 정보 제거
    window.location.href = "/"; // 강제 리다이렉트
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-sm transition-transform duration-300">
      <div className="w-full">
        {/* 최대 폭 가운데 정렬 */}
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* 로고 */}
          <img src="/mainImages/SolTech_Logo.png" alt="Main Visual" className="h-[40px] w-auto object-contain" />

          {/* 메뉴 */}
          {/* 메뉴 영역 */}
          <ul className="flex space-x-20 text-base font-medium text-gray-700">
            {/* Home */}
            <li>
              <Link to="/" className="hover:text-purple-600 hover:underline relative z-10">
                Home
              </Link>
            </li>

            {/* About Us 드롭다운 */}
            <li className="relative group">
              <Link to="/company/aboutus" className="hover:text-purple-600 hover:underline relative z-10">
                Team Soltech
              </Link>
              {showHeader && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-[40px] mt-2 w-[5000px] bg-white border-t border-gray-200 shadow-md opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[220px] transition-all duration-300 ease-in-out z-40"
                  style={{ transitionProperty: "all, max-height" }}
                >
                  <div className="flex flex-col items-center py-3">
                    <Link
                      to="/company/aboutus"
                      className="block text-gray-400 py-2 w-56 text-center hover:text-purple-700 hover:underline hover:decoration-purple-800 hover:decoration-solid"
                    >
                      About Us
                    </Link>
                    <a
                      className="block text-gray-400 py-2 w-56 text-center hover:text-purple-700 hover:underline hover:decoration-purple-800 hover:decoration-solid"
                      href="https://www.notion.so/SOL-Tech-Project-211f85a884ab80c8b74fd63f210b04df"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Notion
                    </a>
                    <Link
                      to="/company/teams"
                      className="block text-gray-400 py-2 w-56 text-center hover:text-purple-700 hover:underline hover:decoration-purple-800 hover:decoration-solid"
                    >
                      Our Teams
                    </Link>
                    <Link
                      to="/matrix/now"
                      className="block text-gray-400 py-2 w-56 text-center hover:text-purple-700 hover:underline hover:decoration-purple-800 hover:decoration-solid"
                    >
                      Now
                    </Link>
                  </div>
                </div>
              )}
            </li>

            {/* Jobs 드롭다운 */}
            <li className="relative group">
              <Link to="/apply/recruit" className="hover:text-purple-600 hover:underline relative z-10">
                Jobs
              </Link>
              {showHeader && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-[40px] mt-2 w-[5000px] bg-white border-t border-gray-200 shadow-md opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[220px] transition-all duration-300 ease-in-out z-40"
                  style={{ transitionProperty: "all, max-height" }}
                >
                  <div className="flex flex-col items-center py-3">
                    <Link
                      to="/apply/information"
                      className="block text-gray-400 py-2 w-56 text-center hover:text-purple-700 hover:underline hover:decoration-purple-800 hover:decoration-solid"
                    >
                      채용 안내
                    </Link>
                    <Link
                      to="/apply/process"
                      className="block text-gray-400 py-2 w-56 text-center hover:text-purple-700 hover:underline hover:decoration-purple-800 hover:decoration-solid"
                    >
                      채용 프로세스
                    </Link>
                    <Link
                      to="/apply/recruit"
                      className="block text-gray-400 py-2 w-56 text-center hover:text-purple-700 hover:underline hover:decoration-purple-800 hover:decoration-solid"
                    >
                      모집 공고
                    </Link>
                  </div>
                </div>
              )}
            </li>

            {/* Notion - 그대로 유지 */}
            <li className="relative group">
              <Link to="/location/jongro" className="hover:text-purple-600 hover:underline relative z-10">
                Location
              </Link>
              {showHeader && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-[40px] mt-2 w-[5000px] bg-white border-t border-gray-200 shadow-md opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[220px] transition-all duration-300 ease-in-out z-40"
                  style={{ transitionProperty: "all, max-height" }}
                >
                  <div className="flex flex-col items-center py-3">
                    <Link
                      to="/location/jongro"
                      className="block text-gray-400 py-2 w-56 text-center hover:text-purple-700 hover:underline hover:decoration-purple-800 hover:decoration-solid"
                    >
                      종로
                    </Link>
                    <Link
                      to="/location/gangnam"
                      className="block text-gray-400 py-2 w-56 text-center hover:text-purple-700 hover:underline hover:decoration-purple-800 hover:decoration-solid"
                    >
                      강남
                    </Link>
                  </div>
                </div>
              )}
            </li>

            {/* FAQ 드롭다운 */}
            <li className="relative group">
              <Link to="/faq/notice" className="hover:text-purple-600 hover:underline relative z-10">
                FAQs
              </Link>
              {showHeader && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-[40px] mt-2 w-[5000px] bg-white border-t border-gray-200 shadow-md opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[220px] transition-all duration-300 ease-in-out z-40"
                  style={{ transitionProperty: "all, max-height" }}
                >
                  <div className="flex flex-col items-center py-3">
                    <Link
                      to="/faq"
                      className="block text-gray-400 py-2 w-56 text-center hover:text-purple-700 hover:underline hover:decoration-purple-800 hover:decoration-solid"
                    >
                      FAQ
                    </Link>
                    <Link
                      to="/faq/notice"
                      className="block text-gray-400 py-2 w-56 text-center hover:text-purple-700 hover:underline hover:decoration-purple-800 hover:decoration-solid"
                    >
                      공지사항
                    </Link>
                  </div>
                </div>
              )}
            </li>

            {/* 임직원 메뉴 */}
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

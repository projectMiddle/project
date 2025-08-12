import React, { useEffect, useState } from "react";
import Report from "./../bimatrix/Report";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";

const images = [
  "/mainImages/mainSlide/soledsk_image.png",
  "/mainImages/mainSlide/soltech_대표이미지2.png",
  "/mainImages/mainSlide/soltech_대표이미지.png",
];

const MainHome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
    const [lastScroll, setLastScrollY] = useState(0);
  const { isLoggedIn, userInfo, setIsLoggedIn, setUserInfo } = useAuth();

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
  }, [lastScroll]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false); // 전역 상태 초기화
    setUserInfo(null); // 전역 유저 정보 제거
    window.location.href = "/"; // 강제 리다이렉트
  };

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 인디케이터 클릭 시 슬라이드 변경
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full h-full">
      {/* 헤더 */}
      <header className={`fixed top-0 w-full z-50 bg-white shadow-sm transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"
                }`}>
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

              {/* Location */}
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

              {/* FAQ */}
              <li className="relative group">
                <Link to="/faq" className="hover:text-purple-600 hover:underline relative z-10">
                  FAQs
                </Link>
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

      {/* 본문 */}
      <div className="flex flex-col h-full w-full items-center justify-center">
        <div className="relative w-full h-full mx-auto">
          <motion.img
            src="https://www.bimatrix.co.kr/wp-content/themes/bimatrix/assets/images/common/img_company_visual02.jpg"
            alt="회사 이미지"
            className="w-full h-full object-cover shadow"
            initial={{ scale: 1.15, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-white text-4xl font-bold drop-shadow-lg">SOLTech, 미래를 이끄는 혁신</h2>
            <p className="mt-4 text-lg text-white font-semibold drop-shadow-lg">
              창의성과 기술력으로 새로운 가치를 만듭니다.
            </p>
          </div>
          <div className="absolute bottom-5 right-5 p-2">
            <p className="text-white text-sm drop-shadow-lg">Image from: Bi Matrix</p>
          </div>
        </div>
        {/* 슬라이더 영역 */}
        <section className="relative max-w-6xl overflow-hidden h-[500px] rounded-xl mt-30">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((src, i) => (
              <img key={i} src={src} alt={`slide-${i}`} className="w-full flex-shrink-0 object-cover h-[500px]" />
            ))}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === i ? "bg-purple-500 scale-125" : "bg-gray-300"
                  }`}
              />
            ))}
          </div>
        </section>
      </div>

      {/* 푸터 */}
      <footer className="bg-purple-900 text-white py-10">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="text-lg font-semibold mb-2">🦜 Details</div>
                        <p className="text-sm">© 2025. SOLTech inc. all rights reserved.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Company</h4>
                        <ul className="space-y-1 text-sm">
                            <li>About us</li>
                            <li>Privacy</li>
                            <li>Company Info</li>
                            <li>Hiring</li>
                            <li>Partnership</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Support</h4>
                        <ul className="space-y-1 text-sm">
                            <li>Help center</li>
                            <li>Terms of service</li>
                            <li>Privacy policy</li>
                            <li>Status</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Stay up to date</h4>
                        <input
                            type="email"
                            placeholder="dydwoj@gmail.com"
                            className="px-3 py-2 rounded text-black w-full"
                            readOnly={true}
                        />
                    </div>
                </div>
            </footer>
    </div>
  );
};

export default MainHome;

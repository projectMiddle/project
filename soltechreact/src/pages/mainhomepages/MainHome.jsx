import React, { useEffect, useState } from "react";

const images = [
  "/mainImages/mainSlide/soledsk_image.png",
  "/mainImages/mainSlide/soltech_대표이미지2.png",
  "/mainImages/mainSlide/soltech_대표이미지.png",
];

const MainHome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 pt-[150px]">
        {/* 슬라이더 영역 */}
        <section className="relative w-full overflow-hidden h-[500px] rounded-xl">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`slide-${i}`}
                className="w-full flex-shrink-0 object-cover h-[500px]"
              />
            ))}
          </div>

          {/* 인디케이터 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === i ? "bg-purple-500 scale-125" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
            SOLTech 주요 서비스
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 서비스 카드 1 */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 p-6 text-center">
              <img
                src="/mainImages/ae9e9904-846e-4010-a70f-0ae7683f5017.png"
                alt="전자결재"
                className="mx-auto h-32 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">전자결재 시스템</h3>
              <p className="text-sm text-gray-600">
                사내 문서를 빠르고 정확하게 결재할 수 있는 시스템
              </p>
            </div>

            {/* 서비스 카드 2 */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 p-6 text-center">
              <img
                src="/mainImages/mainSlide/soltech_대표이미지2.png"
                alt="출퇴근 관리"
                className="mx-auto h-32 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">출퇴근 관리</h3>
              <p className="text-sm text-gray-600">
                직원들의 출퇴근 기록을 통합 관리하고 확인할 수 있어요
              </p>
            </div>

            {/* 서비스 카드 3 */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 p-6 text-center">
              <img
                src="/mainImages/mainSlide/soledsk_image.png"
                alt="사내 인트라넷"
                className="mx-auto h-32 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">통합 인트라넷</h3>
              <p className="text-sm text-gray-600">
                모든 업무를 한 눈에! 부서 및 문서 정보 통합 플랫폼
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainHome;

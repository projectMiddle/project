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
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === i ? "bg-purple-500 scale-125" : "bg-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </section>

                {/* 텍스트 설명 */}
                <section className="text-left mt-8">
                    <h2 className="text-xl font-semibold mb-2">
                        Vitae ut leo lorem in turpis. Quam
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                        euismod magna eget nibh eleifend, sed bibendum sapien rutrum...
                    </p>
                </section>
            </main>
        </div>
    );
};

export default MainHome;

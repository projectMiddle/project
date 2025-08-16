import Report from "./Report";
import { motion } from "framer-motion";
import { useCallback } from "react";

function Now() {
  const scrollToSection = useCallback((id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      {/* 배경 이미지 */}
      <div className="relative w-full h-full mx-auto">
        <motion.img
          src="	https://www.bimatrix.co.kr/wp-content/themes/bimatrix/assets/images/common/img_company_visual01.jpg"
          alt="회사 이미지"
          className="w-full h-full object-cover shadow"
          initial={{ scale: 1.2, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeIn" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-white text-4xl font-bold drop-shadow-lg">Defining the Now, Creating the Next</h2>
          <p className="mt-4 text-lg text-white font-semibold drop-shadow-lg">
            차이를 넘어, 가능성을 확장하다
          </p>
        </div>
        <div className="absolute bottom-5 right-5 p-2">
            <p className="text-white text-sm drop-shadow-lg">Image from: Bi Matrix</p>
          </div>
      </div>

      {/* 점 메뉴 */}
      <div className="fixed right-8 bottom-1/10 flex flex-col items-center gap-4 z-50">
        <div className="relative group cursor-pointer" onClick={() => scrollToSection("employee-section")}>
          <div className="w-6 h-6 bg-gray-400 rounded-full hover:bg-blue-500 transition"></div>
          <span className="absolute right-10 top-1/2 -translate-y-1/2 bg-black text-white text-xl px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            임직원 현황
          </span>
        </div>

        <div className="relative group cursor-pointer" onClick={() => scrollToSection("age-section")}>
          <div className="w-6 h-6 bg-gray-400 rounded-full hover:bg-blue-500 transition"></div>
          <span className="absolute right-10 top-1/2 -translate-y-1/2 bg-black text-white text-xl px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            연령대 현황
          </span>
        </div>
      </div>

      {/* 임직원 현황 */}
      <div id="employee-section" className="px-4 py-12 pt-25 mx-auto w-400">
        <iframe src="http://localhost:8080/report?rCode=REP57FA5876C90F401AAC95EA55F87C637E" className="w-full h-200" />
      </div>

      {/* 연령대 현황 */}
      <div className="w-full mb-20" id="age-section">
        <Report />
      </div>
    </div>
  );
}

export default Now;

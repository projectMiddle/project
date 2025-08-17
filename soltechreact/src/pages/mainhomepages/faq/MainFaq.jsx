import React, { useEffect, useState } from "react";
import { getFAQList } from "../../../api/mainHomeApi";
import {
  AlertCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp,
  Search,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MainFaq = () => {
  const [page, setPage] = useState(1);
  const [pageResult, setPageResult] = useState({});
  const [keyword, setKeyword] = useState("");
  const [faqList, setFaqList] = useState([]);
  const isNoData = faqList.length === 0 || !pageResult.pageNumList || pageResult.pageNumList.length === 0;

  const categories = [
    { label: "자주 묻는 질문", value: "FREQUNET_Q" },
    { label: "홈페이지 이용", value: "USEHOMPAGE_Q" },
    { label: "지원자격", value: "REQUIREMENT_Q" },
    { label: "인턴실습", value: "INTERN_Q" },
    { label: "기타", value: "ANDSO_Q" },
  ];

  const [category, setCategory] = useState(categories[0].value);

  useEffect(() => {
    getFAQList(page, 10, category, keyword)
      .then((data) => {
        setFaqList(data.dtoList);
        setPageResult(data);
      })
      .catch((err) => {
        console.error("목록 불러오기 실패", err);
      });
  }, [page, category, keyword]);

  // 검색 기능
  const [inputValue, setInputValue] = useState("");

  // 검색 실행 함수
  const handleSearch = () => {
    setKeyword(inputValue);
    setPage(1);
  };

  // X버튼 클릭(검색 초기화)
  const handleClear = () => {
    setInputValue("");
    setKeyword("");
    setPage(1);
  };

  // 엔터키로 검색
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 내용 아코디언
  const [openId, setOpenId] = useState(null);

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center bg-white">
        <div className="max-w-7xl w-full mt-32">
          <h1 className="text-5xl font-black mb-10">FAQ</h1>
        </div>
        <div className="max-w-7xl w-full flex items-center justify-between mt-1">
          {/* 카테고리 버튼 */}
          <div className="flex gap-2">
            {categories.map((cat, idx) => (
              <button
                key={cat.value}
                className={`flex items-center rounded-full border px-6 py-2 text-base font-medium cursor-pointer
                            ${
                              category === cat.value
                                ? "bg-violet-900 text-white border-violet-900"
                                : "bg-white text-gray-400 border-gray-300 hover:border-gray-400 hover:text-gray-600"
                            }
                          `}
                onClick={() => {
                  setCategory(cat.value);
                  setPage(1);
                }}
              >
                {idx === 0 && (
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M9.75 9a2.25 2.25 0 114.5 0c0 1.5-2.25 2.25-2.25 4"
                    />
                    <circle cx="12" cy="17" r="1" fill="currentColor" />
                  </svg>
                )}
                {cat.label}
              </button>
            ))}
          </div>

          {/* 검색창 */}
          <div className="w-80 h-14 bg-gray-100 flex flex-row items-center relative">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="w-65 pl-4 pr-1 py-2 focus:outline-none bg-gray-100"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {/* X버튼: 항상 자리는 차지, 안 보일 때만 invisible */}
            <button className={inputValue ? "" : "invisible"} onClick={handleClear} tabIndex={-1} type="button">
              <X className="w-5 h-5 text-gray-400 cursor-pointer" />
            </button>
            <button className="ml-2" onClick={handleSearch} tabIndex={-1} type="button">
              <Search className="w-5 h-5 text-gray-400 cursor-pointer" />
            </button>
          </div>
        </div>

        {/* 리스트 */}
        <div className="max-w-7xl w-full mt-6">
          <div className="border-t border-black">
            {faqList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="flex flex-col items-center">
                  <AlertCircle className="w-14 h-14 text-gray-400" strokeWidth={2} />
                  <span className="mt-10 text-2xl text-gray-400">등록된 게시물이 없습니다.</span>
                </div>
              </div>
            ) : (
              faqList.map((q) => {
                const isOpen = openId === q.faqNo;
                return (
                  <div key={q.faqNo} className="border-t border-gray-200">
                    <div
                      className="flex items-center justify-between px-8 py-6 cursor-pointer"
                      onClick={() => setOpenId(isOpen ? null : q.faqNo)}
                    >
                      <div className="flex items-center gap-10">
                        <span className={`text-4xl font-extrabold ${isOpen ? "text-black" : "text-gray-400"}`}>Q</span>
                        <span className={`text-3xl font-bold ${isOpen ? "text-black" : "text-gray-400"}`}>
                          {q.faqTitle}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        {isOpen ? (
                          <ChevronUp className="w-6 h-6 text-black" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                    </div>
                    {/* 내용 */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="bg-violet-50 p-12 flex flex-row gap-10">
                            <span className="text-3xl font-extrabold text-black">A</span>
                            <div className="flex flex-col items-start gap-10 flex-1">
                              <div className="text-lg text-gray-700 whitespace-pre-line">{q.faqContent}</div>
                              <div className="flex flex-row items-center w-full mt-6">
                                <span className="text-gray-500 font-bold flex-1">
                                  원하는 답변을 찾지 못하셨나요? 1:1 문의 사항을 남겨주시면 빠르게 답변드리겠습니다.
                                </span>
                                <button className="border rounded px-4 py-2 w-36 text-gray-500 hover:text-black transition cursor-pointer">
                                  1:1 문의하기
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center items-center gap-1 py-8 mb-15">
          {/* 맨앞으로 */}
          <button
            className="px-2 py-1 text-gray-400 hover:text-gray-600 transition disabled:opacity-40 cursor-pointer"
            onClick={() => setPage(1)}
            disabled={isNoData || pageResult.current === 1}
            aria-label="first"
          >
            <ChevronsLeft size={18} />
          </button>
          {/* 이전 */}
          <button
            className="px-2 py-1 text-gray-400 hover:text-gray-600 transition disabled:opacity-40 cursor-pointer"
            onClick={() => setPage(pageResult.prevPage)}
            disabled={isNoData || !pageResult.prev}
            aria-label="prev"
          >
            <ChevronLeft size={18} />
          </button>
          {/* 페이지 번호 리스트 */}
          {Array.isArray(pageResult.pageNumList) &&
            pageResult.pageNumList.map((num) => (
              <button
                key={num}
                className={`px-2 mx-1 text-lg transition
                            ${
                              pageResult.current === num
                                ? "text-purple-900 font-bold underline underline-offset-4"
                                : "text-gray-400 hover:text-gray-500 cursor-pointer"
                            }
                          `}
                onClick={() => setPage(num)}
                disabled={isNoData || pageResult.current === num}
              >
                {num}
              </button>
            ))}
          {/* 다음 */}
          <button
            className="px-2 py-1 text-gray-400 hover:text-gray-600 transition disabled:opacity-40 cursor-pointer"
            onClick={() => setPage(pageResult.nextPage)}
            disabled={isNoData || !pageResult.next}
            aria-label="next"
          >
            <ChevronRight size={18} />
          </button>
          {/* 맨끝으로 */}
          <button
            className="px-2 py-1 text-gray-400 hover:text-gray-600 transition disabled:opacity-40 cursor-pointer"
            onClick={() => setPage(pageResult.totalPage)}
            disabled={isNoData || pageResult.current === pageResult.totalPage}
            aria-label="last"
          >
            <ChevronsRight size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default MainFaq;

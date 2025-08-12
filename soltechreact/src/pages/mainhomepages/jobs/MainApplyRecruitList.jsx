import React, { useEffect, useState } from "react";
import { getJobsList } from "../../../api/mainHomeApi";
import { AlertCircle, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Link } from "react-router-dom";

const MainApplyRecruitList = () => {
  const [page, setPage] = useState(1);
  const [pageResult, setPageResult] = useState({});
  const [jobsList, setjobsList] = useState([]);
  const isNoData = jobsList.length === 0 || !pageResult.pageNumList || pageResult.pageNumList.length === 0;

  useEffect(() => {
    getJobsList(page, 10)
      .then((data) => {
        console.log("받은 데이터 : ", data);
        setjobsList(data.dtoList);
        setPageResult(data);
      })
      .catch((err) => {
        console.error("목록 불러오기 실패", err);
      });
  }, [page]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white">
      {/* 상단 내용 */}
      <div className="max-w-7xl w-full mt-32 flex justify-between items-center">
        <h1 className="text-4xl text-gray-900 font-bold drop-shadow-lg">모집공고</h1>
        <div className="text-sm text-gray-500">
          총 {pageResult?.totalCount?.toLocaleString?.() ?? 0}건의 채용공고가 진행 중입니다.
        </div>
      </div>

      {/* 본문 내용 */}
      <div className="max-w-7xl w-full mt-6">
        <div className="border-t border-black">
          {jobsList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="flex flex-col items-center">
                <AlertCircle className="w-14 h-14 text-gray-400" strokeWidth={2} />
                <span className="mt-10 text-2xl text-gray-400">등록된 채용공고가 없습니다.</span>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-col border-b border-gray-300 p-5 bg-gray-100">
                <div className="flex flex-row justify-between items-start">
                  <h1 className="w-10 text-sm font-semibold">번호</h1>
                  <h2 className="w-180 text-sm font-semibold">
                    제목
                  </h2>
                  <h2 className="text-right text-sm font-semibold pr-5">
                    등록일
                  </h2>
                </div>
              </div>
              {jobsList.map((job) => (
                <div
                  key={job.jobsNo}
                  className="flex flex-col border-t border-gray-200 p-5"
                >
                  <div className="flex flex-row justify-between items-start">
                    <h1 className="w-10 text-sm text-gray-700">{job.jobsNo}</h1>
                    <Link
                      key={job.jobsNo}
                      to={`/apply/recruit/${job.jobsNo}`}
                      className="w-200 text-lg font-semibold text-gray-600 cursor-pointer hover:text-violet-900">
                      {job.jobsTitle}
                    </Link>
                    <h2 className="text-right text-sm text-gray-600">
                      {job.jobsRegDate
                        ? new Date(job.jobsRegDate).toISOString().split("T")[0]
                        : ""}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          )
          }
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
                            ${pageResult.current === num
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
    </div >
  );
};

export default MainApplyRecruitList;

import React, { useEffect, useState } from "react";
import { fetchApprovalList } from "../../api/approvalApi";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ApprovalList = () => {
  const { userInfo } = useAuth();
  const empNo = userInfo?.empNo;

  const [approvals, setApprovals] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState(null);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") || "전체문서");

  // 경로
  const pathMap = {
    "/confirm/list": "list",
    "/confirm/history": "history",
    "/confirm/reference": "reference",
    "/confirm/enforced": "enforced",
    "/confirm/temporary": "temporary",
    "/confirm/retrieved": "retrieved",
    "/request/submitted": "submitted",
    "/request/processing": "processing",
    "/request/completed": "completed",
    "/request/rejected": "rejected",
  };

  const status = Object.entries(pathMap).find(([path]) => location.pathname.includes(path))?.[1] || "submitted";

  // 문서 목록
  useEffect(() => {
    if (!empNo) return;
    console.log("현재 상태 status:", status);
    fetchApprovalList(status, page, 10, empNo)
      .then((data) => {
        setApprovals(data.dtoList);
        setPageInfo(data);
      })
      .catch((err) => {
        console.error("목록 불러오기 실패", err);
      });
  }, [status, page, empNo]);

  // 카테고리 필터링
  const filteredApprovals =
    category === "전체문서" ? approvals : approvals.filter((doc) => doc.appDocCategory === category);

  return (
    <div className="bg-[#f4f4f4e1]">
      <div className="flex text-sm font-semibold text-black min-h-screen mx-auto">
        <div className="flex-1 bg-gray-50 rounded-xl p-10">
          <section className="bg-white rounded-xl p-6 shadow min-h-screen">
            <div className="text-right text-xs text-gray-500 mb-4">home / 전자결재</div>

            {/* 카테고리 탭 */}
            <div className="flex gap-4 mb-4 text-sm">
              {["전체문서", "기안서", "보고서", "연차신청서", "출장신청서", "영수증"].map((cat) => (
                <button
                  key={cat}
                  className={`px-3 py-1 rounded 
                    ${cat === category ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600"}`}
                  onClick={() => {
                    setCategory(cat);
                    setSearchParams({ category: cat });
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 리스트 */}
            <div className="space-y-4">
              {filteredApprovals.length === 0 ? (
                <div className="text-center text-sm text-gray-400 py-10">문서가 없습니다</div>
              ) : (
                filteredApprovals.map((doc) => (
                  <Link key={doc.appDocNo} to={`/intrasoltech/approval/detail/${doc.appDocNo}`} className="block">
                    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 hover:bg-[#f9fbff] transition">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-purple-100 text-purple-700 flex items-center justify-center font-bold rounded-full">
                          {doc.appDocCategory[0]}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-800">{doc.appDocTitle}</div>
                          <div className="text-xs text-gray-500">
                            기안자 : {doc.eName} · {doc.deptName} · {doc.appDocDate}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded
                        ${
                          doc.isRejected
                            ? "text-red-700 bg-red-100"
                            : doc.appIsFinalized
                            ? "text-green-700 bg-green-100"
                            : "text-yellow-700 bg-yellow-100"
                        }`}
                      >
                        {doc.isRejected ? "반려" : doc.appIsFinalized ? "완료" : "대기"}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* 페이지네이션 */}
            {pageInfo && (
              <div className="flex justify-center mt-8 gap-1">
                {pageInfo.prev && (
                  <button onClick={() => setPage(pageInfo.prevPage)} className="px-2 py-1 text-xs text-gray-500">
                    이전
                  </button>
                )}
                {pageInfo.pageNumList.map((num) => (
                  <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`px-3 py-1 rounded text-sm font-semibold ${
                      num === page ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {num}
                  </button>
                ))}
                {pageInfo.next && (
                  <button onClick={() => setPage(pageInfo.nextPage)} className="px-2 py-1 text-xs text-gray-500">
                    다음
                  </button>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ApprovalList;

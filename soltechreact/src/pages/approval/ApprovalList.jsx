import React, { useEffect, useState } from "react";
import { fetchApprovalList } from "../../api/approvalApi";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ApprovalList = () => {
  // ====================== jwt 이용 ======================
  const { userInfo } = useAuth();
  const empNo = userInfo?.empNo;

  const [approvals, setApprovals] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState(null);

  // 현재 경로를 확인해서 상태 분기
  const location = useLocation();
  let status = "all"; // 기본값

  // 카테고리 ? 이후 가져오기
  const [category, setCategory] = useState("기안서");

  if (location.pathname.includes("/confirm/list")) status = "list"; // 수신함
  else if (location.pathname.includes("/processing")) status = "processing";
  else if (location.pathname.includes("submitted")) status = "all";
  else if (location.pathname.includes("completed")) status = "completed";
  else if (location.pathname.includes("history")) status = "history";
  else if (location.pathname.includes("reference")) status = "reference";

  // 사이드 카테고리 X / 결재 양식에 따라서 적용해야 하는거 선별
  const shouldFilterByCategory = ["submitted", "list", "history", "completed", "reference", "processing"].includes(
    status
  );

  const filteredApprovals = shouldFilterByCategory
    ? approvals.filter((doc) => doc.appDocCategory === category)
    : approvals;

  useEffect(() => {
    fetchApprovalList(status, page, 10, empNo)
      .then((data) => {
        setApprovals(data.dtoList);
        setPageInfo(data);
      })
      .catch((err) => {
        console.error("목록 불러오기 실패", err);
      });
  }, [status, page, empNo, category]); // ✅ empNo 추가
  // ====================== 테스트 용 ======================

  // 실사용 jwt 이후 수정 예정
  // useEffect(() => {
  //   fetchApprovalList(status, page, 10)
  //     .then(data => {
  //       console.log("결재 문서 리스트:", data.dtoList);

  //       setApprovals(data.dtoList);
  //       setPageInfo(data);
  //     })
  //     .catch(err => {
  //       console.error("목록 불러오기 실패", err);
  //     });
  // }, [status, page]);

  return (
    <div className="bg-[#f4f4f4e1]">
      <div className="flex text-sm font-semibold text-black min-h-screen mx-auto">
        {/* 본문: ApprovalList */}
        <div className="flex-1 bg-gray-50 rounded-xl p-10">
          <section className="bg-white rounded-xl p-6 shadow min-h-screen">
            <div className="text-right text-xs text-gray-500 mb-4">home / 전자결재</div>

            {/* 카테고리 탭 */}
            <div className="flex gap-4 mb-4 text-sm">
              {["기안서", "보고서", "연차신청서", "출장신청서"].map((cat) => (
                <button
                  key={cat}
                  className={`px-3 py-1 rounded 
                    ${cat === category ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600"}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 리스트 뿌리는 공간 */}
            <div className="space-y-4">
              {filteredApprovals.map((doc) => (
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
            ${doc.appIsFinalized ? "text-green-700 bg-green-100" : "text-yellow-700 bg-yellow-100"}`}
                    >
                      {doc.appIsFinalized ? "완료" : "대기"}
                    </span>
                  </div>
                </Link>
              ))}
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

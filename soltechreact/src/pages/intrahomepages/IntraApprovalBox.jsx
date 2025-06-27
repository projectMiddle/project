import React, { useEffect, useState } from "react";
import { fetchApprovalList } from "../../api/approvalApi";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const IntraApprovalBox = () => {
  const [status, setStatus] = useState("list"); // 기본값: 수신함
  const [approvals, setApprovals] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState(null);
  const { userInfo } = useAuth();
  const empNo = userInfo?.empNo; // JWT 적용 전 임시값

  useEffect(() => {
    fetchApprovalList(status, page, 5, empNo)
      .then((data) => {
        setApprovals(data.dtoList);
        setPageInfo(data);
      })
      .catch((err) => {
        console.error("결재함 불러오기 실패:", err);
      });
  }, [status, page]);

  return (
    <div className="bg-white rounded-xlw-full flex flex-col h-full">
      {/* 버튼 선택 영역 */}
      <div className="flex justify-center gap-2 mb-3">
        {[
          { key: "list", label: "수신함" },
          { key: "processing", label: "진행중" },
          { key: "completed", label: "완료함" },
        ].map((btn) => (
          <button
            key={btn.key}
            onClick={() => {
              setStatus(btn.key);
              setPage(1); // 페이지 초기화
            }}
            className={`px-4 py-1 rounded-full font-semibold ${
              status === btn.key ? "bg-[#6b46c1] text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* 리스트 영역 */}
      <div className="space-y-2  text-sm overflow-y-auto flex-1">
        {approvals
          .filter((doc) => !doc.appIsFinalized)
          .map((doc) => (
            <Link
              to={`/intrasoltech/approval/detail/${doc.appDocNo}`}
              key={doc.appDocNo}
              className="block bg-white rounded-lg px-3 py-1 border border-gray-200 shadow-sm hover:bg-gray-50 transition"
            >
              <div className="flex items-center justify-between p-2.5 text-[13px] text-gray-700">
                {/* 왼쪽: 한 줄 전체 정보 */}
                <div className="flex items-center gap-4 flex-1 min-w-0 truncate">
                  <span className="min-w-[60px] text-gray-500 truncate">{doc.appDocCategory}</span>
                  <span className="flex-1 font-bold text-gray-800 truncate">{doc.appDocTitle}</span>
                  <span className="w-[70px] truncate">{doc.eName}</span>
                  <span className="w-[80px] truncate">{doc.deptName}</span>
                  <span className="w-[90px] text-gray-500 truncate">{doc.appDocDate}</span>
                </div>

                {/* 오른쪽: 상태 뱃지 */}
                <span className="ml-2 whitespace-nowrap text-[11px] font-semibold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">
                  대기
                </span>
              </div>
            </Link>
          ))}
      </div>

      {pageInfo && (
        <div className="flex justify-center mt-3 gap-1 text-xs">
          {/* 페이지 번호들 */}
          {pageInfo.pageNumList.map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-3 py-1 rounded font-semibold ${
                page === num ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default IntraApprovalBox;

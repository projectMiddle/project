import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNoticeList } from "../../api/noticeApi";

const IntraNoticeBox = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadNotices = async () => {
      try {
        const res = await fetchNoticeList(page, 5);
        setNotices(res.content || []);
        setTotalPages(res.totalPages || 1);
      } catch (err) {
        console.error("공지사항 불러오기 실패", err);
      }
    };

    loadNotices();
  }, [page]);

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString("ko-KR").replace(/\.$/, "");

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 w-full flex flex-col h-full">
      <h2 className="mx-auto gap-2 px-4 py-1 rounded-full font-semibold bg-[#6b46c1] text-white mb-3 text-center w-40">
        최근 공지사항
      </h2>

      <div className="space-y-2 text-sm overflow-y-auto flex-1">
        {notices.length > 0 ? (
          notices.map((notice) => (
            <div
              key={notice.notiNo}
              className="block bg-white rounded-lg px-3 py-1 border border-gray-200 shadow-sm hover:bg-gray-50 transition cursor-pointer"
              onClick={() => navigate(`/intrasoltech/notices/read/${notice.notiNo}`)}
            >
              <div className="flex items-center justify-between p-2.5 text-[13px] text-gray-700">
                <div className="flex items-center gap-4 flex-1 min-w-0 truncate">
                  <span className="flex-1 font-bold text-gray-800 truncate">{notice.notiTitle}</span>
                  <span className="w-[70px] truncate">{notice.name}</span>
                  <span className="w-[80px] truncate">{notice.deptName}</span>
                  <span className="w-[90px] text-gray-500 truncate">{formatDate(notice.notiRegDate)}</span>
                </div>
                <span className="ml-2 whitespace-nowrap text-[11px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                  공지
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-sm">공지사항이 없습니다.</p>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-3 gap-1 text-xs">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setPage(idx + 1)}
            className={`px-3 py-1 rounded font-semibold ${
              page === idx + 1 ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IntraNoticeBox;

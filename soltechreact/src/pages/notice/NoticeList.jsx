import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNoticeList, deleteNotice } from "../../api/board/noticeApi";

const NoticeList = () => {
  const navigate = useNavigate();

  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedNotices, setSelectedNotices] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadNotices = async () => {
    try {
      const data = await fetchNoticeList(page, 15, searchTerm);
      setNotices(data.content || []);
      setTotalPages(data.totalPages || 1);
      setTotalCount(data.totalElements || 0);
    } catch (err) {
      console.error("공지사항 로딩 실패", err);
    }
  };

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSearch = () => {
    setPage(1);
    setSearchTerm(keyword.trim());
  };

  useEffect(() => {
    loadNotices();
  }, [page, searchTerm]);

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString("ko-KR").replace(/\.$/, "");

  return (
    <div className="flex min-h-screen">
      {/* 사이드바 */}
      <aside className="w-[230px] bg-[#f4f4f4] border-r border-gray-300 text-gray-800 flex flex-col">
        {/* 상단 타이틀 */}
        <div className="bg-[#6b46c1] text-white font-bold text-[17px] text-center py-[14px]">공지사항</div>

        {/* 게시판 메뉴 항목 */}
        <nav className="flex-1 px-3 pt-4 text-sm">
          <div
            className="py-2 px-2 hover:bg-gray-200 rounded cursor-pointer"
            onClick={() => navigate("/intrasoltech/notices")}
          >
            ✅ 전체 공지사항
          </div>
          <div
            className="py-2 px-2 hover:bg-gray-200 rounded cursor-pointer"
            onClick={() => navigate("/intrasoltech/notices/freeboard")}
          >
            💬 자유게시판
          </div>
        </nav>
      </aside>

      {/* 본문 */}
      <main className="flex-1 bg-white">
        {/* 제목 바 */}
        <div className="bg-[#6b46c1] text-white font-bold text-[17px] p-5 py-[14px]">공지사항</div>

        {/* 검색 바 */}
        <div className="w-full bg-gray-100 py-5 px-4">
          <div className="w-full flex items-center gap-3">
            <label className="font-semibold text-sm">제목</label>
            <input
              type="text"
              placeholder="검색어를 입력해주세요."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
            />
            <button
              onClick={handleSearch}
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded"
            >
              검색
            </button>
            <button
              onClick={() => {
                setKeyword("");
                setSearchTerm("");
              }}
              className="border border-gray-300 text-sm px-4 py-2 rounded hover:bg-gray-100 bg-white"
            >
              초기화
            </button>
          </div>
        </div>

        {/* 검색 결과 수 */}
        <p className="mt-4.5 mb-2 text-sm px-10 ">
          총 <span className="text-blue-600 font-bold">{totalCount}</span>건의 공지사항이 검색되었습니다.
        </p>

        {/* 리스트 */}
        <div className="bg-white px-6 py-4 rounded shadow-sm h-[650px]">
          <table className="w-full border border-gray-300 border-collapse text-sm text-center">
            <thead className="bg-gray-50">
              <tr>
                {deleteMode && <th className="py-2 px-2 border">선택</th>}
                <th className="py-2 px-2 border">번호</th>
                <th className="py-2 px-2 border">제목</th>
                <th className="py-2 px-2 border">작성자</th>
                <th className="py-2 px-2 border">부서</th>
                <th className="py-2 px-2 border">작성일</th>
                <th className="py-2 px-2 border">수정일</th>
              </tr>
            </thead>
            <tbody>
              {notices.length === 0 ? (
                <tr>
                  <td colSpan={deleteMode ? 7 : 6} className="py-6 text-center text-gray-500">
                    총 0건의 게시글이 검색되었습니다.
                  </td>
                </tr>
              ) : (
                notices.map((notice) => (
                  <tr
                    key={notice.notiNo}
                    className="border-t border-black hover:bg-purple-50 transition cursor-pointer"
                    onClick={() => navigate(`/intrasoltech/notices/read/${notice.notiNo}`)}
                  >
                    {deleteMode && (
                      <td className="py-2 border-r" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedNotices.includes(notice.notiNo)}
                          onChange={() =>
                            setSelectedNotices((prev) =>
                              prev.includes(notice.notiNo)
                                ? prev.filter((id) => id !== notice.notiNo)
                                : [...prev, notice.notiNo]
                            )
                          }
                        />
                      </td>
                    )}
                    <td className="py-2 border-r">{notice.notiNo}</td>
                    <td className="py-2 border-r">{notice.notiTitle}</td>
                    <td className="py-2 border-r">{notice.name || "-"}</td>
                    <td className="py-2 border-r">{notice.deptName || "-"}</td>
                    <td className="py-2 border-r">{formatDate(notice.notiRegDate)}</td>
                    <td className="py-2 border-r">{notice.notiUpdateDate ? formatDate(notice.notiUpdateDate) : "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 하단 버튼 */}
        <div className="flex items-center mt-6 justify-between px-6">
          <button
            onClick={() => navigate("/intrasoltech/notices/Form")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            작성
          </button>

          <div className="flex-1 flex justify-center items-center gap-1 px">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
            >
              &larr; Prev
            </button>

            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => goToPage(idx + 1)}
                className={`px-3 py-1 border rounded ${
                  page === idx + 1 ? "bg-purple-700 text-white" : "hover:bg-gray-100"
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NoticeList;

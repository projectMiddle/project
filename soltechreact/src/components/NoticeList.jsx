import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/board/BoardForm.css";

const NoticeList = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedNotices, setSelectedNotices] = useState([]);

  const fetchNotices = async () => {
    try {
      const res = await fetch(`/api/notices/List?page=${page}&size=10`);
      const data = await res.json();
      setNotices(data.content || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("공지사항 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [page]);

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleDelete = async () => {
    if (selectedNotices.length === 0) {
      alert("삭제할 공지를 선택하세요.");
      return;
    }

    if (!window.confirm("선택한 공지를 삭제하시겠습니까?")) return;

    try {
      await Promise.all(
        selectedNotices.map((notiNo) =>
          fetch(`/api/notices/${notiNo}`, {
            method: "DELETE",
          })
        )
      );
      alert("삭제가 완료되었습니다.");
      setDeleteMode(false);
      setSelectedNotices([]);
      fetchNotices();
    } catch (err) {
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">공지사항</h1>

      <table className="w-full border-2 border-purple-400 text-center">
        <thead className="bg-white">
          <tr className="border-b border-purple-300">
            {deleteMode && <th className="py-2 text-sm border-r border-purple-300">선택</th>}
            <th className="py-2 text-sm border-r border-purple-300">글번호</th>
            <th className="py-2 text-sm border-r border-purple-300">제목</th>
            <th className="py-2 text-sm border-r border-purple-300">작성자</th>
            <th className="py-2 text-sm border-r border-purple-300">부서</th>
            <th className="py-2 text-sm border-r border-purple-300">등록날짜</th>
            <th className="py-2 text-sm">수정날짜</th>
          </tr>
        </thead>
        <tbody>
          {notices.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-8 text-gray-400">
                등록된 공지사항이 없습니다.
              </td>
            </tr>
          ) : (
            notices.map((notice) => (
              <tr key={notice.notiNo} className="border-t border-purple-200 hover:bg-purple-50 transition">
                {deleteMode && (
                  <td className="py-2 border-r border-purple-100">
                    <input
                      type="checkbox"
                      checked={selectedNotices.includes(notice.notiNo)}
                      onChange={() => {
                        setSelectedNotices((prev) =>
                          prev.includes(notice.notiNo)
                            ? prev.filter((id) => id !== notice.notiNo)
                            : [...prev, notice.notiNo]
                        );
                      }}
                    />
                  </td>
                )}
                <td className="py-2 text-sm border-r border-purple-100">{notice.notiNo}</td>
                <td className="py-2 text-sm border-r border-purple-100">{notice.notiTitle}</td>
                <td className="py-2 text-sm border-r border-purple-100">{notice.empName || "-"}</td>
                <td className="py-2 text-sm border-r border-purple-100">{notice.deptName || "-"}</td>
                <td className="py-2 text-sm border-r border-purple-100">{notice.notiRegDate}</td>
                <td className="py-2 text-sm">
                  {notice.notiUpdateDate || "-"}
                  <button
                    onClick={() => navigate(`/notice/edit/${notice.notiNo}`)}
                    className="ml-2 text-purple-500 underline hover:text-purple-700"
                  >
                    수정
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button onClick={() => goToPage(page - 1)}>&larr; Previous</button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => goToPage(idx + 1)}
              className={`px-2 py-1 rounded ${page === idx + 1 ? "bg-black text-white" : "hover:bg-purple-100"}`}
            >
              {idx + 1}
            </button>
          ))}
          <button onClick={() => goToPage(page + 1)}>Next &rarr;</button>
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <button
            onClick={() => {
              if (deleteMode) {
                handleDelete();
              } else {
                setDeleteMode(true);
              }
            }}
            className={`${deleteMode ? "bg-gray-500" : "bg-red-500"} text-white px-5 py-1 rounded-xl hover:bg-red-600`}
          >
            {deleteMode ? "선택 삭제" : "삭제"}
          </button>

          <button
            onClick={() => navigate("/notice/new")}
            className="bg-purple-500 text-white px-5 py-1 rounded-xl hover:bg-purple-600"
          >
            작성
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeList;

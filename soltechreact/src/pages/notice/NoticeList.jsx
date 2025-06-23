import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/boardform.css";

const NoticeList = () => {
  const navigate = useNavigate();

  // 기존 상태들
  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedNotices, setSelectedNotices] = useState([]);

  // 검색 상태
  const [keyword, setKeyword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCount, setTotalCount] = useState(0); // 1️⃣ 총 개수 상태 추가

  const fetchNotices = async () => {
    try {
      const res = await fetch(`/api/notices/List?page=${page}&size=15&search=${encodeURIComponent(searchTerm)}`); // ✅
      const data = await res.json();
      setNotices(data.content || []);
      setTotalPages(data.totalPages || 0);
      setTotalCount(data.totalElements || 0); // 2️⃣ 총 개수 저장
    } catch (err) {
      console.error("공지사항 불러오기 실패", err);
    }
  };

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
    } catch (err) {
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleSearch = () => {
    setPage(1);
    setSearchTerm(keyword.trim());
  };
  useEffect(() => {
    fetchNotices();
  }, [page, searchTerm]); // ✅ page나 searchTerm이 바뀔 때마다 재요청

  return (
    <div className="min-h-screen">
      <div className="w-full bg-purple-500 text-white py-4 px-6 text-3xl font-bold mt-0">회사 공지사항</div>

      {/* 검색 바 */}
      <div className="w-full bg-gray-100 py-5 px-4">
        <div className="w-full flex items-center gap-3">
          <label className="font-semibold text-sm">제목</label>
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
          />
          <button
            onClick={handleSearch}
            className="bg-purple-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded"
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

      {/* 검색 결과 */}
      <p className="mt-4.5 mb-2 text-sm px-10 ">
        총 <span className="text-blue-600 font-bold">{totalCount}</span>건의 공지사항이 검색되었습니다.
      </p>

      {/* 공지 리스트 */}
      <div className="bg-white px-6 py-4 rounded shadow-sm">
        <table className="w-full border border-gray-300 border-collapse text-sm">
          <thead className="bg-gray-50 ">
            <tr>
              {deleteMode && <th className="py-2 px-2 border border-gray-300">선택</th>}
              <th className="py-2 px-2 border border-gray-300">번호</th>
              <th className="py-2 px-2 border border-gray-300">제목</th>
              <th className="py-2 px-2 border border-gray-300">작성자</th>
              <th className="py-2 px-2 border border-gray-300">부서</th>
              <th className="py-2 px-2 border border-gray-300">작성일</th>
              <th className="py-2 px-2 border border-gray-300">수정일</th>
            </tr>
          </thead>

          <tbody>
            {notices.map((notice) => (
              <tr
                key={notice.notiNo}
                className="border-t border-purple-200 hover:bg-purple-50 transition cursor-pointer"
                onClick={() => navigate(`/notices/${notice.notiNo}`)}
              >
                {deleteMode && (
                  <td
                    className="py-2 border-r border-purple-100"
                    onClick={(e) => e.stopPropagation()} // 클릭 이벤트 버블링 방지
                  >
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
                <td
                  className="py-2 text-sm border-r border-purple-100"
                  onClick={(e) => e.stopPropagation()} // 수정 버튼 클릭 시 tr 클릭 방지
                >
                  {notice.notiUpdateDate || "-"}
                  <button
                    onClick={() => navigate(`/notices/edit/${notice.notiNo}`)}
                    className="ml-2 text-purple-500 underline hover:text-purple-700"
                  >
                    수정
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 글쓰기 버튼: 왼쪽 정렬 */}
      <div className="flex items-center mt-6 justify-between px-6">
        <button
          onClick={() => navigate("/notices/Form")}
          className="bg-purple-500 hover:bg-blue-600 text-white px-4 py-2 rounded "
        >
          작성
        </button>
        <div className="flex-1 flex justify-center items-center gap-1 px">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => goToPage(idx + 1)}
              className={`px-3 py-1 border rounded ${
                page === idx + 1 ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`}
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
            onClick={() => navigate("Form")}
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

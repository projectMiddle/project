import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFreeBoardList } from "../../api/board/noticeApi";

const FreeBoardList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSearch = () => {
    setPage(1);
    setSearchTerm(keyword.trim());
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return dateString.split("T")[0].replace(/-/g, ". ");
  };

  // FreeBoardList.jsx 내부
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const size = 15; // 페이지당 글 수 명시
        const data = await fetchFreeBoardList(page, size, searchTerm);
        setPosts(data.content);
        setTotalPages(data.totalPages);
        setTotalCount(data.totalElements);
      } catch (error) {
        console.error("자유게시판 데이터를 불러오는 데 실패했습니다!:", error);
      }
    };
    loadPosts();
  }, [page, searchTerm]);

  return (
    <div className="flex min-h-screen">
      {/* 사이드바 */}
      <aside className="w-[230px] bg-[#f4f4f4] border-r border-gray-300 text-gray-800 flex flex-col">
        <div className="bg-[#6b46c1] text-white font-bold text-[17px] text-center py-[14px]">게시판</div>
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
        <div className="bg-[#6b46c1] text-white font-bold text-[17px] p-5 py-[14px]">자유게시판</div>

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

        <p className="mt-4.5 mb-2 text-sm px-10">
          총 <span className="text-blue-600 font-bold">{totalCount}</span>건의 게시글이 검색되었습니다.
        </p>

        <div className="bg-white px-6 py-4 rounded shadow-sm h-[650px]">
          <table className="w-full border border-gray-300 border-collapse text-sm text-center">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-2 border">번호</th>
                <th className="py-2 px-2 border">제목</th>
                <th className="py-2 px-2 border">작성자</th>
                <th className="py-2 px-2 border">부서</th>
                <th className="py-2 px-2 border">작성일</th>
                <th className="py-2 px-2 border">수정일</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-500">
                    총 0건의 게시글이 검색되었습니다.
                  </td>
                </tr>
              ) : (
                posts.map((item, index) => (
                  <tr
                    key={item.freeNo ?? `fallback-${index}`} // fallback
                    className="border-t border-black hover:bg-purple-50 transition cursor-pointer"
                    onClick={() => navigate(`/intrasoltech/notices/freeboard/${item.freeBoardNo}`)}
                  >
                    <td className="py-2 border-r">{(page - 1) * 10 + index + 1}</td>
                    <td className="py-2 border-r text-left px-2">{item.frBdTitle}</td>
                    <td className="py-2 border-r">{item.name || "-"}</td>
                    <td className="py-2 border-r">{item.deptName || "-"}</td>
                    <td className="py-2 border-r">{formatDate(item.frBdRegDate)}</td>
                    <td className="py-2 border-r">{item.frBdUpdateDate ? formatDate(item.frBdUpdateDate) : "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center mt-6 justify-between px-6">
          <button
            onClick={() => navigate("/intrasoltech/notices/freeboard/form")}
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

            {totalPages > 0 &&
              [...Array(totalPages)].map((_, idx) => {
                const pageNumber = idx + 1;
                return (
                  <button
                    key={`page-${pageNumber}`}
                    onClick={() => goToPage(pageNumber)}
                    className={`px-3 py-1 border rounded ${
                      page === pageNumber ? "bg-purple-700 text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

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

export default FreeBoardList;

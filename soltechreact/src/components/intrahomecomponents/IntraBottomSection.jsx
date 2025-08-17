import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { fetchFreeBoardList, fetchNoticeList } from "./../../api/board/noticeApi";
import { fetchApprovalList } from "../../api/approvalApi";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { getReceivedNotes } from "../../api/noteApi";

const IntraBottomSection = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [gradientStyle, setGradientStyle] = useState("");

  // ref 설정 (각 탭마다 별도의 ref 선언!)
  const containerRef = useRef(null);
  const allRef = useRef(null);
  const noticeRef = useRef(null);
  const freeRef = useRef(null);
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [freePosts, setFreePosts] = useState([]);
  const [freePage, setFreePage] = useState(1);
  const [freeSize] = useState(5);

  const [allPosts, setAllPosts] = useState([]);
  const [allPage, setAllPage] = useState(1);
  const [allSize] = useState(5);

  // 공지사항 탭
  useEffect(() => {
    const loadNotices = async () => {
      try {
        const res = await fetchNoticeList(page, size);
        setNotices(res.content || []);
      } catch (err) {
        console.error("공지사항 불러오기 실패", err);
      }
    };

    if (selectedTab === "notice") {
      loadNotices();
    }
  }, [selectedTab, page]);

  // 자유게시판 탭
  useEffect(() => {
    const loadFreePosts = async () => {
      try {
        const res = await fetchFreeBoardList(freePage, freeSize, "");
        setFreePosts(res.content || []);
      } catch (err) {
        console.error("자유게시판 불러오기 실패", err);
      }
    };

    if (selectedTab === "free") {
      loadFreePosts();
    }
  }, [selectedTab, freePage]);

  // 전체 탭 로딩
  useEffect(() => {
    const loadAllPosts = async () => {
      const [noticeRes, freeRes] = await Promise.all([
        fetchNoticeList(1, 50),
        fetchFreeBoardList(1, 50, ""),
      ]);

      const noticePosts = (noticeRes.content || []).map(n => ({
        type: "notice",
        id: n.notiNo,
        notiNo: n.notiNo,
        title: n.notiTitle,
        writer: n.name,
        dept: n.deptName,
        regDate: n.notiRegDate,
      }));

      const freePosts = (freeRes.content || []).map(f => ({
        type: "free",
        id: f.freeBoardNo,
        freeBoardNo: f.freeBoardNo,
        title: f.frBdTitle,
        writer: f.name,
        dept: f.deptName,
        regDate: f.frBdRegDate,
      }));

      const combined = [...noticePosts, ...freePosts].sort(
        (a, b) => new Date(b.regDate) - new Date(a.regDate)
      );

      const unique = Array.from(
        new Map(
          combined.map(p => [
            p.type === "notice" ? `notice-${p.notiNo}` : `free-${p.freeBoardNo}`,
            p
          ])
        ).values()
      );
      setAllPosts(unique);
    };

    if (selectedTab === "all") {
      loadAllPosts();
    }
  }, [selectedTab]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;

    const refs = {
      all: allRef,
      notice: noticeRef,
      free: freeRef,
    };

    const currentRef = refs[selectedTab];
    if (!currentRef?.current) return;

    const tab = currentRef.current;
    const tabStart = (tab.offsetLeft / containerWidth) * 100;
    const tabEnd = ((tab.offsetLeft + tab.offsetWidth) / containerWidth) * 100;

    setGradientStyle(
      `linear-gradient(to right,
      #d1d5db 0%,
      #d1d5db ${tabStart}%,
      #6b46c1 ${tabStart}%,
      #6b46c1 ${tabEnd}%,
      #d1d5db ${tabEnd}%,
      #d1d5db 100%)`
    );
  }, [selectedTab]);

  // 오른쪽 섹션
  const [approvalTab, setApprovalTab] = useState("approval");
  const [approvalGradient, setApprovalGradient] = useState("");
  const approvalTabContainerRef = useRef(null);
  const approvalRef = useRef(null);
  const noteRef = useRef(null);
  const { userInfo } = useAuth();
  const empNo = userInfo?.empNo;
  const [bottomApprovals, setBottomApprovals] = useState([]);
  const [bottomNotes, setBottomNotes] = useState([]);

  // 전자결재 목록 호출
  useEffect(() => {
    if (!empNo || approvalTab !== "approval") return;

    fetchApprovalList("list", 1, 10, empNo)
      .then((data) => {
        const filtered = data.dtoList
          .filter((doc) => !doc.isRejected && !doc.appIsFinalized)
          .sort((a, b) => b.appDocNo - a.appDocNo)
          .slice(0, 3);
        setBottomApprovals(filtered);
      })
      .catch((err) => console.error("바텀 전자결재 불러오기 실패", err));
  }, [approvalTab, empNo]);

  // 쪽지 목록 호출
  useEffect(() => {
    if (!empNo || approvalTab !== "note") return;

    getReceivedNotes(empNo)
      .then((data) => {
        const sorted = data
          .slice()
          .sort((a, b) => new Date(b.noteReceiveDate) - new Date(a.noteReceiveDate))
          .slice(0, 3);

        setBottomNotes(sorted);
      })
      .catch((err) => console.error("바텀 쪽지 불러오기 실패", err));
  }, [approvalTab, empNo]);

  useLayoutEffect(() => {
    if (approvalTabContainerRef.current && approvalRef.current && noteRef.current) {
      const containerWidth = approvalTabContainerRef.current.offsetWidth;

      const refs = {
        approval: approvalRef,
        note: noteRef,
      };
      const tab = refs[approvalTab].current;
      const tabStart = (tab.offsetLeft / containerWidth) * 100;
      const tabEnd = ((tab.offsetLeft + tab.offsetWidth) / containerWidth) * 100;

      setApprovalGradient(
        `linear-gradient(to right,
      #d1d5db 0%,
      #d1d5db ${tabStart}%,
      #6b46c1 ${tabStart}%,
      #6b46c1 ${tabEnd}%,
      #d1d5db ${tabEnd}%,
      #d1d5db 100%)`
      );
    }
  }, [approvalTab]);

  return (
    <>
      {/* main 왼쪽 섹션 */}
      <section className="col-span-14 w-full p-10 bg-white border-l border-gray-300">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-4 relative" ref={containerRef}>
            <div className="flex space-x-5 w-full">
              <button
                ref={allRef}
                onClick={() => setSelectedTab("all")}
                className={`text-sm font-semibold pb-2 focus:outline-none ${selectedTab === "all" ? "text-[#6b46c1]" : "text-gray-500"
                  }`}
              >
                전체
              </button>
              <button
                ref={noticeRef}
                onClick={() => setSelectedTab("notice")}
                className={`text-sm font-semibold pb-2 focus:outline-none ${selectedTab === "notice" ? "text-[#6b46c1]" : "text-gray-500"
                  }`}
              >
                공지사항
              </button>
              <button
                ref={freeRef}
                onClick={() => setSelectedTab("free")}
                className={`text-sm font-semibold pb-2 focus:outline-none ${selectedTab === "free" ? "text-[#6b46c1]" : "text-gray-500"
                  }`}
              >
                자유게시판
              </button>
            </div>

            <div className="flex space-x-2">
              {/* ◀ */}
              <button
                onClick={() => {
                  if (selectedTab === "all") setAllPage((prev) => Math.max(prev - 1, 1));
                  if (selectedTab === "notice") setPage((prev) => Math.max(prev - 1, 1));
                  if (selectedTab === "free") setFreePage((prev) => Math.max(prev - 1, 1));
                }}
                className="p-1 mb-2 rounded-full border text-[#6b46c1] border-gray-300 
             hover:bg-gray-100 transition"
              >
                <MdChevronLeft className="w-6 h-6" />
              </button>

              {/* ▶ */}
              <button
                onClick={() => {
                  if (selectedTab === "all") setAllPage((prev) => prev + 1);
                  if (selectedTab === "notice") setPage((prev) => prev + 1);
                  if (selectedTab === "free") setFreePage((prev) => prev + 1);
                }}
                className="p-1 mb-2 rounded-full border text-[#6b46c1] border-gray-300 
             hover:bg-gray-100 transition"
              >
                <MdChevronRight className="w-6 h-6" />
              </button>
            </div>


            <div className="absolute bottom-0 left-0 h-0.5 w-full" style={{ background: gradientStyle }}></div>
          </div>

          <div className="text-sm text-gray-600">

            {selectedTab === "all" && (
              <div className="bg-white mt-2 overflow-hidden">
                {allPosts.length === 0 ? (
                  <div className="text-sm text-gray-400 text-center py-6">게시글이 없습니다.</div>
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {allPosts
                      .slice((allPage - 1) * allSize, allPage * allSize)
                      .map((post) => (
                        <li
                          key={post.type === "notice" ? `notice-${post.notiNo}` : `free-${post.freeBoardNo}`}
                          onClick={() =>
                            post.type === "notice"
                              ? navigate(`/intrasoltech/notices/read/${post.notiNo}`)
                              : navigate(`/intrasoltech/notices/freeboard/${post.freeBoardNo}`)
                          }
                          className="flex items-center py-2 px-4 hover:bg-gray-50 transition justify-between cursor-pointer"
                        >
                          {/* 유형 뱃지 */}
                          <span
                            className={`text-xs font-semibold rounded-xl px-2 py-1 min-w-[70px] text-center select-none mr-2 
                                      ${post.type === "notice" ? "bg-yellow-400 text-white" : "bg-blue-400 text-white"}`}
                          >
                            {post.type === "notice" ? "공지" : "자유"}
                          </span>

                          {/* 제목 */}
                          <span className="flex-1 font-medium text-gray-700 truncate mx-2 min-w-[60px] max-w-[160px]">
                            {post.title}
                          </span>

                          {/* 작성자 */}
                          <span className="mx-2 text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                            {post.writer}
                          </span>

                          {/* 부서 */}
                          <span className="mx-2 text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                            {post.dept}
                          </span>

                          {/* 등록일 */}
                          <span className="text-xs text-gray-600 mx-2 min-w-[95px] text-center flex-shrink-0">
                            {dayjs(post.regDate).format("YYYY-MM-DD")}
                          </span>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            )}

            {selectedTab === "notice" && (
              <div className="bg-white mt-2 overflow-hidden">
                {notices.length === 0 ? (
                  <div className="text-sm text-gray-400 text-center py-6">공지사항이 없습니다.</div>
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {notices.map((notice) => (
                      <li
                        key={notice.notiNo}
                        onClick={() => navigate(`/intrasoltech/notices/read/${notice.notiNo}`)}
                        className="flex items-center py-2 px-4 hover:bg-gray-50 transition justify-between cursor-pointer"
                      >
                        {/* 고정 유형 */}
                        <span className="text-xs font-semibold rounded-xl px-2 py-1 min-w-[70px] text-center select-none mr-2 bg-yellow-400 text-white">
                          공지
                        </span>

                        {/* 제목 */}
                        <span className="flex-1 font-medium text-gray-700 truncate mx-2 min-w-[60px] max-w-[160px]">
                          {notice.notiTitle}
                        </span>

                        {/* 작성자 */}
                        <span className="mx-2 text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                          {notice.name}
                        </span>

                        {/* 부서명 */}
                        <span className="mx-2 text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                          {notice.deptName}
                        </span>

                        {/* 등록일 */}
                        <span className="text-xs text-gray-600 mx-2 min-w-[95px] text-center flex-shrink-0">
                          {dayjs(notice.notiRegDate).format("YYYY-MM-DD")}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {selectedTab === "free" && (
              <div className="bg-white mt-2 overflow-hidden">
                {freePosts.length === 0 ? (
                  <div className="text-sm text-gray-400 text-center py-6">게시글이 없습니다.</div>
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {freePosts.map((post) => (
                      <li
                        key={post.id}
                        onClick={() => navigate(`/intrasoltech/notices/freeboard/${post.freeBoardNo}`)}
                        className="flex items-center py-2 px-4 hover:bg-gray-50 transition justify-between cursor-pointer"
                      >
                        {/* 유형 */}
                        <span className="text-xs font-semibold rounded-xl px-2 py-1 min-w-[70px] text-center select-none mr-2 bg-blue-400 text-white">
                          자유
                        </span>

                        {/* 제목 */}
                        <span className="flex-1 font-medium text-gray-700 truncate mx-2 min-w-[60px] max-w-[160px]">
                          {post.frBdTitle}
                        </span>

                        {/* 작성자 */}
                        <span className="mx-2 text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                          {post.name}
                        </span>

                        {/* 부서 */}
                        <span className="mx-2 text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                          {post.deptName}
                        </span>

                        {/* 등록일 */}
                        <span className="text-xs text-gray-600 mx-2 min-w-[95px] text-center flex-shrink-0">
                          {dayjs(post.freeRegDate).format("YYYY-MM-DD")}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

          </div>
        </div >
      </section >

      {/* main 오른쪽 섹션 */}
      <section className="col-span-13 w-full p-10 pt-5 bg-gray-50 border-r border-gray-300">
        <div className="h-full">
          {/* 전자결재/쪽지 탭 */}
          <section className="w-full h-full bg-white rounded-2xl p-8 border border-gray-200 shadow flex flex-col">
            <div className="flex items-center justify-between relative mb-4" ref={approvalTabContainerRef}>
              <div className="flex space-x-5 w-full">
                <button
                  ref={approvalRef}
                  onClick={() => setApprovalTab("approval")}
                  className={`text-sm font-semibold pb-2 focus:outline-none transition-colors ${approvalTab === "approval" ? "text-[#6b46c1]" : "text-gray-500"
                    }`}
                >
                  전자결재
                </button>
                <button
                  ref={noteRef}
                  onClick={() => setApprovalTab("note")}
                  className={`text-sm font-semibold pb-2 focus:outline-none transition-colors ${approvalTab === "note" ? "text-[#6b46c1]" : "text-gray-500"
                    }`}
                >
                  쪽지
                </button>
              </div>

              {/* 하단 gradient bar */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-full"
                style={{ background: approvalGradient, transition: "background 0.3s" }}
              ></div>
            </div>

            {/* 탭별 컨텐츠 */}
            <div className="flex-1 text-gray-700">
              {/* 전자결재 탭 */}
              {approvalTab === "approval" && (
                <div className="space-y-3">
                  {bottomApprovals.map((doc) => (
                    <div key={doc.appDocNo}>
                      <Link to={`/intrasoltech/approval/detail/${doc.appDocNo}`}>
                        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 hover:bg-[#f9fbff] transition">
                          <div>
                            <div className="text-sm font-medium text-gray-800">
                              {doc.appDocTitle}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {doc.eName} · {doc.deptName} · {doc.appDocDate}
                            </div>
                          </div>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded text-yellow-700 bg-yellow-100">
                            대기
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              {/* 쪽지 탭 */}
              {approvalTab === "note" && (
                <div className="space-y-3">
                  {bottomNotes.length === 0 ? (
                    <div className="text-center text-sm text-gray-400 py-6">받은 쪽지가 없습니다.</div>
                  ) : (
                    bottomNotes.map((note) => (
                      <div key={note.noteReceiveNo}>
                        <Link to={`/intrasoltech/note/receive/${note.noteReceiveNo}`}>
                          <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 hover:bg-[#f9fbff] transition">
                            <div>
                              <div className="text-sm font-medium text-gray-800">{note.noteTitle}</div>
                              <div className="text-xs text-gray-500 mt-1">
                                {note.sender?.name} · {note.sender?.deptName} ·{" "}
                                {dayjs(note.noteReceiveDate).format("YYYY-MM-DD")}
                              </div>
                            </div>
                            {!note.noteIsRead && (
                              <span className="text-xs font-semibold px-2 py-0.5 rounded text-blue-700 bg-blue-100">
                                새 쪽지
                              </span>
                            )}
                          </div>
                        </Link>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default IntraBottomSection;

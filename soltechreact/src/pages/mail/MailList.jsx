// 받은메일함

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoMdMailOpen } from "react-icons/io";
import { getReceivedMails, markMailAsRead, deleteReceivedMail } from "../../api/mailApi";
import useAuth from "../../hooks/useAuth";

const MailList = () => {
  const { userInfo } = useAuth();
  const PAGE_SIZE = 15;
  const empNo = userInfo?.empNo; // 로그인 사용자로 변경
  const [filterText, setFilterText] = useState("");
  const [sortOrderAsc, setSortOrderAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [mails, setMails] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const data = await getReceivedMails(empNo);
        const sorted = data.slice().sort((a, b) => b.mailNo - a.mailNo); // 내림차순 정렬
        console.log("📥 받은 메일:", data);
        setMails(
          sorted.map((mail) => ({
            id: mail.mailNo,
            from: `${mail.sender.name}<${mail.sender.email}>`,
            title: mail.mailTitle,
            fullDate: mail.mailSendDate,
            date: mail.mailSendDate.split("T")[0],
            isRead: mail.mailIsRead,
            boxType: "inbox",
            checked: false,
          }))
        );
      } catch (err) {
        console.error("📩 받은 메일 조회 실패:", err);
      }
    };

    fetchMails();
  }, [setMails]);
  // 날짜 정렬
  const handleDateSort = () => {
    const newOrderAsc = !sortOrderAsc;
    const sorted = [...mails].sort((a, b) =>
      newOrderAsc ? new Date(a.fullDate) - new Date(b.fullDate) : new Date(b.fullDate) - new Date(a.fullDate)
    );
    setSortOrderAsc(newOrderAsc);
    setMails(sorted);
  };

  const handleClick = (id) => {
    // 읽음 처리 + 상세페이지 이동
    setMails((prev) => prev.map((mail) => (mail.id === id ? { ...mail, isRead: true } : mail)));

    markMailAsRead(id, empNo).catch((err) => console.error("읽음 처리 실패", err));

    navigate(`/intrasoltech/mail/receive/${id}`);
  };

  const handleDeleteSelected = async () => {
    const selected = mails.filter((mail) => mail.checked);
    if (selected.length === 0) return alert("삭제할 메일을 선택하세요.");

    try {
      await Promise.all(selected.map((mail) => deleteReceivedMail(mail.id, empNo)));
      setMails((prev) => prev.filter((mail) => !mail.checked));
      alert("삭제 완료");
    } catch (err) {
      console.error("삭제 실패", err);
      alert("삭제 중 오류 발생");
    }
  };

  const handleMarkAsRead = async () => {
    const selected = mails.filter((mail) => mail.checked);
    if (selected.length === 0) return alert("읽음 처리할 메일을 선택하세요.");

    try {
      await Promise.all(selected.map((mail) => markMailAsRead(mail.id, empNo)));
      setMails((prev) => prev.map((mail) => (mail.checked ? { ...mail, isRead: true } : mail)));
    } catch (err) {
      console.error("읽음 처리 실패", err);
      alert("읽음 처리 실패");
    }
  };

  // 필터링 (받은 메일함만 + 검색 적용)
  const filteredMails = mails
    .filter((mail) => mail.boxType === "inbox")
    .filter((mail) => mail.from.toLowerCase().includes(filterText.toLowerCase()));

  // 페이징 처리
  const totalPage = Math.ceil(filteredMails.length / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const pagedMails = filteredMails.slice(startIdx, startIdx + PAGE_SIZE);

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      {/* 상단 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
        <h2 className="text-2xl font-bold text-violet-700 flex items-center gap-2">
          <IoMdMailOpen className="w-6 h-6 text-violet-400" /> 받은 메일함
        </h2>

        <div className="flex gap-2 items-center w-full md:w-auto">
          <button
            onClick={handleDateSort}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-violet-50"
          >
            날짜순 {sortOrderAsc ? "▲" : "▼"}
          </button>

          <input
            type="text"
            placeholder="보낸 사람 검색"
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-3 py-1 text-sm rounded focus:outline-violet-400 w-full md:w-48"
          />
        </div>
      </div>
      {/* 기능 버튼들 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={handleDeleteSelected}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
        >
          삭제
        </button>
        <button
          onClick={handleMarkAsRead}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
        >
          읽음 처리
        </button>
      </div>

      {/* 메일 리스트 */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm table-fixed">
          <thead className="bg-violet-100 text-violet-800 font-semibold">
            <tr>
              <th className="p-3 w-10 text-left">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setMails((prev) =>
                      prev.map((mail) => ({
                        ...mail,
                        checked,
                      }))
                    );
                  }}
                />
              </th>
              <th className="p-3 w-10 text-left">#</th>
              <th className="p-3 w-1/3 text-left">보낸 사람</th>
              <th className="p-3 w-1/2 text-left">제목</th>
              <th className="p-3 w-32 text-left">날짜</th>
            </tr>
          </thead>
          <tbody>
            {pagedMails.length > 0 ? (
              pagedMails.map((mail, index) => (
                <tr
                  key={mail.id}
                  className={`cursor-pointer hover:bg-violet-50 transition-colors border-t ${
                    mail.isRead ? "text-gray-500" : "text-black font-semibold"
                  }`}
                >
                  {/* 체크박스 */}
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={mail.checked}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setMails((prev) => prev.map((m) => (m.id === mail.id ? { ...m, checked } : m)));
                      }}
                    />
                  </td>
                  <td className="p-2">{startIdx + index + 1}</td>
                  <td className="p-3 truncate">{mail.from}</td>

                  <td
                    className="p-2 underline hover:text-violet-700 truncate"
                    onClick={() => {
                      handleClick(mail.id);
                    }}
                  >
                    {mail.title}
                  </td>

                  <td className="p-3 text-sm text-gray-600">{mail.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-400">
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {totalPage > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPage }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 text-sm rounded border ${
                currentPage === i + 1 ? "bg-violet-200 text-violet-800 font-bold" : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MailList;

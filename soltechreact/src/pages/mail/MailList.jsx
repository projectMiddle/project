// 받은메일함/보낸메일함/휴지통 화면

import React, { useEffect, useState } from "react";
import MailItem from "../../components/mail/MailItem";
import MailToolbar from "../../components/mail/MailToolbar";
import { useNavigate } from "react-router-dom";
import { useMail } from "../../contexts/MailContext";

const PAGE_SIZE = 15;

const MailList = () => {
  const { mails, setMails } = useMail();
  const [filterText, setFilterText] = useState("");
  const [sortOrderAsc, setSortOrderAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // 날짜 정렬
  const handleDateSort = () => {
    const newOrderAsc = !sortOrderAsc;
    const sorted = [...mails].sort((a, b) =>
      newOrderAsc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
    );
    setSortOrderAsc(newOrderAsc);
    setMails(sorted);
  };

  // 읽음 처리
  const handleClick = (id) => {
    const updated = mails.map((mail) => (mail.id === id ? { ...mail, isRead: true } : mail));
    setMails(updated);
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
        <h2 className="text-2xl font-bold text-violet-700">📥 받은 메일함</h2>

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

      {/* 메일 리스트 */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-violet-100 text-violet-800 font-semibold">
            <tr>
              <th className="p-2 w-10 text-center">#</th>
              <th className="p-2">보낸 사람</th>
              <th className="p-2">제목</th>
              <th className="p-2 text-right">날짜</th>
            </tr>
          </thead>
          <tbody>
            {pagedMails.length > 0 ? (
              pagedMails.map((mail, index) => (
                <tr
                  key={mail.id}
                  className={`cursor-pointer hover:bg-violet-50 transition ${
                    mail.isRead ? "text-gray-400 font-normal" : "text-black font-bold"
                  }`}
                >
                  <td className="p-2 text-center">{startIdx + index + 1}</td>
                  <td className="p-2">{mail.from}</td>

                  <td
                    className="p-2 underline hover:text-violet-700"
                    onClick={() => {
                      handleClick(mail.id);
                      navigate(`/mail/read/${mail.id}`, { state: { mail } });
                    }}
                  >
                    {mail.title}
                  </td>

                  <td className="p-2 text-right">{mail.date}</td>
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

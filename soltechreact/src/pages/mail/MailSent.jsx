// src/pages/mail/MailSent.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMail } from "../../contexts/MailContext";

const PAGE_SIZE = 15;

const MailSent = () => {
  const { mails } = useMail();
  const [filterText, setFilterText] = useState("");
  const [sortOrderAsc, setSortOrderAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const filteredMails = mails
    .filter((mail) => mail.boxType === "sent")
    .filter((mail) => mail.to.toLowerCase().includes(filterText.toLowerCase()));

  const sortedMails = [...filteredMails].sort((a, b) =>
    sortOrderAsc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
  );

  const totalPage = Math.ceil(sortedMails.length / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const pagedMails = sortedMails.slice(startIdx, startIdx + PAGE_SIZE);

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
        <h2 className="text-xl font-semibold">📤 보낸 메일함</h2>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => setSortOrderAsc(!sortOrderAsc)}
            className="px-2 py-1 text-sm rounded border bg-gray-100 hover:bg-gray-200"
          >
            날짜순 {sortOrderAsc ? "▲" : "▼"}
          </button>

          <input
            type="text"
            placeholder="받는 사람 검색"
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-2 py-1 text-sm rounded"
          />
        </div>
      </div>

      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-2 w-10">#</th>
            <th className="p-2">받는 사람</th>
            <th className="p-2">제목</th>
            <th className="p-2 text-right">날짜</th>
          </tr>
        </thead>
        <tbody>
          {pagedMails.length > 0 ? (
            pagedMails.map((mail, index) => (
              <tr key={mail.id} className="cursor-pointer border-b hover:bg-gray-100">
                <td className="p-2">{startIdx + index + 1}</td>
                <td className="p-2">{mail.to}</td>
                <td
                  className="p-2 underline hover:text-blue-500"
                  onClick={() => navigate(`/mail/read/${mail.id}`, { state: { mail } })}
                >
                  {mail.title}
                </td>
                <td className="p-2 text-right">{mail.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-400">
                보낸 메일이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPage > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPage }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 text-sm rounded border ${
                currentPage === i + 1 ? "bg-gray-200 font-semibold" : "bg-white"
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

export default MailSent;

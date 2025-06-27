// 보낸메일함

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMail } from "../../contexts/MailContext";
import axios from "axios";
import { RiMailSendFill } from "react-icons/ri";
import { getSendMails } from "../../api/mailApi";
import useAuth from "../../hooks/useAuth";
const PAGE_SIZE = 15;

const MailSent = () => {
  const { userInfo } = useAuth();
  const empNo = userInfo?.empNo;
  // const { mails } = useMail();
  const [filterText, setFilterText] = useState("");
  const [sortOrderAsc, setSortOrderAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [mails, setMails] = useState([]);

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

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const data = await getSendMails(empNo);

        console.log("📩 보낸 데이터:", data);
        // data.forEach((mail, i) => {
        //   if (!mail) {
        //     console.warn(`❌ [${i}] mail이 null 또는 undefined입니다.`);
        //   } else if (!Array.isArray(mail.receivers)) {
        //     console.warn(`⚠️ [${i}] mail.receivers가 배열이 아닙니다.`, mail.receivers);
        //   } else if (!mail.receivers[0]) {
        //     console.warn(`⚠️ [${i}] mail.receivers 배열에 첫 번째 요소가 없습니다.`, mail.receivers);
        //   } else if (!mail.receivers[0].name || !mail.receivers[0].email) {
        //     console.warn(`⚠️ [${i}] 첫 번째 수신자의 name 또는 email이 없습니다.`, mail.receivers[0]);
        //   } else {
        //     console.log(`✅ [${i}] 정상 메일:`, {
        //       mailNo: mail.mailNo,
        //       title: mail.mailTitle,
        //       receivers: mail.receivers.map((r) => `${r.name}<${r.email}>`),
        //     });
        //   }
        // });
        setMails(
          data.map((mail) => ({
            id: mail.mailNo,
            to:
              mail.receivers.length === 1
                ? `${mail.receivers[0].name}<${mail.receivers[0].email}>`
                : `${mail.receivers[0].name}<${mail.receivers[0].email}> 외 ${mail.receivers.length - 1}명`,
            title: mail.mailTitle,
            date: mail.mailSendDate.split("T")[0],
            boxType: "sent",
          }))
        );
      } catch (err) {
        console.error("📩 보낸 메일 조회 실패:", err);
      }
    };

    fetchMails();
  }, []);

  return (
    <div className="p-10">
      {/* 헤더 라인: 제목 왼쪽, 버튼/검색 오른쪽 */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        {/* 왼쪽 제목 */}
        <h2 className="text-2xl font-bold text-violet-600 flex items-center">
          <RiMailSendFill className="text-xl mr-2" />
          보낸 메일함
        </h2>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => setSortOrderAsc(!sortOrderAsc)}
            className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-violet-50"
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

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm table-fixed ">
          <thead className="bg-violet-100 text-violet-800 font-semibold ">
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
                    onClick={() => navigate(`/mail/send/${mail.id}`, { state: { mail } })}
                  >
                    {mail.title}
                  </td>
                  <td className="p-2 text-right">{mail.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-400 py-8">
                  보낸 메일이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPage > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPage }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-6 h-6 text-sm border rounded  ${
                currentPage === i + 1 ? "bg-purple-500 text-white" : "hover:bg-gray-100"
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

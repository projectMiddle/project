import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiMailSendFill } from "react-icons/ri";
import { getSendNotes } from "../../api/noteApi";
import useAuth from "../../hooks/useAuth";

const PAGE_SIZE = 15;

const NoteSendList = () => {
  const { userInfo } = useAuth();
  const empNo = userInfo?.empNo;

  const [notes, setNotes] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [sortOrderAsc, setSortOrderAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getSendNotes(empNo);
        const sorted = data.slice().sort((a, b) => b.noteSendNo - a.noteSendNo);
        setNotes(
          sorted.map((note) => ({
            id: note.noteSendNo,
            to: note.targetName,
            title: note.noteTitle,
            fullDate: note.noteSendDate,
            date: note.noteSendDate.split("T")[0],
          }))
        );
      } catch (err) {
        console.error("보낸 쪽지 조회 실패", err);
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) => note.to.toLowerCase().includes(filterText.toLowerCase()));

  const sortedNotes = [...filteredNotes].sort((a, b) =>
    sortOrderAsc ? new Date(a.fullDate) - new Date(b.fullDate) : new Date(b.fullDate) - new Date(a.fullDate)
  );

  const totalPage = Math.ceil(sortedNotes.length / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const pagedNotes = sortedNotes.slice(startIdx, startIdx + PAGE_SIZE);

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-2xl font-bold text-violet-600 flex items-center">
          <RiMailSendFill className="text-xl mr-2" />
          보낸 쪽지함
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
        <table className="w-full text-sm table-fixed border-collapse">
          <colgroup>
            <col className="w-10" />
            <col className="w-1/3" />
            <col />
            <col className="w-32" />
          </colgroup>
          <thead className="bg-violet-100 text-violet-800 font-semibold">
            <tr>
              <th className="p-2 border-y text-center">#</th>
              <th className="p-2 border-y text-center">받는 사람</th>
              <th className="p-2 border-y text-center">제목</th>
              <th className="p-2 border-y text-center">날짜</th>
            </tr>
          </thead>
          <tbody>
            {pagedNotes.length > 0 ? (
              pagedNotes.map((note, index) => (
                <tr key={note.id} className="cursor-pointer border-y hover:bg-gray-100">
                  <td className="p-2 text-center">{startIdx + index + 1}</td>
                  <td className="p-2 text-center">{note.to}</td>
                  <td
                    className="p-2 text-center underline hover:text-blue-500"
                    onClick={() => navigate(`/intrasoltech/note/send/${note.id}`)}
                  >
                    {note.title}
                  </td>
                  <td className="p-2 text-center">{note.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-400 py-8 border-y">
                  보낸 쪽지가 없습니다.
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
              className={`w-6 h-6 text-sm border rounded ${
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

export default NoteSendList;

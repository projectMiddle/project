import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdMailOpen } from "react-icons/io";
import { getReceivedNotes, markNoteAsRead, trashReceiveNote } from "../../api/noteApi";
import useAuth from "../../hooks/useAuth";
// import CatWalker from "./CatWalker";

const NoteReceiveList = () => {
  const { userInfo } = useAuth();
  const empNo = userInfo?.empNo;

  const PAGE_SIZE = 15;
  const [notes, setNotes] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [sortOrderAsc, setSortOrderAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getReceivedNotes(empNo);
        const sorted = data.slice().sort((a, b) => b.noteReceiveNo - a.noteReceiveNo);
        setNotes(
          sorted.map((note) => ({
            noteReceiveNo: note.noteReceiveNo,
            from: `${note.sender.name}<${note.sender.deptName}>`,
            title: note.noteTitle,
            fullDate: note.noteReceiveDate,
            date: note.noteReceiveDate.split("T")[0],
            isRead: note.noteIsRead,
            checked: false,
          }))
        );
      } catch (err) {
        console.error("쪽지 불러오기 실패", err);
      }
    };

    fetchNotes();
  }, [empNo]);

  const handleClick = (noteReceiveNo) => {
    setNotes((prev) => prev.map((note) => (note.noteReceiveNo === noteReceiveNo ? { ...note, isRead: true } : note)));
    markNoteAsRead(noteReceiveNo, empNo).catch((err) => console.error("읽음 처리 실패", err));
    navigate(`/intrasoltech/note/receive/${noteReceiveNo}`);
  };

  const handleDeleteSelected = async () => {
    const selected = notes.filter((note) => note.checked);
    if (selected.length === 0) return alert("삭제할 쪽지를 선택하세요.");
    try {
      await Promise.all(selected.map((note) => trashReceiveNote(note.noteReceiveNo)));
      setNotes((prev) => prev.filter((note) => !note.checked));
      alert("삭제 완료");
      navigate("/intrasoltech/note/trash");
    } catch (err) {
      console.error("삭제 실패", err);
      alert("삭제 중 오류 발생");
    }
  };

  const handleMarkAsRead = async () => {
    const selected = notes.filter((note) => note.checked);
    if (selected.length === 0) return alert("읽음 처리할 쪽지를 선택하세요.");
    try {
      await Promise.all(selected.map((note) => markNoteAsRead(note.noteReceiveNo, empNo)));
      setNotes((prev) => prev.map((note) => (note.checked ? { ...note, isRead: true } : note)));
    } catch (err) {
      console.error("읽음 처리 실패", err);
      alert("읽음 처리 실패");
    }
  };

  const handleDateSort = () => {
    const newOrderAsc = !sortOrderAsc;
    const sorted = [...notes].sort((a, b) =>
      newOrderAsc ? new Date(a.fullDate) - new Date(b.fullDate) : new Date(b.fullDate) - new Date(a.fullDate)
    );
    setSortOrderAsc(newOrderAsc);
    setNotes(sorted);
  };

  const filtered = notes.filter((n) => n.from.toLowerCase().includes(filterText.toLowerCase()));
  const totalPage = Math.ceil(filtered.length / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const paged = filtered.slice(startIdx, startIdx + PAGE_SIZE);

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-violet-700 flex items-center gap-2">
          <IoMdMailOpen className="w-6 h-6 text-violet-400" /> 받은 쪽지함
        </h2>
        <div className="flex gap-2 items-center">
          <button onClick={handleDateSort} className="text-sm border px-3 py-1 rounded">
            날짜순 {sortOrderAsc ? "▲" : "▼"}
          </button>
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="보낸 사람"
            className="text-sm px-2 py-1 border rounded"
          />
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <button onClick={handleDeleteSelected} className="bg-red-500 text-white text-sm px-3 py-1 rounded">
          삭제
        </button>
        <button onClick={handleMarkAsRead} className="bg-blue-500 text-white text-sm px-3 py-1 rounded">
          읽음 처리
        </button>
      </div>
      <table className="w-full table-fixed border text-sm">
        <thead className="bg-violet-100">
          <tr>
            <th className="p-2 w-10">
              <input
                type="checkbox"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setNotes((prev) => prev.map((n) => ({ ...n, checked })));
                }}
              />
            </th>
            <th className="p-2 w-10">#</th>
            <th className="p-2 w-1/3">보낸 사람</th>
            <th className="p-2">제목</th>
            <th className="p-2 w-32">날짜</th>
          </tr>
        </thead>
        <tbody>
          {paged.length > 0 ? (
            paged.map((note, i) => (
              <tr
                key={note.noteReceiveNo}
                className={`border-t cursor-pointer ${note.isRead ? "text-gray-500" : "font-semibold"}`}
              >
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={note.checked}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setNotes((prev) =>
                        prev.map((n) => (n.noteReceiveNo === note.noteReceiveNo ? { ...n, checked } : n))
                      );
                    }}
                  />
                </td>
                <td className="p-2">{startIdx + i + 1}</td>
                <td className="p-2 truncate">{note.from}</td>
                <td className="p-2 truncate hover:underline" onClick={() => handleClick(note.noteReceiveNo)}>
                  {note.title}
                </td>
                <td className="p-2 text-sm">{note.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-400">
                결과 없음
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPage > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPage }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 text-sm rounded border ${currentPage === i + 1 ? "bg-violet-200" : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
      {/* <CatWalker /> */}
    </div>
  );
};

export default NoteReceiveList;

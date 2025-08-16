import React, { useEffect, useState } from "react";
import {
  getTrashNotes,
  deleteSendNote,
  deleteReceivedNote,
  recoverSendNote,
  recoverReceiveNote,
} from "../../api/noteApi";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const NoteTrash = () => {
  const { userInfo } = useAuth();
  const empNo = userInfo?.empNo;
  const [trashNotes, setTrashNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrashNotes = async () => {
      try {
        const data = await getTrashNotes(empNo);
        setTrashNotes(data);
      } catch (err) {
        console.error("휴지통 불러오기 실패", err);
      }
    };

    fetchTrashNotes();
  }, [empNo]);
  const handleRecover = async (note) => {
    try {
      if (note.noteType === "보낸쪽지") {
        await recoverSendNote([note.id]);
      } else {
        await recoverReceiveNote([note.id]);
      }
      setTrashNotes((prev) => prev.filter((n) => n.id !== note.id));
      alert("복구 완료");
    } catch (err) {
      console.error("복구 실패", err);
      alert("복구 실패");
    }
  };
  const handleDelete = async (note) => {
    try {
      if (note.noteType === "보낸쪽지") {
        await deleteSendNote(note.id); // noteSendNo
      } else {
        await deleteReceivedNote(note.id, empNo); // noteReceiveNo
      }

      setTrashNotes((prev) => prev.filter((n) => n.id !== note.id));
    } catch (err) {
      console.error("완전 삭제 실패", err);
      alert("삭제 실패");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🗑 휴지통</h2>

      {trashNotes.length === 0 ? (
        <p className="text-gray-400">휴지통에 쪽지가 없습니다.</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <colgroup>
            <col className="w-10" />
            <col className="w-1/3" />
            <col />
            <col className="w-24" />
            <col className="w-40" />
          </colgroup>
          <thead className="bg-gray-100 border-y">
            <tr>
              <th className="p-2 border-y text-center">#</th>
              <th className="p-2 border-y text-center">보낸/받은 사람</th>
              <th className="p-2 border-y text-center">제목</th>
              <th className="p-2 border-y text-center">종류</th>
              <th className="p-2 border-y text-center">삭제</th>
            </tr>
          </thead>
          <tbody>
            {trashNotes.map((note, index) => (
              <tr key={index} className="hover:bg-gray-50 border-y">
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2 text-center">{note.targetName}</td>
                <td
                  className="p-2 text-center truncate text-blue-600 hover:underline cursor-pointer"
                  onClick={() =>
                    note.noteType === "보낸쪽지"
                      ? navigate(`/intrasoltech/note/send/${note.id}`)
                      : navigate(`/intrasoltech/note/receive/${note.id}`)
                  }
                >
                  {note.noteTitle}
                </td>
                <td className="p-2 text-center">{note.noteType}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleRecover(note)}
                    className="px-2 py-1 text-sm bg-green-100 hover:bg-green-200 rounded mr-2"
                  >
                    복구
                  </button>
                  <button
                    onClick={() => handleDelete(note)}
                    className="px-2 py-1 text-sm bg-red-100 hover:bg-red-200 rounded"
                  >
                    완전 삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NoteTrash;

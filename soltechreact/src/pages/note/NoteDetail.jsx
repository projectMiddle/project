import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getNoteReceiveDetail,
  getNoteSendDetail,
  trashSendNote,
  trashReceiveNote,
  downloadNoteFile,
  getNoteDownloadUrl,
} from "../../api/noteApi";
import useAuth from "../../hooks/useAuth";

const NoteDetail = () => {
  const { userInfo } = useAuth();
  const empNo = userInfo?.empNo;

  const { noteReceiveNo, noteSendNo } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isReceiveView = location.pathname.includes("/intrasoltech/note/receive");
  const noteNo = isReceiveView ? noteReceiveNo : noteSendNo;

  const [note, setNote] = useState(null);

  const getDownloadUrl = (file) => {
    const type = isReceiveView ? "receive" : "send";
    return getNoteDownloadUrl(type, noteNo, file.noteFilePath, file.noteFileUuid, file.noteFileName);
  };

  const fetchNote = async () => {
    try {
      const data = isReceiveView ? await getNoteReceiveDetail(noteNo) : await getNoteSendDetail(noteNo);
      setNote(data);
    } catch (err) {
      console.error("쪽지 상세 조회 실패:", err);
      alert("쪽지 불러오기 실패");
    }
  };

  const handleTrash = async () => {
    try {
      isReceiveView ? await trashReceiveNote(noteNo) : await trashSendNote(noteNo);
      alert("삭제 완료");
      navigate("/intrasoltech/note/trash");
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제 실패");
    }
  };

  const handleFileDownload = async (file) => {
    try {
      const type = isReceiveView ? "receive" : "send";
      await downloadNoteFile(type, noteNo, file);
    } catch (err) {
      console.error("❌ 파일 다운로드 실패", err);
      alert("파일 다운로드에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (noteNo && (empNo || !isReceiveView)) {
      fetchNote();
    }
  }, [noteNo, empNo, isReceiveView]);

  if (!note) {
    return <div className="p-4 text-gray-500">쪽지를 불러오는 중입니다...</div>;
  }

  const from = isReceiveView ? `${note.sender?.name}<${note.sender?.deptName}>` : "나";
  const to = !isReceiveView && note.receivers ? note.receivers.map((r) => `${r.name}<${r.deptName}>`).join(", ") : null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">{note.noteTitle}</h2>
      <div className="text-sm text-gray-600 mb-1">From: {from}</div>
      {to && <div className="text-sm text-gray-600 mb-1">To: {to}</div>}
      <div className="text-sm text-gray-500 mb-4">Date: {isReceiveView ? note.noteReceiveDate : note.noteSendDate}</div>

      {note.attachments?.length > 0 && (
        <ul className="list-disc pl-5 text-sm text-gray-700 mb-4">
          {note.attachments.map((file, idx) => (
            <li key={idx}>
              <button onClick={() => handleFileDownload(file)} className="text-blue-500 hover:underline">
                {file.noteFileName}
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mb-8 text-gray-800 whitespace-pre-line">{note.noteContent || "📩 쪽지 본문이 없습니다."}</div>

      <div className="flex gap-2">
        <button onClick={handleTrash} className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 rounded">
          삭제
        </button>
        <button
          onClick={() => navigate(isReceiveView ? "/intrasoltech/note/receiveList" : "/intrasoltech/note/sendList")}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
        >
          목록으로
        </button>
      </div>
    </div>
  );
};

export default NoteDetail;

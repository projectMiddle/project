import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMail } from "../../contexts/MailContext";

const MailRead = () => {
  const { mails, setMails } = useMail();
  const location = useLocation();
  const navigate = useNavigate();
  const mail = location.state?.mail;

  if (!mail) {
    return <div className="p-4 text-gray-500">메일을 불러올 수 없습니다. 목록으로 돌아가주세요.</div>;
  }

  // 삭제: mails 상태에서 제거
  const handleDelete = () => {
    const updated = mails.filter((m) => m.id !== mail.id);
    setMails(updated);
    navigate("/mail");
  };

  // 휴지통 이동: boxType = "trash"
  const handleMoveToTrash = () => {
    const updated = mails.map((m) => (m.id === mail.id ? { ...m, boxType: "trash" } : m));
    setMails(updated);
    navigate("/mail");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">{mail.title}</h2>
      <div className="text-sm text-gray-600 mb-1">From: {mail.from}</div>
      <div className="text-sm text-gray-500 mb-4">Date: {mail.date}</div>

      {mail.attachments && mail.attachments.length > 0 && (
        <div className="mb-6">
          <p className="font-semibold mb-1">📎 첨부파일</p>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {mail.attachments.map((file, idx) => (
              <li key={idx}>{file}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-8 text-gray-800 whitespace-pre-line">{mail.content || "📩 메일 본문이 없습니다."}</div>

      <div className="flex gap-2">
        <button onClick={handleMoveToTrash} className="px-3 py-1 text-sm bg-yellow-100 hover:bg-yellow-200 rounded">
          휴지통으로 이동
        </button>
        <button onClick={handleDelete} className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 rounded">
          완전 삭제
        </button>
        <button onClick={() => navigate("/mail")} className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded">
          목록으로
        </button>
      </div>
    </div>
  );
};

export default MailRead;

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMail } from "../../contexts/MailContext";
import { VscSave } from "react-icons/vsc"; // 아이콘 추가

const MailCompose = () => {
  const navigate = useNavigate();
  const { mails, setMails } = useMail();

  const [to, setTo] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState([]);

  const fileInputRef = useRef(); // 숨겨진 input에 접근할 ref

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      alert("최대 5개의 파일만 첨부할 수 있습니다.");
      e.target.value = ""; // 초기화
      return;
    }

    setAttachments(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMail = {
      id: Date.now(),
      from: "me@company.com",
      to,
      title,
      content,
      date: new Date().toISOString().split("T")[0],
      isRead: true,
      boxType: "sent",
      attachments: attachments.map((file) => file.name),
    };

    setMails([newMail, ...mails]);
    navigate("/mail/sent");
  };

  return (
    <div className="bg-white rounded shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">✍ 메일 작성</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">받는 사람</label>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">첨부파일</label>

          {/* 아이콘 버튼 클릭 시 input 작동 */}
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="text-2xl text-blue-600 hover:text-blue-800"
            title="파일 첨부"
          >
            <VscSave />
          </button>

          {/* 숨겨진 파일 input */}
          <input type="file" multiple onChange={handleFileChange} ref={fileInputRef} className="hidden" />

          {/* 선택된 파일명 리스트 */}
          {attachments.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
              {attachments.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="pt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            보내기
          </button>
        </div>
      </form>
    </div>
  );
};

export default MailCompose;

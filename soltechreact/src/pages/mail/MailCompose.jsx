// 메일 작성 화면
import React, { useState } from "react";

const MailCompose = () => {
  const [to, setTo] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSend = () => {
    console.log("보낸 메일:", { to, title, body });
    alert("메일이 발송되었습니다! ✉️ (아직은 콘솔에만)");
    // TODO: 실제 서버 요청 연동 예정
  };

  const handleCancel = () => {
    setTo("");
    setTitle("");
    setBody("");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-2">메일 쓰기</h2>

      <div>
        <label className="block text-sm text-gray-600 mb-1">받는 사람</label>
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="예: hong@soltech.com"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">본문</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
          className="w-full border px-3 py-2 rounded resize-none"
        />
      </div>

      <div className="flex gap-2 justify-end mt-2">
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
        >
          취소
        </button>
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          보내기
        </button>
      </div>
    </div>
  );
};

export default MailCompose;
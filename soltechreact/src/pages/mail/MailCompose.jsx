// 수정된 MailCompose.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { VscSave } from "react-icons/vsc";
import { postMail } from "../../api/mailApi";
import useAuth from "../../hooks/useAuth";
import EmployeeSearchModal from "../../components/intrahome/EmployeeSearchModal";

const MailCompose = () => {
  const { userInfo } = useAuth();
  const empNo = userInfo?.empNo;
  const navigate = useNavigate();

  const [to, setTo] = useState(""); // 이름<이메일> 형식으로 표시
  const [receiverIds, setReceiverIds] = useState([]); // 실제 수신자 empNo 배열
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef();

  // 파일
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const updated = [...attachments, ...files].filter(
      (file, index, self) => index === self.findIndex((f) => f.name === file.name && f.size === file.size)
    );
    setAttachments(updated);
    e.target.value = "";
  };
  const handleRemoveFile = (name, size) => {
    setAttachments((prev) => prev.filter((file) => !(file.name === name && file.size === size)));
  };

  // 수신자 선택 완료
  const handleReceiverSelect = (selectedEmployees) => {
    const names = selectedEmployees.map((emp) => `${emp.name}<${emp.email}>`).join(", ");
    const ids = selectedEmployees.map((emp) => emp.id);
    setTo(names);
    setReceiverIds(ids);
    setIsModalOpen(false);
  };

  // 메일 전송
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit 호출됨");
    if (receiverIds.length === 0) {
      alert("수신자를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("mailTitle", title);
    formData.append("mailContent", content);
    receiverIds.forEach((id) => formData.append("receiverIds", id));
    attachments.forEach((file) => formData.append("attachments", file));

    try {
      await postMail(empNo, formData);
      alert("메일 전송 성공");
      navigate("/intrasoltech/mail/sendList");
    } catch (err) {
      console.error("메일 전송 실패", err);
      alert("메일 전송에 실패했습니다.");
    }
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
            readOnly
            // onChange={(e) => setTo(e.target.value)}
            // className="w-full border px-3 py-2 rounded"
            // required
            className="flex-1 border px-3 py-2 rounded bg-gray-50 cursor-not-allowed"
            placeholder="이름<이메일>"
          />
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-sm px-3 py-2 bg-gray-100 border rounded hover:bg-gray-200"
          >
            사원 검색
          </button>
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
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="text-2xl text-blue-600 hover:text-blue-800"
            title="파일 첨부"
          >
            <VscSave />
          </button>
          <input type="file" multiple onChange={handleFileChange} ref={fileInputRef} className="hidden" />

          {/* 수정 */}
          {attachments.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
              {attachments.map((file, idx) => (
                <li key={idx} className="flex items-center justify-between">
                  <span>{file.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(file.name, file.size)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ❌
                  </button>
                </li>
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

      {/* 사원 검색 모달 */}
      {isModalOpen && (
        <EmployeeSearchModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelect={handleReceiverSelect}
        />
      )}
    </div>
  );
};

export default MailCompose;

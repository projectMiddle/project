// 상세 
//ㅠㅠ

import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const dummyMailData = [
  {
    id: "1",
    title: "프로젝트 자료 공유합니다",
    sender: "김대리",
    date: "2025-06-18",
    content: "안녕하세요. 첨부한 프로젝트 자료 확인 부탁드립니다.",
  },
  {
    id: "2",
    title: "회의 일정 변경 안내",
    sender: "박사원",
    date: "2025-06-17",
    content: "금주 회의 일정이 변경되었습니다. 확인 바랍니다.",
  },
];

const MailRead = () => {
  const { mailId } = useParams(); // URL에서 mailId 가져옴
  const navigate = useNavigate();

  const mail = dummyMailData.find((m) => m.id === mailId);

  if (!mail) {
    return <div className="p-4 text-gray-500">존재하지 않는 메일입니다.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{mail.title}</h2>

      <div className="text-sm text-gray-600">
        <span className="font-medium">{mail.sender}</span> · {mail.date}
      </div>

      <hr />

      <div className="text-gray-800 whitespace-pre-line">{mail.content}</div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => navigate(-1)} // 한 단계 뒤로 가기
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
        >
          목록으로
        </button>
      </div>
    </div>
  );
};

export default MailRead;
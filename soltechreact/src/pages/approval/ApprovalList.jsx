import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ApprovalList = () => {
  const [category, setCategory] = useState("기안서");
  const navigate = useNavigate();

  // 예시 데이터 (나중에 API 연결 예정)
  const dummyApprovals = [
    {
      id: 1,
      title: "기안서 - 연차 신청",
      writer: "홍길동",
      dept: "인사팀",
      date: "2025.06.01",
      status: "대기",
      category: "기안서",
    },
    {
      id: 2,
      title: "보고서 - 프로젝트 정리",
      writer: "김푸름",
      dept: "영업팀",
      date: "2025.06.02",
      status: "승인",
      category: "보고서",
    },
    // 다른 분류 데이터도 추가 가능
  ];

  const filteredApprovals = dummyApprovals.filter((doc) => doc.category === category);

  return (
    <div className="bg-[#fff9fd]">
      <div className="flex p-6 text-sm font-semibold text-black min-h-screen max-w-6xl mx-auto">
        {/* 사이드 메뉴 */}
        <aside className="w-48 mr-6 mt-10">
          <h2 className="mb-2 border-b border-gray-300 pb-1">결재양식</h2>
          <ul className="space-y-1 mb-6 text-gray-700">
            {["기안서", "보고서", "연차신청서", "출장신청서"].map((item) => (
              <li
                key={item}
                onClick={() => setCategory(item)}
                className={`cursor-pointer hover:text-purple-600 ${category === item ? "text-purple-800 font-bold" : ""
                  }`}
              >
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mb-2 border-b border-gray-300 pb-1">문서보관함</h2>
          <ul className="space-y-1 text-gray-700">
            <li className="cursor-pointer hover:text-purple-600">상신함</li>
            <li className="cursor-pointer hover:text-purple-600">수신함</li>
            <li className="cursor-pointer hover:text-purple-600">반려함</li>
          </ul>
        </aside>

        {/* 본문 */}
        <section className="flex-1 bg-white rounded-xl p-6 shadow min-h-screen">
          <div className="text-right text-xs text-gray-500 mb-4">
            home / 전자결재
          </div>

          {/* 상단 버튼 */}
          <div className="text-right mb-4">
            <button
              onClick={() => navigate(`/yongjae/approval/form?category=${category}`)}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              + 새 {category} 작성
            </button>
          </div>

          {/* 리스트 */}
          <div className="space-y-2 bg-purple-50 p-4 rounded-xl">
            {filteredApprovals.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-purple-300 text-white flex items-center justify-center font-bold rounded-full">
                    {doc.category[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">{doc.title}</div>
                    <div className="text-xs text-gray-500">
                      기안자: {doc.writer} · {doc.dept} · {doc.date}
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-semibold text-yellow-700 bg-yellow-200 px-2 py-0.5 rounded">
                    {doc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ApprovalList;

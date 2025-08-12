import React from "react";
import NoticeForm from "./NoticeForm";

const NoticeWrite = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border-2 border-purple-400 rounded">
      <h2 className="text-2xl font-bold mb-6">공지사항 작성</h2>
      <NoticeForm />
    </div>
  );
};

export default NoticeWrite;

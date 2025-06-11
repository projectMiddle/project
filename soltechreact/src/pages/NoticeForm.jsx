import React, { useState } from "react";

const NoticeForm = () => {
  const [formData, setFormData] = useState({
    regDate: "2025-07-31",
    writer: "",
    dept: "",
    title: "",
    content: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    const notice = new Blob(
      [
        JSON.stringify({
          regDate: formData.regDate,
          writer: formData.writer,
          dept: formData.dept,
          title: formData.title,
          content: formData.content,
        }),
      ],
      { type: "application/json" }
    );

    data.append("notice", notice);
    if (formData.file) {
      data.append("file", formData.file);
    }

    try {
      const res = await fetch("/notices", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        alert("등록되었습니다.");
        // 폼 초기화 또는 페이지 이동
      } else {
        alert("등록 실패");
      }
    } catch (err) {
      console.error(err);
      alert("에러 발생");
    }
  };

  const handleCancel = () => {
    // 취소 로직: 예를 들어 페이지 이동
  };

  return (
    <>
      <h1 className="text-3xl font-bold">공지사항 작성</h1>
      <form
        onSubmit={handleSubmit}
        className="notice-form-container max-w-4xl mx-auto p-6 border-2 border-purple-500 rounded-xl space-y-4"
      >
        <div>
          <label className="block font-semibold">작성일자</label>
          <input
            type="text"
            name="regDate"
            value={formData.regDate}
            onChange={handleChange}
            className="w-full border border-purple-400 rounded-full px-4 py-1"
          />
        </div>
        <div>
          <label className="block font-semibold">작성자</label>
          <input
            type="text"
            name="writer"
            value={formData.writer}
            onChange={handleChange}
            className="w-full border border-purple-400 rounded-full px-4 py-1"
          />
        </div>
        <div>
          <label className="block font-semibold">부서</label>
          <input
            type="text"
            name="dept"
            value={formData.dept}
            onChange={handleChange}
            className="w-full border border-purple-400 rounded-full px-4 py-1"
          />
        </div>
        <div>
          <label className="block font-semibold">제목</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-purple-400 px-4 py-1"
            placeholder="title"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 font-semibold">📎 파일첨부</label>
          <input type="file" onChange={handleFileChange} className="w-full mt-1" />
        </div>
        <div>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="content"
            rows={8}
            className="w-full border border-purple-400 rounded-xl px-4 py-2"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button type="submit" className="bg-purple-500 text-white px-6 py-1 rounded-xl hover:bg-purple-600">
            등록
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-purple-300 text-white px-6 py-1 rounded-xl hover:bg-purple-400"
          >
            취소
          </button>
        </div>
      </form>
    </>
  );
};

export default NoticeForm;

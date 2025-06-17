import React, { useEffect, useState } from "react";

const NoticeForm = () => {
  const [formData, setFormData] = useState({
    notiRegDate: "",
    empNo: "",
    name: "",
    deptNo: "",
    notiTitle: "",
    notiContent: "",
    file: null,
  });

  // 오늘 날짜 자동 설정
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, notiRegDate: today }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regDateOnly = document.querySelector('input[name="notiRegDate"]').value; // '2025-06-16'
    const notiRegDate = `${regDateOnly}T00:00:00`; // '2025-06-16T00:00:00'

    const payload = {
      empNo: Number(formData.empNo), // 여기에 사원번호 넣기
      deptNo: Number(formData.deptNo),
      notiTitle: formData.notiTitle,
      notiContent: formData.notiContent,
      notiRegDate,
    };

    console.log("전송할 데이터:", payload);

    try {
      const res = await fetch("/api/notices/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("등록되었습니다.");
        window.location.href = "/notice"; // 원하면 리다이렉트 추가
      } else {
        alert("등록 실패");
      }
    } catch (err) {
      console.error(err);
      alert("에러 발생");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold">공지사항 작성</h1>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 border-2 border-purple-500 rounded-xl space-y-4">
        <div>
          <label className="block font-semibold">작성일자</label>
          <input
            type="date"
            name="notiRegDate"
            value={formData.notiRegDate}
            onChange={handleChange}
            className="w-full border border-purple-400 rounded-full px-4 py-1"
          />
        </div>
        <div>
          <label className="block font-semibold">작성자</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-purple-400 rounded-full px-4 py-1"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">부서번호</label>
          <input
            type="number"
            name="deptNo"
            value={formData.deptNo}
            onChange={handleChange}
            className="w-full border border-purple-400 rounded-full px-4 py-1"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">사원번호</label>
          <input
            type="number"
            name="empNo"
            value={formData.empNo}
            onChange={handleChange}
            className="w-full border border-purple-400 rounded-full px-4 py-1"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">제목</label>
          <input
            type="text"
            name="notiTitle"
            value={formData.notiTitle}
            onChange={handleChange}
            className="w-full border border-purple-400 px-4 py-1"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">내용</label>
          <textarea
            name="notiContent"
            value={formData.notiContent}
            onChange={handleChange}
            rows={8}
            className="w-full border border-purple-400 rounded-xl px-4 py-2"
            required
          />
        </div>

        {/* ✅ 파일 첨부 영역 유지 */}
        <div>
          <label className="flex items-center gap-2 font-semibold">📎 파일첨부</label>
          <input type="file" onChange={handleFileChange} className="w-full mt-1" />
          {formData.file && <p className="text-sm text-gray-600 mt-1">선택된 파일: {formData.file.name}</p>}
        </div>

        <div className="flex justify-end gap-4">
          <button type="submit" className="bg-purple-500 text-white px-6 py-1 rounded-xl hover:bg-purple-600">
            등록
          </button>
          <button type="button" className="bg-purple-300 text-white px-6 py-1 rounded-xl hover:bg-purple-400">
            취소
          </button>
        </div>
      </form>
    </>
  );
};

export default NoticeForm;

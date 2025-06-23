import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // ✅ 공지사항 ID 가져오기

const EditNoticeForm = () => {
  const { id } = useParams(); // URL의 :id
  const [noticeData, setNoticeData] = useState(null);

  const [formData, setFormData] = useState({
    notiRegDate: "",
    empName: "",
    deptName: "",
    notiTitle: "",
    notiContent: "",
    file: null,
  });

  // ✅ 공지사항 정보 불러오기
  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await fetch(`/api/notices/${id}`);
        const data = await res.json();
        setNoticeData(data);

        const formattedDate = data.notiRegDate ? new Date(data.notiRegDate).toISOString().split("T")[0] : "";

        setFormData({
          notiRegDate: formattedDate,
          empName: data.name || "",
          deptName: data.deptName || "",
          notiTitle: data.notiTitle || "",
          notiContent: data.notiContent || "",
          file: null,
        });
      } catch (err) {
        console.error("공지사항 불러오기 실패:", err);
      }
    };

    fetchNotice();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      notiTitle: formData.notiTitle,
      notiContent: formData.notiContent,
      notiRegDate: formData.notiRegDate,
      empNo: noticeData?.empNo,
      deptNo: noticeData?.deptNo,
    };

    try {
      const res = await fetch(`/api/notices/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("수정되었습니다.");
        window.history.back(); // 또는 navigate(-1)
      } else {
        alert("수정 실패");
      }
    } catch (err) {
      console.error(err);
      alert("에러 발생");
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  if (!noticeData) return <div className="text-center mt-20">📄 공지사항을 불러오는 중입니다...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">공지사항 수정</h1>
      <form onSubmit={handleSubmit} className="p-6 border-2 border-purple-500 rounded-xl space-y-4">
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
            value={formData.empName}
            className="w-full border border-purple-400 rounded-full px-4 py-1 bg-gray-100"
            readOnly
          />
        </div>

        <div>
          <label className="block font-semibold">부서명</label>
          <input
            type="text"
            value={formData.deptName}
            className="w-full border border-purple-400 rounded-full px-4 py-1 bg-gray-100"
            readOnly
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

        <div>
          <label className="flex items-center gap-2 font-semibold">📎 파일첨부</label>
          <input type="file" onChange={handleFileChange} className="w-full mt-1" />
          {formData.file && <p className="text-sm text-gray-600 mt-1">선택된 파일: {formData.file.name}</p>}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button type="submit" className="bg-purple-500 text-white px-6 py-2 rounded-xl hover:bg-purple-600">
            수정
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-purple-300 text-white px-6 py-2 rounded-xl hover:bg-purple-400"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNoticeForm;

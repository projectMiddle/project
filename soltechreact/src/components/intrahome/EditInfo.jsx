import React, { useState } from "react";
import axios from "axios";
import { formatDate } from "@fullcalendar/core/index.js";

const EditInfo = ({ empNo, initialData, onUpdated }) => {
  const [formData, setFormData] = useState({
    emobile: initialData.emobile || "",
    eaddress: initialData.eaddress || "",
    eaccount: initialData.eaccount || "",
    epassword: initialData.epassword || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/empinfo/${empNo}`, formData);
      alert("정보가 성공적으로 수정되었습니다.");
      onUpdated?.(); // 부모에서 재요청 등 후처리 가능
    } catch (err) {
      console.error("수정 실패:", err);
      console.log("보내는 데이터:", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">정보 수정</h2>

      <div>
        <label className="block text-sm font-medium mb-1">전화번호</label>
        <input
          type="text"
          name="emobile"
          value={formData.emobile}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">주소</label>
        <input
          type="text"
          name="eaddress"
          value={formData.eaddress}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">계좌번호</label>
        <input
          type="text"
          name="eaccount"
          value={formData.eaccount}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">비밀번호</label>
        <input
          type="password"
          name="epassword"
          value={formData.epassword}
          onChange={handleChange}
          placeholder="관리자에게 문의하세요"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          저장
        </button>
      </div>
    </form>
  );
};

export default EditInfo;

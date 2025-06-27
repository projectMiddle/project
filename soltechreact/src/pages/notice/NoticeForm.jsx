import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNotice } from "../../api/noticeApi"; // ✅ API 분리된 함수 import
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const NoticeForm = () => {
  const navigate = useNavigate();

  const { userInfo } = useAuth();
  const [formData, setFormData] = useState({
    notiTitle: "",
    notiContent: "",
    notiRegDate: new Date().toISOString(),
    notiUpdateDate: new Date().toISOString(),
    empNo: "",
    deptNo: "",
  });

  // userInfo가 로드되면 empNo/deptNo 자동 세팅
  useEffect(() => {
    if (userInfo) {
      setFormData((prev) => ({
        ...prev,
        empNo: userInfo.empNo,
        deptNo: userInfo.deptNo,
      }));
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNotice(formData); // ✅ 분리된 API 사용
      alert("공지사항이 등록되었습니다.");
      navigate("/intrasoltech/notices");
    } catch (err) {
      alert("오류 발생: " + err.message);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="bg-[#6b46c1] text-white font-bold text-[17px] pl-5 py-[14px]">공지사항 - 작성</div>
      <form onSubmit={handleSubmit}>
        <div style={{ padding: "16px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: 24,
            }}
          >
            <tbody>
              <tr>
                <td style={cellStyleTitle}>제목</td>
                <td style={cellStyle}>
                  <input
                    type="text"
                    name="notiTitle"
                    value={formData.notiTitle}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </td>
              </tr>
              <tr>
                <td style={cellStyleTitle}>사원번호</td>
                <td style={cellStyle}>
                  <input
                    type="number"
                    name="empNo"
                    value={formData.empNo}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </td>
              </tr>
              <tr>
                <td style={cellStyleTitle}>부서번호</td>
                <td style={cellStyle}>
                  <input
                    type="number"
                    name="deptNo"
                    value={formData.deptNo}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </td>
              </tr>
              <tr>
                <td style={cellStyleTitle}>작성일자</td>
                <td style={cellStyle}>
                  {new Date(formData.notiRegDate).toLocaleDateString("ko-KR").replace(/\.$/, "")}
                </td>
              </tr>
              <tr>
                <td style={cellStyleTitle}>수정일자</td>
                <td style={cellStyle}>
                  {new Date(formData.notiUpdateDate).toLocaleDateString("ko-KR").replace(/\.$/, "")}
                </td>
              </tr>
            </tbody>
          </table>

          <div
            style={{
              whiteSpace: "pre-wrap",
              border: "1px solid #ddd",
              padding: 20,
              minHeight: 349,
            }}
          >
            <textarea
              name="notiContent"
              value={formData.notiContent}
              onChange={handleChange}
              placeholder="내용을 입력하세요"
              required
              className="w-full h-80"
              style={{
                width: "100%",
                border: "none",
                fontSize: 16,
                resize: "none",
              }}
            />
          </div>
        </div>
        <div style={footerStyle}>
          <button type="button" onClick={() => navigate(-1)} style={buttonStyle}>
            취소
          </button>
          <button type="submit" style={buttonStyle}>
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

const cellStyle = {
  border: "1px solid #ddd",
  padding: "14px 16px",
  backgroundColor: "#fff",
  fontSize: "16px",
};

const cellStyleTitle = {
  ...cellStyle,
  backgroundColor: "#f9f9f9",
  fontWeight: "bold",
  width: "15%",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  fontSize: "1rem",
  border: "1px solid #ccc",
  outline: "none",
};

const footerStyle = {
  marginTop: 40,
  backgroundColor: "#f0f0f0",
  padding: "20px 24px",
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
  width: "100%",
};

const buttonStyle = {
  padding: "10px 20px",
  border: "1px solid #ccc",
  backgroundColor: "#eee",
  borderRadius: 6,
  fontSize: "16px",
  cursor: "pointer",
};

export default NoticeForm;

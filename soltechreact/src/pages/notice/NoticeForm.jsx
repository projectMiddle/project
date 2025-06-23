import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NoticeForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    notiTitle: "",
    notiContent: "",
    notiRegDate: new Date().toISOString(),
    notiUpdateDate: new Date().toISOString(),
    empNo: "",
    deptNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/notices/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("등록 실패");
      alert("공지사항이 등록되었습니다.");
      navigate("/notices/List");
    } catch (err) {
      alert("오류 발생: " + err.message);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <h2 style={headerStyle}>회사 공지사항</h2>
      <div style={{ padding: "16px" }}>
        <p style={{ fontSize: "18px", marginBottom: 20 }}>회사 공지사항을 작성합니다.</p>
        <hr style={{ border: "none", borderTop: "1px solid #ccc", marginBottom: 24 }} />
        <form onSubmit={handleSubmit}>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
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

          <div style={{ whiteSpace: "pre-wrap", border: "1px solid #ddd", padding: 20, minHeight: 349 }}>
            <textarea
              name="notiContent"
              value={formData.notiContent}
              onChange={handleChange}
              placeholder="내용을 입력하세요"
              required
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                fontSize: 16,
                resize: "none",
              }}
            />
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
    </div>
  );
};

const headerStyle = {
  backgroundColor: "#A855F7",
  color: "white",
  padding: "16px 24px",
  fontSize: "24px",
  marginBottom: 16,
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

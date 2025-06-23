import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NoticeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    notiTitle: "",
    notiContent: "",
    empNo: "",
    deptNo: "",
    notiRegDate: "",
  });

  // ✅ 공지사항 정보 불러오기
  useEffect(() => {
    fetch(`/api/notices/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          notiTitle: data.notiTitle,
          notiContent: data.notiContent,
          empNo: data.empNo,
          deptNo: data.deptNo,
          notiRegDate: data.notiRegDate,
        });
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      notiUpdateDate: new Date().toISOString(),
    };

    try {
      const res = await fetch(`/api/notices/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("수정 실패");
      alert("수정되었습니다.");
      navigate(`/notices/${id}`);
    } catch (err) {
      alert("오류 발생: " + err.message);
    }
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      <h2 style={{ backgroundColor: "#A855F7", color: "white", padding: "16px 24px", fontSize: "24px" }}>
        회사 공지사항 수정
      </h2>
      <div style={{ padding: "16px" }}>
        <p style={{ fontSize: "18px", marginBottom: 20 }}>회사 공지사항을 수정합니다.</p>
        <form onSubmit={handleSubmit}>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
            <tbody>
              <tr>
                <td style={cellStyleTitle}>제목</td>
                <td style={cellStyle}>
                  <input
                    type="text"
                    value={formData.notiTitle ?? ""}
                    onChange={(e) => setFormData({ ...formData, notiTitle: e.target.value })}
                  />
                </td>
              </tr>
              <tr>
                <td style={cellStyleTitle}>사원번호</td>
                <td style={cellStyle}>{formData.empNo}</td>
              </tr>
              <tr>
                <td style={cellStyleTitle}>부서번호</td>
                <td style={cellStyle}>{formData.deptNo}</td>
              </tr>

              <tr>
                <td style={cellStyleTitle}>작성일자</td>
                <td style={cellStyle}>
                  {new Date(formData.notiRegDate).toLocaleDateString("ko-KR").replace(/\.$/, "")}
                </td>
              </tr>
              <tr>
                <td style={cellStyleTitle}>수정일자</td>
                <td style={cellStyle}>{new Date().toLocaleDateString("ko-KR").replace(/\.$/, "")}</td>
              </tr>
            </tbody>
          </table>

          <textarea
            value={formData.notiContent}
            onChange={(e) => setFormData({ ...formData, notiContent: e.target.value })}
            required
            style={{
              width: "100%",
              height: "300px",
              padding: "15px",
              fontSize: "1rem",
              border: "1px solid #ccc",
              resize: "none",
              whiteSpace: "pre-wrap",
              marginBottom: "24px",
            }}
          />

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
            <button type="button" onClick={() => navigate(-1)} style={buttonStyle}>
              취소
            </button>
            <button
              type="submit"
              style={{ ...buttonStyle, backgroundColor: "#A855F7", color: "white", border: "none" }}
            >
              저장
            </button>
          </div>
        </form>
      </div>
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

const buttonStyle = {
  padding: "10px 20px",
  border: "1px solid #ccc",
  backgroundColor: "#eee",
  borderRadius: 6,
  fontSize: "16px",
  cursor: "pointer",
};

export default NoticeEdit;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateFreePost, fetchFreePost } from "../../api/board/noticeApi"; // 🔁 자유게시판 API

const EditFreeBoardForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    frBdTitle: "",
    frBdContent: "",
    empNo: "",
    deptNo: "",
    frBdRegDate: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFreePost(id);
        setFormData({
          frBdTitle: data.frBdTitle,
          frBdContent: data.frBdContent,
          empNo: data.empNo,
          deptNo: data.deptNo,
          name: data.name,
          deptName: data.deptName,
          frBdRegDate: data.frBdRegDate,
        });
      } catch (err) {
        alert("게시글을 불러오는 데 실패했습니다.");
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      frBdUpdateDate: new Date().toISOString(),
    };

    try {
      await updateFreePost(id, payload);
      alert("수정되었습니다.");
      navigate("/intrasoltech/notices/freeboard");
    } catch (err) {
      alert("수정 실패: " + err.message);
    }
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      <div className="bg-[#6b46c1] text-white font-bold text-[17px] pl-5 py-[14px]">자유게시판 - 수정</div>
      <div style={{ padding: "16px" }}>
        <p style={{ fontSize: "18px", marginBottom: 20 }}>자유게시판 게시글을 수정합니다.</p>
        <form onSubmit={handleSubmit}>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
            <tbody>
              <tr>
                <td style={cellStyleTitle}>제목</td>
                <td style={cellStyle}>
                  <div style={{ padding: "8px 0", fontSize: "16px" }}>{formData.frBdTitle}</div>
                </td>
              </tr>

              <tr>
                <td style={cellStyleTitle}>사원명</td>
                <td style={cellStyle}>{formData.name}</td>
              </tr>
              <tr>
                <td style={cellStyleTitle}>부서명</td>
                <td style={cellStyle}>{formData.deptName}</td>
              </tr>
              <tr>
                <td style={cellStyleTitle}>작성일자</td>
                <td style={cellStyle}>
                  {new Date(formData.frBdRegDate).toLocaleDateString("ko-KR").replace(/\.$/, "")}
                </td>
              </tr>
              <tr>
                <td style={cellStyleTitle}>수정일자</td>
                <td style={cellStyle}>{new Date().toLocaleDateString("ko-KR").replace(/\.$/, "")}</td>
              </tr>
            </tbody>
          </table>

          <textarea
            value={formData.frBdContent}
            onChange={(e) => setFormData({ ...formData, frBdContent: e.target.value })}
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
              background: "white",
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

export default EditFreeBoardForm;

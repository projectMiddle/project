import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNoticeById, updateNotice } from "../../api/noticeApi"; // ✅ API 모듈 import

const EditNoticeForm = () => {
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
    const fetchNotice = async () => {
      try {
        const data = await getNoticeById(id); // ✅ 분리된 API 사용
        setFormData({
          notiTitle: data.notiTitle,
          notiContent: data.notiContent,
          empNo: data.empNo,
          deptNo: data.deptNo,
          notiRegDate: data.notiRegDate,
        });
      } catch (err) {
        alert("공지사항을 불러오는 데 실패했습니다.");
      }
    };

    fetchNotice();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      notiUpdateDate: new Date().toISOString(),
    };

    try {
      await updateNotice(id, payload); // ✅ 분리된 API 사용
      alert("수정되었습니다.");
      navigate("/intrasoltech/notices");
    } catch (err) {
      alert("수정 실패: " + err.message);
    }
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      <div className="bg-[#6b46c1] text-white font-bold text-[17px] pl-5 py-[14px]">공지사항 - 수정</div>
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
              background: "white"
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

export default EditNoticeForm;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchNoticeDetail, deleteNotice } from "../../api/noticeApi"; // ✅ API 분리된 모듈 사용

const NoticeRead = () => {
  const { notiNo } = useParams();
  const navigate = useNavigate();

  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNotice = async () => {
      try {
        const data = await fetchNoticeDetail(notiNo);
        setNotice(data);
      } catch (err) {
        setError("공지사항을 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };
    loadNotice();
  }, [notiNo]);

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteNotice(notiNo);
      alert("삭제되었습니다.");
      navigate("/intrasoltech/notices");
    } catch (err) {
      alert("삭제 중 오류 발생: " + err.message);
    }
  };

  if (loading) return <div style={{ fontSize: 18 }}>공지사항을 불러오는 중입니다...</div>;
  if (error) return <div style={{ color: "red", fontSize: 18 }}>{error}</div>;
  if (!notice) return null;

  return (
    <div style={{ width: "100%" }}>
      <div className="bg-[#6b46c1] text-white font-bold text-[17px] pl-5 py-[14px]">공지사항 - 조회</div>
      <div style={{ padding: "16px" }}>
        <p style={{ fontSize: "18px", marginBottom: 20 }}>회사 공지사항을 조회합니다.</p>
        <hr style={{ border: "none", borderTop: "1px solid #ccc", marginBottom: 24 }} />
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
          <tbody>
            <tr>
              <td style={cellStyleTitle}>제목</td>
              <td style={cellStyle}>{notice.notiTitle}</td>
            </tr>
            <tr>
              <td style={cellStyleTitle}>작성일자</td>
              <td style={cellStyle}>{new Date(notice.notiRegDate).toLocaleDateString("ko-KR").replace(/\.$/, "")}</td>
            </tr>
            <tr>
              <td style={cellStyleTitle}>수정일자</td>
              <td style={cellStyle}>
                {notice.notiUpdateDate
                  ? new Date(notice.notiUpdateDate).toLocaleDateString("ko-KR").replace(/\.$/, "")
                  : "-"}
              </td>
            </tr>
            <tr>
              <td style={cellStyleTitle}>작성자</td>
              <td style={cellStyle}>{notice.name || "-"}</td>
            </tr>
            <tr>
              <td style={cellStyleTitle}>공지 대상</td>
              <td style={cellStyle}>{notice.target || "전체"}</td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            whiteSpace: "pre-wrap",
            border: "1px solid #ddd",
            padding: 20,
            minHeight: 349,
            fontSize: 16,
          }}
        >
          {notice.notiContent}
        </div>
      </div>
      <div
        style={{
          marginTop: 40,
          backgroundColor: "#f0f0f0",
          padding: "20px 24px",
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
          width: "100%",
        }}
      >
        <button onClick={() => navigate("/intrasoltech/notices")} style={buttonStyle}>
          목록
        </button>
        <button onClick={() => navigate(`/intrasoltech/notices/edit/${notiNo}`)} style={buttonStyle}>
          수정
        </button>
        <button onClick={handleDelete} style={buttonStyle}>
          삭제
        </button>
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

export default NoticeRead;

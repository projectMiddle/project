import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createFreePost } from "../../api/board/noticeApi";
import useAuth from "../../hooks/useAuth";

const FreeBoardForm = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  console.log("✅ userInfo:", userInfo);

  const [formData, setFormData] = useState({
    frBdTitle: "", // ✅ 제목
    frBdContent: "", // ✅ 본문 내용
    empNo: "", // ✅ 사번
    deptNo: "", // ✅ 부서 번호
  });

  useEffect(() => {
    if (userInfo) {
      setFormData((prev) => ({
        ...prev,
        empNo: Number(userInfo.empNo),
        deptNo: Number(userInfo.deptNo),
        boardRegDate: new Date().toISOString(),
        boardUpdateDate: new Date().toISOString(),
      }));
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("📦 전송될 formData:", formData);

    try {
      await createFreePost(formData);
      alert("게시글이 등록되었습니다.");
      navigate("/intrasoltech/notices/freeboard/");
    } catch (err) {
      console.error("❌ 등록 실패!:", err.response?.data || err.message);
      alert("오류 발생: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="bg-[#6b46c1] text-white font-bold text-[17px] pl-5 py-[14px]">자유게시판 - 글 작성</div>
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
                    name="frBdTitle" // ✅ name 수정
                    value={formData.frBdTitle} // ✅ 바인딩된 값 수정
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </td>
              </tr>
              <tr>
                <td style={cellStyleTitle}>사원이름</td>
                <td style={cellStyle}>{userInfo?.name || "로딩 중..."}</td>
              </tr>
              <tr>
                <td style={cellStyleTitle}>부서명</td>
                <td style={cellStyle}>{userInfo?.deptNo || "로딩 중..."}</td>
              </tr>

              <tr>
                <td style={cellStyleTitle}>작성일자</td>
                <td style={cellStyle}>{new Date(formData.boardRegDate).toLocaleDateString("ko-KR")}</td>
              </tr>
              <tr>
                <td style={cellStyleTitle}>수정일자</td>
                <td style={cellStyle}>{new Date(formData.boardUpdateDate).toLocaleDateString("ko-KR")}</td>
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
              name="frBdContent" // ✅ name 수정
              value={formData.frBdContent} // ✅ 바인딩된 값 수정
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

// 스타일 정의
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

export default FreeBoardForm;

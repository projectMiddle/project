// ... 생략된 import는 그대로 두세요
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchFreePost, deleteFreePost } from "../../api/board/noticeApi";
import { fetchComments, createComment, deleteComment } from "../../api/board/commentApi";
import { useAuth } from "../../contexts/AuthContext";

const FreeBoardRead = () => {
  const { fbNo } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTarget, setReplyTarget] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [hoveredCommentId, setHoveredCommentId] = useState(null);

  useEffect(() => {
    if (!fbNo) {
      setError("유효하지 않은 게시글 접근입니다.");
      return;
    }

    const loadPost = async () => {
      try {
        const data = await fetchFreePost(fbNo);
        setPost(data);
      } catch (err) {
        setError("자유게시판 게시글을 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [fbNo]);

  useEffect(() => {
    if (fbNo) {
      fetchComments(fbNo)
        .then((res) => {
          setComments(res?.data || res); // ← 추가
        })
        .catch(() => {
          alert("댓글 불러오기 실패: 서버 권한 문제일 수 있습니다.");
        });
    }
  }, [fbNo]);

  const reloadComments = async () => {
    const res = await fetchComments(fbNo);
    setComments(res?.data || res); // ← 수정
  };

  const handleCreateComment = async (parentId = null, content = "") => {
    const actualContent = parentId ? content : newComment;
    if (!actualContent.trim()) return;

    const commentData = {
      freeBoardNo: Number(fbNo),
      empNo: Number(userInfo?.empNo),
      frBdCmtContent: actualContent,
      parentId: parentId, // ✅ 이 줄을 반드시 추가하세요
    };

    try {
      await createComment(fbNo, commentData);
      await reloadComments();
      if (parentId) {
        setReplyTarget(null);
        setReplyContent("");
      } else {
        setNewComment("");
      }
    } catch (err) {
      alert("댓글 등록 실패");
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm("게시글을 삭제하시겠습니까?")) return;
    try {
      await deleteFreePost(fbNo); // ← API 호출
      alert("게시글이 삭제되었습니다.");
      navigate("/intrasoltech/notices/freeboard"); // 목록으로 이동
    } catch (err) {
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      await deleteComment(commentId);
      await reloadComments();
    } catch (err) {
      alert("댓글 삭제 실패");
    }
  };

  if (loading) return <div style={{ fontSize: 18 }}>게시글을 불러오는 중입니다...</div>;
  if (error) return <div style={{ color: "red", fontSize: 18 }}>{error}</div>;
  if (!post) return null;

  // ✅ 댓글 렌더링
  const renderComments = (comments) => {
    const map = new Map();
    comments.forEach((c) => {
      const parent = c.parentId || null;
      if (!map.has(parent)) map.set(parent, []);
      map.get(parent).push(c);
    });

    const buildTree = (parentId = null, level = 0) => {
      return (map.get(parentId) || []).map((comment) => (
        <div key={comment.frCommentNo} style={{ marginBottom: 12, marginLeft: level * 20 }}>
          <div
            onMouseEnter={() => setHoveredCommentId(comment.frCommentNo)}
            onMouseLeave={() => setHoveredCommentId(null)}
            style={{
              position: "relative",
              backgroundColor: "#f9f9f9",
              padding: "7px 16px",
              borderRadius: "10px",
              border: "1px solid #eee",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
            }}
          >
            {/* 작성일자 (오른쪽 상단) */}
            <div style={{ position: "absolute", top: 8, right: 16, fontSize: 12, color: "#999" }}>
              {new Date(comment.frBdCmtRegDate).toLocaleString("ko-KR", {
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </div>

            {/* 이름 + 부서 + 내용 */}
            {/* 이름 + 부서 + 내용 */}
            <div style={{ fontSize: 15, color: "#333", marginBottom: 32 }}>
              <strong>
                {comment.name}
                <span style={{ fontSize: 14, color: "#888", marginLeft: 4 }}>({comment.deptName})</span>
              </strong>
              <span style={{ marginLeft: 50 }}>{comment.frBdCmtContent}</span>
            </div>

            {/* 버튼: 항상 자리를 차지하지만 hover 시에만 나타남 */}
            <div
              style={{
                position: "absolute",
                top: 32,
                right: 16,
                display: "flex",
                gap: "6px",
                ...(hoveredCommentId === comment.frCommentNo
                  ? fadeSlideStyle // ✅ 애니메이션 등장
                  : hiddenStyle), // ✅ 애니메이션 사라짐
              }}
            >
              <button onClick={() => setReplyTarget(comment.frCommentNo)} style={hoverButtonStyle}>
                답글
              </button>
              {userInfo?.name === comment.name && (
                <button onClick={() => handleDeleteComment(comment.frCommentNo)} style={hoverButtonStyle}>
                  삭제
                </button>
              )}
            </div>
          </div>

          {replyTarget === comment.frCommentNo && (
            <div style={{ marginTop: 10 }}>
              <textarea
                rows={3}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="대댓글을 입력하세요..."
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: 14,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                }}
              />
              <button
                onClick={() => handleCreateComment(comment.frCommentNo, replyContent)}
                style={{
                  marginTop: 6,
                  padding: "6px 12px",
                  fontSize: "13px",
                  borderRadius: "6px",
                  backgroundColor: "#f0f0f0",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
              >
                대댓글 작성
              </button>
            </div>
          )}

          {/* 대댓글 재귀 렌더링 */}
          {buildTree(comment.frCommentNo, level + 1)}
        </div>
      ));
    };

    return buildTree();
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="bg-[#6b46c1] text-white font-bold text-[17px] pl-5 py-[14px]">자유게시판 - 조회</div>

      <div style={{ padding: "16px", paddingBottom: "140px" }}>
        <p style={{ fontSize: "18px", marginBottom: 20 }}>자유게시판 글을 조회합니다.</p>
        <hr style={{ border: "none", borderTop: "1px solid #ccc", marginBottom: 24 }} />

        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
          <tbody>
            <tr>
              <td style={cellStyleTitle}>제목</td>
              <td style={cellStyle}>{post.frBdTitle}</td>
            </tr>
            <tr>
              <td style={cellStyleTitle}>작성일자</td>
              <td style={cellStyle}>{new Date(post.frBdRegDate).toLocaleDateString("ko-KR")}</td>
            </tr>
            <tr>
              <td style={cellStyleTitle}>수정일자</td>
              <td style={cellStyle}>
                {post.frBdUpdateDate ? new Date(post.frBdUpdateDate).toLocaleDateString("ko-KR") : "-"}
              </td>
            </tr>
            <tr>
              <td style={cellStyleTitle}>작성자</td>
              <td style={cellStyle}>{post.name || "-"}</td>
            </tr>
            <tr>
              <td style={cellStyleTitle}>작성 부서</td>
              <td style={cellStyle}>{post.deptName || "-"}</td>
            </tr>
          </tbody>
        </table>

        <div style={{ whiteSpace: "pre-wrap", border: "1px solid #ddd", padding: 20, minHeight: 349 }}>
          {post.frBdContent}
        </div>

        {/* 댓글 작성 */}
        {userInfo && (
          <div style={{ marginTop: 40 }}>
            <textarea
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: "15px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#fff",
                outlineColor: "#A855F7",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                resize: "none",
              }}
              placeholder="댓글을 입력하세요..."
            />
            <button
              onClick={() => handleCreateComment()}
              style={{
                marginTop: 10,
                padding: "10px 20px",
                backgroundColor: "#A855F7",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              댓글 작성
            </button>
          </div>
        )}

        {/* 댓글 목록 */}
        <div style={{ marginTop: 40 }}>
          <h3 style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>댓글</h3>
          {comments.length > 0 ? (
            renderComments(comments)
          ) : (
            <div style={{ color: "#999" }}>등록된 댓글이 없습니다.</div>
          )}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "290px",
          right: 0,
          backgroundColor: "#f0f0f0",
          padding: "20px 24px",
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
          borderTop: "1px solid #ccc",
          zIndex: 100,
        }}
      >
        <button onClick={() => navigate("/intrasoltech/notices/freeboard")} style={buttonStyle}>
          목록
        </button>
        <button onClick={() => navigate(`/intrasoltech/notices/freeboard/edit/${fbNo}`)} style={buttonStyle}>
          수정
        </button>
        <button onClick={handleDeletePost} style={buttonStyle}>
          삭제
        </button>
      </div>
    </div>
  );
};

// 스타일
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
const hoverButtonStyle = {
  fontSize: 12,
  padding: "4px 8px",
  border: "none",
  backgroundColor: "#eee",
  borderRadius: 4,
  cursor: "pointer",
  color: "#555",
  transition: "background-color 0.2s",
};

const buttonStyle = {
  padding: "8px 14px",
  border: "1px solid #ccc",
  backgroundColor: "#eee",
  borderRadius: 6,
  fontSize: "14px",
  cursor: "pointer",
};
const fadeSlideStyle = {
  transition: "opacity 0.3s ease, transform 0.3s ease",
  opacity: 1,
  transform: "translateY(0)",
};

const hiddenStyle = {
  transition: "opacity 0.3s ease, transform 0.3s ease",
  opacity: 0,
  transform: "translateY(-5px)",
  pointerEvents: "none", // 마우스 이벤트 방지
};

export default FreeBoardRead;

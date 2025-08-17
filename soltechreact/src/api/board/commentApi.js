// ✅ commentApi.js
import api from "../axios";

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ 경로 수정 완료: 백엔드 컨트롤러 기준
export const fetchComments = (boardNo) => api.get(`/intrasoltech/freeboard/${boardNo}/comments`);

export const createComment = (boardNo, commentData) =>
  api.post(`/intrasoltech/freeboard/${boardNo}/comments`, commentData);

export const deleteComment = (commentId) => api.delete(`/intrasoltech/freeboard/comments/${commentId}`);

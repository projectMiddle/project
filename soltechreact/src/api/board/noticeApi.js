import api from "../axios";

const API_HOST = "/intrasoltech/notices";

// 공지 리스트 조회
// noticeApi.js

export const fetchNoticeList = async (page, size, search) => {
  const response = await api.get(`${API_HOST}/list`, {
    params: {
      page,
      size,
      search,
    },
  });
  return response.data;
};

// 공지 삭제
export const deleteNotice = async (notiNo) => {
  const res = await api.delete(`${API_HOST}/${notiNo}`);
  return res.data;
};

// 공지 상세 조회
export const fetchNoticeDetail = async (notiNo) => {
  const res = await api.get(`${API_HOST}/${notiNo}`);
  return res.data;
};

// 공지 등록
export const createNotice = async (formData) => {
  const res = await api.post(`${API_HOST}/create`, formData, {
    headers: { "Content-Type": "application/json" }, // 또는 multipart/form-data 상황에 따라 조정
  });
  return res.data;
};

// 공지 수정
export const updateNotice = async (id, formData) => {
  const res = await api.put(`${API_HOST}/${id}`, formData, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

// 공지사항 하나 불러오기
export const getNoticeById = async (id) => {
  const res = await api.get(`${API_HOST}/${id}`);
  return res.data;
};

// ============================== freeboard ==============================

// 1. 공통 경로 변수
const FREEBOARD_API_HOST = "/intrasoltech/freeboard"; // ✅ 변경된 경로로 설정

// 2. 글 목록 조회
export const fetchFreeBoardList = async (page, size, search) => {
  const response = await api.get(`${FREEBOARD_API_HOST}`, {
    params: { page, size, search },
  });
  return response.data;
};

// 3. 글 상세 조회
export const fetchFreePost = async (freeNo) => {
  const response = await api.get(`${FREEBOARD_API_HOST}/${freeNo}`);
  return response.data;
};

// 4. 글 등록
export const createFreePost = async (formData) => {
  const response = await api.post(`${FREEBOARD_API_HOST}/create`, formData);
  return response.data;
};

// 5. 글 수정
export const updateFreePost = async (freeNo, formData) => {
  const response = await api.put(`${FREEBOARD_API_HOST}/${freeNo}`, formData);
  return response.data;
};

// 6. 글 삭제
export const deleteFreePost = async (freeNo) => {
  const response = await api.delete(`${FREEBOARD_API_HOST}/${freeNo}`);
  return response.data;
};

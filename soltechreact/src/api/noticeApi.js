import api from "./axios";

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

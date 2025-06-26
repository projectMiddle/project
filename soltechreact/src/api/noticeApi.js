import axios from "axios";

const API_HOST = "http://localhost:8080/notices";

// 공지 리스트 조회
// noticeApi.js

export const fetchNoticeList = async (page, size, search) => {
  const response = await axios.get(`${API_HOST}/list`, {
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
  const res = await axios.delete(`${API_HOST}/${notiNo}`);
  return res.data;
};

// 공지 상세 조회
export const fetchNoticeDetail = async (notiNo) => {
  const res = await axios.get(`${API_HOST}/${notiNo}`);
  return res.data;
};

// 공지 등록
export const createNotice = async (formData) => {
  const res = await axios.post(`${API_HOST}/create`, formData, {
    headers: { "Content-Type": "application/json" }, // 또는 multipart/form-data 상황에 따라 조정
  });
  return res.data;
};

// 공지 수정
export const updateNotice = async (id, formData) => {
  const res = await axios.put(`${API_HOST}/${id}`, formData, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

// 공지사항 하나 불러오기
export const getNoticeById = async (id) => {
  const res = await axios.get(`${API_HOST}/${id}`);
  return res.data;
};

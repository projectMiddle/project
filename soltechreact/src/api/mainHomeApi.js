import axios from "axios";
import api from "./axios";

const JOBS_API = "/apply/recruit";

// =================================== FAQ ===================================
export const getFAQList = async (page, size, category, keyword = "") => {
  const res = await api.get(`/faq`, {
    params: { page, size, category, keyword },
  });
  return res.data;
};

// =================================== 채용 ===================================
// 리스트
export const getJobsList = async (page, size) => {
  const res = await api.get(`${JOBS_API}`, {
    params: { page, size },
  });
  return res.data;
}

// 상세조회
export  const getJobDetail = async (jobsNo) => {
  const res = await api.get(`${JOBS_API}/${jobsNo}`);
  return res.data;
}

// 생성
export const createJob = async (dto) => {
  const res = await api.post(`${JOBS_API}/add`, dto);
  return res.data;
}

// 수정
export const updateJob = async (jobsNo, payload) => {
  const res = await api.put(`${JOBS_API}/edit/${jobsNo}`, payload);
  return res.data;
}

// 삭제
export const deleteJob = async (jobsNo) => {
  const res = await api.delete(`${JOBS_API}/delete/${jobsNo}`);
  return res.data;
}
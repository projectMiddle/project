import axios from "axios";
import api from "./axios";

export const API_SERVER_HOST = "/intrasoltech/mail";

// 메일 발송 + 첨부 파일 생성 요청
export const postMail = async (empNo, formData) => {
  const res = await api.post(`${API_SERVER_HOST}/send`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    params: { senderEmpNo: empNo },
  });
  return res.data;
};

// 파일 삭제 요청
export const deleteMailFile = async (fileName) => {
  const res = await api.post(`${API_SERVER_HOST}/removeFile`, null, {
    params: { filename: fileName },
  });
  return res.data;
};

// 받은 메일 목록 조회
export const getReceivedMails = async (empNo) => {
  const res = await api.get(`${API_SERVER_HOST}/receiveList`, {
    params: { empNo },
  });
  return res.data;
};

// 보낸 메일 목록 확인
export const getSendMails = async (empNo) => {
  const res = await api.get(`${API_SERVER_HOST}/sendList`, {
    params: { empNo },
  });
  return res.data;
};

//읽음 표시
export const markMailAsRead = async (mailNo, empNo) => {
  await api.post(`${API_SERVER_HOST}/read`, null, {
    params: { mailNo, empNo },
  });
};

// 받은 메일 삭제
export const deleteReceivedMail = async (mailNo, empNo) => {
  await api.delete(`${API_SERVER_HOST}/receiveDelete`, {
    params: { mailNo, empNo },
  });
};

// 받은 / 보낸 메일 상세
export const getMailDetail = async (isReceiveView, mailNo, empNo) => {
  const endpoint = isReceiveView ? "/receiveDetail" : "/sendDetail";
  const params = isReceiveView ? { mailNo, empNo } : { mailNo };
  const res = await api.get(`${API_SERVER_HOST}${endpoint}`, { params });
  return res.data;
};

// 첨부파일 조회
export const getMailAttachments = async (mailNo) => {
  const res = await api.get(`${API_SERVER_HOST}/attachments`, {
    params: { mailNo },
  });
  return res.data;
};
// 첨부파일 다운로드
export const getDownloadUrl = (mailNo, fileName) => {
  return `${API_SERVER_HOST}/download?mailNo=${mailNo}&fileName=${encodeURIComponent(fileName)}`;
};

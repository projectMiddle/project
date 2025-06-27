import api from "./axios";

// 공통 base URL
export const ATT_API_HOST = "intrasoltech/attendance";

// 출근 데이터 불러오기 함수
export const fetchAttendanceList = async (empNo, year, month) => {
  const res = await api.get(`${ATT_API_HOST}/list/${empNo}`, {
    params: { year, month },
  });
  return res.data;
};

// information 불반짝
export const fetchAttendanceStatus = async (empNo) => {
  const res = await api.get(`${ATT_API_HOST}/user/info/${empNo}`);
  return res.data;
};

// 모달 사원
export const fetchWorkingStatus = async (empNo) => {
  const res = await api.get(`${ATT_API_HOST}/working/${empNo}`);
  return res.data;
};
export const loginAttendance = async (empNo) => {
  const res = await api.post(`${ATT_API_HOST}/login/${empNo}`);
  return res.data;
};

// 퇴근 처리 API
export const logoutAttendance = async (empNo) => {
  const res = await api.post(`${ATT_API_HOST}/logout/${empNo}`);
  return res.data;
};

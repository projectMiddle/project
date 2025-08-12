import api from "./axios";

export const API_SERVER_HOST = "/intrasoltech/information";

export const fetchAllEmployeeInfo = async (empNo) => {
  const res = await api.get(`${API_SERVER_HOST}/all/${empNo}`);
  return res.data;
};

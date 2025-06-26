import api from "./axios";
export const ATT_API_HOST = "/intrasoltech/empinfo";

export const fetchEmployeeInfo = async (empNo) => {
  const res = await api.get(`${ATT_API_HOST}/${empNo}`);
  return res.data;
};

export const updateEmployeeInfo = async (empNo, formData) => {
  const res = await api.put(`${ATT_API_HOST}/${empNo}`, formData);
  return res.data;
};

export const fetchAllEmployees = async () => {
  const res = await api.get(`${ATT_API_HOST}/search`);
  return res.data;
};

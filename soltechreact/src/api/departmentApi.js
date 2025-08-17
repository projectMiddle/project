export const API_SERVER_HOST = "/intrasoltech/department";
import api from "./axios";

export const getDepartments = async () => {
  const res = await api.get(`${API_SERVER_HOST}/list`);
  return res.data;
};

export const getEmployeesByDepartment = async (deptNo) => {
  const res = await api.get(`${API_SERVER_HOST}/list/${deptNo}`);
  return res.data;
};

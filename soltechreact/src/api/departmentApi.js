export const API_SERVER_HOST = "/intrasoltech/department";
import api from "./axios";

export const getDepartments = async () => {
  const res = await api.get(`${API_SERVER_HOST}/list`);
  console.log("부서 res : ", res);
  return res.data;
};

export const getEmployeesByDepartment = async (deptNo) => {
  console.log("부서별 사원 조회 요청:", deptNo);
  const res = await api.get(`${API_SERVER_HOST}/list/${deptNo}`);
  return res.data;
};

export const API_SERVER_HOST = "/intrasoltech/department";

export const getDepartments = async () => {
  const res = await fetch(`${API_SERVER_HOST}/list`);
  if (!res.ok) throw new Error("부서 조회 실패");
  return res.json();
};

export const getEmployeesByDepartment = async (deptNo) => {
  console.log("부서별 사원 조회 요청:", deptNo);
  const res = await fetch(`${API_SERVER_HOST}/list/${deptNo}`);
  if (!res.ok) throw new Error("부서별 사원 조회 실패");
  return res.json();
};

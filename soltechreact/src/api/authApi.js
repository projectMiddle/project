import api from "./axios";

// 로그인 api
export const login = async ({ loginType, email, empNo, password, jobNo, deptNo, eEmail, eName }) => {
  const payload = {
    loginType,
    password,
    jobNo,
    deptNo,
    eEmail,
    eName,
  };

  if (loginType === "member") {
    payload.email = email;
  } else if (loginType === "employee") {
    payload.empNo = empNo;
  }

  const res = await api.post(`/api/auth/login`, payload);
  return res.data; // 여기서 accessToken, refreshToken 포함된 응답 객체 리턴됨
};

// 로그아웃
export const logoutMember = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("username");
};

// 회원가입 api
export const registerMember = async (memberData) => {
  const res = await api.post(`/api/auth/member/signup`, memberData);
  return res.data;
};

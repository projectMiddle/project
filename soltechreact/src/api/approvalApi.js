import api from "./axios";

export const API_SERVER_HOST = "/intrasoltech/approval";

// 결재 서류 리스트 요청
// export const fetchApprovalList = async (status = "all", page = 1, size = 10) => {
//   const res = await axios.get(`${API_SERVER_HOST}/list`, {
//     params: { status, page, size },
//     // 추후 empNo 삭제 예정, jwt 토큰 연동시
//   });
//   return res.data;
// };

// ============================ 테스트용 : 결재 서류 리스트 요청 ============================
export const fetchApprovalList = async (status, page, size, empNo) => {
  const res = await api.get(`${API_SERVER_HOST}/list`, {
    params: { status, page, size, empNo },
    // 추후 empNo 삭제 예정, jwt 토큰 연동시
  });
  return res.data;
};
// ============================ 테스트용 : 결재 서류 리스트 요청 ============================

// 결재 서류 + 첨부 파일 생성 요청
export const postApproval = async (empNo, formData) => {
  const res = await api.post(`${API_SERVER_HOST}/create/${empNo}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// 파일 삭제 요청
export const removeAppFile = async (fileName) => {
  const res = await api.post(`${API_SERVER_HOST}/removeFile`, null, {
    params: { filename: fileName },
  });
  return res.data;
};

const API_URL = "/api/employees";

// 전체 사원 목록 조회 요청
export const appLineEmployees = async () => {
  const res = await api.get(`${API_SERVER_HOST}/employees`);
  return res.data;
};

// 결재선 저장 요청
export const postApprovalLine = async (appDocNo, approvers, references) => {
  const payload = {
    appDocNo,
    approvers: approvers.map((a, i) => ({
      empNo: a.empNo,
      appRoleJobNo: a.job,
      appRoleType: "APPROVER",
      appOrder: i + 1,
    })),
    references: references.map((r) => ({
      empNo: r.empNo,
      appRoleJobNo: r.job,
      appRoleType: "REFERENCE",
      appOrder: null,
    })),
  };

  const response = await api.post(`${API_SERVER_HOST}/line`, payload); // 주소 직접 작성
  return response.data;
};

// 결재서류 상세정보 요청
export const fetchApprovalDetail = async (appDocNo) => {
  const res = await api.get(`${API_SERVER_HOST}/detail/${appDocNo}`);
  return res.data;
};

// 결재 처리 요청 (승인/반려)
export const processApproval = async ({ appDocNo, empNo, status, comment }) => {
  const payload = { appDocNo, empNo, status, comment };
  const res = await api.post(`${API_SERVER_HOST}/process/${appDocNo}`, payload);
  return res.data;
};

// 삭제 요청
export const deleteApproval = async (appDocNo) => {
  const response = await api.delete(`${API_SERVER_HOST}/delete/${appDocNo}`);
  return response.data;
};

// 배지용 카운트 요청
export const fetchApprovalCategoryCounts = async (empNo) => {
  const res = await api.get(`${API_SERVER_HOST}/categorycount`, {
    params: { empNo },
  });
  return res.data;
};

import api from "./axios";

export const API_SERVER_HOST = "/intrasoltech/pay";

export const getPayList = ({ empNo, year, month }) =>
  api.get(`${API_SERVER_HOST}/list`, {
    params: { empNo, year, month },
    Pragma: "no-cache",
  });

export const getPayDetail = (payNo) => api.get(`${API_SERVER_HOST}/${payNo}`);

export const calculatePay = ({ empNo, payMonth, payBaseSalary }) =>
  api.post(`${API_SERVER_HOST}/calculate`, {
    empNo,
    payMonth,
    payBaseSalary,
  });

export const createPay = (payData) => api.post(`${API_SERVER_HOST}/create`, payData);

export const getEmployee = (empNo) => api.get(`${API_SERVER_HOST}/employee/${empNo}`);

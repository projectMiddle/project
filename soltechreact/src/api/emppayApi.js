import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080/pay";

export const getPayList = ({ empNo, year, month }) =>
  axios.get(`${API_SERVER_HOST}/list`, {
    params: { empNo, year, month },
    Pragma: "no-cache",
  });

export const getPayDetail = (payNo) => axios.get(`${API_SERVER_HOST}/${payNo}`);

export const calculatePay = ({ empNo, payMonth, payBaseSalary }) =>
  axios.post(`${API_SERVER_HOST}/calculate`, {
    empNo,
    payMonth,
    payBaseSalary,
  });

export const createPay = (payData) => axios.post(`${API_SERVER_HOST}/create`, payData);

export const getEmployee = (empNo) => axios.get(`${API_SERVER_HOST}/employee/${empNo}`);

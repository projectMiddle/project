import api from "./axios";
import axios from "axios";

export const API_SERVER_HOST = "/intrasoltech/mall";

// 사원 정보(전화번호)
export const getEmployeeMobile = async (empNo) => {
  const { data } = await api.get(`/intrasoltech/empinfo/${empNo}`);
  // 응답 키가 emobile/eMobile/E_MOBILE 등일 수 있으니 다 커버
  const raw = data?.emobile ?? data?.eMobile ?? data?.E_MOBILE ?? data?.mobile ?? data?.phone ?? "";
  return String(raw).replace(/\D/g, ""); // 숫자만
};

// 상품 목록 조회
export const getProductList = async () => {
  const res = await api.get(`${API_SERVER_HOST}/products`);
  return res.data;
};

// 상품 상세 조회
export const getProductDetail = async (productId) => {
  const res = await api.get(`${API_SERVER_HOST}/products/${productId}`);
  return res.data;
};

// 주문 생성
export const createOrder = async (empNo) => {
  const res = await api.post(`${API_SERVER_HOST}/orders/${empNo}`);
  return res.data;
};

// 주문 목록 조회
export const getOrderList = async (empNo) => {
  const res = await api.get(`${API_SERVER_HOST}/orders/list/${empNo}`);
  return res.data;
};

// 주문 상세 조회
export const getOrderDetail = async (empNo, orderId) => {
  const res = await api.get(`${API_SERVER_HOST}/orders/${empNo}/${orderId}`);
  return res.data;
};

// 주문 취소
export const cancelOrder = async (orderId) => {
  await api.delete(`${API_SERVER_HOST}/orders/${orderId}`);
};

// 장바구니 생성
export const addCart = async (productId, empNo, quantity) => {
  const res = await api.post(`${API_SERVER_HOST}/cart`, null, {
    params: { productId, empNo, quantity },
  });
  return res.data;
};

// 장바구니 조회
export const getCartList = async (empNo) => {
  const res = await api.get(`${API_SERVER_HOST}/cart/${empNo}`);
  return res.data;
};

// 장바구니 항목 삭제
export const deleteCart = async (empNo, cartItemIdList) => {
  await api.delete(`${API_SERVER_HOST}/cart/${empNo}`, {
    params: {
      cartItemId: cartItemIdList,
    },
    paramsSerializer: (params) => {
      return params.cartItemId.map((id) => `cartItemId=${id}`).join("&");
    },
  });
};

// 장바구니 비우기
export const clearCart = async (empNo) => {
  await api.delete(`${API_SERVER_HOST}/cart/clear/${empNo}`);
};

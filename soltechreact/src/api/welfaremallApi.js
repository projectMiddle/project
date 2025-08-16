import api from "./axios";

export const WELFARE_API_HOST = "/intrasoltech/mall";

// ========================
// 📦 상품 관련
// ========================

export const getAllProducts = () => api.get(`${WELFARE_API_HOST}/products`);

export const getProductById = (productId) => api.get(`${WELFARE_API_HOST}/products/${productId}`);

// ========================
// 🛒 장바구니 관련 (추후 서버 연동 시 사용)
// ========================

// 저장된 장바구니 불러오기
export const getCartItems = (empNo) => api.get(`${WELFARE_API_HOST}/cart/${empNo}`);

// 장바구니에 상품 추가
export const addToCart = (empNo, productData) => api.post(`${WELFARE_API_HOST}/cart/${empNo}`, productData);

// 장바구니에서 상품 삭제
export const removeCartItem = (empNo, productId) => api.delete(`${WELFARE_API_HOST}/cart/${empNo}/${productId}`);

// ========================
// 💳 주문 관련
// ========================

// 주문 생성
export const createOrder = (orderData) => api.post(`${WELFARE_API_HOST}/orders`, orderData);

// 주문 상세 조회
export const getOrderDetail = (orderId) => api.get(`${WELFARE_API_HOST}/orders/${orderId}`);

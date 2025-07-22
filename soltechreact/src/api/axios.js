import axios from "axios";

const API_SERVER_HOST = "http://localhost:8080";
const api = axios.create({
  baseURL: API_SERVER_HOST,
  withCredentials: true,
});

// 요청 시 accessToken 자동 첨부
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 - accessToken 만료 시 자동 재발급
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // accessToken이 만료됐고, 재시도한 적 없고, refreshToken 존재하면
    if (error.response?.status === 401 && !originalRequest._retry && localStorage.getItem("refreshToken")) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(`${API_SERVER_HOST}/api/auth/reissue`, {
          refreshToken: localStorage.getItem("refreshToken"),
        });

        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // 새 토큰으로 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // refresh 실패 → 토큰 삭제 후 로그인으로 이동
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        const currentPath = window.location.pathname;
        if (!currentPath.includes("/login")) {
          alert("로그인이 필요합니다.");
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

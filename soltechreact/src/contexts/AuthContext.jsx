import React, { createContext, useContext, useState, useEffect } from "react";

// 토큰 파싱 유틸
const parseJwt = (token) => {
  if (!token || typeof token !== "string") return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null; // JWT는 3개의 부분으로 구성되어야 함
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));
    return payload;
  } catch (e) {
    console.error("JWT 파싱 실패:", e);
    return null;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // 이메일, 역할 등
  const [isAuthReady, setIsAuthReady] = useState(false); // 로그인 여부 상태

  // 토큰 기반 로그인 상태 초기화 (F5 이후에도 유지)
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("userInfo"); // 사용자 정보 가져옴

    console.log("🟡 [AuthContext] accessToken:", token); // ✅ 토큰 확인
    console.log("🟡 [AuthContext] userInfo(raw):", storedUser);

    if (token && storedUser) {
      setIsLoggedIn(true);
      try {
        setUserInfo(JSON.parse(storedUser)); // JSON → 객체 변환
      } catch (e) {
        console.error("userInfo 파싱 에러", e);
        setUserInfo(null);
      }
    } else {
      setIsLoggedIn(false);
      setUserInfo(null);
    }

    setIsAuthReady(true); // 초기화 완료
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userInfo, setUserInfo, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅
export const useAuth = () => useContext(AuthContext);

// ✅ 여기 이거 필수!!
export { AuthContext };

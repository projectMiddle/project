import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

// JWT Payload 파싱 함수
const parseJwt = (token) => {
  if (!token) return null;
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));
    return payload;
  } catch (e) {
    return null;
  }
};

export default function OAuth2Success() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserInfo } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const payload = parseJwt(accessToken);
      if (payload) {
        setUserInfo({
          email: payload.sub,
          role: payload.roles?.[0],
        });
        setIsLoggedIn(true);
      }

      alert("구글 로그인 성공");
      navigate("/"); // 홈으로 이동
    } else {
      alert("로그인 실패: 토큰이 전달되지 않았습니다");
      navigate("/login");
    }
  }, [navigate, setIsLoggedIn, setUserInfo]);

  return null;
}

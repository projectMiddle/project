import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// 보호 라우트 컴포넌트  : 로그인 여부 + 권한 체크
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isLoggedIn, userInfo, isAuthReady } = useAuth();
  const location = useLocation();

  if (!isAuthReady) return null; // 로딩 중이면 아무것도 안 보여줌
  // 로그인 안 돼 있으면 → 로그인 페이지로
  if (!isLoggedIn || !userInfo) {
    console.warn("⛔ 로그인 필요: 인증 정보 없음");
    return <Navigate to="/employee/login" state={{ from: location }} replace />;
  }

  // ✅ 권한 확인 / 로그인은 했지만 권한이 다르면 → 접근 거부 페이지로
  if (requiredRole && userInfo.role !== requiredRole) {
    console.warn(`⛔ 접근 불가: 필요한 권한은 [${requiredRole}], 현재 권한은 [${userInfo.role}]`);
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ 통과
  return children;
};

export default ProtectedRoute;

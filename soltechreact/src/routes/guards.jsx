// src/routes/guards.jsx
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export function RequireDept201({ children }) {
  const { userInfo, loading } = useAuth();
  if (loading || userInfo === undefined) return null; // 스피너 OK
  if (!userInfo) return <Navigate to="/login" replace />;
  return Number(userInfo.deptNo) === 201 ? children : <Navigate to="/intrasoltech/emppay" replace />;
}

// src/hooks/useIsHR.js
import useAuth from "../hooks/useAuth";
export default function useIsHR() {
  const { userInfo } = useAuth();
  return Number(userInfo?.deptNo) === 201;
}

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi"; // 로그인 함수 호출
import useAuth from "../../hooks/useAuth"; // 전역 상태 훅 추가

export default function MainEmployeeLogin() {
  const [empNo, setEmpNo] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn, setUserInfo } = useAuth(); // 전역 상태 설정 함수
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // 이전 경로 or 루트

  const handleLogin = async () => {
    try {
      const res = await login({
        loginType: "employee",
        empNo,
        password,
      });

      localStorage.setItem("accessToken", res.data.accessToken); // JWT 토큰 저장
      localStorage.setItem("refreshToken", res.data.refreshToken);

      // ✅ 사용자 정보 객체 만들기
      const user = {
        name: res.data.eName,
        empNo: res.data.empNo,
        deptNo: res.data.deptNo,
        jobNo: res.data.jobNo,
        email: res.data.eEmail,
        role: "EMPLOYEE",
      };
      setIsLoggedIn(true); // 로그인 상태 true
      setUserInfo(user);
      localStorage.setItem("userInfo", JSON.stringify(user)); // localStorage에도 저장

      // 리디렉션
      navigate(from, { replace: true }); //  원래 가려던 곳으로
    } catch (error) {
      alert("로그인 실패");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 pt-[100px] pb-[100px]">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">직원 로그인</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">사원 번호</label>
          <input
            type="email"
            placeholder="사원번호를 입력하세요"
            className="w-full border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={empNo}
            onChange={(e) => setEmpNo(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="w-full border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          className="cursor-pointer w-full bg-purple-400 hover:bg-purple-500 text-white font-semibold py-2 rounded-md transition"
        >
          로그인
        </button>
      </div>

      <img src="/mainImages/soltech_character_3d.png" alt="Character" className="w-80 mt-7" />
    </div>
  );
}

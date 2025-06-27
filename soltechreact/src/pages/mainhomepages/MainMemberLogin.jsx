import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";
import useAuth from "../../hooks/useAuth"; // 전역 상태 훅 추가

export default function MainMemberLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn, setUserInfo } = useAuth(); // 전역 상태 설정 함수

  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // 이전 경로 or 루트

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({
        loginType: "member",
        email,
        password,
      });

      localStorage.setItem("accessToken", res.data.accessToken); // JWT 토큰 저장
      localStorage.setItem("refreshToken", res.data.refreshToken);
      setIsLoggedIn(true); // 로그인 상태 true
      setUserInfo({
        name: res.data.name,
        email: res.data.email,
        role: "MEMBER", // 역할 지정
      });

      // 리디렉션 -> 로그인 후 이동
      navigate(from, { replace: true }); // 🔥 원래 가려던 곳으로
    } catch (error) {
      alert("로그인 실패");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 pt-[100px] pb-[100px]">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">회원 로그인</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            className="w-full border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-end text-sm text-purple-500 mb-4">
          <Link to="/yongjae/mainempty" className="hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          onClick={handleLogin}
          className="cursor-pointer w-full bg-purple-400 hover:bg-purple-500 text-white font-semibold py-2 rounded-md transition"
        >
          Sign in
        </button>

        <div className="my-6 text-center text-sm text-gray-500">Or Continue With</div>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => (window.location.href = "http://localhost:8080/oauth2/authorization/google")}
            className="cursor-pointer w-64 border border-purple-300 rounded-full py-2 flex items-center justify-center gap-2 hover:bg-purple-50 transition"
          >
            <img src="/mainImages/google_logo.png" alt="Google" className="w-5 h-5" />
            <span className="text-sm text-gray-700">Continue with Google</span>
          </button>
        </div>

        <div className="text-center text-sm text-gray-500">
          Don’t have an account?
          <Link to="/signup" className="text-purple-500 hover:underline ml-1">
            Sign up
          </Link>
        </div>
      </div>

      <img src="/mainImages/soltech_character_3d.png" alt="Character" className="w-80 mt-7" />
    </div>
  );
}

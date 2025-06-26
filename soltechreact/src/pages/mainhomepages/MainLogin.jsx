import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
export default function MainLogin() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 pt-[100px] pb-[100px]">
      <h1 className="text-3xl font-bold mb-8">봉봉</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/employee/login")}
          className="bg-purple-400 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-2xl shadow-md transition duration-300"
        >
          직원 로그인
        </button>
        <button
          onClick={() => navigate("/member/login")}
          className="bg-purple-400 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-2xl shadow-md transition duration-300"
        >
          회원 로그인
        </button>
      </div>
      <img src="/mainImages/soltech_character_3d.png" alt="Character" className="w-80 mt-7" />
    </div>
  );
}

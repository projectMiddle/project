import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerMember } from "../../api/authApi";

export default function MainSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== password2) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const memberData = {
        mName: name,
        mEmail: email,
        mPassword: password,
        mMobile: phone,
        mBirthday: birthday,
        mAddress: address,
        mGender: gender, // 반드시 "MALE" 또는 "FEMALE"
      };
      console.log("memberData", memberData);
      await registerMember(memberData);
      alert("회원가입 성공!");
      navigate("/member/login");
    } catch (err) {
      const errorMsg = err.response?.data?.message || JSON.stringify(err.response?.data) || "서버 오류";
      alert("회원가입 실패: " + errorMsg);
    }
  };

  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/[^0-9]/g, "");
    if (input.length > 3 && input.length <= 7) {
      input = input.slice(0, 3) + "-" + input.slice(3);
    } else if (input.length > 7) {
      input = input.slice(0, 3) + "-" + input.slice(3, 7) + "-" + input.slice(7, 11);
    }
    setPhone(input);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 pt-[100px] pb-[100px]">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">회원가입</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-purple-300 rounded-md px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            className="w-full border border-purple-300 rounded-md px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your Password"
            className="w-full border border-purple-300 rounded-md px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full border border-purple-300 rounded-md px-3 py-2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            placeholder="000-0000-0000"
            className="w-full border border-purple-300 rounded-md px-3 py-2"
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Birthday</label>
          <input
            type="date"
            className="w-full border border-purple-300 rounded-md px-3 py-2"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            placeholder="Enter your address"
            className="w-full border border-purple-300 rounded-md px-3 py-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Gender</label>
          <div className="flex space-x-4">
            <button
              type="button"
              className={`w-full border rounded-md py-2 ${
                gender === "MALE" ? "bg-purple-400 text-white" : "bg-white text-black"
              }`}
              onClick={() => setGender("MALE")}
            >
              Male
            </button>
            <button
              type="button"
              className={`w-full border rounded-md py-2 ${
                gender === "FEMALE" ? "bg-purple-400 text-white" : "bg-white text-black"
              }`}
              onClick={() => setGender("FEMALE")}
            >
              Female
            </button>
          </div>
        </div>

        <button
          onClick={handleRegister}
          className="cursor-pointer w-full bg-purple-400 hover:bg-purple-500 text-white font-semibold py-2 rounded-md transition"
        >
          가입
        </button>

        <div className="my-6 text-center text-sm text-gray-500">Or Continue With</div>

        <div className="text-center text-sm text-gray-500">
          이미 아이디가 있으신가요?
          <Link to="/member/login" className="text-purple-500 hover:underline ml-1">
            Sign In
          </Link>
        </div>
      </div>

      <img src="/mainImages/soltech_character_3d.png" alt="Character" className="w-80 mt-7" />
    </div>
  );
}

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import TopBar from "../Components/TopBar";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const auth = getAuth();
  const register = async (email: string, password: string) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert("이메일이 유효하지 않습니다.");
    }
    register(email, password);
  };
  return (
    <div>
      <TopBar />
      <div className="text-center mt-32 ">
        <h2 className="text-3xl mb-10">로그인</h2>
        <form
          onSubmit={onSubmit}
          className="border border-gray-400 w-96  h-72 mx-auto"
        >
          <div className="mt-20">
            <label className="w-24 ">이메일:</label>
            <input
              className="w-48"
              type="email"
              placeholder="이메일을 입력해 주세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="w-24 ">비밀번호:</label>
            <input
              className="w-48"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              min={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="mt-4">
            로그인
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

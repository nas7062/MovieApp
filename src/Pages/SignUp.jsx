import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import TopBar from "../Components/TopBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const auths = getAuth();
  const navigate = useNavigate();
  const register = async (email, password,name) => {
    try {
      const auth = getAuth();
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const User =user.user;

      await updateProfile(User,{
        displayName : name
      })
      navigate('/login')
    } catch (error) {
      alert(error.message);
    }

  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert("이메일이 유효하지 않습니다.")
    }
    register(email, password,name);
  }

  return (
    <div>
      <TopBar />
      <div className="text-center mt-32 ">
        <form onSubmit={onSubmit} className="border border-gray-400 w-96  h-72 mx-auto">
          <div className="mt-20">
            <label className="w-24 ">이메일:</label>
            <input className="w-48" type="email" placeholder="이메일을 입력해 주세요." value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mt-4">
            <label className="w-24 ">이름:</label>
            <input className="w-48" type="text" placeholder="이름을 입력해주세요." value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mt-4">
            <label className="w-24 ">비밀번호:</label>
            <input className="w-48" type="password" placeholder="비밀번호를 입력해주세요." min={8} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="mt-4">회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
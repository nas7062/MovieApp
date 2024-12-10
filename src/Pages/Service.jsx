import { useEffect, useState } from "react";
import Notice from "../Components/Notice";
import TopBar from "../Components/TopBar";
import Inquiry from "../Components/Inquiry";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

const Service = () => {
  const [select, setSelect] = useState(0);
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(0);
  const navigate = useNavigate();
  const SelectHandler = (idx) => {
    if (idx === 1 && !currentUser) {
      navigate("/login");
    } else {
      setSelect(idx);
    }
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, [auth]);
  console.log(select);
  return (
    <div>
      <TopBar />
      <h2 className="text-center text-4xl mt-10">고객센터</h2>
      <div className="flex w-2/5 mx-auto  mt-20">
        <div onClick={() => SelectHandler(0)}>
          <span className="bg-gray-400 w-96 inline-block text-center cursor-pointer border-r border-black">자주찾는 질문</span>
        </div>
        <div onClick={() => SelectHandler(1)}>
          <span className="bg-gray-400 w-96 inline-block text-center cursor-pointer">1:1 문의</span>
        </div>
      </div>
      {select === 0 ? <Notice /> : <Inquiry />}
      <Footer/>
    </div>
  );
}
export default Service;
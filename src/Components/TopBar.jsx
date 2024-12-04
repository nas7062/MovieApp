import { RiLoginBoxFill } from "react-icons/ri";
import { HiUserPlus } from "react-icons/hi2";
import { IoPeople } from "react-icons/io5";
import { MdOutlineWifiTetheringErrorRounded } from "react-icons/md";
import NavBar from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const TopBar = () => {
  const auth = getAuth();
  const Logout = async () => {
    try {
      await auth.signOut();
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }

  }


  return (
    <div className="max-w-screen-lg my-0 mx-auto ">
      <div className="text-red-600 text-5xl tracking-tighter  mt-2 font-bold pl-6 inline-block  cursor-pointer">
        <Link to="/">
          10012
        </Link>
      </div>
      <span className="text-gray-500 text-2xl tracking-wider font-bold pl-6 inline-block">
        MOVIE APP
      </span>
      <div className="flex float-right pt-3  text-sm font-bold">
        <div className="pr-10 flex flex-col items-center cursor-pointer">
          {auth.currentUser ? (<div onClick={() => Logout()}>
            <RiLoginBoxFill size={32} />
            <p >로그아웃</p>
          </div>) :
            <Link to="/login">
              <RiLoginBoxFill size={32} />
              <p>로그인</p>
            </Link>}
        </div>
        <div className="pr-10 flex flex-col items-center  cursor-pointer">
          <Link to="/signup">
            <HiUserPlus size={32} />
            <span>회원 가입</span>
          </Link>
        </div>
        <div className="pr-10 flex flex-col items-center  cursor-pointer">
          <Link to="/myPage">
            <IoPeople size={32} />
            마이 페이지
          </Link>
        </div>
        <div className="pr-10 flex flex-col items-center  cursor-pointer">
          <Link to="/service">
            <MdOutlineWifiTetheringErrorRounded size={32} />
            고객 센터
          </Link>
        </div>
      </div>
      <NavBar />
    </div>

  );
};
export default TopBar;

import { RiLoginBoxFill } from "react-icons/ri";
import { HiUserPlus } from "react-icons/hi2";
import { IoPeople } from "react-icons/io5";
import { MdOutlineWifiTetheringErrorRounded } from "react-icons/md";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="max-w-screen-lg my-0 mx-auto ">
      <div className="text-red-600 text-5xl tracking-tighter  mt-2 font-bold pl-6 inline-block  cursor-pointer">
        <Link to ="/">
          10012
        </Link>
      </div>
      <span className="text-gray-500 text-2xl tracking-wider font-bold pl-6 inline-block">
        MOVIE APP
      </span>
      <div className="flex float-right pt-3  text-sm font-bold">
        <div className="pr-10 flex flex-col items-center cursor-pointer">
          <RiLoginBoxFill size={32} />
          로그인
        </div>
        <div className="pr-10 flex flex-col items-center  cursor-pointer">
          <HiUserPlus size={32} />
          <span>회원 가입</span>
        </div>
        <div className="pr-10 flex flex-col items-center  cursor-pointer">
          <IoPeople size={32} />
          마이 페이지
        </div>
        <div className="pr-10 flex flex-col items-center  cursor-pointer">
          <MdOutlineWifiTetheringErrorRounded size={32} />
          고객 센터
        </div>
      </div>
      <NavBar />
    </div>

  );
};
export default TopBar;

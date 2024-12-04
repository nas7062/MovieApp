import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="flex text-lg mt-10 relative">
      <div className="pl-8 min-w-32 cursor-pointer group h-10">
        영화
        <div className="absolute hidden group-hover:block mt-2">
          <Link to="/chart">
          <p>무비차트</p>
          </Link>
        </div>
      </div>
      <div className="pl-10 min-w-36 cursor-pointer group">
        <Link  to={`/ticket`}>
          예매
        </Link>
        <div className="absolute hidden group-hover:block mt-1 ">
        <Link  to={`/ticket`}>
          <p>빠른예매</p>
          </Link>
        </div>
      </div>
      <div className="pl-10 min-w-36 cursor-pointer group">
        <Link to="/store">
        스토어
        </Link>
        <div className="absolute hidden group-hover:block mt-1 ">
          <p>패키지</p>
          <p>영화관람권</p>
          <p className="mt-1">기프트카드</p>
          <p className="mt-1">콤보</p>
        </div>
      </div>
      <div className="pl-10 min-w-40 cursor-pointer group">
        이벤트
        <div className="absolute hidden group-hover:block mt-1 ">
          <p>멤버쉽</p>
          <p className="mt-1">진행중 이벤트</p>
          <p className="mt-1">종료된 이벤트</p>
        </div>
      </div>
      <div className="pl-12 flex">
        <input type="text" className="border mr-3" />
        <CiSearch size={32} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default NavBar;

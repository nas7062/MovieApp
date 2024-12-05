import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="flex text-lg mt-10 relative">
      <div className="pl-8 min-w-32 cursor-pointer group h-10">
        <Link to="/chart">
          영화
        </Link>
        <div className="absolute hidden group-hover:block mt-2">
          <Link to="/chart">
            <p>무비차트</p>
          </Link>
        </div>
      </div>
      <div className="pl-10 min-w-36 cursor-pointer group">
        <Link to={`/ticket`}>
          예매
        </Link>
        <div className="absolute hidden group-hover:block mt-1 ">
          <Link to={`/ticket`}>
            <p>빠른예매</p>
          </Link>
        </div>
      </div>
      <div className="pl-10 min-w-36 cursor-pointer group">
        <Link to="/store">
          스토어
        </Link>
        <div className="absolute hidden group-hover:block mt-1 ">
          <Link to="/store">
            <p>패키지</p>
          </Link>
        </div>
      </div>
      <div className="pl-10 min-w-40 cursor-pointer group">
        <Link to="/event">
          이벤트
        </Link>
        <div className="absolute hidden group-hover:block mt-1 ">
          <Link to="/event">
            <p className="mt-1">진행중 이벤트</p>
          </Link>
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

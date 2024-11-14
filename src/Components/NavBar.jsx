import { CiSearch } from "react-icons/ci";
const NavBar = () => {
  return (
    <div className="flex text-lg mt-10 relative">
      <div className="pl-8 min-w-32 cursor-pointer group">
        영화
        <div className="absolute hidden group-hover:block mt-2 ">
            <p>무비차트</p>
            <p className="mt-1">영화소개</p>
        </div>
      </div>
      <div className="pl-10 min-w-32 group cursor-pointer group">
        극장
        <div className="absolute hidden group-hover:block mt-1 ">
          <p>극장 정보</p>
          <p className="mt-1">특별관</p>
        </div>
      </div>
      <div className="pl-10 min-w-36 cursor-pointer group">
        예매
        <div className="absolute hidden group-hover:block mt-1 ">
          <p>빠른예매</p>
          <p className="mt-1">극장 스케줄</p>
        </div>
      </div>
      <div className="pl-10 min-w-36 cursor-pointer group">
        스토어
        <div className="absolute hidden group-hover:block mt-1 ">
          <p>영화관람권</p>
          <p className="mt-1">기프트카드</p>
          <p className="mt-1">콤보</p>
          <p className="mt-1">팝콘</p>
          <p className="mt-1">음료</p>
          <p className="mt-1">스낵</p>
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

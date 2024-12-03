import { useState } from "react";
import Notice from "../Components/Notice";
import TopBar from "../Components/TopBar";

const Service = () => {
  const [select,setSelect] = useState(0);
  return (
    <div>
      <TopBar />
      <div className="flex w-2/5 mx-auto  mt-48">
        <div>
          <span className="bg-gray-400 w-96 inline-block text-center cursor-pointer border-r border-black">자주찾는 질문</span>
        </div>
        <div>
          <span className="bg-gray-400 w-96 inline-block text-center cursor-pointer">1:1 문의</span>
        </div>
      </div>
      <Notice />
    </div>
  );
}
export default Service;
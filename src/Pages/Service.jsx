import { useState } from "react";
import Notice from "../Components/Notice";
import TopBar from "../Components/TopBar";
import Inquiry from "../Components/Inquiry";

const Service = () => {
  const [select, setSelect] = useState(0);

  const SelectHandler = (idx) => {
    setSelect(idx);
  }
  console.log(select);
  return (
    <div>
      <TopBar />
      <div className="flex w-2/5 mx-auto  mt-32">
        <div onClick={() => SelectHandler(0)}>
          <span className="bg-gray-400 w-96 inline-block text-center cursor-pointer border-r border-black">자주찾는 질문</span>
        </div>
        <div onClick={() => SelectHandler(1)}>
          <span className="bg-gray-400 w-96 inline-block text-center cursor-pointer">1:1 문의</span>
        </div>
      </div>
      {select === 0 ? <Notice /> : <Inquiry />}


    </div>
  );
}
export default Service;
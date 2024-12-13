import React, { useState } from "react";

interface NumSelectProps {
  name: string,
  PlusNumber: (name: string, item: number) => void;
}

const NumberSelect: React.FC<NumSelectProps> = ({ name, PlusNumber }) => {
  const number = Array.from({ length: 9 }, (_, i) => i);
  const [select, setSelect] = useState(0);
  const SelectBtn = (index: number) => {
    setSelect(index);
  }
  return (
    <div className="ml-4 mt-2">
      <span className="inline-block w-12">{name}</span>
      {number.map((item, index) => (
        <button className={`border rounded-sm px-1 ml-1 ${select === index ? 'bg-gray-500' : 'bg-white'}`} onClick={() => { SelectBtn(index); PlusNumber(name, item); }}>{item}</button>
      ))}
    </div>
  );
};
export default NumberSelect;

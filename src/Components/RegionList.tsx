import React, { useState } from "react";

interface RegionProps {
  id: number,
  name: string
  theaters: string[]
}
interface RegionListProps {
  region: RegionProps[],
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>,
  setSelectedLocation: React.Dispatch<React.SetStateAction<string>>
}

const RegionList: React.FC<RegionListProps> = ({ region, setSelectedRegion, setSelectedLocation }) => {
  const [selected, setSelected] = useState<number | null>(0);

  const toggleRegion = (id: number) => {
    setSelected((prev) => (prev === id ? null : id));
  };
  return (
    <div className="border border-gray-400 ">
      <p className="bg-black text-white text-center w-72 ">극장</p>
      <div>
        {region.map((reg, index) => (
          <div className="flex  mb-4" key={index}>
            <p className="bg-gray-400 h-8 w-32 text-center cursor-pointer" onClick={() => { toggleRegion(reg.id); setSelectedRegion(reg.name) }} >{`${reg.name}(${reg.theaters.length})`}</p>
            {selected === reg.id && (<div className="flex flex-col flex-1 ">
              {reg.theaters.map((theater, index) => (
                <p key={index} className="text-sm my-1 text-center cursor-pointer" onClick={() => setSelectedLocation(theater)}>{theater}</p>
              ))}
            </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RegionList;
import { useState } from "react";

const RegionList = ({region}) =>{
  const [selected, setSelected] = useState(0);

  const toggleRegion = (id) => {
    setSelected((prev) => (prev === id ? null : id));
  };
  return(
    <div className="border border-gray-400 ">
          <p className="bg-black text-white text-center w-72 ">극장</p>
          <div>
            {region.map((reg) => (
              <div className="flex  mb-4">
                <p className="bg-gray-400 h-8 w-32 text-center cursor-pointer" onClick={() => toggleRegion(reg.id)} >{`${reg.name}(${reg.theaters.length})`}</p>
                {selected === reg.id && (<div className="flex flex-col flex-1 ">
                  {reg.theaters.map((theater, index) => (
                    <p key={index} className="text-sm my-1 text-center cursor-pointer">{theater}</p>
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
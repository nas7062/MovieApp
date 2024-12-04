import { useEffect, useState } from "react";
import TopBar from "../Components/TopBar";
import { useNavigate } from "react-router-dom";

const Store = () => {

  const [select, setSelect] = useState(0);
  const list = ["패키지", "영화관람권", "기프트카드", "콤보"];
  const [pack, setPack] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [gift, setGift] = useState([]);
  const dataMap = [pack, ticket, gift];
  const ClickHandler = (index) => {
    setSelect(index);
  }
  const fetchData = async (url, setState) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setState(data);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  };
  useEffect(() => {
    fetchData('/data/Pack.json', setPack);
    fetchData('/data/Ticket.json', setTicket);
    fetchData('/data/Gift.json', setGift);
  }, []);
  return (
    <div>
      <TopBar />
      <h2 className="mt-32 w-2/4 text-center text-4xl">스토어</h2>
      <div className="flex justify-around w-2/4 mx-96 text-xl border-y-2 border-black py-2 mt-2">
        {list.map((li, index) => (
          <span onClick={() => ClickHandler(index)} className={`cursor-pointer ${select === index ? 'text-red-500' : 'text-gray-500'}`}>{li}</span>
        ))}
      </div>
      <div className="mt-8">
        {dataMap[select]?.length > 0 ? (
          <div className="mx-96">
            {dataMap[select].map((item, index) => (
              <div
                key={index}
                className="p-4 border-b border-gray-300 hover:bg-gray-100 flex"
              >
                <img src={item.image} alt={item.name} className="w-72 h-48"/>
                <span className="text-xl mt-20 ml-10">{item.name}</span>
                <span  className="text-xl mt-20 ml-10">{item.price ? `${item.price.toLocaleString()}원` : ''}</span>
                <span  className="text-xl mt-20 ml-10">{item.amount}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-8">데이터를 불러오는 중입니다...</p>
        )}
      </div>
    </div >
  );
}
export default Store;
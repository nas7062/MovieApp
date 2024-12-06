import { useLocation } from "react-router-dom";
import TopBar from "../Components/TopBar";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { addDoc, collection, } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import Footer from "../Components/Footer";
const Buy = () => {
  const { state } = useLocation();
  const initialItem = state.item;
  console.log(initialItem);
  const [item, setItem] = useState({
    ...initialItem,
    amount: initialItem.amount || 1,
  });
  let total = item.price * item.amount;
  let free = 0;
  if (!item) {
    return <div>상품 정보가 없습니다.</div>;
  }
  const handleIncrease = () => {
    setItem((prev) => ({ ...prev, amount: prev.amount + 1 }));
  };
  const handleDecrease = () => {
    setItem((prev) => ({
      ...prev,
      amount: prev.amount > 1 ? prev.amount - 1 : 1,
    }));
  };
  const handleAddToBuy = async () => {
    try {
      await addDoc(collection(db, "buy"), {
        name: item.name,
        price: item.price,
        image: item.image,
        amount: item.amount,
        userId: item.userId,
      });
      alert("구매가 완료되었습니다!");
    } catch (error) {
      console.error("구매 중 오류 발생:", error);
      alert("구매에 실패했습니다.");
    }
  };

  return (
    <div>
      <TopBar />
      <div className="w-2/4 mx-auto mt-32 flex flex-col">
        <div className="flex justify-around">
          <span>상품사진</span>
          <span>상품명</span>
          <span>수량</span>
          <span>구매금액</span>
        </div>
        <div className="flex mt-4 justify-around">
          <img src={item.image} alt={item.name} className="w-24" />
          <span>{item.name}</span>
          <div className="flex">
            <span>{item.amount}개</span>
            <div className="flex flex-col ml-2 cursor-pointer">
              <span onClick={() => handleIncrease(item)}><FaCaretUp /></span>
              <span onClick={() => handleDecrease(item)}><FaCaretDown /></span>
            </div>
          </div>
          <span>{(item.price).toLocaleString()}원</span>
        </div>
        <div className="flex flex-col mt-10 border border-gray-400">
          <div className="flex justify-around bg-gray-300 text-xl py-4">
            <span>총 상품 금액</span>
            <span>할인 금액</span>
            <span>총 결제 금액</span>
          </div>
          <div className="flex justify-around text-2xl py-10">
            <span>{total.toLocaleString()}원</span>
            <span className="border-2 rounded-full px-2 border-red-500">-</span>
            <span>{free.toLocaleString()}원</span>
            <span className="border-2 rounded-full px-2 border-red-500">=</span>
            <span>{total - free.toLocaleString()}원</span>
          </div>
        </div>
        <button onClick={() => handleAddToBuy(item)} className="mt-4 py-2 px-4 bg-red-500 text-white w-32 ml-96">총 구매하기</button>
      </div>
      <Footer/>
    </div>
  );
}

export default Buy;
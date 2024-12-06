import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import TopBar from "../Components/TopBar";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
const Cart = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  const auth = getAuth();
  const navigate = useNavigate();
  let total = cart.reduce((sum, car) => sum + car.price * car.amount, 0);
  let free = 0;
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, [auth]);
  useEffect(() => {
    if (!currentUser) return;
    const q = query(collection(db, "cart"), where("userId", "==", currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const CartData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCart(CartData);
    });
    return () => unsubscribe();
  }, [currentUser]);
  const UpdateCart = async (cartId, newAmount) => {
    try {
      const cartRef = doc(db, "cart", cartId);
      console.log(cartRef);
      await updateDoc(cartRef, { amount: newAmount });
    } catch (error) {
      alert('amount update error');
    }
  }
  const handleIncrease = (cart) => {
    const newAmount = cart.amount + 1;
    UpdateCart(cart.id, newAmount);
  };
  const handleDecrease = (cart) => {
    if (cart.amount > 1) {
      const newAmount = cart.amount - 1;
      UpdateCart(cart.id, newAmount);
    } else {
      UpdateCart(cart.id, 0);
    }
  };
  const handleAddToBuy = (item) => {
    const updatedItem = {
      ...item,
      amount: item.amount || 1,
      userId: currentUser.uid
    };
    navigate("/buy", { state: { item: updatedItem } });
  };
  const handleDeleteCart = async (itemId) => {
    try {
      await deleteDoc(doc(db, "cart", itemId));
      alert("아이템이 삭제되었습니다!");
    } catch (error) {
      console.error("아이템 삭제 중 오류 발생:", error);
      alert("아이템 삭제에 실패했습니다.");
    }
  };
  const handleBuyAll = async () => {
    try {
      for (const car of cart) {
        await addDoc(collection(db, "buy"), {
          name: car.name,
          price: car.price,
          image: car.image,
          amount: car.amount,
          userId: currentUser.uid,
        });
        await deleteDoc(doc(db, "cart", car.id));
      }
      alert("구매가 완료되었습니다!");
    } catch (error) {
      console.error("구매 중 오류 발생:", error);
      alert("구매에 실패했습니다.");
    }
  };
  if (!cart || cart.length === 0) {
    return <div><TopBar /><div className="text-center mt-96">장바구니가 비어 있습니다.</div></div>;
  }
  return (
    <div>
      <TopBar />
      <div className="w-2/4 mx-auto mt-32 flex flex-col">
        <div className="flex justify-around">
          <span>상품사진</span>
          <span>상품명</span>
          <span>수량</span>
          <span>구매금액</span>
          <span>선택</span>
        </div>
        {cart && cart.map((car) =>
        (
          <div className="flex mt-4 justify-around">
            <img src={car.image} alt={car.name} className="w-24" />
            <span>{car.name}</span>
            <div className="flex">
              <span>{car.amount}개</span>
              <div className="flex flex-col ml-2 cursor-pointer">
                <span onClick={() => handleIncrease(car)}><FaCaretUp /></span>
                <span onClick={() => handleDecrease(car)}><FaCaretDown /></span>
              </div>
            </div>
            <span>{(car.price).toLocaleString()}원</span>
            <div>
              <span className="cursor-pointer mr-4 bg-black text-white rounded-md px-2 py-1" onClick={() => handleAddToBuy(car)}>구매하기</span>
              <span className="cursor-pointer text-red-500 text-xl" onClick={() => handleDeleteCart(car.id)}>x</span>
            </div>
          </div>
        ))}
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
        <button onClick={()=>handleBuyAll()} className="mt-4 py-2 px-4 bg-red-500 text-white w-32 ml-96">총 구매하기</button>
      </div>
      <Footer/>
    </div>
  );
}
export default Cart;
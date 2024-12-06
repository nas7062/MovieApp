import { useEffect, useState } from "react";
import TopBar from "../Components/TopBar";
import { GoGift } from "react-icons/go";
import { TiShoppingCart } from "react-icons/ti";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
const Store = () => {

  const [select, setSelect] = useState(0);
  const list = ["패키지", "영화관람권", "기프트카드", "콤보"];
  const [pack, setPack] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [gift, setGift] = useState([]);
  const [combo, setCombo] = useState([]);
  const dataMap = [pack, ticket, gift, combo];
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [auth]);
  console.log(currentUser)
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
    fetchData('/data/Combo.json', setCombo);
  }, []);

  const handleAddToCart = async (item) => {
    if (!currentUser) {
      const isLogin = confirm('로그인이 필요합니다. \n로그인 페이지로 이동하시겠습니까?');
      if (isLogin) {
        navigate('/login');
      }
      return;
    }
    try {
      await addDoc(collection(db, "cart"), {
        name: item.name,
        price: item.price,
        image: item.image,
        amount: item.amount || 1,
        userId: currentUser.uid
      });
      alert("장바구니에 추가되었습니다!");
    } catch (error) {
      console.error("장바구니 추가 중 오류 발생:", error);
      alert("장바구니 추가에 실패했습니다.");
    }
  };
  const handleAddToBuy = (item) => {
    if (!currentUser) {
      const isLogin = confirm('로그인이 필요합니다. \n로그인 페이지로 이동하시겠습니까?');
      if (isLogin) {
        navigate('/login');
      }
      return;
    }
    const updatedItem = {
      ...item,
      amount: item.amount || 1,
      userId: currentUser.uid
    };
    navigate("/buy", { state: { item: updatedItem } });
  };
  const CartNavigate = () => {
    if (!currentUser) {
      const isLogin = confirm('로그인이 필요합니다. \n로그인 페이지로 이동하시겠습니까?');
      if (isLogin) {
        navigate('/login');
      }
    }
    else
      navigate('/cart');
  }
  return (
    <div>
      <TopBar />
      <h2 className="mt-32 w-2/4 text-center text-4xl">스토어</h2>
      <div className="flex justify-around w-2/4 mx-96 text-xl border-y-2 border-black py-2 mt-2">
        {list.map((li, index) => (
          <span key={index} onClick={() => ClickHandler(index)} className={`cursor-pointer ${select === index ? 'text-red-500' : 'text-gray-500'}`}>{li}</span>
        ))}
        <span className="cursor-pointer" onClick={() => CartNavigate()}>장바구니</span>
      </div>
      <div className="mt-8">
        {dataMap[select]?.length > 0 ? (
          <div className="mx-96">
            {dataMap[select].map((item, index) => (
              <div
                key={index}
                className="w-5/6 p-4 border-b border-gray-300 hover:bg-gray-100 flex"
              >
                <img src={item.image} alt={item.name} className="w-72 h-48" />
                <span className="text-xl mt-20 ml-10">{item.name}</span>
                <span className="text-xl mt-20 ml-10">{item.price ? `${item.price.toLocaleString()}원` : ''}</span>
                <span className="text-xl mt-20 ml-10">{item.amount}</span>
                <div>
                  <button onClick={() => handleAddToCart(item)} className=" mt-20 ml-10 py-2 px-4 bg-gray-400 rounded-full text-xs"><TiShoppingCart size={30} />카트</button>
                  <button onClick={() => handleAddToBuy(item)} className=" mt-20 ml-10 py-2 px-4 bg-gray-400 rounded-full text-xs"><BiPurchaseTagAlt size={30} />구매</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-8">데이터를 불러오는 중입니다...</p>
        )}
      </div>
      <Footer />
    </div >
  );
}
export default Store;
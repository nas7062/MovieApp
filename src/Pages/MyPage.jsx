import { getAuth, onAuthStateChanged } from "firebase/auth"
import TopBar from "../Components/TopBar";
import { useEffect, useState } from "react";
import { collection, db } from "../firebase";
import { getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

const MyPage = () => {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [buys, setBuys] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [auth]);
  const fetchUserTickets = async (userId) => {
    try {
      const q = query(collection(db, "tickets"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      const ticket = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTickets(ticket);
    } catch (error) {
      alert("티켓 조회 중 오류 발생:", error);
    }
  };
  const fetchInquiries = async (userId) => {
    try {
      const q = query(collection(db, "inquiries"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const inquiriesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setInquiries(inquiriesData);
    } catch (error) {
      console.error("Error fetching inquiries: ", error);
    }
  };
  const fetchBuys = async (userId) => {
    try {
      const q = query(collection(db, "buy"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const buyMap = new Map();
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const { name, amount, price, image } = data;

        if (buyMap.has(name)) {
          const existing = buyMap.get(name);
          buyMap.set(name, {
            ...existing,
            amount: existing.amount + amount,
          });
        } else {
          buyMap.set(name, { name, amount, price, image });
        }
      });
      const mergedBuys = Array.from(buyMap.values());
      setBuys(mergedBuys);

    } catch (error) {
      alert('buyData 불러오기 실패');
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        await Promise.all([
          fetchUserTickets(currentUser.uid),
          fetchInquiries(currentUser.uid),
          fetchBuys(currentUser.uid)
        ]);
      }
    };

    fetchData();
  }, [currentUser]);



  return (
    <div>
      <TopBar />
      {currentUser ? (
        <>
          <h2 className="text-center text-4xl mt-10">마이페이지</h2>
          <div className="w-2/4 mx-auto bg-gray-200 h-2/4 mt-20">
            <div className="mx-10 text-center">
              <sapn className="text-3xl">{auth.currentUser.displayName}님</sapn>
              <span className="ml-6">{auth.currentUser.email.split('@')[0]}</span>
            </div>
            <div className="mt-8 text-center">
              <h2>MY 예매내역</h2>
              <div className="bg-white w-full h-36 border border-gray-300 overflow-y-scroll" >
                {tickets.length !== 0 ? (tickets.map((ticket, idx) => (
                  <div className="w-3/4 inline-block border h-32 border-gray-400 ml-2 mt-1 " key={idx}>
                    <div className="flex  justify-around">
                      <img className=" float-left w-20 h-20" src={`https://image.tmdb.org/t/p/w200${ticket.poster_path}`} alt={ticket.movieTitle} />
                      <span>제목:{ticket.movieTitle}</span>
                      <span className="ml-1">지역:{ticket.region}</span>
                      <span className="ml-1">장소:{ticket.location}</span>
                    </div>
                    <div className="flex  justify-around">
                      <span className="ml-1">시간:{ticket.time}</span>
                      <span className="ml-1">인원:{ticket.number}명</span>
                      <span className="ml-1">날짜:{ticket.date}</span>
                    </div>
                    <div className="flex justify-center">
                      <span>좌석:</span>
                      {ticket.seats.map((seat) =>
                        <span className="ml-1 text-red-400">{String.fromCharCode(seat.row + 65)}{seat.col}</span>
                      )}
                    </div>

                  </div>)
                ))
                  : <div className="mt-10">
                    <p>예약이 없습니다....</p>
                  </div>}
              </div>
            </div>
            <div className="mt-8 text-center">
              <h2>MY Q&A</h2>
              <div className="bg-white w-full h-32 border border-gray-300 " >
                {inquiries.length !== 0 ? (inquiries.map((inquire, idx) => (
                  <div onClick={() => navigate(`/inquire/${inquire.id}`)} className="cursor-pointer w-80 inline-block border border-gray-400 ml-2 mt-1" key={idx}>
                    <div className="flex  justify-around">
                      <span className="ml-1">작성자:{inquire.displayName}</span>
                      <span>문의유형:{inquire.category}</span>
                    </div>
                    <div className="flex  justify-around">
                      <span className="ml-1">작성일:{inquire.date}</span>
                      <span className="ml-1">제목:{inquire.title}</span>
                    </div>
                  </div>)
                ))
                  : <div className="mt-10">
                    <p>문의가 없습니다....</p>
                  </div>}
              </div>
            </div>
            <div className="mt-10 text-center">
              <h2>MY 구매내역</h2>
              <div className="bg-white w-full h-28 border border-gray-300 overflow-y-scroll" >
                {buys.length !== 0 ? (buys.map((buy, idx) => (
                  <div className=" w-80 inline-block border border-gray-400 ml-2 mt-1" key={idx}>
                    <div className="flex  justify-around">
                      <img src={buy.image} alt={buy.name} className="w-32 h-20" />
                      <span>상품명:{buy.name}</span>
                    </div>
                    <div className="flex  justify-around">
                      <span className="ml-1 text-sm">가격:{buy.price.toLocaleString()}원</span>
                      <span className="ml-1 text-sm">수량:{buy.amount.toLocaleString()}개</span>
                      <span className="ml-1 text-sm">총가격:{(buy.price * buy.amount).toLocaleString()}원</span>
                    </div>
                  </div>)
                ))
                  : <div className="mt-10">
                    <p>문의가 없습니다....</p>
                  </div>}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center mt-48">로그인이 필요합니다...</p>
      )}
      <Footer />
    </div>
  );
}
export default MyPage;
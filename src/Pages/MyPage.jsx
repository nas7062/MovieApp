import { getAuth, onAuthStateChanged } from "firebase/auth"
import TopBar from "../Components/TopBar";
import { useEffect, useState } from "react";
import { collection, db } from "../firebase";
import { getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [inquiries, setInquiries] = useState([]);
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
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        await Promise.all([
          fetchUserTickets(currentUser.uid),
          fetchInquiries(currentUser.uid),
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
          <div className="w-2/4 mx-auto bg-gray-200 h-96 mt-32">
            <div className="mx-10 text-center">
              <sapn className="text-3xl">{auth.currentUser.displayName}님</sapn>
              <span className="ml-6">{auth.currentUser.email.split('@')[0]}</span>
            </div>
            <div className="mt-8 text-center">
              <h2>MY 예매내역</h2>
              <div className="bg-white w-full h-28 border border-gray-300 overflow-y-scroll" >
                {tickets.length !== 0 ? (tickets.map((ticket, idx) => (
                  <div className="w-80 inline-block border border-gray-400 ml-2 mt-1" key={idx}>
                    <img className="w-12 inline-block float-left" src={`https://image.tmdb.org/t/p/w200${ticket.poster_path}`} alt={ticket.movieTitle} />
                    <span>{ticket.movieTitle}</span>
                    <span className="ml-1">{ticket.region}</span>
                    <span className="ml-1">{ticket.location}</span>
                    <span className="ml-1">{ticket.time}</span>
                    <span className="ml-1">{ticket.number}명</span>
                    <span className="ml-1">{ticket.date}</span>
                    {ticket.seats.map((seat) =>
                      <span className="ml-1 text-red-400">{String.fromCharCode(seat.row + 65)}{seat.col}</span>
                    )}
                  </div>)
                ))
                  : <div className="mt-10">
                    <p>예약이 없습니다....</p>
                  </div>}
              </div>
            </div>
            <div className="mt-8 text-center">
              <h2>MY Q&A</h2>
              <div className="bg-white w-full h-28 border border-gray-300" >
                {inquiries.length !== 0 ? (inquiries.map((inquire, idx) => (
                  <div onClick={()=>  navigate(`/inquire/${inquire.id}`)} className="cursor-pointer w-80 inline-block border border-gray-400 ml-2 mt-1" key={idx}>
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
          </div>
        </>
      ) : (
        <p className="text-center mt-48">로그인이 필요합니다...</p>
      )}
    </div>



  );
}
export default MyPage;
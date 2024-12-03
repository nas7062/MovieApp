import { getAuth, onAuthStateChanged } from "firebase/auth"
import TopBar from "../Components/TopBar";
import { useEffect, useState } from "react";
import { collection, db } from "../firebase";
import { getDocs, query, where } from "firebase/firestore";

const MyPage = () => {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [auth]);
  const fetchUserTickets = async () => {
    try {
      const userId = auth.currentUser.uid;
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
  useEffect(() => {
    if (currentUser) {
      fetchUserTickets(currentUser.uid);
    }
  }, [currentUser]);
  console.log(tickets)
  return (
    <div>
      <TopBar />
      {currentUser ? (
        <>
          <div className="w-2/4 mx-auto bg-gray-200 h-96 mt-48">
            <div className="mx-10 text-center">
              <sapn className="text-3xl">{auth.currentUser.displayName}님</sapn>
              <span className="ml-6">{auth.currentUser.email.split('@')[0]}</span>
            </div>
            <div className="mt-8 text-center">
              <h2>MY 예매내역</h2>
              <div className="bg-white w-full h-28 border border-gray-300 overflow-y-scroll" >
                {tickets.length !== 0 ? (tickets.map((ticket, idx) => (
                  <div className="w-72 inline-block border border-gray-400 ml-2 mt-1" key={idx}>
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
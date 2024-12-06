import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import TopBar from "../Components/TopBar";
import TicketMoviList from "../Components/TicketMovieList";
import RegionList from "../Components/RegionList";
import Calendar from "../Components/Calendar";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import TimeTable from "../Components/TimeTable";
import MovieInfo from "../Components/MovieInfo";
import NumberSelect from "../Components/NumberSelect";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Ticket = () => {
  const [region, setRegion] = useState([]);
  const [movie, setMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDated, setSelectedDated] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [seatSelect, setSeatSelct] = useState(false);
  const [viewseat, setViewSeat] = useState(false);
  const navigate = useNavigate();
  const arr2 = new Array(14).fill().map((v, i) => i + 1);
  const seat = [];
  const Alpha = Array.from(Array(11), (_, i) => String.fromCharCode(i + 65));
  const [selectBtn, setSelectBtn] = useState([]);
  const [selectNumber, SetSelectNumber] = useState({});
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);
  let total = 0;
  for (let i = 0; i < 11; i++) {
    seat.push(arr2);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, [auth]);
  const number = Object.values(selectNumber).reduce((a, b) => a + b, 0);
  const SelectedBtn = (row, col) => {
    const alreadySelected = selectBtn.some(
      (seat) => seat.row === row && seat.col === col
    );
    if (alreadySelected) {
      setSelectBtn((prev) =>
        prev.filter((seat) => !(seat.row === row && seat.col === col))
      );
    } else if (selectBtn.length < number) {
      setSelectBtn((prev) => [...prev, { row, col }]);
    }
  };
  const PlusNumber = (name, num) => {
    SetSelectNumber((prev) => ({
      ...prev,
      [name]: num,
    }));
  };
  const fetchRegion = async () => {
    try {
      const response = await fetch("/data/Region.json");
      const data = await response.json();
      setRegion(data.regions);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  const fetchMovies = async () => {
    try {
      const moviesSnapshot = await getDocs(collection(db, "movies"));
      const moviesData = moviesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovie(moviesData);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  console.log(selectBtn);
  useEffect(() => {
    fetchMovies();
    fetchRegion();
  }, []);
  useEffect(() => {
    AllCheck();
  }, [selectedTime]);
  const AllCheck = () => {
    if (
      selectedMovie &&
      selectedRegion &&
      selectedLocation &&
      selectedDated &&
      selectedTime
    ) {
      setSeatSelct(true);
    }
  };
  const ViewSeat = () => {
    if (!currentUser) {
      const isLogin = confirm('로그인이 필요합니다. \n로그인 페이지로 이동하시겠습니까?');
      if (isLogin) {
        navigate('/login');
      }
      return;
    }
    if (seatSelect) setViewSeat(true);
  };
  const ReserVation = async () => {

    try {
      const querySnapshot = await getDocs(collection(db, "movies"));
      const movieDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const selected = movieDocs.find(
        (movie) => movie.id === selectedMovie.id
      );

      if (!selected) {
        console.error("선택된 영화를 찾을 수 없습니다.");
        return;
      }

      selected.schedules
        .filter(
          (item) =>
            item.region === selectedRegion && item.location === selectedLocation
        )
        .forEach((filteredItem) => {
          filteredItem.times
            .filter((time) => time.time === selectedTime)
            .forEach((time) => {
              time.availableSeats -= number;
              selectBtn.forEach((seat) => {
                const row = seat.row;
                const col = seat.col;
                if (!time.reservedSeats) {
                  time.reservedSeats = [];
                }
                time.reservedSeats.push({ row, col });
              });
            });


        });

      const movieDocRef = doc(db, "movies", selected.id);
      await updateDoc(movieDocRef, { schedules: selected.schedules });
      const auth = getAuth();
      const ticketData = {
        userId: auth.currentUser.uid,
        movieId: selected.id,
        movieTitle: selected.title,
        region: selectedRegion,
        location: selectedLocation,
        time: selectedTime,
        date: selectedDated,
        seats: selectBtn.map((seat) => ({ row: seat.row, col: seat.col })),
        number,
        poster_path: selected.poster_path
      };

      await addDoc(collection(db, "tickets"), ticketData);

      navigate('/');
      console.log("예약이 성공적으로 처리되었습니다.");
    } catch (error) {
      console.error("예약 처리 중 오류 발생:", error);
    }
  };
  console.log(selectedMovie);
  return (
    <div>
      <TopBar />
      {!viewseat && (
        <div className="flex justify-between mx-48 w-3/6 mt-32">
          <TicketMoviList movies={movie} setSelectedMovie={setSelectedMovie} />
          <RegionList
            region={region}
            setSelectedRegion={setSelectedRegion}
            setSelectedLocation={setSelectedLocation}
          />
          <Calendar setSelectedDated={setSelectedDated} />
          <TimeTable
            selectedMovie={selectedMovie}
            selectedRegion={selectedRegion}
            selectedLocation={selectedLocation}
            setSelectedTime={setSelectedTime}
          />
        </div>
      )}
      {selectedMovie && (
        <MovieInfo
          selectedMovie={selectedMovie}
          selectedRegion={selectedRegion}
          selectedLocation={selectedLocation}
          selectedDated={selectedDated}
          selectedTime={selectedTime}
          seatSelect={seatSelect}
          ViewSeat={() => ViewSeat()}
        />
      )}
      {viewseat && (
        <div>
          <div className="mt-10 mx-auto py-1 w-4/5 h-10 bg-black text-white text-center">
            <span>인원/좌석</span>
          </div>
          <div className="flex">
            <div className="w-2/5 ml-36 border border-black h-40">
              <div className="float-right text-red-500 pr-2 text-sm">
                <span>* 최대 8명까지 가능</span>
              </div>
              {["일반", "청소년", "경로", "우대"].map((item) => (
                <NumberSelect name={item} PlusNumber={PlusNumber} />
              ))}
            </div>
            <div className="w-2/5 border border-black h-40  ">
              <span className="pl-10 border-r-black pr-2 border-r">
                {selectedRegion}
              </span>
              <span className="pl-2  border-r-black pr-2 border-r">
                {selectedLocation}
              </span>
              {selectedMovie &&
                selectedMovie.schedules
                  .filter(
                    (item) =>
                      item.region === selectedRegion &&
                      item.location === selectedLocation
                  )
                  .map((filteredItem) =>
                    filteredItem.times
                      .filter((item) => item.time === selectedTime)
                      .map((time) => (
                        <>
                          <span className="pl-2">남은 좌석 </span>
                          <span className="pl-1 text-red-500">
                            {time.availableSeats}석
                          </span>
                          <span> / 100석</span>
                          <h3 className="pl-10 text-2xl">{selectedDated}</h3>
                          <h3 className="pl-10 text-2xl">{time.time}시</h3>
                          <div className="mt-4">
                            <span className=" px-3 bg-red-500 ml-2"></span>
                            <span>예매완료</span>
                            <span className=" px-3 bg-gray-500 ml-2"></span>
                            <span>선택</span>
                            <button
                              className="float-right  mr-2 text-white bg-red-500 px-2 py-4 rounded-lg"
                              onClick={() => ReserVation()}
                            >
                              예매하기 &gt;
                            </button>
                          </div>
                          <div>
                            <span className="ml-2">좌석번호 : </span>
                            {selectBtn.map((btn) => (
                              <span className="mr-2">
                                {String.fromCharCode(btn.row + 65)}
                                {btn.col}
                              </span>
                            ))}
                            {Object.keys(selectNumber).forEach(
                              (name, index) => {
                                const value = Object.values(selectNumber);
                                if (name === "일반") {
                                  total += 14000 * value[index];
                                }
                                if (name === "청소년") {
                                  total += 10000 * value[index];
                                }
                                if (name === "경로") {
                                  total += 7000 * value[index];
                                }
                                if (name === "우대") {
                                  total += 5000 * value[index];
                                }
                              }
                            )}
                            <span>
                              총 결제금액:{`${total.toLocaleString()}`}원
                            </span>
                          </div>
                        </>
                      ))
                  )}
            </div>
          </div>

          <div>
            <h2 className="text-center mt-2 bg-gray-300 w-2/6 mx-auto rounded-lg">
              screen
            </h2>
          </div>
          <div className=" w-[470px] h-96 text-center mx-auto mt-10">
            <div className="float-left h-96">
              {Alpha.map((item) => (
                <p className=" mt-2 text-lg h-5">{item}</p>
              ))}
            </div>
            {
              selectedMovie &&
              selectedMovie.schedules
                .filter(
                  (item) =>
                    item.region === selectedRegion && item.location === selectedLocation
                )
                .map((filteredItem) =>
                  filteredItem.times
                    .filter((item) => item.time === selectedTime)
                    .map((time) =>
                      seat.map((low, index) =>
                        low.map((col, idx) => {
                          const isReserved = time.reservedSeats.some(
                            (reservedSeat) =>
                              reservedSeat.row === index && reservedSeat.col === idx
                          );
                          const isSelected = selectBtn.some(
                            (seat) => seat.row === index && seat.col === idx
                          );
                          return (
                            <button
                              key={`${index}-${idx}`}
                              className={`mx-1 inline-block border mb-1 border-gray-400 w-6 
                    ${isSelected
                                  ? "bg-gray-400"
                                  : isReserved
                                    ? "bg-red-500"
                                    : "bg-white"
                                }`}
                              onClick={() => SelectedBtn(index, idx)}
                              disabled={isReserved}
                            >
                              {col}
                            </button>
                          );
                        })
                      )
                    )
                )
            }
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Ticket;

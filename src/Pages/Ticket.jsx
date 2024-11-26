import { useEffect, useRef, useState } from "react";
import Footer from "../Components/Footer";
import TopBar from "../Components/TopBar";
import TicketMoviList from "../Components/TicketMovieList";
import RegionList from "../Components/RegionList";
import Calendar from "../Components/Calendar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import TimeTable from "../Components/TimeTable";

const Ticket = () => {
  const [region, setRegion] = useState([]);
  const [movie, setMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDated, setSelectedDated] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  console.log(selectedMovie, selectedRegion, selectedLocation, selectedDated,selectedTime);
  console.log(movie);
  const fetchRegion = async () => {
    try {
      const response = await fetch('/data/Region.json');
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
  useEffect(() => {
    fetchMovies();
    fetchRegion();
  }, []);
  return (
    <div>
      <TopBar />
      <div className="flex justify-between mx-auto w-3/6 mt-48">
        <TicketMoviList movies={movie} setSelectedMovie={setSelectedMovie} />
        <RegionList region={region} setSelectedRegion={setSelectedRegion} setSelectedLocation={setSelectedLocation} />
        <Calendar setSelectedDated={setSelectedDated} />
        <TimeTable selectedMovie={selectedMovie} selectedRegion={selectedRegion} selectedLocation={selectedLocation} setSelectedTime={setSelectedTime} />
      </div>
      <div>
        
      </div>
      <Footer />
    </div>
  );
}

export default Ticket;
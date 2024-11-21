import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import TopBar from "../Components/TopBar";
import TicketMoviList from "../Components/TicketMovieList";
import { useMovies } from "../Components/MoviesContext";
import RegionList from "../Components/RegionList";

const Ticket = () => {
  const [region, setRegion] = useState([]);
  const { Allmovies } = useMovies();

  const fetchEvents = async () => {
    try {
      const response = await fetch('/data/Region.json');
      const data = await response.json();
      setRegion(data.regions);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div>
      <TopBar />
      <div className="flex justify-between mx-auto w-3/6 mt-48">
        <TicketMoviList movies={Allmovies} />
        <RegionList region={region} />
        <div>
          <p className="bg-black text-white text-center w-72">날짜</p>
        </div>
        <div>
          <p className="bg-black text-white text-center w-72">시간</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Ticket;
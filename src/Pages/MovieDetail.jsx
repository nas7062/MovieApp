import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../Components/TopBar";
import Footer from "../Components/Footer";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const apiKey = "6dc064764ae3fcdc077197da76ec3eb4";
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko`
        );
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchMovieDetail();
  }, [id]);
  const NaivgateHandler =() => {
    navigate('/ticket');
  }
  console.log(movie);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <TopBar />
      <div className="flex justify-center mt-32">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-60 " />
        <div className="mt-5 text-left flex flex-col ml-10">
          <h2 className="text-2xl">{movie.title}</h2>
          <p className="text-gray-500">{movie.tagline}</p>
          <div className="mt-5">
            <span>장르:</span>
            {movie.genres.map((gen) => (
              <span className="mx-1">{gen.name}</span>
            ))} /
            <span className="ml-1">기본정보:</span>
            <span className="mx-1">{movie.adult ? '성인' : '전체관람가'},</span>
            <span>{`${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`}</span>
            <p>개봉일: {movie.release_date}</p>
            <button onClick={NaivgateHandler} className="bg-red-500 text-white rounded px-2 py-1 mt-3">예매하기</button>
            <p className="mt-5 w-96 ">줄거리 :{movie.overview}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MovieDetail;
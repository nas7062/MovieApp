import { Link, useNavigate } from "react-router-dom";
import { useMovies } from "../Components/MoviesContext";
import TopBar from "../Components/TopBar";
import Footer from "../Components/Footer";
export interface MovieListProps {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
}
const MovieList = () => {
  const { movies } = useMovies();
  const navigate = useNavigate();
  return (
    <div>
      <TopBar />
      <div className="w-3/5 mx-auto mt-32">
        <h2 className="text-4xl">무비차트</h2>
        <p className="border border-black w-full mt-4"></p>
        {movies.map((movie: MovieListProps, idx: number) => (
          <div
            key={movie.id}
            className="text-center w-48 mx-4 max-h-96 group inline-block mt-10"
          >
            <img
              className="max-w-96 max-h-64 object-cover "
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <h2 className="text-4xl text-yellow-400 float-left ">{idx + 1}</h2>
            <div className="relative ">
              <h3 className="text-base font-bold ">
                {movie.title.length > 10
                  ? movie.title.slice(0, 10) + "..."
                  : movie.title}
              </h3>
              <span>평점: {movie.vote_average.toFixed(2)} </span>
            </div>
            <div className="relative bottom-[300px] h-[250px] w-44 bg-black bg-opacity-75 text-white p-4 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
              <button className="bg-red-600 rounded px-2 py-1">
                {" "}
                <Link to={`/detail/${movie.id}`}>상세보기</Link>
              </button>
              <button
                className="bg-green-500 rounded px-2 py-1 mt-3"
                onClick={() => navigate("/ticket")}
              >
                예매하기
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default MovieList;

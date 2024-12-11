import React, { useState } from "react";
import { useMovies } from "./MoviesContext";
import { Link, useNavigate } from "react-router-dom";

interface MovieProps {
    id : number,
    poster_path:string,
    title:string,
    vote_average:number,
}
const MoiveSlider = () => {
    const { movies } = useMovies();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const slideWidth = 210; // 슬라이더 width
    const itemsPerPage = 5; // 한 페이지 슬라이더 개수
    console.log(movies);
    const navigate = useNavigate();
    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - itemsPerPage, 0));
    };
    const handleNext = () => {
        setCurrentIndex((prev) =>
            Math.min(prev + itemsPerPage, movies.length - itemsPerPage)
        );
    };
    return (
        <div className="relative w-full mt-20">
            <h2 className="text-4xl my-10 text-center">무비차트</h2>
            <button
                className="absolute  left-96 bottom-32  bg-gray-800 text-white p-2 rounded "
                onClick={handlePrev}
                disabled={currentIndex === 0}
            >
                &lt;
            </button>
            <button
                className="absolute right-96 bottom-32  bg-gray-800 text-white p-2 rounded "
                onClick={handleNext}
                disabled={currentIndex >= movies.length - itemsPerPage}
            >
                &gt;
            </button>
            <div className="overflow-hidden mx-auto max-w-5xl">
                <div className="flex transition-transform duration-500 " style={{
                    transform: `translateX(-${currentIndex * slideWidth}px)`,
                }}>
                    {movies.map((movie:MovieProps, idx:number) => (
                        <div key={movie.id} className="text-center max-w-lg mx-4 max-h-96 group">
                            <img className="max-w-96 max-h-64 object-cover " src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            <h2 className="text-4xl text-yellow-400 float-left ">{idx + 1}</h2>
                            <div className="relative ">
                                <h3 className="text-base font-bold ">{movie.title.length > 10 ? movie.title.slice(0, 10) + '...' : movie.title}</h3>
                                <span>평점: {movie.vote_average.toFixed(2)} </span>
                            </div>
                            <div className="absolute top-0  h-64 w-44 bg-black bg-opacity-75 text-white p-4 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                                <button className="bg-red-600 rounded px-2 py-1"> <Link to={`/detail/${movie.id}`}>상세보기</Link></button>
                                <button className="bg-green-500 rounded px-2 py-1 mt-3" onClick={() => navigate("/ticket")} >예매하기</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MoiveSlider;
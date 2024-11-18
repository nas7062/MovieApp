import React, { useState } from "react";
import { useMovies } from "./MoviesContext";
const MoiveSlider = () => {
    const { movies, loading, error } = useMovies();
    console.log(movies);
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideWidth = 210;
    const itemsPerPage = 5;
    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - itemsPerPage, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            Math.min(prev + itemsPerPage, movies.length - itemsPerPage)
        );
    };
    return (
        <div className="relative w-full">
            <h2 className="text-4xl my-4 text-center">무비차트</h2>
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
                    {movies.map((movie, idx) => (
                        <div className="text-center max-w-lg mx-4 max-h-96 group">
                            <img className="max-w-96 max-h-64 object-cover " src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            <h2 className="text-4xl text-yellow-400 float-left ">{idx + 1}</h2>
                            <div className="relative ">
                                <h3 className="text-base font-bold ">{movie.title.length > 10 ? movie.title.slice(0, 10) + '...' : movie.title}</h3>
                                <span>평점: {movie.vote_average.toFixed(2)} </span>
                            </div>
                            <div className="absolute top-0  h-64 w-44 bg-black bg-opacity-75 text-white p-4 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                            <button className="bg-red-600 rounded px-2 py-1">상세보기</button>
                            <button className="bg-green-500 rounded px-2 py-1 mt-3">예매하기</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MoiveSlider;
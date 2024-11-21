import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const MoviesContext = createContext();

export function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [Allmovies, setAllMovies] = useState([]);
  const [region, setregion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ko&page=1&region=KR`
        );
        const sortedMovies = response.data.results.sort(
          (a, b) => b.vote_count - a.vote_count
        );
        setMovies(sortedMovies);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
        const totalPages = 5;
        const requests = []; // 여러 페이지의 데이터를 요청 배열에 추가
        for (let page = 1; page <= totalPages; page++) {
          requests.push(
            axios.get(
              `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ko&page=${page}&region=KR`
            )
          );
        }
        const responses = await Promise.all(requests);
        const allMovies = responses.flatMap(response => response.data.results);
        const sortedMovies = allMovies.sort((a, b) => b.vote_count - a.vote_count);

        setAllMovies(sortedMovies);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);


  return (
    <MoviesContext.Provider value={{ Allmovies, movies, loading, error }}>
      {children}
    </MoviesContext.Provider>
  );
}

// Custom Hook
export function useMovies() {
  return useContext(MoviesContext);
}

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const MoviesContext = createContext();

export function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);
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

  return (
    <MoviesContext.Provider value={{ movies, loading, error }}>
      {children}
    </MoviesContext.Provider>
  );
}

// Custom Hook
export function useMovies() {
  return useContext(MoviesContext);
}

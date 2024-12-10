import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { db, collection, addDoc, getDocs } from "../firebase"
const MoviesContext = createContext();

export function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(movies);
  const saveMovieToFirestore = async (movie, schedules) => {
    try {
      const moviesSnapshot = await getDocs(collection(db, "movies"));
      const existingMovies = moviesSnapshot.docs.map((doc) => doc.data());
      const duplicateMovie = existingMovies.find((existingMovie) => existingMovie.title === movie.title);
      if (!duplicateMovie) {
        await addDoc(collection(db, "movies"), {
          title: movie.title,
          release_date: movie.release_date,
          overview: movie.overview,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          availableSeats: 100,
          schedules
        });
      }
    } catch (error) {
      console.error("Error saving movie:", error);
    }
  };
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey ="6dc064764ae3fcdc077197da76ec3eb4";
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ko&page=1&region=KR`
        );
        const sortedMovies = response.data.results.sort(
          (a, b) => b.vote_count - a.vote_count
        );
        setMovies(sortedMovies);
        const responseSchedule = await fetch('/data/Movie.json');
        const scheduleData = await responseSchedule.json();
        const schedules = scheduleData.movies; 
        for (const movie of sortedMovies) {
          await saveMovieToFirestore(movie, schedules);
        }
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

import { useEffect, useState } from "react";
import Main from "./Pages/Main";
import axios from "axios";
function App() {
  const [movies, setmovies] = useState([]);

  const getMoives = async () => {
    const apiKey = '6dc064764ae3fcdc077197da76ec3eb4';
    axios.get('https://api.themoviedb.org/3/movie/now_playing', {
      params: {
        api_key: apiKey,
        language: 'ko',
        page: 1,
        region: 'KR',
      },
    })
      .then(response => {
        setmovies(response.data.results);
      })
  };
  useEffect(() => {
    getMoives();
  }, []);
  console.log(movies);
  return (
    <div>
      <Main></Main>
      <div>
        {movies.map((movie) => (
          <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`
          } />
        ))}
      </div>
    </div>
  );
}

export default App;

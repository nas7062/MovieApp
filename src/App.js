import { MoviesProvider } from "./Components/MoviesContext";
import Main from "./Pages/Main";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MovieDetail from "./Pages/MovieDetail";
import Ticket from "./Pages/Ticket";
function App() {

  return (
    <div>
      <BrowserRouter>
        <MoviesProvider>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/detail/:id" element={<MovieDetail />} />
            <Route path="/ticket" element={<Ticket />} />
          </Routes>
        </MoviesProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

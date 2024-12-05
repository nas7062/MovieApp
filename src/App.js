import { MoviesProvider } from "./Components/MoviesContext";
import Main from "./Pages/Main";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MovieDetail from "./Pages/MovieDetail";
import Ticket from "./Pages/Ticket";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import MyPage from "./Pages/MyPage";
import MovieList from "./Pages/MovieList";
import Service from "./Pages/Service";
import NoticeDetail from "./Pages/NoticeDetail";
import InquireDetail from "./Pages/InquireDetail";
import Store from "./Pages/Store";
import Event from "./Pages/Event";
import Cart from "./Pages/Cart";
import Buy from "./Pages/Buy";

function App() {

  return (
    <div>
      <BrowserRouter>
        <MoviesProvider>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/store" element={<Store />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/chart" element={<MovieList />} />
            <Route path="/service" element={<Service />} />
            <Route path="/detail/:id" element={<MovieDetail />} />
            <Route path="/notice/:id" element={<NoticeDetail />} />
            <Route path="/inquire/:id" element={<InquireDetail />} />
            <Route path="/event" element={<Event />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/buy" element={<Buy />} />
          </Routes>
        </MoviesProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

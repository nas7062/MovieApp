import { MoviesProvider } from "./Components/MoviesContext";
import Main from "./Pages/Main";
function App() {

  return (
    <div>
      <MoviesProvider>
        <Main />
      </MoviesProvider>
    </div>
  );
}

export default App;

import EventBanner from "../Components/EventBanner";
import Footer from "../Components/Footer";
import MovieSlider from "../Components/MovieSlider";
import StoreBanner from "../Components/StoreBanner";
import TopBar from "../Components/TopBar";
import VideoPlayer from "../Components/VideoPlayer";
const Main = () => {
  return (
    <>
      <TopBar />
      <VideoPlayer/>
      <MovieSlider/>
      <EventBanner/>
      <StoreBanner/>
      <Footer/>
    </>
  );
};

export default Main;

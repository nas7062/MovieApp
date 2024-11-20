import EventBanner from "../Components/EventBanner";
import Footer from "../Components/Footer";
import MoiveSlider from "../Components/MovieSlider";
import StoreBanner from "../Components/StoreBanner";
import TopBar from "../Components/TopBar";
import VideoPlayer from "../Components/VideoPlayer";
const Main = () => {
  return (
    <>
      <TopBar />
      <VideoPlayer/>
      <MoiveSlider/>
      <EventBanner/>
      <StoreBanner/>
      <Footer/>
    </>
  );
};

export default Main;

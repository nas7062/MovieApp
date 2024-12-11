import { useState } from "react";
import ReactPlayer from "react-player";
import { PiPlayCircleDuotone } from "react-icons/pi";
import { PiStopCircleDuotone } from "react-icons/pi";
import { FaVolumeHigh } from "react-icons/fa6";
import { FaVolumeXmark } from "react-icons/fa6";
const VideoPlayer = () => {
  const [play, setplay] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true); 
  const [volumecount, setvolumecount] = useState<number>(1);
  const PlayMovie = () => {
    setplay(!play);
  };
  const volumeOnOff = () => {
    setIsMuted((prevMuted) => {
      const newVolume =  prevMuted ? 1 : 0;
      setvolumecount(newVolume);
      return !prevMuted;
    }); 
  };
  return (
    <div className="max-w-screen-2lg bg-black mt-48 ">
      <div className="flex max-w-5xl mx-auto z-10">
        <ReactPlayer
          url="/Video/sul.mp4"
          playing={play}
          volume={volumecount}
        />
        <div className="max-w-screen-sm mx-auto my-auto">
          <div className="text-white text-lg z-0">
            <p className="text-4xl">청설</p>
            <p className="max-w-64">
              “눈빛으로 말하는 사랑” 들리지 않아도, 말하지 않아도 알 수 있는
              그들의 청춘, 그 시절!
            </p>
          </div>
          <div
            className="cursor-pointer text-white max-w-16"
            onClick={PlayMovie}
          >
            {!play ? (
              <PiPlayCircleDuotone size={45} />
            ) : (
              <PiStopCircleDuotone size={45} />
            )}
          </div>
          <div
            className="cursor-pointer text-white max-w-16"
            onClick={volumeOnOff}
          >
            {isMuted ? <FaVolumeHigh size={45} /> : <FaVolumeXmark size={45} />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default VideoPlayer;

import { useState } from "react";
import ReactPlayer from "react-player";
import { PiPlayCircleDuotone } from "react-icons/pi";
import { PiStopCircleDuotone } from "react-icons/pi";
import { FaVolumeHigh } from "react-icons/fa6";
import { FaVolumeXmark } from "react-icons/fa6";
const VideoPlayer = () => {
  const [play, setplay] = useState(false);
  const [volume, setvolume] = useState(true);
  const [volumecount, setvolumecount] = useState(1);
  const PlayMovie = () => {
    setplay(!play);
  };
  const volumeOnOff = () => {
    setvolume((prevVolume) => {
      const newVolume = !prevVolume;
      setvolumecount(newVolume ? 1 : 0);
      return newVolume;
    });
  };
  return (
    <div className="max-w-screen-2lg bg-black mt-48 ">
      <div className="flex max-w-5xl mx-auto z-10">
        <ReactPlayer
          url={`${process.env.PUBLIC_URL}/Video/sul.mp4`}
          playing={play}
          volume={volumecount}
        />
        <div className="max-w-screen-sm mx-auto">
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
            {volume ? <FaVolumeHigh size={45} /> : <FaVolumeXmark size={45} />}
          </div>
          <div className="text-white border rounded-xl inline-block px-2 py-2 cursor-pointer mt-2">
            상세보기
          </div>
        </div>
      </div>
    </div>
  );
};
export default VideoPlayer;

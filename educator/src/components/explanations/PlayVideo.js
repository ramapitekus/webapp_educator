import { useRef, useEffect } from "react";

const PlayVideo = ({ videoStr }) => {
  const vidRef = useRef();
  console.log("hI!");

  useEffect(() => {
    vidRef.current.play();
  }, []);

  return (
    <>
      <div className="modalStyles" />
      <div className="overlayStyles">
        Hiiii!
        <button className="button buttonEndExplanation">End Explanation</button>
        <video src={`clips/${videoStr}.mp4`} ref={vidRef} autoPlay />
      </div>
    </>
  );
};

export default PlayVideo;

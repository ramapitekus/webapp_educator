import { useRef, useEffect } from "react";
import "./explanations.css";

const PlayVideo = ({ videostr, callback }) => {
  const vidRef = useRef();

  useEffect(() => {
    vidRef.current.play();
  }, []);

  return (
    <>
      <div className="modalStyles" />
      <div className="overlayStyles">
        <video
          src={`./clips/${videostr}.mp4`}
          ref={vidRef}
          onEnded={callback}
          autoPlay
        />
        <button className="button buttonEndExplanationVideo" onClick={callback}>
          Zurück
        </button>
      </div>
    </>
  );
};

export default PlayVideo;

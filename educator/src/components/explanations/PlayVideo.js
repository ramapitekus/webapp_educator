import { useRef, useEffect } from "react";
import "./explanations.css";

const PlayVideo = ({
  videostr,
  btnName,
  callback,
  explanationType,
  command,
}) => {
  const vidRef = useRef();

  useEffect(() => {
    vidRef.current.play();
    explanationType.current = "playing";
  }, []);

  useEffect(() => {
    if (command === "stopExplanation") {
      callback();
    }
    if (command === "pauseExplanation") {
      vidRef.current.pause();
      explanationType.current = "paused";
    }
    if (command === "resumeExplanation") {
      vidRef.current.play();
      explanationType.current = "playing";
    }
  }, [command]);

  return (
    <>
      <div>
        <button className="button buttonExplanationOverVideo">{btnName}</button>
      </div>
      <div className="overlayStyles">
        <video
          src={videostr}
          width="854"
          height="480"
          ref={vidRef}
          onEnded={callback}
        />
      </div>
      <button className="button buttonEndExplanationVideo" onClick={callback}>
        Zurück
      </button>
    </>
  );
};

export default PlayVideo;

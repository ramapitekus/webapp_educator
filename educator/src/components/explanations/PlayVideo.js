import { useRef, useEffect } from "react";
import "./explanations.css";

const PlayVideo = ({
  videostr,
  btnName,
  callback,
  explanationType,
  command,
  setShowButtons,
}) => {
  const vidRef = useRef();

  useEffect(() => {
    vidRef.current.play();
    // setShowButtons(false);
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
          width="800"
          height="800"
          ref={vidRef}
          onEnded={callback}
        />
        <button className="button buttonEndExplanationVideo" onClick={callback}>
          Zurück
        </button>
      </div>
    </>
  );
};

export default PlayVideo;

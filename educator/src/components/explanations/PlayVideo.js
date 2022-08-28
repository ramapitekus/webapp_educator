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
  const width = window.innerWidth;
  const height = window.innerHeight;

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
    //// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [command]);

  return (
    <>
      <div>
        <button
          className="button buttonExplanationOverVideo"
          style={{ fontSize: 500 / btnName.length }}
        >
          {btnName}
        </button>
      </div>
      <div className="overlayStyles">
        <video
          src={videostr}
          width={Math.floor(width / 1.5)}
          height={Math.floor(height / 1.5)}
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

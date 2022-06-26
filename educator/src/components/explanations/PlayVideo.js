import { useRef, useEffect } from "react";
import "./explanations.css";

const PlayVideo = ({ videostr, btnName, callback, command, commandDuringPlay }) => {
  const vidRef = useRef();

  useEffect(() => {
    vidRef.current.play();
    commandDuringPlay.current = "playing";
  }, []);

  useEffect(() => {
    if (command === "stopVideo"){
      callback();
    }
  }, [command])

  return (
    <>
      <div>
        <button className="button buttonExplanationOverVideo">{btnName}</button>
      </div>
      <div className="modalStyles" />
      <div className="overlayStyles">
        <video src={`${videostr}`} width="1500" height="1000" ref={vidRef} onEnded={callback}/>
        <button className="button buttonEndExplanationVideo" onClick={callback}>
          Zurück
        </button>
      </div>
    </>
  );
};

export default PlayVideo;

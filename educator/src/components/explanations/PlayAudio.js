import { useEffect, useRef } from "react";
import TextHighlight from "./TextHighlight";

const PlayAudio = ({
  url,
  json_url,
  callback,
  explanationType,
  command,
  setShowButtons,
}) => {
  const audRef = useRef();

  useEffect(() => {
    audRef.current.play();
    explanationType.current = "playing";
    setShowButtons(false);
    //console.log(json_url);
    //TextHighlight(json_url);
  }, []);

  useEffect(() => {
    if (command === "stopExplanation") {
      callback();
    }
    if (command === "pauseExplanation") {
      audRef.current.pause();
      explanationType.current = "paused";
    }
    if (command === "resumeExplanation") {
      audRef.current.play();
      explanationType.current = "playing";
    }
  }, [command]);

  return <audio src={url} ref={audRef} onEnded={callback} />;
};

export default PlayAudio;

import { useEffect, useRef } from "react";

const PlayAudio = ({ url, callback, explanationType, command }) => {
  const audRef = useRef();

  useEffect(() => {
    audRef.current.play();
    explanationType.current = "playing";
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

  return <audio src={`${url}`} ref={audRef} onEnded={callback} />;
};

export default PlayAudio;

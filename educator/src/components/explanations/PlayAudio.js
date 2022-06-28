import { useEffect, useRef } from "react";

const PlayAudio = ({
  url,
  callback,
  explanationType,
  command,
  setShowButtons,
}) => {
  let audio = new Audio(url);
  audio.onended = callback;

  useEffect(() => {
    audio.play();
    explanationType.current = "playing";
    setShowButtons(false);
  }, []);

  useEffect(() => {
    if (command === "stopExplanation") {
      callback();
    }
    if (command === "pauseExplanation") {
      audio.pause();
      explanationType.current = "paused";
    }
    if (command === "resumeExplanation") {
      audio.play();
      explanationType.current = "playing";
    }
  }, [command]);

  return null;
};

export default PlayAudio;

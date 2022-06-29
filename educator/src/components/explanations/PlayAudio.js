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
  const audRef = useRef(null);
  let audio = new Audio(url);
  audio.onended = stopAudio;
  const stopCommandUsed = useRef(false);

  async function stopAudio() {
    await new Promise(() =>
      setTimeout(function () {
        if (!stopCommandUsed.current) {
          callback();
        }
      }, 3000)
    );
  }

  useEffect(() => {
    audRef.current = audio;
    explanationType.current = "playing";
    audio.play();
    setShowButtons(false);
  }, []);

  useEffect(() => {
    if (command === "stopExplanation") {
      audRef.current.pause();
      stopCommandUsed.current = true;
      callback();
    }
    if (command === "pauseExplanation") {
      audRef.current.pause();
      explanationType.current = "paused";
    }
    if (command === "resumeExplanation") {
      audio.play();
      explanationType.current = "playing";
    }
  }, [command]);

  return (
    <TextHighlight json_url={json_url} stopCommandUsed={stopCommandUsed} />
  );
};

export default PlayAudio;

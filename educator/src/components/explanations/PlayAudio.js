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
  const animationUrl = "playing.gif";
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
      }, 2000)
    );
  }

  useEffect(() => {
    audRef.current = audio;
    explanationType.current = "playing";
    audio.play();
    setShowButtons(false);
  }, []);

  const stopExplanation = () => {
    audRef.current.pause();
    stopCommandUsed.current = true;
    callback();
  };

  useEffect(() => {
    if (command === "stopExplanation") {
      stopExplanation();
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

  return (
    <>
      <div>
        {<img src={animationUrl} width="250" />}
        <TextHighlight json_url={json_url} stopCommandUsed={stopCommandUsed} />
      </div>
      <button
        className="button buttonEndExplanationAudio"
        onClick={stopExplanation}
      >
        Zurück
      </button>
    </>
  );
};

export default PlayAudio;

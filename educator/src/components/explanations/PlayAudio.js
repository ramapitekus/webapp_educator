import { useEffect, useRef } from "react";
import TextHighlight from "./TextHighlight";

const PlayAudio = ({
  url,
  json_url,
  callback,
  explanationType,
  command,
  setShowButtons,
  ignoreTopics,
  counter,
  topic,
}) => {
  counter.current += 1;
  let audio = new Audio(`${url}?version=${counter.current}`);
  const audref = useRef(audio);
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
    explanationType.current = "playing";
    audref.current.play();
    ignoreTopics.current = true;
    setShowButtons(false);
  }, []);

  const stopExplanation = () => {
    audref.current.pause();
    stopCommandUsed.current = true;
    callback();
  };

  useEffect(() => {
    if (command === "stopExplanation") {
      stopExplanation();
    }
    if (command === "pauseExplanation") {
      audref.current.pause();
      explanationType.current = "paused";
    }
    if (command === "resumeExplanation") {
      audref.current.play();
      explanationType.current = "playing";
    }
  }, [command]);

  return (
    <>
      <div>
        <TextHighlight
          json_url={json_url}
          stopCommandUsed={stopCommandUsed}
          topic={topic}
        />
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

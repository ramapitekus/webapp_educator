import { useEffect } from "react";
import TextHighlight from "./TextHighlight";

const PlayAudio = ({
  url,
  json_url,
  callback,
  explanationType,
  command,
  setShowButtons,
}) => {
  let audio = new Audio(url);
  audio.onended = stopAudio;

  async function stopAudio() {
    await new Promise(() => setTimeout(callback, 3000));
  }

  useEffect(() => {
    audio.play();
    explanationType.current = "playing";
    setShowButtons(false);
    //console.log(json_url);
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

  return <TextHighlight json_url={json_url} />;
};

export default PlayAudio;

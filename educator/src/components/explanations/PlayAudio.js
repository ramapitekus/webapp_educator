import { useRef, useEffect } from "react";

const PlayAudio = ({ url, callback }) => {
  const audioRef = useRef();

  useEffect(() => {
    audioRef.current.play();
  }, []);

  return <audio src={`${url}`} ref={audioRef} onEnded={callback} autoPlay />;
};
// url={explanations.url} callback={removeExplanation(explanations.topic)
export default PlayAudio;

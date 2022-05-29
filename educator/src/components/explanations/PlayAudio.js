import { useRef, useEffect } from "react";

const PlayAudio = ({ url, callback, isPlaying, command }) => {
  const audRef = useRef();

  useEffect(() => {
    audRef.current.play();
    isPlaying.current = true;
  }, []);


  useEffect(() => {
    if (command === "stopVideo"){
    callback()
  }
}, [command])

  return <audio src={`${url}`} ref={audRef} />
};

export default PlayAudio;

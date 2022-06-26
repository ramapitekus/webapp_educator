const PlayAudio = ({ url, callback, commandDuringPlay }) => {
  var audio = new Audio(url);
  audio.play();
  commandDuringPlay.current = "playing";
  audio.onended = callback;
  
  return null;
}

export default PlayAudio;

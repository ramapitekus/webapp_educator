const PlayAudio = ({ url, callback, isPlaying }) => {
  var audio = new Audio(url);
  audio.play();
  isPlaying.current = true;
  audio.onended = callback;
  
  return null;
}

export default PlayAudio;

const PlayAudio = ({ url, callback, explanationType }) => {
  var audio = new Audio(url);
  audio.play();
  explanationType.current = "playing";
  audio.onended = callback;

  return null;
};

export default PlayAudio;

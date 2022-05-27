const PlayAudio = ({ url, isPlaying }) => {
  new Audio(url).play();
  isPlaying.current = true;
  return null;
};

export default PlayAudio;

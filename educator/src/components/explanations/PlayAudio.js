const PlayAudio = ({ url }) => {
  new Audio(url).play();

  return null;
};

export default PlayAudio;

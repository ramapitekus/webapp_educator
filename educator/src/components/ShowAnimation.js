import { useMemo, useState, useEffect, useRef } from "react";

const ShowAnimation = ({ transcribed, setTranscribed, response }) => {
  const loadingAnimation = "loading.gif";
  const playingAnimation = "./animations/speaking.gif";
  const [animationUrl, setAnimationUrl] = useState(null);
  const playAnimation = useRef(false);

  useEffect(() => {
    async function wait() {
      function resolve() {
        setAnimationUrl(loadingAnimation);
      }
      await new Promise(() => setTimeout(resolve, 1000));
    }

    if (transcribed) {
      playAnimation.current = true;
      wait();
    }
  }, [transcribed]);

  useEffect(() => {
    playAnimation.current = false;
    setTranscribed(false);
  }, [response]);

  return <>{playAnimation.current && <img src={animationUrl} width="250" />}</>;
};

export default ShowAnimation;

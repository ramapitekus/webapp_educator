import { useState, useEffect, useRef } from "react";

const ShowAnimation = ({
  transcribed,
  setTranscribed,
  response,
  setResponse,
}) => {
  const loadingAnimation = "loading.gif";
  const [animationUrl, setAnimationUrl] = useState(null);
  const animationRef = useRef(false);

  useEffect(() => {
    async function wait() {
      function resolve() {
        if (transcribed) {
          setAnimationUrl(loadingAnimation);
        }
      }
      await new Promise(() => setTimeout(resolve, 1000));
    }

    if (transcribed) {
      animationRef.current = true;
      wait();
    }
  }, [transcribed]);

  useEffect(() => {
    if (response) {
      animationRef.current = false;
      setTranscribed(false);
      setAnimationUrl(null);
      setResponse(false);
    }
  }, [response]);

  return (
    <>
      {animationUrl && animationRef.current && (
        <img src={animationUrl} width="250" />
      )}
    </>
  );
};

export default ShowAnimation;

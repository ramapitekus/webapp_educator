import { useEffect, useRef } from "react";

const ShowAnimation = ({
  transcribed,
  setTranscribed,
  response,
  setResponse,
}) => {
  const loadingAnimation = "loading.gif";
  const animationUrl = useRef(loadingAnimation);
  const animationRef = useRef(false);

  useEffect(() => {
    async function wait() {
      function resolve() {
        if (transcribed) {
          setTranscribed(false);
          animationUrl.current = loadingAnimation;
        }
      }
      setInterval(resolve, 1000);
    }

    if (transcribed) {
      animationRef.current = true;
      wait();
    }
    //// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcribed]);

  useEffect(() => {
    if (response) {
      animationRef.current = false;
      animationUrl.current = null;
      setResponse(false);
    }
    //// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <>
      {animationUrl.current && animationRef.current && (
        <img src={animationUrl.current} alt="" width="250" />
      )}
    </>
  );
};

export default ShowAnimation;

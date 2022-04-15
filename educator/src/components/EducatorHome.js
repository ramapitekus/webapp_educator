import { useMemo, useState, useEffect } from "react";
import ExplanationButtons from "./ExplanationButtons";
import sttFromMic from "./S2t";

const EducatorHome = () => {
  const [recording, setRecording] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [explanations, setExplanations] = useState([]);

  const getResponse = (apiData) => {
    // If utterance not recognized, ignore
    if (apiData !== "none") {
      setApiResponse(apiData);
    }
  };

  // Update explanations list if back-end recognizes utterance
  useEffect(() => {
    if (apiResponse && !explanations.includes(apiResponse)) {
      setExplanations([...explanations, apiResponse]);
    }
    //eslint-disable-next-line
  }, [apiResponse]);

  let [startRec, stopRec] = useMemo(() => {
    return sttFromMic(getResponse);
  }, []);

  switch (recording) {
    case false:
      return (
        <button
          className="button buttonStart"
          onClick={() => {
            startRec();
            setRecording(true);
          }}
        >
          Start Educator
        </button>
      );
    case true:
      return (
        <>
          <button
            className="button buttonStop"
            onClick={() => {
              stopRec();
              setRecording(false);
            }}
          >
            Stop Educator
          </button>
          {apiResponse && <ExplanationButtons topics={explanations} />}
        </>
      );
  }
};

export default EducatorHome;

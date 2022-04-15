import "./App.css";
import { useMemo, useState, useEffect } from "react";
import ExplanationButtons from "./components/ExplanationButtons";
import sttFromMic from "./components/S2t";

function App() {
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
      let updatedExplanations = explanations;
      if (explanations.length === 5) {
        updatedExplanations = updatedExplanations.filter(
          (expl) => explanations[0] !== expl
        );
      }
      setExplanations([...updatedExplanations, apiResponse]);
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
}

export default App;

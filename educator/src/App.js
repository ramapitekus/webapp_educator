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

  const changeColorProp = (explanation) => {
    if (explanation.name == apiResponse) {
      explanation.colored = true;
    }
    return explanation;
  };

  const existsInArr = (updatedExplanations) => {
    return updatedExplanations.find((expl) => {
      return expl.name === apiResponse;
    });
  };

  const removeOldestButton = (intermediateExplanations) => {
    return intermediateExplanations.filter(
      (expl) => explanations.name[0] !== expl.name
    );
  };

  useEffect(() => {
    // Set timeout after which coloring of mentioned topic is returned to gray
    let intermediateExplanations = explanations;
    // Block which handles if button does not exist yet
    if (apiResponse && !existsInArr(intermediateExplanations)) {
      // If more than 5 buttons present, remove oldest one
      if (intermediateExplanations.length >= 5) {
        intermediateExplanations = removeOldestButton(intermediateExplanations);
      }
      // If less than 5 buttons
      else {
        setExplanations([
          ...intermediateExplanations,
          { name: apiResponse, colored: false },
        ]);
      }
    }
    // Handle case if the button already exists
    if (apiResponse && existsInArr(intermediateExplanations)) {
      intermediateExplanations = intermediateExplanations.map(changeColorProp);
      setExplanations(intermediateExplanations);
    }
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
          {console.log(explanations)}
          {apiResponse && <ExplanationButtons topics={explanations} />}
        </>
      );
  }
}

export default App;

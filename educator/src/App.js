import "./App.css";
import { useMemo, useState, useEffect, useRef } from "react";
import ExplanationButtons from "./components/ExplanationButtons";
import sttFromMic from "./components/S2t";

function App() {
  const [recording, setRecording] = useState(false);
  const [apiResponse, setapiResponse] = useState(null);
  const [explanations, setExplanations] = useState([]);
  const latestButton = useRef(null);
  // const explRef = useRef(explanations);

  const getResponse = (apiData) => {
    // If utterance not recognized, ignore
    if (apiData !== "none") {
      setapiResponse({ topic: apiData });
    }
  };

  const setColorProp = (explanations) => {
    var copyExplanations = JSON.parse(JSON.stringify(explanations));
    copyExplanations.forEach((explanation) => {
      if (explanation.name == apiResponse.topic) {
        explanation.colored = true;
      }
    });
    setExplanations(copyExplanations);
  };

  const unsetColorProp = () => {
    var copyExplanations = JSON.parse(JSON.stringify(explanations));
    copyExplanations.forEach((explanation) => {
      if (
        explanation.name == latestButton.current &&
        explanation.colored == true
      ) {
        explanation.colored = false;
        setExplanations(copyExplanations);
      }
    });
  };

  const existsInArr = (updatedExplanations) => {
    return updatedExplanations.find((expl) => {
      return expl.name == apiResponse.topic;
    });
  };

  const removeOldestButton = (intermediateExplanations) => {
    return intermediateExplanations.filter(
      (expl) => explanations[0].name !== expl.name
    );
  };

  // useEffect(() => {
  //   explRef.current = explanations
  // }, [explanations])

  useEffect(() => {
    // TODO: create if for apiResponse, nest everything else inside
    // Set timeout after which coloring of mentioned topic is returned to gray
    let intermediateExplanations = explanations;
    // Block which handles if button does not exist yet
    if (apiResponse && !existsInArr(intermediateExplanations)) {
      // If more than 5 buttons present, remove oldest one
      if (intermediateExplanations.length >= 5) {
        intermediateExplanations = removeOldestButton(intermediateExplanations);
      }
      latestButton.current = apiResponse.topic;
      setExplanations([
        ...intermediateExplanations,
        { name: apiResponse.topic, colored: true },
      ]);
    }
    // Handle case if the button already exists
    if (apiResponse && existsInArr(intermediateExplanations)) {
      setColorProp(intermediateExplanations);
      latestButton.current = apiResponse.topic;
    }
  }, [apiResponse]);

  // add timeout 2s, after this, change buttons back to original color
  useEffect(() => {
    setTimeout(() => {
      unsetColorProp();
    }, 10000);
  }, [explanations]);

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

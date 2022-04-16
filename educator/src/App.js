import "./App.css";
import { useMemo, useState, useEffect, useRef } from "react";
import ExplanationButtons from "./components/ExplanationButtons";
import sttFromMic from "./components/S2t";

function App() {
  const [recording, setRecording] = useState(false);
  const [apiResponse, setapiResponse] = useState({ topic: null });
  const [explanations, setExplanations] = useState([]);
  const latestButton = useRef(null);
  const explRef = useRef(explanations);

  const getResponse = (apiData) => {
    // If utterance not recognized, ignore
    if (apiData !== "none") {
      setapiResponse({ topic: apiData });
    }
  };

  const setColorProp = (explanations) => {
    // TODO: Remove hacky copying
    var copyExplanations = JSON.parse(JSON.stringify(explanations));
    copyExplanations.forEach((explanation) => {
      if (explanation.name === apiResponse.topic) {
        explanation.colored = true;
      }
    });
    setExplanations(copyExplanations);
  };

  const unsetColorProp = (button) => {
    // TODO: Remove hacky copying
    var copyExplanations = JSON.parse(JSON.stringify(explRef.current));
    copyExplanations.forEach((explanation) => {
      if (explanation.name === button && explanation.colored === true) {
        explanation.colored = false;
        setExplanations(copyExplanations);
      }
    });
  };

  const existsInArr = (updatedExplanations) => {
    return updatedExplanations.find((expl) => {
      return expl.name === apiResponse.topic;
    });
  };

  const removeOldestButton = (intermediateExplanations) => {
    return intermediateExplanations.filter(
      (expl) => explanations[0].name !== expl.name
    );
  };

  useEffect(() => {
    explRef.current = explanations;
  }, [explanations]);

  useEffect(() => {
    let intermediateExplanations = explanations;
    if (apiResponse.topic) {
      latestButton.current = apiResponse.topic;

      // Block which handles if button does not exist yet
      if (!existsInArr(intermediateExplanations)) {
        // If more than 5 buttons present, remove oldest one
        if (intermediateExplanations.length >= 5) {
          intermediateExplanations = removeOldestButton(
            intermediateExplanations
          );
        }
        setExplanations([
          ...intermediateExplanations,
          { name: apiResponse.topic, colored: true },
        ]);
      }
      // Change color property of button if already exists
      if (existsInArr(intermediateExplanations)) {
        setColorProp(intermediateExplanations);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiResponse]);

  // 10s after mentioning the topic, return the color back to gray
  useEffect(() => {
    const button = latestButton.current; // assign the button associated with this instance of useEffect
    setTimeout(() => {
      unsetColorProp(button);
    }, 10000);
  }, [explanations]);

  let [startRec, stopRec] = useMemo(() => {
    return sttFromMic(getResponse);
  }, []);

  useEffect(() => {
    recording ? startRec() : stopRec();
  }, [recording]);

  return (
    <>
      <button
        className={recording ? "button buttonStop" : "button buttonStart"}
        onClick={() => {
          setRecording(!recording);
        }}
      >
        {recording ? "Stop Educator" : "Start Educator"}
      </button>
      {<ExplanationButtons topics={explanations} />}
    </>
  );
}

export default App;

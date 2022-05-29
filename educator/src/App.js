import "./App.css";
import { useMemo, useState, useEffect, useRef } from "react";
import ExplanationButtons from "./components/ExplanationButtons";
import sttFromMic from "./components/S2t";
import PlayAudio from "./components/explanations/PlayAudio";
import PlayVideo from "./components/explanations/PlayVideo";

function App() {
  const initialLeftOffset = 10;
  const initialTopOffset = 40;
  const [recording, setRecording] = useState(false);
  const [apiResponse, setapiResponse] = useState({ topic: null });
  const [explanations, setExplanations] = useState([]);
  const [instantExplanation, setInstantExplanation] = useState(null);
  const isPlaying = useRef(false);
  const latestButton = useRef(null);
  const explRef = useRef(explanations);
  const leftOffsetBtnRef = useRef(initialLeftOffset);
  const topOffsetBtnRef = useRef(initialTopOffset);

  const getResponse = (apiData) => {
    // If utterance not recognized, ignore
    console.log(apiData);
    if (apiData.topic !== "none") {
      setapiResponse(apiData);
    }
  };

  const removeExplanation = () => {
    setInstantExplanation(null);
    isPlaying.current = false;
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

  const setNextButtonLocation = () => {
    if (topOffsetBtnRef.current > initialTopOffset) {
      topOffsetBtnRef.current -= 15;
    } else {
      topOffsetBtnRef.current += 15;
    }
    leftOffsetBtnRef.current += 15;
  };

  useEffect(() => {
    explRef.current = explanations;
  }, [explanations]);

  useEffect(
    () => {
      let intermediateExplanations = explanations;

      // Block which handles if button does not exist yet
      if (apiResponse.topic) {
        if (apiResponse.playInstantly === "true") {
          setInstantExplanation({
            name: apiResponse.topic,
            url: apiResponse.url,
            mediaType: apiResponse.mediaType,
          });
        } else {
          latestButton.current = apiResponse.topic;
          if (!existsInArr(intermediateExplanations)) {
            // If more than 5 buttons present, remove oldest one
            if (intermediateExplanations.length >= 5) {
              intermediateExplanations = removeOldestButton(
                intermediateExplanations
              );
            } else {
              setNextButtonLocation();
              setExplanations([
                ...intermediateExplanations,
                {
                  name: apiResponse.topic,
                  colored: true,
                  url: apiResponse.url,
                  topOffset: topOffsetBtnRef.current,
                  leftOffset: leftOffsetBtnRef.current,
                },
              ]);
            }
          }
          if (existsInArr(intermediateExplanations)) {
            setColorProp(intermediateExplanations);
          }
        }
        // Change color property of button if already exists
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [apiResponse]
  );

  // 10s after mentioning the topic, return the color back to gray
  useEffect(() => {
    const button = latestButton.current; // assign the button associated with this instance of useEffect
    setTimeout(() => {
      unsetColorProp(button);
    }, 10000);
  }, [explanations, instantExplanation]);

  let [startRec, stopRec] = useMemo(() => {
    return sttFromMic(getResponse, isPlaying);
  }, []);

  useEffect(() => {
    recording ? startRec() : stopRec();
    if (instantExplanation) {
      setInstantExplanation(null);
    }
  }, [recording]);

  return (
    <>
      <button
        className={recording ? "button buttonStop" : "button buttonStart"}
        onClick={() => {
          setRecording(!recording);
          setInstantExplanation(null);
        }}
      >
        {recording ? "Educator stoppen" : "Educator starten"}
      </button>
      {instantExplanation && instantExplanation.mediaType === "audio" && (
        <PlayAudio
          url={instantExplanation.url}
          callback={removeExplanation}
          isPlaying={isPlaying}
        />
      )}
      {instantExplanation && instantExplanation.mediaType === "video" && (
        <PlayVideo
          videostr={instantExplanation.url}
          btnName={instantExplanation.name}
          callback={removeExplanation}
          isPlaying={isPlaying}
        />
      )}

      {recording && (
        <ExplanationButtons topics={explanations} isPlaying={isPlaying} />
      )}
    </>
  );
}

export default App;

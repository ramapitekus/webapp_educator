import "./App.css";
import { useMemo, useState, useEffect, useRef } from "react";
import ExplanationButtons from "./components/ExplanationButtons";
import sttFromMic from "./components/S2t";
import PlayAudio from "./components/explanations/PlayAudio";
import PlayVideo from "./components/explanations/PlayVideo";
import ShowAnimation from "./components/ShowAnimation";

function App() {
  const initialLeftOffset = 0;
  const initialTopOffset = 40;
  const [recording, setRecording] = useState(false);
  const [commandDuringVideo, setCommandDuringVideo] = useState(null);
  const [apiResponse, setapiResponse] = useState({ topic: null });
  const [showButtons, setShowButtons] = useState(true);
  const [explanations, setExplanations] = useState([]);
  const [instantExplanation, setInstantExplanation] = useState(null);
  const [transcribed, setTranscribed] = useState(false);
  const [responded, setResponded] = useState(false);
  const explanationType = useRef("idle");
  const latestButton = useRef(null);
  const explRef = useRef(explanations);
  const leftOffsetBtnRef = useRef(initialLeftOffset);
  const topOffsetBtnRef = useRef(initialTopOffset);
  const ignoreTopics = useRef(false);
  const counter = useRef(0);

  const getResponse = (apiData) => {
    // If utterance not recognized, ignore
    console.log(apiData);
    if (apiData.command) {
      setCommandDuringVideo(apiData.command);
    }
    setResponded(true);
    if (apiData.topic !== "none" && !ignoreTopics.current) {
      if (apiData.playInstantly === "true") {
        setInstantExplanation({
          name: apiData.topic,
          url: apiData.url,
          mediaType: apiData.mediaType,
          align_url: apiData.align_url,
          topic: apiData.topic,
        });
      } else {
        setapiResponse(apiData);
      }
    }
  };

  const removeExplanation = () => {
    explanationType.current = "idle";
    setInstantExplanation(null);
    setShowButtons(true);
    setCommandDuringVideo(null);
    setInterval(() => {
      ignoreTopics.current = false;
    }, 1000);
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
      topOffsetBtnRef.current = topOffsetBtnRef.current % (15 * 6);
    }
    leftOffsetBtnRef.current += 15;
    leftOffsetBtnRef.current = leftOffsetBtnRef.current % (15 * 6);
  };

  useEffect(() => {
    explRef.current = explanations;
  }, [explanations]);

  useEffect(
    () => {
      let intermediateExplanations = explanations;

      // Block which handles if button does not exist yet
      if (apiResponse.topic) {
        latestButton.current = apiResponse.topic;
        if (!existsInArr(intermediateExplanations)) {
          // If more than 5 buttons present, remove oldest one
          if (intermediateExplanations.length >= 5) {
            intermediateExplanations = removeOldestButton(
              intermediateExplanations
            );
          }
          setNextButtonLocation();
          setExplanations([
            ...intermediateExplanations,
            {
              name: apiResponse.topic,
              colored: false,
              url: apiResponse.url,
              topOffset: topOffsetBtnRef.current,
              leftOffset: leftOffsetBtnRef.current,
            },
          ]);
        }
      }
    },
    //// eslint-disable-next-line react-hooks/exhaustive-deps
    [apiResponse]
  );

  const removeButton = (button) => {
    latestButton.current = null; // indicates the removal of the button
    setExplanations(explRef.current.filter((expl) => expl.name !== button));
  };

  useEffect(() => {
    const button = latestButton.current; // assign the button associated with this instance of useEffect
    if (button) {
      // check if the button has already been removed
      setTimeout(() => {
        removeButton(button);
      }, 30000);
    }
  }, [explanations]);

  let [startRec, stopRec] = useMemo(() => {
    return sttFromMic(getResponse, explanationType, setTranscribed);
  }, []);

  useEffect(() => {
    recording ? startRec() : stopRec();
    if (instantExplanation) {
      setInstantExplanation(null);
    }
  }, [recording]);

  return (
    <>
      {!recording && (
        <button
          className={recording ? "button buttonStop" : "button buttonStart"}
          onClick={() => {
            setRecording(!recording);
            setResponded(false);
          }}
        >
          {recording ? "Educator stoppen" : "Educator starten"}
        </button>
      )}

      {
        <ShowAnimation
          transcribed={transcribed}
          setTranscribed={setTranscribed}
          response={responded}
          setResponse={setResponded}
        />
      }

      {instantExplanation && instantExplanation.mediaType === "audio" && (
        <PlayAudio
          url={instantExplanation.url}
          json_url={instantExplanation.align_url}
          callback={removeExplanation}
          explanationType={explanationType}
          command={commandDuringVideo}
          setShowButtons={setShowButtons}
          ignoreTopics={ignoreTopics}
          counter={counter}
          topic={instantExplanation.topic}
        />
      )}

      {recording && (
        <ExplanationButtons
          instantExplanation={instantExplanation}
          topics={explanations}
          explanationType={explanationType}
          command={commandDuringVideo}
          setCommandDuringVideo={setCommandDuringVideo}
          showButtons={showButtons}
          setShowButtons={setShowButtons}
        />
      )}

      {instantExplanation && instantExplanation.mediaType === "video" && (
        <PlayVideo
          videostr={instantExplanation.url}
          btnName={instantExplanation.name}
          callback={removeExplanation}
          explanationType={explanationType}
          command={commandDuringVideo}
        />
      )}
    </>
  );
}

export default App;

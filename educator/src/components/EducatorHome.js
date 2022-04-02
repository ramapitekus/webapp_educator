import { useMemo, useState } from "react";
import ExplanationButtons from "./ExplanationButtons";
import sttFromMic from "./S2t";

const EducatorHome = () => {
  const [recording, setRecording] = useState(false);
  let [startRec, stopRec] = useMemo(() => {
    return sttFromMic();
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
          <ExplanationButtons />
        </>
      );
  }
};

export default EducatorHome;

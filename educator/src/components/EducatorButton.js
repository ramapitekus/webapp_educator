import { useMemo, useState } from "react";
import sttFromMic from "./S2t";

const EducatorButton = () => {
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
        <button
          className="button buttonStop"
          onClick={() => {
            stopRec();
            setRecording(false);
          }}
        >
          Stop Educator
        </button>
      );
  }
};

export default EducatorButton;

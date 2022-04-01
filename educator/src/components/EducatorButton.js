import { useMemo, useState } from "react";
import sttFromMic from "./S2t";

const EducatorButton = () => {
  const [recording, setRecording] = useState(false);
  const [Session, setSession] = useState(0);
  let [startRec, stopRec] = useMemo(() => {
    return sttFromMic();
  }, []);

  switch (recording) {
    case false:
      return (
        <button
          className="button button1"
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
          className="button button1"
          onClick={() => {
            stopRec();
            setRecording(false);
            setSession(Session + 1);
          }}
        >
          Stop Educator
        </button>
      );
  }
};

export default EducatorButton;

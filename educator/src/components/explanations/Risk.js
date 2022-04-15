import React, { useEffect, useRef } from "react";
import "./explanations.css";

const Risk = ({ onClose }) => {
  const vidRef = useRef();

  useEffect(() => {
    vidRef.current.play();
  }, []);

  return (
    <>
      <div className="modalStyles" />
      <div className="overlayStyles">
        <video src="/clips/Understanding Risks.mp4" ref={vidRef} autoPlay />
        <button className="button buttonEndExplanationVideo" onClick={onClose}>
          End Explanation
        </button>
      </div>
    </>
  );
};

export default Risk;

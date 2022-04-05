import React from "react";
import "./explanations.css";

const Risk = ({ onClose }) => {
  return (
    <>
      <div className="modalStyles" />
      <div className="overlayStyles">
        <button className="button buttonEndExplanation" onClick={onClose}>
          End Explanation
        </button>
        Risk explanation page
      </div>
    </>
  );
};

export default Risk;

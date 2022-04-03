import React from "react";
import "./explanations.css";

const Obligations = ({ onClose }) => {
  return (
    <>
      <div className="modalStyles" />
      <div className="overlayStyles">
        <button className="button buttonEndExplanation" onClick={onClose}>
          End Explanation
        </button>
        Obligations explanation page
      </div>
    </>
  );
};

export default Obligations;

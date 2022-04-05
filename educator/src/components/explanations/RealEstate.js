import React from "react";
import "./explanations.css";

const RealEstate = ({ onClose }) => {
  return (
    <>
      <div className="modalStyles" />
      <div className="overlayStyles">
        <button className="button buttonEndExplanation" onClick={onClose}>
          End Explanation
        </button>
        Real Estate explanation page
      </div>
    </>
  );
};

export default RealEstate;

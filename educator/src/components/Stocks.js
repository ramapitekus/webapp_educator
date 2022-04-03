import React from "react";
import "./explanations.css";

export default function Stocks({ onClose }) {
  return (
    <>
      <div className="modalStyles" />
      <div className="overlayStyles">
        <button className="button buttonEndExplanation" onClick={onClose}>
          End Explanation
        </button>
        Stocks explanation page
      </div>
    </>
  );
}

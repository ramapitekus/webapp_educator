import React from "react";

const MODAL_STYLES = {
  position: "fixed",
  top: "30%",
  left: "40%",
  backgroundColor: "black",
  padding: "50px",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "black",
  zIndex: 1000,
};

export default function Stocks({ onClose }) {
  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button className="button buttonExplanation" onClick={onClose}>
          End Explanation
        </button>
        Stocks explanation page
      </div>
    </>
  );
}

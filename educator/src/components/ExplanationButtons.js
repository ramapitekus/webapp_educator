import React, { useState } from "react";
import PlayVideo from "./explanations/PlayVideo";

const ExplanationButtons = ({ topics }) => {
  const [VideoStr, setVideoStr] = useState(null);
  const [BtnName, setBtnName] = useState(null);
  const [showButtons, setShowButtons] = useState(true);

  const handleClick = (expl) => {
    setVideoStr(expl.url);
    setShowButtons(false);
    setBtnName(expl.name);
  };

  const VideoCallback = () => {
    setVideoStr(null);
    setBtnName(null);
    setShowButtons(true);
  };

  var explanationButtons = topics.map((expl) => (
    <button
      style={{
        position: "absolute",
        left: `${expl.leftOffset}%`,
        top: `${expl.topOffset}%`,
      }}
      className={
        expl.colored
          ? "button buttonExplanationMentioned"
          : "button buttonExplanation"
      }
      //TODO: Add reasonable keys
      key={Math.random()}
      onClick={() => {
        handleClick(expl);
      }}
      expl={expl.name}
    >
      {expl.name}
    </button>
  ));

  return (
    <>
      {VideoStr && (
        <PlayVideo
          videostr={VideoStr}
          btnName={BtnName}
          callback={VideoCallback}
        />
      )}
      <div>{showButtons && explanationButtons}</div>
    </>
  );
};

export default ExplanationButtons;

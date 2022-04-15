import React, { useState } from "react";
import PlayVideo from "./explanations/PlayVideo";

const ExplanationButtons = ({ topics }) => {
  // const [ExplanationComponent, setExplanationComponent] = useState(null);
  const [VideoStr, setVideoStr] = useState(null);

  const handleClick = (e) => {
    const val = e.currentTarget.getAttribute("expl");
    setVideoStr(val);
  };

  const VideoCallback = () => {
    setVideoStr(null);
    console.log("close button pressed");
  };

  var explanationButtons = topics.map((expl) => (
    <button
      className="button buttonExplanation"
      //TODO: Add reasonable keys
      key={Math.random()}
      onClick={handleClick}
      expl={expl}
    >
      {expl}
    </button>
  ));

  return (
    <>
      {VideoStr && <PlayVideo videostr={VideoStr} callback={VideoCallback} />}
      <div>{explanationButtons}</div>
    </>
  );
};

export default ExplanationButtons;

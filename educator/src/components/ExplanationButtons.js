import React, { useState } from "react";
import PlayVideo from "./explanations/PlayVideo";

const ExplanationButtons = ({ topics }) => {
  const [VideoStr, setVideoStr] = useState(null);

  const handleClick = (expl) => {
    // TODO: Add flag logic when implemented at the backend
    setVideoStr(expl.url);
  };

  const VideoCallback = () => {
    setVideoStr(null);
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
      {VideoStr && <PlayVideo videostr={VideoStr} callback={VideoCallback} />}
      <div>{explanationButtons}</div>
    </>
  );
};

export default ExplanationButtons;

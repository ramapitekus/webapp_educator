import React, { useState } from "react";
import PlayVideo from "./explanations/PlayVideo";

const ExplanationButtons = ({ topics }) => {
  //topics.forEach((topic) => {
  //  console.log(topic);
  //});
  // const [ExplanationComponent, setExplanationComponent] = useState(null);
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

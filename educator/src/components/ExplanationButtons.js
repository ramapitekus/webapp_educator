import React, { useState } from "react";
import PlayVideo from "./explanations/PlayVideo";

const ExplanationButtons = ({
  topics,
  explanationType,
  command,
  setCommandDuringVideo,
}) => {
  const [VideoStr, setVideoStr] = useState(null);
  const [BtnName, setBtnName] = useState(null);
  const [showButtons, setShowButtons] = useState(true);

  const handleClick = (expl) => {
    setVideoStr(expl.url);
    setShowButtons(false);
    setBtnName(expl.name);
  };

  const removeExplanation = () => {
    setVideoStr(null);
    setBtnName(null);
    setShowButtons(true);
    explanationType.current = "idle";
    if (command == "stopExplanation") {
      setCommandDuringVideo(null);
    }
  };

  // const pauseExplanation = () => {
  //
  // }

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
          callback={() => {
            removeExplanation();
          }}
          explanationType={explanationType}
          command={command}
          setCommandDuringVideo={setCommandDuringVideo}
        />
      )}
      <div>{showButtons && explanationButtons}</div>
    </>
  );
};

export default ExplanationButtons;

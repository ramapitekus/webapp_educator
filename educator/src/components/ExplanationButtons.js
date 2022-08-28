import React, { useState } from "react";
import PlayVideo from "./explanations/PlayVideo";

const ExplanationButtons = ({
  instantExplanation,
  topics,
  explanationType,
  command,
  setCommandDuringVideo,
  showButtons,
  setShowButtons,
}) => {
  const [VideoStr, setVideoStr] = useState(null);
  const [BtnName, setBtnName] = useState(null);
  const width = window.innerWidth;

  const handleClick = (expl) => {
    setVideoStr(expl.url);
    setBtnName(expl.name);
  };

  const removeExplanation = () => {
    setVideoStr(null);
    setBtnName(null);
    setShowButtons(true);
    explanationType.current = "idle";
    if (command === "stopExplanation") {
      setCommandDuringVideo(null);
    }
  };

  var style = {
    position: "absolute",
  };
  if (VideoStr || instantExplanation) {
    style.filter = "blur(8px)";
  }

  var explanationButtons = topics.map((expl) => (
    <button
      style={{
        ...style,
        left: `${expl.leftOffset}%`,
        top: `${expl.topOffset}%`,
        fontSize: width / 4 / expl.name.length,
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
        />
      )}
      <div>{showButtons && explanationButtons}</div>
    </>
  );
};

export default ExplanationButtons;

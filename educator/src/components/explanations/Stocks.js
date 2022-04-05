import React, { useState } from "react";
import "./explanations.css";
import useSound from "use-sound";

export default function Stocks({ onClose }) {
  const subTopics = [
    "Advantages and Disadvantages",
    "Common and Preferred Stocks",
    "How do you buy stocks",
    "Shareholder and Equity Ownership",
    "Understanding Stocks",
  ];

  const CreateBtns = (subTopic) => {
    const DynamicAudio = require(`./audios/stocks/${subTopic}.mp3`);

    console.log(DynamicAudio);
    const [audioPlaying, setAudioPlaying] = useState(false);

    const [DynAudio, { stop }] = useSound(DynamicAudio, {
      volume: 1.0,
    });

    const play = () => {
      if (!audioPlaying) {
        setAudioPlaying(true);
        DynAudio();
      } else {
        setAudioPlaying(false);
        stop();
      }
    };

    return (
      <button
        className="button buttonExplanation"
        //TODO: Add reasonable keys
        key={Math.random()}
        onClick={play}
        expl={subTopic}
      >
        {subTopic}
      </button>
    );
  };

  var explanationButtons = subTopics.map(CreateBtns);

  return (
    <>
      <div className="modalStyles" />
      <div className="overlayStyles">
        Stocks
        <div>{explanationButtons}</div>
        <button className="button buttonEndExplanation" onClick={onClose}>
          End Explanation
        </button>
      </div>
    </>
  );
}

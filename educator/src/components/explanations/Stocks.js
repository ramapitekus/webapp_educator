import React, { useState } from "react";
import "./explanations.css";
import useSound from "use-sound";
import { Text } from "react-native";

export default function Stocks({ onClose }) {
  const subTopics = [
    "Advantages and Disadvantages",
    "Common and Preferred Stocks",
    "How do you buy stocks",
    "Shareholder and Equity Ownership",
    "Understanding Stocks",
  ];

  const CreateAudioBtns = (subTopic) => {
    const DynamicAudio = require(`./audios/stocks/${subTopic}.mp3`);

    const [audioPlaying, setAudioPlaying] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const [DynAudio, { stop }] = useSound(DynamicAudio, {
      onend: () => {
        setAudioPlaying(false);
        setIsFinished(true);
      },
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
        className={
          !audioPlaying
            ? isFinished
              ? "button buttonFinished"
              : "button buttonExplanation"
            : "button buttonStopSubtopic"
        }
        //TODO: Add reasonable keys
        key={Math.random()}
        onClick={play}
        expl={subTopic}
      >
        <Text style={{ color: "white" }}>{subTopic.replace(" ", "\n")}</Text>
      </button>
    );
  };

  var explanationButtons = subTopics.map(CreateAudioBtns);

  return (
    <>
      <div className="modalStyles" />
      <div className="overlayStyles">
        <Text style={{ color: "white" }}>Stocks</Text>
        <div>{explanationButtons}</div>
        <button className="button buttonEndExplanation" onClick={onClose}>
          End Explanation
        </button>
      </div>
    </>
  );
}

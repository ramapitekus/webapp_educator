import React, { useState } from "react";
import useSound from "use-sound";
import { Text } from "react-native";
import "./explanations.css";

const RealEstate = ({ onClose }) => {
  const subTopics = [
    "Advantages and Disadvantages",
    "Understanding Real Estates",
    "Owning rental properties",
    "House Flipping",
  ];

  const CreateAudioBtns = (subTopic) => {
    const DynamicAudio = require(`./audios/realEstate/${subTopic}.mp3`);
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
        <Text style={{ color: "white" }}>Real Estate</Text>
        <div>{explanationButtons}</div>
        <button className="button buttonEndExplanation" onClick={onClose}>
          End Explanation
        </button>
      </div>
    </>
  );
};

export default RealEstate;

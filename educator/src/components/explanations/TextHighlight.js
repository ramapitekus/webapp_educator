import { useState, useEffect, useRef } from "react";

const TextHighlight = ({ json_url, stopCommandUsed, topic }) => {
  const [newWord, setNewWord] = useState("");
  const accWords = useRef("");
  const animationUrl = "playing.gif";
  const counter = useRef(-1);
  const width = window.innerWidth;
  const textAlignmentJson = json_url.fragments;
  const length = textAlignmentJson.length;

  useEffect(() => {
    async function wait() {
      const indx = counter.current;
      if (indx < length) {
        let word = textAlignmentJson[indx];

        function resolve() {
          if (!stopCommandUsed.current) {
            let word = textAlignmentJson[indx];
            let newWord = word.lines[0];
            accWords.current = accWords.current + " " + newWord;
            setNewWord(newWord);
          }
        }

        await new Promise(() =>
          setTimeout(resolve, (word.begin - indx) * 1000)
        );
      }
    }

    counter.current += 1;
    wait();
    //// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newWord]);
  return (
    <div>
      <h1 style={{ fontSize: width / 80 }}>{topic}</h1>
      {<img src={animationUrl} alt="" width="250" />}
      <h1 className="centered" style={{ fontSize: width / 70 }}>
        {accWords.current}
      </h1>
    </div>
  );
};

export default TextHighlight;

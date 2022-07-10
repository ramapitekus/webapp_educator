import { useState, useEffect, useRef } from "react";

const TextHighlight = ({ json_url, stopCommandUsed }) => {
  const [newWord, setNewWord] = useState("");
  const accWords = useRef("");
  const counter = useRef(-1);
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
  }, [newWord]);
  return <h1 className="centered">{accWords.current}</h1>;
};

export default TextHighlight;

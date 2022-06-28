import { useState, useEffect, useRef } from "react";

const TextHighlight = ({ json_url }) => {
  const [newWord, setNewWord] = useState("");
  const accWords = useRef("");
  const counter = useRef(0);
  const textAlignmentJson = json_url.fragments;
  const length = textAlignmentJson.length;

  async function load() {
    // const start = Date.now();
    // textAlignmentJson = await fetch(json_url)
    //   .then((res) => res.json())
    //   .then((out) => out.fragments);
    // console.log(textAlignmentJson);
    // const end = Date.now();
    // console.log(typeof json_url);
    // console.log(json_url);
    // console.log(json_url);

    // const load_diff = end - start;
    // console.log(`diff is: ${load_diff}`);
    const indx = counter.current;
    if (indx < length) {
      let word = textAlignmentJson[indx];
      //for (let i = 0; i < textAlignmentJson.length; i++) {
      //let word = textAlignmentJson[i];
      await new Promise((resolve) =>
        setTimeout(resolve, (word.end - word.begin) * 1000)
      );
      let newWord = word.lines[0];
      console.log(newWord);
      setNewWord(newWord);
    }
    // console.log(newWord);
  }

  useEffect(() => {
    accWords.current = accWords.current + " " + newWord;
    counter.current += 1;
  }, [newWord]);

  load();

  return <h1>{accWords.current}</h1>;
};

export default TextHighlight;

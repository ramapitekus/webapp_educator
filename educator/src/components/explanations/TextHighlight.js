import { useState, useEffect, useRef } from "react";

const TextHighlight = ({ json_url, stopCommandUsed }) => {
  const [newWord, setNewWord] = useState("");
  const accWords = useRef("");
  const counter = useRef(-1);
  const textAlignmentJson = json_url.fragments;
  const length = textAlignmentJson.length;

  // async function load() {
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
  // const indx = counter.current;
  // if (indx < length) {
  //   let word = textAlignmentJson[indx];
  //      for (let i = 0; i < textAlignmentJson.length; i++) {
  //      let word = textAlignmentJson[i];
  // function resolve() {
  //   let newWord = word.lines[0];
  //   console.log(newWord);
  //   setNewWord(newWord);
  // }
  // await new Promise(() =>
  //   setTimeout(resolve, (word.end - word.begin) * 1000)
  // );
  //     let newWord = word.lines[0];
  //     console.log(newWord);
  //     setNewWord(newWord);
  // }

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
          setTimeout(resolve, (word.end - word.begin) * 1000)
        );
      }
    }

    counter.current += 1;
    wait();
    // accWords.current = accWords.current + " " + newWord;
  }, [newWord]);

  return <h1>{accWords.current}</h1>;
};

export default TextHighlight;

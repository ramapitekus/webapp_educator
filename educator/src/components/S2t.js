import { ResultReason } from "microsoft-cognitiveservices-speech-sdk";
import RecordIcon from "../assets/mic.png"; // Unused image for button
import "./s2t.css";

const S2t = () => {
  const sdk = require("microsoft-cognitiveservices-speech-sdk");

  async function sttFromMic() {
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      "2ed0fc03d2e441388c4fd35cc91c23b3",
      "eastus"
    );
    speechConfig.speechRecognitionLanguage = "de-CH";

    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync((result) => {
      if (result.reason === ResultReason.RecognizedSpeech) {
        console.log(
          result.text +
            "\n Recording stopped. Press the streaming button to start again."
        );
      } else {
        console.log(
          "ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly."
        );
      }
    });
  }

  return (
    sdk && (
      <>
        <div className="record-div">
          <h1>Speech to text</h1>
          <button className="button-rec" onClick={sttFromMic}>
            Start streaming
          </button>
        </div>
      </>
    )
  );
};

export default S2t;

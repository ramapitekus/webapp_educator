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
        sendToAPI("http://localhost:5000/api/v1/models", result.text)
          .then(response => {console.log("Answer from the API:\n" + response.message)});
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

async function sendToAPI(url, message) {
  // Simple POST request with a JSON body using fetch
  const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ message: message })
  };

  let response = await fetch(url, requestOptions);
  return response.json();
}

export default S2t;

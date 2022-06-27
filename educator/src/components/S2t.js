import { ResultReason } from "microsoft-cognitiveservices-speech-sdk";

function sttFromMic(setResponse, explanationType) {
  const sdk = require("microsoft-cognitiveservices-speech-sdk");
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    "b8a6fd9cb3e74ef8870ca93b79b68296",
    "switzerlandnorth"
  );
  speechConfig.speechRecognitionLanguage = "de-CH";
  const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
  const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

  async function startRecording() {
    recognizer.startContinuousRecognitionAsync();
    recognizer.recognized = (_, e) => {
      var result = e.result;
      if (result.reason === ResultReason.RecognizedSpeech && result.text) {
        console.log(result.text);
        sendToAPI(
          "http://localhost:5000/api/v1/models",
          result.text,
          explanationType
        ).then((response) => {
          console.log(
            "Answer from the API:\n" +
              response.message +
              "\nAPI recognized following topic:\n" +
              response.topic
          );
          setResponse(response);
        });
      } else {
        console.log(
          "ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly."
        );
      }
    };
  }
  async function stopRecording() {
    recognizer.stopContinuousRecognitionAsync();
  }
  return [startRecording, stopRecording];
}

async function sendToAPI(url, message, explanationType) {
  // Simple POST request with a JSON body using fetch
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: message,
      explanationState: explanationType.current,
    }),
  };

  let response = await fetch(url, requestOptions);
  return response.json();
}

export default sttFromMic;

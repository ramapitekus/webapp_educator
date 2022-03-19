import { useCallback, useRef, useState } from "react";

const Recording = () => {
  const mediaRecorder = useRef(null);
  const mediaChunks = useRef([]);
  const stream = useRef(null);
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const blob = useRef(null);
  const [audioArray, setAudioArray] = useState(null); // BufferArray of the sound is set, but so far unsued. Perhaps useful in future?

  const getMediaStream = useCallback(async () => {
    const audioStream = await window.navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    audioStream
      .getAudioTracks()
      .forEach((audioTrack) => audioStream.addTrack(audioTrack));
    //console.log(audioStream.getAudioTracks());
    stream.current = audioStream;
  }, []);

  const onRecordingStop = async () => {
    const blobProperty = Object.assign(
      { type: mediaChunks.current.type },
      { type: "audio/wav" }
    );
    blob.current = new Blob(mediaChunks.current, blobProperty);
    const url = URL.createObjectURL(blob.current);
    setMediaBlobUrl(url);

    const reader = new FileReader();
    reader.onload = function (e) {
      setAudioArray(e.target.result);
    };
    reader.readAsArrayBuffer(blob.current);
  };

  const pushChunk = ({ data }) => {
    mediaChunks.current.push(data);
  };

  const startRecording = async () => {
    if (!stream.current) {
      await getMediaStream();
    }
    if (stream.current) {
      const isStreamEnded = stream.current
        .getTracks()
        .some((track) => track.readyState === "ended");
      if (isStreamEnded) {
        await getMediaStream();
      }

      mediaRecorder.current = new MediaRecorder(stream.current);
      mediaRecorder.current.ondataavailable = pushChunk;
      mediaRecorder.current.onstop = onRecordingStop;
      mediaRecorder.current.start();
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      if (mediaRecorder.current.state !== "inactive") {
        mediaRecorder.current.stop();
        stream.current &&
          stream.current.getTracks().forEach((track) => track.stop());
        mediaChunks.current = [];
      }
    }
  };

  return (
    <div>
      <button onClick={startRecording}>Start</button>
      <button onClick={stopRecording}>Stop</button>
      <audio src={mediaBlobUrl} controls autoPlay />
    </div>
  );
};

export default Recording;

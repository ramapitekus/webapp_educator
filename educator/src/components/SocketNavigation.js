import { useState } from "react";
import { Navigate } from "react-router-dom";

const SocketNavigation = () => {
  const [received, setReceived] = useState(false);

  const socket = new WebSocket("ws://localhost:7000");
  socket.addEventListener("message", receiveData);

  function receiveData(event) {
    const path = event.data;
    setReceived(path);
    console.log(path);
  }

  if (received) {
    socket.removeEventListener("message", receiveData);
    return <Navigate to={received} />;
  }
  return <h1>Waiting for websocket input...</h1>;
};

export default SocketNavigation;

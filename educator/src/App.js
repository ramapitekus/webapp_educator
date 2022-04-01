import "./App.css";
import Stocks from "./components/Stocks";
import Obligations from "./components/Obligations";
import Risk from "./components/Risk";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SocketNavigation from "./components/SocketNavigation";
import Recording from "./components/Recording";
import sttFromMic from "./components/S2t";
import Dashboard from "./components/Dashboard";
import EducatorButton from "./components/EducatorButton";

function App() {
  return (
    <div className="App">
      <EducatorButton />
    </div>
  );
}

export default App;

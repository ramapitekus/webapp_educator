import "./App.css";
import Stocks from "./components/Stocks";
import Obligations from "./components/Obligations";
import Risk from "./components/Risk";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SocketNavigation from "./components/SocketNavigation";
import Recording from "./components/Recording";
import S2t from "./components/S2t";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/Stocks" element={<Stocks />}></Route>
          <Route exact path="/Recording" element={<Recording />}></Route>
          <Route exact path="/Obligations" element={<Obligations />}></Route>
          <Route exact path="/Risk" element={<Risk />}></Route>
          <Route exact path="/S2t" element={<S2t />}></Route>
          <Route exact path="/" element={<SocketNavigation />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

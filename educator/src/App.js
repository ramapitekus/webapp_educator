import "./App.css";
import About from "./About";
import Stocks from "./Stocks";
import Obligations from "./Obligations";
import Risk from "./Risk";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SocketNavigation from "./SocketNavigation";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/About" element={<About />}></Route>
          <Route exact path="/Stocks" element={<Stocks />}></Route>
          <Route exact path="/Obligations" element={<Obligations />}></Route>
          <Route exact path="/Risk" element={<Risk />}></Route>
          <Route exact path="/" element={<SocketNavigation />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

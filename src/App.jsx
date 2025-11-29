import About from "./About";
import "./App.css";
import CheckMyCode from "./CheckMyCode";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/CheckMyCode" element={<CheckMyCode />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;

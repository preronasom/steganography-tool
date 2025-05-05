import React, { useState } from "react";
import "./App.css";
import Encoder from "./components/Encoder";
import Decoder from "./components/Decoder";

function App() {
  const [mode, setMode] = useState("encode"); // Toggle between 'encode' or 'decode'

  return (
    <div className="App">
      <h1>Image Steganography Tool</h1>

      <div>
        <button onClick={() => setMode("encode")}>Encode Message</button>
        <button onClick={() => setMode("decode")}>Decode Message</button>
      </div>

      {mode === "encode" && <Encoder />}
      {mode === "decode" && <Decoder />}
    </div>
  );
}

export default App;

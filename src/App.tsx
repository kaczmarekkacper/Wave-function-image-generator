import React from "react";
import "./App.css";
import Board from "./Components/Board";

function App() {
  return (
    <div className="App">
      <Board gridSize={5} options={["blank", "up", "down", "left", "right"]} />
    </div>
  );
}

export default App;

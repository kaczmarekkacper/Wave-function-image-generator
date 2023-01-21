import React from "react";
import "./App.css";
import Board from "./Components/Board";

function App() {
  return (
    <div className="App">
      <Board
        boardSize={800}
        gridSize={10}
        options={["blank", "up", "down", "left", "right"]}
      />
    </div>
  );
}

export default App;

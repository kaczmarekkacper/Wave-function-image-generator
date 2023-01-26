import React from "react";
import "./App.css";
import Board from "./Components/Board";

function App() {
  return (
    <div className="App">
      <Board
        data-testid={"board"}
        boardSize={800}
        gridSize={3}
        options={["blank", "up", "down", "left", "right"]}
      />
    </div>
  );
}

export default App;

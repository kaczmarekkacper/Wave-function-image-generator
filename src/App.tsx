import React from "react";
import "./App.css";
import Board from "./Components/Board";

function App() {
  return (
    <div data-testid="app" className="App">
      <Board
        boardSize={800}
        options={["blank", "up", "down", "left", "right"]}
      />
    </div>
  );
}

export default App;

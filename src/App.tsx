import React from "react";
import "./App.css";
import Board from "./Components/Board";

function App() {
  return (
    <div className="App">
      <Board gridSize={3} />
    </div>
  );
}

export default App;

import React from "react";
import { render } from "@testing-library/react";
import Board from "./Board";

test("Board has board component", () => {
  const { getByTestId } = render(
    <Board boardSize={800} options={["blank", "up", "down", "left", "right"]} />
  );
  const boradEl = getByTestId("board");
  expect(boradEl).toBeInTheDocument();
});

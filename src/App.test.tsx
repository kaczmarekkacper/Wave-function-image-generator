import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("App has Board component", () => {
  const { getByTestId } = render(<App />);
  const boradEl = getByTestId("board");
  expect(boradEl).toBeInTheDocument();
});

import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("App has App component", () => {
  const { getByTestId } = render(<App />);
  const appEl = getByTestId("app");
  expect(appEl).toBeInTheDocument();
});

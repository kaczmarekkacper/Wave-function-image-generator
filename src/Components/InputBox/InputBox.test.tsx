import React from "react";
import { render, fireEvent } from "@testing-library/react";
import InputBox from "./InputBox";

test("InputBox has input component", () => {
  const { getByTestId } = render(
    <InputBox label="How many tiles:" type="number" />
  );
  const inputEl = getByTestId("input");
  expect(inputEl).toBeInTheDocument();
});

test("InputBox has label component", () => {
  const { getByTestId } = render(
    <InputBox label="How many tiles:" type="number" />
  );
  const labelEl = getByTestId("label");
  expect(labelEl).toBeInTheDocument();
});

test("InputBox change input element to number", () => {
  const { getByTestId } = render(
    <InputBox label="How many tiles:" type="number" />
  );
  const inputEl = getByTestId("input");
  fireEvent.change(inputEl, { target: { value: 5 } });
  expect(inputEl).toHaveValue(5);
});

test("InputBox not change input element to string", () => {
  const { getByTestId } = render(
    <InputBox label="How many tiles:" type="number" />
  );
  const inputEl = getByTestId("input");
  fireEvent.change(inputEl, { target: { value: "5" } });
  expect(inputEl).toHaveValue(5);
});

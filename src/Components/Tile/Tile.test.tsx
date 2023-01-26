import React from "react";
import { render } from "@testing-library/react";
import Tile from "./Tile";

test("Tile has img element", () => {
  const { getByTestId } = render(<Tile image="blank" size={100} />);
  const imgEl = getByTestId("img") as HTMLImageElement;
  expect(imgEl).toBeInTheDocument();
});

test("Tile has proper title", () => {
  const { getByTestId } = render(<Tile image="blank" size={100} />);
  const imgEl = getByTestId("img") as HTMLImageElement;
  expect(imgEl.title).toEqual("blank");
});

test("Tile has proper width", () => {
  const { getByTestId } = render(<Tile image="blank" size={100} />);
  const imgEl = getByTestId("img") as HTMLImageElement;
  expect(imgEl.width).toEqual(100);
});

test("Tile has proper height", () => {
  const { getByTestId } = render(<Tile image="blank" size={100} />);
  const imgEl = getByTestId("img") as HTMLImageElement;
  expect(imgEl.height).toEqual(100);
});

test("Tile is square", () => {
  const { getByTestId } = render(<Tile image="blank" size={100} />);
  const imgEl = getByTestId("img") as HTMLImageElement;
  expect(imgEl.height).toEqual(imgEl.width);
});

test("Tile is black when image is null", () => {
  const { getByTestId } = render(<Tile image={null} size={100} />);
  const imgEl = getByTestId("img") as HTMLImageElement;
  expect(imgEl.title).toEqual("");
  expect(imgEl.src).toContain("black.png");
});

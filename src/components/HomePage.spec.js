import React from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import { create } from "react-test-renderer";

it("renders without crashing", () => {
  const div = document.createElement("div");
  render(<HomePage />, div);
});

it("should match snapshot", () => {
  const tree = create(<HomePage />).toJSON();
  expect(tree).toMatchSnapshot();
});

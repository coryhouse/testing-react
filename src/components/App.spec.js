import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { create } from "react-test-renderer";

it("should match snapshot", () => {
  const tree = create(
    <Router>
      <App />
    </Router>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

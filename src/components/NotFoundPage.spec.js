import React from "react";
import NotFoundPage from "./NotFoundPage";
import { BrowserRouter as Router } from "react-router-dom";
import { create } from "react-test-renderer";

it("should match snapshot", () => {
  const tree = create(
    <Router>
      <NotFoundPage />
    </Router>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

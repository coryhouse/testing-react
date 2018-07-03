import React from "react";
import { render } from "react-dom";
import configureStore, { history } from "../store/configureStore";
import Root from "./Root";

const store = configureStore();

it("renders without crashing", () => {
  const div = document.createElement("div");
  render(<Root store={store} history={history} />, div);
});

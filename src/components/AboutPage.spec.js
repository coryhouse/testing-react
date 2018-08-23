import React from "react";
import { cleanup } from "react-testing-library";
import { renderWithRouter } from "../utils/testing";
import AboutPage from "./AboutPage";

// TODO: Centralize: https://github.com/kentcdodds/react-testing-library#cleanup
afterEach(cleanup);

describe("<AboutPage />", () => {
  it("should have a header called 'About'", () => {
    const { getByText } = renderWithRouter(<AboutPage />);
    const header = getByText("About");

    expect(header.innerHTML).toEqual("About");
  });

  it("should have a header with 'alt-header' class", () => {
    const { getByTestId } = renderWithRouter(<AboutPage />);
    const header = getByTestId("header");
    expect(header.classList.contains("alt-header")).toBe(true);
  });

  it("should link to an unknown route path", () => {
    const { getByText } = renderWithRouter(<AboutPage />);
    const link = getByText("Click this bad link");
    expect(link.getAttribute("href")).toEqual("/badlink");
  });
});

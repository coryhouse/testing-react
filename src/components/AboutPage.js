import React from "react";
import { Link } from "react-router-dom";
import "../styles/about-page.css";

// Since this component is simple and static, there's no parent container for it.
const AboutPage = () => {
  return (
    <div>
      <h2 id="about-header" className="alt-header">
        About
      </h2>
      <p>
        This is an example app using React with create-react-app, but enhanced
        with:
      </p>
      <ul>
        <li>React Router</li>
        <li>Redux</li>
        <li>Redux Thunk</li>
        <li>Enzyme</li>
        <li>Cypress</li>
        <li>Sass support</li>
      </ul>
      <p>
        <Link to="/badlink">Click this bad link</Link> to see the 404 page.
      </p>
    </div>
  );
};

export default AboutPage;

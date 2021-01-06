import React from "react";
import ReactDOM from "react-dom";
import TodoList from "./components/TodoList";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(<TodoList />, rootElement);

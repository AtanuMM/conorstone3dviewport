import React from "react";
import ReactDOM from "react-dom";
import init from "./initCornerstone";
import App from "./App";

init();
const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

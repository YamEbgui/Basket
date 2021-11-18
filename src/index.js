import React from "react";
import ReactDOM from "react-dom";
import Header from "./core/Header";
import Shopping from "./core/Shopping";

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Shopping />
  </React.StrictMode>,
  document.getElementById("root")
);

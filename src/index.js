import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import * as serviceWorker from "./js/serviceWorker";
import "./index.scss";
import "./assets/fonts/acumin.css";
import "./assets/fonts/duo.css";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Clock from "./components/Clock";
import Search from "./components/Search";
import Links from "./components/Links";
import Nav from "./components/Nav";

import "./App.scss";

export default function App() {
  return (
    <main id="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Clock} />
          <Route path="/search" component={Search} />
          <Route path="/links" component={Links} />
          <Route component={Clock} />
        </Switch>
        {window.innerWidth <= 640 ? <Nav /> : null}
      </Router>
    </main>
  );
}

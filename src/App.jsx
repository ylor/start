import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import styled from "styled-components";

import Clock from "./components/Clock";
import Search from "./components/Search";
import Links from "./components/Links";
import TabBar from "./components/TabBar";

// const StyledApp = styled.main`
//   display: flex;
//   min-height: 75vh;

//   @media screen and (min-width: 640px) {
//     min-height: 100vh;
//   }
// `;

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
        {window.innerWidth <= 640 ? <TabBar /> : null}
      </Router>
    </main>
  );
}

import React from "react";
//import { Router } from "@reach/router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Search from "./components/Search/Search";
import Clock from "./components/Clock/Clock";
import Links from "./components/Links/Links";
import TabBar from "./components/TabBar";

const StyledApp = styled.main`
  display: flex;
  min-height: 75vh;

  @media screen and (min-width: 640px) {
    min-height: 100vh;
  }
`;

export default function App() {
  return (
    <StyledApp id="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Clock} />
          <Route path="/search" component={Search} />
          <Route path="/links" component={Links} />
          {/* when none of the above match, <NoMatch> will be rendered */}
          <Route component={Clock} />
        </Switch>
        {window.innerWidth <= 640 ? <TabBar /> : null}
      </Router>
    </StyledApp>
  );
}

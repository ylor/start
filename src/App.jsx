import React from "react";
import { Router } from "@reach/router";
import styled from "styled-components";

import Search from "./components/Search";
import Clock from "./components/Clock";
import Links from "./components/Links";
import TabBar from "./components/TabBar";

const StyledApp = styled.main`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: 80vh;

  @media screen and (min-width: 640px) {
    min-height: 100vh;
  }
`;

export default function App() {
  return (
    <StyledApp id="App">
      <Router>
        <Clock default />
        <Clock path="/" />
        <Search path="/search" />
        <Links path="/links" />
      </Router>
      <TabBar />
    </StyledApp>
  );
}

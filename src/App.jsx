import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import styled from "styled-components";
import fetchJsonp from "fetch-jsonp";

import {
  id,
  mathPattern,
  keyHandler,
  parseInput,
  submitInput
} from "./js/utils";

import { config } from "./js/config";

import Search from "./components/Search";
import Clock from "./components/Clock";
import Suggestions from "./components/Suggestions";
import Links from "./components/Links";
//import Weather from "./components/Weather";

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
  // const [search, setSearch] = useState("");
  // const [suggestions, setSuggestions] = useState([]);

  // useEffect(() => {
  //   async function fetchSuggestions() {
  //     try {
  //       const response = await fetchJsonp(
  //         "https://duckduckgo.com/ac/?q=" + search,
  //         {
  //           jsonpCallbackFunction: "autocompleteCallback"
  //         }
  //       );

  //       const json = await response.json();
  //       const data = json
  //         .map(x => x.phrase) // make a simple array
  //         .filter(x => x !== search) // exclude items that equal what we have already typed in
  //         .slice(0, 4); // take only the first four results

  //       //console.log(data);  console.log(commands);
  //       if (search.includes("%")) {
  //         setSuggestions([data[0]]);
  //       } else {
  //         setSuggestions(data);
  //       }
  //     } catch {
  //       // This fails out a lot if you type quickly, but it doesn't seem to affect the application -- still get referenceErrors because it's trying to execute a script that no longer exists
  //       return null;
  //     }
  //   }

  //   if (search.length < 1 || search.match(mathPattern)) {
  //     setSuggestions([]);
  //   } else {
  //     fetchSuggestions();
  //   }

  //   window.addEventListener("keydown", keyHandler);
  //   return () => {
  //     window.removeEventListener("keydown", keyHandler);
  //   };
  // }, [search]);

  return (
    <StyledApp id="App">
      <Router>
        <Clock path="/" />
        <Search path="/search" />
        <Links path="/links" />
      </Router>
    </StyledApp>
  );
}

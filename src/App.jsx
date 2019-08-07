import React, { useState, useEffect } from "react";
import fetchJsonp from "fetch-jsonp";
import styled from "styled-components";

import {
  id,
  mathPattern,
  keyHandler,
  parseInput,
  submitInput
} from "./js/utils";

import { config } from "./js/config";

import Clock from "./components/Clock";
import Links from "./components/Links";
import Suggestions from "./components/Suggestions";
//import Weather from "./components/Weather";

//import logo from "./logo.svg";
import "./App.scss";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  background: transparent;
  border: 0;
  color: var(--color-fg);
  font-family: var(--font-mono);
  font-size: 2.5rem;
  font-weight: 200;
  max-width: 95vw;
  text-align: center;
  //visibility: hidden;
  @media screen and (min-width: 768px) {
    font-size: 5rem;
  }
`;

export default function App() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const response = await fetchJsonp(
          "https://duckduckgo.com/ac/?q=" + search,
          {
            jsonpCallbackFunction: "autocompleteCallback"
          }
        );

        const json = await response.json();
        const data = json
          .map(x => x.phrase) // make a simple array
          .filter(x => x !== search) // exclude items that equal what we have already typed in
          .slice(0, 4); // take only the first four results

        //console.log(data);  console.log(commands);
        if (search.includes("%")) {
          setSuggestions([data[0]]);
        } else {
          setSuggestions(data);
        }
      } catch {
        // This fails out a lot if you type quickly, but it doesn't seem to affect the application -- still get referenceErrors because it's trying to execute a script that no longer exists
        return null;
      }
    }

    if (search.length < 1 || search.match(mathPattern)) {
      setSuggestions([]);
    } else {
      fetchSuggestions();
    }

    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, [search]);

  return (
    <div className="App">
      <Clock />
      <StyledForm
        id="search-form"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        onChange={event => setSearch(event.target.value)}
        onSubmit={event => {
          event.preventDefault();
          submitInput(parseInput(id("search-input").value));
        }}
      >
        <StyledInput id="search-input" className="move" type="text" autoFocus />
        <Suggestions search={search} suggestions={suggestions} />
      </StyledForm>
      <Links config={config} />
    </div>
  );
}

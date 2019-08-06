import React, { useState, useEffect } from "react";
import fetchJsonp from "fetch-jsonp";

import {
  id,
  mathPattern,
  keyHandler,
  mouseHandler,
  parseInput,
  replaceInput,
  submitInput
} from "./js/utils";

import { config } from "./js/config";

import Clock from "./components/Clock";
import Links from "./components/Links";
import Suggestions from "./components/Suggestions";
//import Weather from "./components/Weather";

//import logo from "./logo.svg";
import "./App.scss";

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
    //console.log("Created");
    return () => {
      //console.log("Cleaned up");
      window.removeEventListener("keydown", keyHandler);
    };
  }, [search]);

  return (
    <div className="App">
      <Clock />
      <div id="search">
        <form
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
          <input
            className="search-input"
            id="search-input"
            type="text"
            autoFocus
          />
          <Suggestions search={search} suggestions={suggestions} />
        </form>
      </div>
      <Links config={config} />
    </div>
  );
}

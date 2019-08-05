import React, { useState, useEffect } from "react";
import fetchJsonp from "fetch-jsonp";

import {
  byId,
  mathPattern,
  keyHandler,
  mouseHandler,
  parseInput,
  replaceInput,
  submitInput
} from "./js/utils";

import { config } from "./js/config";

import Clock from "./components/Clock";
import TBD from "./components/TBD";
//import Suggestions from "./components/Suggestions";
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
          .map(val => val.phrase) // make a simple array
          .filter(val => val !== search) // exclude items that equal what we have already typed in
          .slice(0, 6); // take only the first six results

        //console.log(data);  console.log(commands);

        setSuggestions(data);
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
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <form
        className="center overlay search-form"
        id="search-form"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        onChange={event => setSearch(event.target.value)}
        onSubmit={event => {
          event.preventDefault();
          submitInput(parseInput(byId("search-input").value));
        }}
      >
        <Clock />
        <input
          className="search-input"
          id="search-input"
          placeholder="Search"
          title="Search"
          type="text"
        />
        <ul className="search-suggestions">
          {suggestions
            ? suggestions.map((suggestion, i) => (
                <button
                  key={suggestion + "-button-" + i}
                  type="button"
                  id={"search-suggestion-" + i}
                  className="search-suggestion focusable"
                  onMouseOver={() => mouseHandler("search-suggestion-" + i)}
                  onFocus={() => replaceInput("search-suggestion-" + i)}
                  onClick={() =>
                    (window.location.href = parseInput(suggestion))
                  }
                >
                  <li key={suggestion + "-li-" + i}>{suggestion}</li>
                </button>
              ))
            : null}
        </ul>
      </form>
      <aside className="center help overlay" id="help" />
      <TBD config={config} />
    </div>
  );
}

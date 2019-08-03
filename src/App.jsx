import React, { useState, useEffect } from "react";
import fetchJsonp from "fetch-jsonp";

import {
  keyHandler,
  mouseHandler,
  submitInput,
  replaceInput,
  parseInput
} from "./js/utils";

import Clock from "./components/Clock";
//import Suggestions from "./components/Suggestions";
//import Weather from "./components/Weather";

import logo from "./logo.svg";
import "./App.scss";

//import { config } from "./js/config";

parseInput()

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

        console.log(data);
        setSuggestions(data);
      } catch {
        // This fails out a lot if you type quickly, but it doesn't seem to affect the application -- still get referenceErrors because it's trying to execute a script that no longer exists
        return null;
      }
    }

    if (search.length < 1) {
      setSuggestions([]);
    } else {
      fetchSuggestions();
    }
  }, [search]);

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <Clock />
      <form
        className="center overlay search-form"
        id="search-form"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        onChange={event => setSearch(event.target.value)}
        onSubmit={e => {
          e.preventDefault();
          submitInput(
            "https://google.com/search?q=" +
              document.getElementById("search-input").value
          );
        }}
      >
        <input
          className="search-input"
          id="search-input"
          placeholder="Search"
          title="Search"
          type="text"
          onKeyDown={e => keyHandler(e)}
          autoFocus
        />
      </form>
      <ul className="search-suggestions">
        {suggestions
          ? suggestions.map((suggestion, i) => (
              <button
                key={suggestion + "-button-" + i}
                type="button"
                id={"search-suggestion-" + i}
                className="search-suggestion move"
                onKeyDown={e => keyHandler(e)}
                // onMouseOver={() => {
                //   var moved = false;
                //   window.onmousemove = function(e) {
                //     if (!moved) {
                //       moved = true;
                //       // do what you want after mousemove, here
                //       changeFocus("search-suggestion-" + i);
                //     }
                //   };
                // }}
                onMouseOver={() => mouseHandler("search-suggestion-" + i)}
                onFocus={() => replaceInput("search-suggestion-" + i)}
                onClick={() =>
                  submitInput("https://google.com/search?q=" + suggestion)
                }
              >
                <li key={suggestion + "-li-" + i}>{suggestion}</li>
              </button>
            ))
          : null}
      </ul>
      <aside className="center help overlay" id="help" />
    </div>
  );
}

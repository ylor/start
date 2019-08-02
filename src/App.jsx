import React, { useState, useEffect } from "react";
import fetchJsonp from "fetch-jsonp";

import config from "./js/config";
import { clock } from "./js/utils";

import Clock from "./components/Clock";
//import Suggestions from "./components/Suggestions";
//import Weather from "./components/Weather";

import logo from "./logo.svg";
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
        const data = json.map(data => data.phrase);

        console.log(data);
        setSuggestions(data);
      } catch (e) {
        return null;
        //console.log(e);
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
        onChange={e => setSearch(e.target.value)}
        onSubmit={e => {
          e.preventDefault();
          console.log(e.target);
          window.location.href = "https://www.google.com/search?q=" + search;
        }}
      >
        <input
          className="search-input"
          id="search-input"
          placeholder="Search"
          title="Search"
          type="text"
        />
      </form>
      <ul className="search-suggestions">
        {suggestions
          ? suggestions.map(suggestion => (
              <button
                key={suggestion + "-button"}
                type="button"
                className="js-search-suggestion search-suggestion"
                data-suggestion={suggestion}
                onClick={() =>
                  (window.location.href =
                    "https://google.com/search?q=" + suggestion)
                }
              >
                <li key={suggestion + "-li"}>{suggestion}</li>
              </button>
            ))
          : null}
      </ul>
      <aside className="center help overlay" id="help" />
    </div>
  );
}

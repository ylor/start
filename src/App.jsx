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
      <Clock />
      <img src={logo} className="App-logo" alt="logo" />
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
        <div>
          <input
            className="search-input"
            id="search-input"
            placeholder="search"
            title="search"
            type="text"
          />
          <ul className="search-suggestions" id="search-suggestions">
            {suggestions
              ? suggestions.map(suggestion => (
                  <li key={suggestion}>{suggestion}</li>
                ))
              : null}
          </ul>
        </div>
      </form>
      <aside className="center help overlay" id="help" />
    </div>
  );
}

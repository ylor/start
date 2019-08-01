import React, { useState, useEffect } from "react";
import fetchJsonp from "fetch-jsonp";

import logo from "./logo.svg";
import "./App.scss";

export default function App() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchJsonp(
          "https://duckduckgo.com/ac/?q="+search+"&type=list",
          {
            jsonpCallbackFunction: "autocompleteCallback"
          }
        );

        const data = await response.json();

        console.log(data);
        setSuggestions(data[1]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [search]);

  console.log(suggestions);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form
          autoComplete="off"
          className="center overlay search-form"
          id="search-form"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"
        >
          <div>
            <input
              className="search-input"
              id="search-input"
              title="search"
              type="text"
              placeholder="search"
              onChange={e => setSearch(e.target.value)}
            />
            <ul className="search-suggestions" id="search-suggestions">
              {suggestions ? suggestions.map(el => (
                <li key={el}>{el}</li>
              )):null}
            </ul>
          </div>
        </form>
        <aside className="center help overlay" id="help" />
      </header>
    </div>
  );
}

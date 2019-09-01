import React, { useState, useEffect } from "react";
import fetchJsonp from "fetch-jsonp";
import reactStringReplace from "react-string-replace";

import parseInput from "./parseInput";
import "./style.scss";

const mathPattern = new RegExp(/^[()\d\s.+\-*/=]*$/g);
const changeFocus = element => document.getElementById(element).focus();

export default function Search(props) {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const searchInput = document.getElementById("search-input");

  useEffect(() => {
    const query = () => (search.includes(":") ? search.split(":")[1] : search);
    async function fetchSuggestions() {
      const response = await fetchJsonp(
        "https://duckduckgo.com/ac/?q=" + query(),
        { jsonpCallbackFunction: "autocompleteCallback" }
      );
      const json = await response.json();
      const data = json
        // make a simple array out of object
        .map(x => x.phrase)
        // only include elements that aren't the same as our search, it's redundant
        .filter(x => x !== search)
        // take only the first four results
        .slice(0, 4);

      if (search.includes(":")) {
        setSuggestions(
          data.map(suggestion => search.split(":")[0] + ":" + suggestion)
        );
      } else if (search.includes("%")) {
        setSuggestions([data[0]]);
      } else {
        setSuggestions(data);
      }
    }

    if (search.length < 1 || search.match(mathPattern)) {
      setSuggestions([]);
    } else {
      fetchSuggestions();
    }

    function keyHandler(event) {
      const suggestionClass = document.getElementsByClassName(
        "search-suggestion"
      );
      // Change focus as if ArrowUp === Shitf+Tab & Change focus as if ArrowDown === Tab
      if (event.key === "ArrowUp") {
        if (document.activeElement === searchInput) {
          suggestionClass[suggestionClass.length - 1].focus();
        } else {
          document.activeElement.previousElementSibling
            ? document.activeElement.previousElementSibling.focus()
            : searchInput.focus();
        }
      } else if (event.key === "ArrowDown") {
        if (document.activeElement === searchInput) {
          suggestionClass[0].focus();
        } else {
          document.activeElement.nextElementSibling
            ? document.activeElement.nextElementSibling.focus()
            : searchInput.focus();
        }
      }

      // listen for equals key to do some math inline
      else if (event.key === "=") {
        if (searchInput.value.match(mathPattern)) {
          try {
            event.preventDefault();
            const expression = searchInput.value;
            // disabling eslint for line containing `eval` because I'm prevalidating the input with mathPattern
            // eslint-disable-next-line
            const answer = eval(searchInput.value);
            searchInput.value = expression + "=" + answer.toString();
          } catch {
            // Cases where this fails includes incomplete expressions like `2+=`
          }
        }
      }

      // Listen for ? and do something only if there's nothing in the input
      else if (event.key === "?" && searchInput.value.length === 0) {
        event.preventDefault();
        props.history.push("/links");
      }

      // Listen for space
      // In Safari on macOS there doesn't seem to be an equivalent for event.key === "Spacebar" so I had to use event.code
      else if (event.key === "Spacebar" || event.code === "Space") {
        if (document.activeElement.id !== "search-input") {
          setSearch(document.activeElement.textContent);
          changeFocus("search-input");
        }
      }

      // Listen for backspace
      else if (event.key === "Backspace") {
        if (document.activeElement.id !== "search-input") {
          setSearch(document.activeElement.textContent);
          changeFocus("search-input");
        } else if (searchInput.value.length <= 1) {
          props.history.push("/");
        }
      }

      // Listen for ctrl/cmd + r to give a nicer experience for reloads
      else if ((event.ctrlKey || event.metaKey) && event.key === "r") {
        event.preventDefault();
        props.history.push("/");
      }

      // Listen for esc
      else if (event.key === "Escape") {
        // If search-input is focused then clear the input
        if (document.activeElement !== searchInput) {
          changeFocus("search-input");
        }
        // If search-input is focused and has a value, zero it out
        else if (searchInput.value.length > 0) {
          searchInput.value = "";
        }
        // If search-input is already empty, navigate back home
        else {
          props.history.push("/");
        }
      }

      // Allow tabbing but anything else focuses search
      else if (
        event.key !== "Enter" &&
        event.key !== "Shift" &&
        event.key !== "Tab"
      ) {
        changeFocus("search-input");
      }
    }

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [props.history, search, searchInput]);

  return (
    <form
      id="search-form"
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
      onSubmit={event => {
        event.preventDefault();
        window.location.href = parseInput(searchInput.value);
      }}
    >
      <input
        id="search-input"
        type="text"
        autoFocus
        onFocus={event => (event.target.value = search)}
        onInput={event => setSearch(event.target.value)}
      />
      <div id="search-suggestions">
        {suggestions
          ? suggestions.map((suggestion, index) => (
              <button
                key={"search-suggestion-" + index}
                id={"search-suggestion-" + index}
                className="search-suggestion"
                onClick={() => (window.location.href = parseInput(suggestion))}
                onFocus={() => (searchInput.value = suggestion)}
                onMouseOver={event =>
                  event.target.addEventListener("mousemove", event =>
                    event.target.focus()
                  )
                }
              >
                {reactStringReplace(
                  suggestion.includes(":")
                    ? suggestion.split(":")[1]
                    : suggestion,
                  search.match(new RegExp(/\b(.)+(.)\b/g)),
                  (match, index) => (
                    <span className="match" key={index}>
                      {match}
                    </span>
                  )
                )}
              </button>
            ))
          : null}
      </div>
    </form>
  );
}

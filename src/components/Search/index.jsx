import React, { useState, useEffect } from "react";
import fetchJsonp from "fetch-jsonp";
import reactStringReplace from "react-string-replace";

import { id } from "../../js/utils";
import parseInput from "./parseInput";
import "./style.scss";

const mathPattern = new RegExp(/^[()\d\s.+\-*/=]*$/g);

function changeFocus(element) {
  id(element).focus();
}

function mouseHandler(element) {
  // Add event listener to only change focus via mouse if mouse is moving. Helps maintain integrity of input when suggestions are being returned as typing continues
  id(element).addEventListener("mousemove", event => changeFocus(element));
}

export default function Search(props) {
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

        //console.log(data);
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

    function keyHandler(event) {
      const currentElement = document.activeElement;
      const suggestionClass = document.getElementsByClassName(
        "search-suggestion"
      );

      // Change focus as if ArrowUp === Shitf+Tab
      if (event.key === "ArrowUp") {
        if (currentElement.id === "search-input") {
          suggestionClass[suggestionClass.length - 1].focus();
        } else {
          currentElement.previousElementSibling
            ? currentElement.previousElementSibling.focus()
            : id("search-input").focus();
        }
        event.preventDefault();
      }

      // Change focus as if ArrowDown === Tab
      else if (event.key === "ArrowDown") {
        if (currentElement.id === "search-input") {
          suggestionClass[0].focus();
        } else {
          currentElement.nextElementSibling
            ? currentElement.nextElementSibling.focus()
            : id("search-input").focus();
        }
        event.preventDefault();
      }

      // listen for equals key to do some math inline
      else if (event.key === "=") {
        if (id("search-input").value.match(mathPattern)) {
          try {
            event.preventDefault();
            const expression = id("search-input").value;
            // disabling eslint for line containing `eval` because I'm prevalidating the input with mathPattern
            // eslint-disable-next-line
            const answer = eval(id("search-input").value);
            id("search-input").value = expression + "=" + answer.toString();
            return true;
          } catch {
            // Cases where this fails includes incomplete expressions like `2+=`
            return false;
          }
        }
      }

      // Listen for ? and do something only if there's nothing in the input
      else if (event.key === "?" && id("search-input").value === "") {
        event.preventDefault();
        props.history.push("/links");
      }

      // Listen for space
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
        } else if (id("search-input").value.length <= 1) {
          props.history.push("/");
          event.preventDefault();
        }
      }

      // Listen for ctrl/cmd + r
      else if ((event.ctrlKey || event.metaKey) && event.key === "r") {
        event.preventDefault();
        props.history.push("/");
      }

      // Listen for esc
      else if (event.key === "Escape") {
        // If search-input is focused then clear the input
        if (document.activeElement !== id("search-input")) {
          changeFocus("search-input");
        } else if (id("search-input").value.length > 0) {
          id("search-input").value = "";
        } else {
          props.history.push("/");
        }
      }

      // Allow tabbing but anything else focuses search
      else if (event.key !== "Shift" && event.key !== "Tab") {
        changeFocus("search-input");
      }
    }

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [props.history, search]);

  return (
    <form
      id="search-form"
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect="off"
      onChange={event => setSearch(event.target.value)}
      onSubmit={event => {
        event.preventDefault();
        window.location.href = parseInput(id("search-input").value);
      }}
      spellCheck="false"
    >
      <input
        id="search-input"
        autoFocus
        onFocus={event => (event.target.value = search)}
        type="text"
      />
      <div id="search-suggestions">
        {suggestions
          ? suggestions.map((suggestion, i) => (
              <button
                key={"search-suggestion-" + i}
                id={"search-suggestion-" + i}
                className="search-suggestion"
                onClick={() => (window.location.href = parseInput(suggestion))}
                onFocus={() => (id("search-input").value = suggestion)}
                onMouseOver={event => mouseHandler(event.target.id)}
                type="button"
              >
                {reactStringReplace(
                  suggestion,
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

import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";
import fetchJsonp from "fetch-jsonp";

import {
  id,
  mathPattern,
  //keyHandler,
  clearInput,
  parseInput,
  submitInput,
  changeFocus
} from "../js/utils";

import { config } from "../js/config";

// import Clock from "./components/Clock";
import Suggestions from "./Suggestions";
// import Links from "./components/Links";
//import Weather from "./components/Weather";

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
  font-weight: 300;
  max-width: 99vw;
  text-align: center;

  @media screen and (min-width: 768px) {
    font-size: 5rem;
  }
`;

function keyHandler(event) {
  if (event.key === "?") {
    event.preventDefault();
    //toggleVisibility("links");
    return;
  }

  if (event.key === "ArrowUp") {
    // TODO
    // Change focus as if ArrowUp === Shitf+Tab
    event.preventDefault();
    return;
  }

  if (event.key === "ArrowDown") {
    // TODO
    // Change focus as if ArrowDown === Tab
    event.preventDefault();
    console.log(document.getElementsByClassName("move"));
    var elements = document.getElementsByClassName("move");
    for (var x = 0; x < elements.length; x++) {
      console.log(elements[x]);
      elements[x].focus();
    }
  }

  // listen for equals key to do some math inline
  if (event.key === "=") {
    if (id("search-input").value.match(mathPattern)) {
      try {
        event.preventDefault();
        const expression = id("search-input").value;
        // disabling eslint for line containing `eval` because I'm prevalidating the input with mathPattern
        // eslint-disable-next-line
        const answer = eval(id("search-input").value);

        return (id("search-input").value =
          expression + "=" + answer.toString());
      } catch {
        // Cases where this fails includes incomplete expressions like `2+=`
        return false;
      }
    }
  }

  // Listen for esc
  if (event.key === "Escape") {
    // // If search-input is focused then clear the input
    if (document.activeElement !== id("search-input")) {
      return changeFocus("search-input");
    }

    if (id("search-input").value.length > 0) {
      // Else restore the focus to the search-input
      // changeFocus("search-input");
      //(document.activeElement === id("search-input")) {
      //   hideElement("search-input");
      //   hideElement("search-suggestions");
      //   hideElement("links");
      //   showElement("clock");
      return clearInput();
    }
    //changeFocus("search-input");
    return navigate("/");
  }

  //   return;
  // }

  if (event.key === "Backspace") {
    if (document.activeElement !== id("search-input")) {
      return changeFocus("search-input");
    }
    if (id("search-input").value === "") {
      //   hideElement("search-input");
      //   hideElement("search-suggestions");
      //   hideElement("links");
      //   showElement("clock");
      return navigate("/");
    }
  }

  // // Make these keys not trigger anything
  // const gatedKeys = [
  //   "Alt",
  //   "ArrowUp",
  //   "ArrowRight",
  //   "ArrowDown",
  //   "ArrowLeft",
  //   "CapsLock",
  //   "Control",
  //   "Escape",
  //   "Enter",
  //   "OS",
  // ];
  // if (gatedKeys.includes(event.key) || event.code === "Space") {
  //   return;
  // }

  // hideElement("clock");
  // hideElement("links");
  // showElement("search-input");
  // showElement("search-suggestions");

  // if (window.location.pathname !== "/search") {
  //   return navigate("/search");
  // }
  // changeFocus("search-input");
}

export default function Search(navigate) {
  //console.log(navigate.location.state.letter);
  const [search, setSearch] = useState(
    navigate.location.state ? navigate.location.state.letter : ""
  );
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
      <StyledInput
        id="search-input"
        className="move"
        type="text"
        defaultValue={search}
        autoFocus
      />
      <Suggestions search={search} suggestions={suggestions} />
    </StyledForm>
  );
}

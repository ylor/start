import React, { useState, useEffect } from "react";
import styled from "styled-components";
import fetchJsonp from "fetch-jsonp";

import { id, parseInput, changeFocus } from "../js/utils";

import Suggestions from "./Suggestions";

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
  font-size: 3rem;
  font-weight: 300;
  width: 100vw;
  text-align: center;
`;

const mathPattern = new RegExp(/^[()\d\s.+\-*/=]*$/g);

function clearInput() {
  id("search-input").value = "";
}

export default function Search(props) {
  const [search, setSearch] = useState(
    props.location.state.letter ? props.location.state.letter : ""
  );
  //props.location.state.letter
  const [suggestions, setSuggestions] = useState([]);

  function keyHandler(event) {
    if (event.key === "ArrowUp") {
      // TODO
      // Change focus as if ArrowUp === Shitf+Tab
      return event.preventDefault();
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

    if (event.key === "?") {
      event.preventDefault();
      return props.history.push("/");
      //return <Redirect to="/links" />;
      //return props.history.push("/links");
    }

    if ((event.ctrlKey || event.metaKey) && event.key === "r") {
      event.preventDefault();
      return props.history.push("/");
    }

    if (event.key === "Backspace") {
      if (document.activeElement !== id("search-input")) {
        return changeFocus("search-input");
      }
      if (id("search-input").value === "") {
        return props.history.push("/");
      }
    }

    // Listen for esc
    if (event.key === "Escape") {
      // // If search-input is focused then clear the input
      if (document.activeElement !== id("search-input")) {
        return changeFocus("search-input");
      }

      if (id("search-input").value.length > 0) {
        return clearInput();
      }

      return props.history.push("/");
    }
  }

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

    window.innerWidth <= 640
      ? id("search-input").blur()
      : id("search-input").focus();

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [search]);

  return (
    <StyledForm
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
      <StyledInput
        id="search-input"
        className="move"
        type="text"
        placeholder="Tap Here"
        onFocus={event => (event.target.placeholder = "")}
        onBlur={event => (event.target.placeholder = "Tap Here")}
        defaultValue={search}
      />
      <Suggestions search={search} suggestions={suggestions} />
    </StyledForm>
  );
}

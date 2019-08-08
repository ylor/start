import React from "react";
import styled from "styled-components";
import reactStringReplace from "react-string-replace";

import { id, changeFocus, replaceInput, parseInput } from "../js/utils";


const StyledSuggestions = styled.ul`
  display: flex;
  padding: 0;
  max-width: 85vw;
  flex-direction: column;
  align-content: center;
  justify-content: center;

  @media screen and (min-width: 640px) {
    flex-direction: row;
    flex-wrap: wrap;
  }

  button {
    background: transparent;
    color: white;
    cursor: pointer;
    border: none;
    font-family: var(--font-mono);
    &:focus {
      background: var(--color-fg);
      outline: none;
      color: var(--color-bg);
    }
  }

  li {
    list-style: none;
    font-size: 1rem;
    margin: 0.5rem;
    font-weight: 300;
    /* @media screen and (min-width: 768px) {
      margin: 1rem;
    } */

    .match {
      font-weight: 600;
      border-bottom: 1px solid var(--color-fg);
    }
  }
`;

function mouseHandler(element) {
  // Add event listener to only change focus via mouse if mouse is moving. Helps maintain integrity of input when suggestions are being returned and typing has continued from there
  id(element).addEventListener("mousemove", event => changeFocus(element));
}

export default function Suggestions(props) {
  const { search, suggestions } = props;
  return (
    <StyledSuggestions id="search-suggestions">
      {suggestions
        ? suggestions.map((suggestion, i) => (
            <button
              key={suggestion + "-button-" + i}
              type="button"
              id={"search-suggestion-" + i}
              className="search-suggestion move"
              onMouseOver={() => mouseHandler("search-suggestion-" + i)}
              onFocus={() => replaceInput("search-suggestion-" + i)}
              onClick={() => (window.location.href = parseInput(suggestion))}
            >
              <li key={suggestion + "-li-" + i}>
                {reactStringReplace(suggestion, search, (match, i) => (
                  <span className="match" key={i}>
                    {match}
                  </span>
                ))}
              </li>
            </button>
          ))
        : null}
    </StyledSuggestions>
  );
}

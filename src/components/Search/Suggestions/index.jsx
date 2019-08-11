import React from "react";
import reactStringReplace from "react-string-replace";

import { id, changeFocus, parseInput } from "../../../js/utils";

import "./style.scss";

function mouseHandler(element) {
  // Add event listener to only change focus via mouse if mouse is moving. Helps maintain integrity of input when suggestions are being returned as typing continues
  id(element).addEventListener("mousemove", event => changeFocus(element));
}

function replaceInput(suggestion) {
  id("search-input").value = id(suggestion).textContent;
}

export default function Suggestions(props) {
  const { search, suggestions } = props;
  return (
    <div className="search-suggestions">
      {suggestions
        ? suggestions.map((suggestion, i) => (
            <button
              key={"search-suggestion-" + i}
              id={"search-suggestion-" + i}
              className="search-suggestion move"
              onClick={() => (window.location.href = parseInput(suggestion))}
              onFocus={() => replaceInput("search-suggestion-" + i)}
              onMouseOver={() => mouseHandler("search-suggestion-" + i)}
              type="button"
            >
              {reactStringReplace(
                suggestion,
                search.match(new RegExp(/\b(.)+(.)\b/g)),
                (match, i) => (
                  <span className="match" key={i}>
                    {match}
                  </span>
                )
              )}
            </button>
          ))
        : null}
    </div>
  );
}

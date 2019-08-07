import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { id, changeFocus } from "../js/utils";

const StyledTime = styled.time`
  position: absolute;
  cursor: pointer;
  font-size: 5rem;
  font-weight: 100;
  letter-spacing: -0.01em;

  @media screen and (min-width: 768px) {
    font-size: 12rem;
    span {
      font-size: 6rem;
    }
  }

  span {
    font-size: 2.5rem;
    @media screen and (min-width: 768px) {
      font-size: 6rem;
    }
  }
`;

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <StyledTime
      id="clock"
      onClick={() => {
        id("clock").style.visibility = "hidden";
        if (window.innerWidth <= 640) {
          id("links").style.visibility = "visible";
        } else {
          id("search-form").style.visibility = "visible";
          changeFocus("search-input");
        }
      }}
    >
      {time
        .toLocaleTimeString(navigator.language, {
          hour: "numeric",
          minute: "2-digit"
        })
        .split(" ")[0]
        .replace(":", " ") + " "}
      <span id="am-pm">
        {
          time
            .toLocaleTimeString(navigator.language, {
              hour: "numeric"
            })
            .split(" ")[1]
        }
      </span>
    </StyledTime>
  );
}

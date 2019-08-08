import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";

import { id, changeFocus } from "../js/utils";

const StyledTime = styled.time`
  cursor: pointer;
  font-size: 8rem;
  font-weight: 100;

  span {
    font-size: 4rem;
    letter-spacing: 0.1rem;
  }
`;

export default function Clock() {
  const [time, setTime] = useState(new Date());

  function keyHandler(event) {
    // Make these keys not trigger anything
    const keyBlacklist = [
      "Alt",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
      "ArrowLeft",
      "CapsLock",
      "Control",
      "Escape",
      "OS",
      "Shift",
      "Tab"
    ];

    if (keyBlacklist.includes(event.key) || event.code === "Space") {
      return;
    }

    if (event.key === "?") {
      event.preventDefault();
      navigate("/links");
      return;
    }

    const keyWhitelist = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z"
    ];
    if (window.location.pathname !== "/search") {
      return navigate("/search", {
        state: { letter: keyWhitelist.includes(event.key) ? event.key : "" }
      });
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    window.addEventListener("keydown", keyHandler);
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  return (
    <StyledTime
      id="clock"
      onClick={() =>
        window.innwerWidth <= 768 ? navigate("/search") : navigate("/links")
      }
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

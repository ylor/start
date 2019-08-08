import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

const StyledTime = styled.time`
  cursor: pointer;
  font-size: 5rem;
  font-weight: 100;
  align-self: center;
  justify-self: center;
  margin: 0 auto;

  span {
    font-size: 2.5rem;
    letter-spacing: 0.1rem;
  }
`;

export default function Clock(props) {
  const [time, setTime] = useState(new Date());

  function keyHandler(event) {
    const keyBlacklist = [
      "Alt",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
      "ArrowLeft",
      "Backspace",
      "CapsLock",
      "Control",
      "Escape",
      "Meta",
      "OS",
      "Shift",
      "Tab"
    ];
    // Make these keys not trigger anything
    if (keyBlacklist.includes(event.key) || event.code === "Space") {
      event.preventDefault();
      return;
    }

    if ((event.metaKey || event.ctrlKey) && event.key === "r") {
      event.preventDefault();
      window.location.reload();
      return;
    }

    if (event.key === "?") {
      event.preventDefault();
      return props.history.push("/links");
      //return navigate("/links");
    }

    if (window.location.pathname !== "/search") {
      props.history.push({
        pathname: "/search",
        state: { letter: event.key.length === 1 ? event.key : "" }
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
    <StyledTime id="clock" onClick={() => navigate("/search")}>
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

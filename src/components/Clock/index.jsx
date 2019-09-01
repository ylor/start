import React, { useState, useEffect } from "react";
import "./style.scss";

export default function Clock(props) {
  const [date, setDate] = useState(new Date());
  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });

  useEffect(() => {
    function keyHandler(event) {
      // Make these keys not trigger anything
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
        "Spacebar",
        "Tab"
      ];
      if (keyBlacklist.includes(event.key)) {
        event.preventDefault();
      }

      // Prevent triggering search screen when trying to reload
      else if ((event.metaKey || event.ctrlKey) && event.key === "r") {
        event.preventDefault();
        window.location.reload();
      }

      // Trigger links on question mark
      else if (event.key === "?") {
        event.preventDefault();
        props.history.push("/links");
      }

      // Trigger search screen on any keypress other than above
      else {
        props.history.push("/search");
      }
    }

    // Update date every second
    const dateUpdater = setInterval(() => {
      setDate(new Date());
    }, 1000);

    // Init keyHandler
    window.addEventListener("keydown", keyHandler);

    // Cleanup dateUpdater interval and keyHandler event listener
    return () => {
      window.removeEventListener("keydown", keyHandler);
      clearInterval(dateUpdater);
    };
  }, [props.history]);

  return (
    <time id="clock" onClick={() => props.history.push("/search")}>
      {time.split(" ")[0].replace(":", " ")}
      &nbsp;
      <span id="am-pm">{time.split(" ")[1]}</span>
    </time>
  );
}

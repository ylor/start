import React, { useState, useEffect } from "react";
import "./style.scss";

export default function Clock(props) {
  const [time, setTime] = useState(new Date());

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
        return;
      }

      // Prevent triggering search screen when trying to reload
      else if ((event.metaKey || event.ctrlKey) && event.key === "r") {
        event.preventDefault();
        window.location.reload();
        return;
      }

      // Trigger links on question mark
      else if (event.key === "?") {
        event.preventDefault();
        return props.history.push("/links");
      }

      // Trigger search screen on any keypress other than above
      if (window.location.pathname !== "/search") {
        props.history.push("/search");
      }
    }

    // Init keyHandler
    window.addEventListener("keydown", keyHandler);

    // Update date every second
    const dateUpdater = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup dateUpdater interval and keyHandler event listener
    return () => {
      window.removeEventListener("keydown", keyHandler);
      clearInterval(dateUpdater);
    };
  }, [props.history]);

  return (
    <time id="clock" onClick={() => props.history.push("/search")}>
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
    </time>
  );
}

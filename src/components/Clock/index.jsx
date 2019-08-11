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

      if ((event.metaKey || event.ctrlKey) && event.key === "r") {
        event.preventDefault();
        window.location.reload();
        return;
      }

      if (event.key === "?") {
        event.preventDefault();
        return props.history.push("/links");
      }

      if (window.location.pathname !== "/search") {
        props.history.push("/search");
      }
    }

    window.addEventListener("keydown", keyHandler);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      window.removeEventListener("keydown", keyHandler);
      clearInterval(interval);
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

import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledTime = styled.time`
  font-size: 2rem;
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
    // <time dateTime={time}>
    <StyledTime>
      {time
        .toLocaleTimeString(navigator.language, {
          hour: "2-digit",
          minute: "2-digit"
        })
        .split(" ")[0]
        .replace(":", " ") + " "}
      <span>
        {
          time
            .toLocaleTimeString(navigator.language, {
              hour: "2-digit",
              minute: "2-digit"
            })
            .split(" ")[1]
        }
      </span>
    </StyledTime>
  );
}

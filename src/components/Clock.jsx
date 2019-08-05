import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledTime = styled.time`
  font-size: 3rem;
  font-weight: 200;
  letter-spacing: -0.01em;
  span {
    font-size: 2rem;
  }
  @media screen and (min-width: 768px){
    font-size: 8rem;
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

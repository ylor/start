import React, { useEffect } from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";

import { config } from "../js/config";
// import { id } from "../js/utils";

const StyledAside = styled.aside`
  background: var(--color-bg);

  @media screen and (min-width: 768px) {
  }
`;

const StyledSection = styled.section`
  h1 {
    margin-bottom: 0;
    font-weight: 700;
    font-size: 1.15rem;
    letter-spacing: 0.15rem;
    text-transform: uppercase;
  }

  ul {
    li {
      margin: 0.5rem 0;
      a {
        text-decoration: none;
        font-weight: 300;
        border-bottom: 2px solid var(--color-fg-bright);
      }
    }
  }
`;

function keyHandler(event) {
  // Make these keys not trigger anything
  if (event.key === "Shift") {
    return;
  }

  if (event.key === "?" || event.key === "Escape") {
    event.preventDefault();
    navigate("/");
    return;
  }
}

export default function Links(props) {
  const { commands } = config;
  //console.log(commands);

  const categories = [
    ...new Set([...commands.map(command => command.category)])
  ]
    .slice(1)
    .sort();
  //console.log(categories);

  useEffect(() => {
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  return (
    <StyledAside id="links" className="hidden">
      {categories.map(category => (
        <StyledSection key={category}>
          <ul>
            <h1>{category}</h1>
            {commands.map(command =>
              command.category === category ? (
                <li key={command.name} title={command.key}>
                  {/* <span>{command.key}</span> */}
                  <a key={command.url} href={command.url}>
                    {command.name}
                  </a>
                </li>
              ) : null
            )}
          </ul>
        </StyledSection>
      ))}
    </StyledAside>
  );
}

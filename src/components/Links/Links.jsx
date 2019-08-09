import React, { useEffect } from "react";
import styled from "styled-components";

import { config } from "../../js/config";

const StyledAside = styled.aside`
  margin-bottom: 500px;
`;

const StyledSection = styled.section`
  h1 {
    margin-bottom: 0;
    font-weight: 700;
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
    function keyHandler(event) {
      // Make these keys not trigger anything
      if (event.key === "Shift") {
        return;
      }

      if (event.key === "?" || event.key === "Escape") {
        event.preventDefault();
        props.history.push("/");
        return;
      }
    }

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [props.history]);

  return (
    <StyledAside id="links" className="hidden">
      {categories.map(category => (
        <StyledSection key={category}>
          <ul>
            <h1>{category}</h1>
            {commands.map(command =>
              command.category === category ? (
                <li key={command.name} title={"Shortcut: " + command.key}>
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

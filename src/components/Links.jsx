import React from "react";
import styled from "styled-components";

// import { id } from "../js/utils";

const StyledAside = styled.section`
  background: var(--color-bg);
  position: fixed;
  top: 0;
  left: 0;
  overflow: auto;
  width: 100%;
  height: 100%;
  visibility: hidden;
  section {
    display: flex;
    flex-wrap: wrap;
  }
`;

const StyledSection = styled.section`
  h1 {
    margin-bottom: 0;
    font-weight: 300;
    letter-spacing: 0.15rem;
    text-transform: uppercase;
  }

  ul {
    li {
      margin: 2rem 0;
    }
  }
`;

export default function Links(props) {
  const { config } = props;
  const { commands } = config;
  //console.log(commands);
  const categories = [
    ...new Set([...commands.map(command => command.category)])
  ]
    .slice(1)
    .sort();
  //console.log(categories);

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

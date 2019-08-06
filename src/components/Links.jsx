import React from "react";
import styled from "styled-components";

import { id } from "../js/utils";

const StyledAside = styled.section`
  background: var(--color-bg);
  visibility: hidden;
  position: absolute;
  @media screen and (min-width: 768px) {
    position: fixed;
    display: flex;
    flex-basis: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const StyledSection = styled.section`
  display: flex;
  flex-wrap: wrap;

  h1 {
    margin-bottom: 0;
    font-weight: 300;
    letter-spacing: 0.15rem;
    text-transform: uppercase;
  }

  ul {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 0 10px;

    li {
      margin: 4px 0;
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

import React from "react";
import styled from "styled-components";

const StyledAside = styled.section`
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  h1 {
    margin: 0;
    padding: 0;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  ul {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 0;
    margin: 0 12px;
    li {
      list-style: none;
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

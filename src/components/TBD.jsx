import React from "react";
import styled from "styled-components";

const StyledAside = styled.aside`
  display: flex;
  flex-wrap: wrap;
`;
const StyledSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 1rem;
`;

export default function TBD(props) {
  const { config } = props;
  const { commands } = config;
  console.log(commands);
  const categories = [
    ...new Set([...commands.map(command => command.category)])
  ]
    .slice(1)
    .sort();
  console.log(categories);

  return (
    <StyledAside>
      {categories.map(category => (
        <StyledSection>
          <h1>{category}</h1>
          <ul>
            {commands.map(command =>
              command.category === category ? (
                <li title={command.key}>
                  <a href={command.url}>{command.name}</a>
                </li>
              ) : null
            )}
          </ul>
        </StyledSection>
      ))}
    </StyledAside>
  );
}

import React from "react";
import styled from "styled-components";

const StyledNav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100vw;
  z-index: 999;

  background: red;
  color: white;
  padding: 1.5rem;

  display: flex;
  justify-content: space-around;

  li {
    list-style: none;
  }
`;

export default function TabBar() {
  return (
    <StyledNav>
      <span>home</span>
      <span>search</span>
      <span>links</span>
    </StyledNav>
  );
}

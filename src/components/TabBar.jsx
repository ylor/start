import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

const StyledNav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100vw;
  z-index: 999;

  background: #222;
  border-top: 2px solid blue;
  color: white;

  display: flex;
  justify-content: space-around;

  a {
    width: 100%;
    height: 100%;
    padding: 24px;

    border-left: 2px solid blue;
    border-right: 2px solid blue;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }
`;

const Label = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
`;

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        style: {
          background: isCurrent ? "white" : "black"
        }
      };
    }}
  />
);

export default function TabBar() {
  return (
    <StyledNav>
      <NavLink to="/">
        <Label>
          <span role="img" aria-label="home-icon">
            🏠
          </span>
          {/* <span>Home</span> */}
        </Label>
      </NavLink>

      <NavLink to="/search">
        <Label>
          <span role="img" aria-label="search-icon">
            🔍
          </span>
          {/* <span>Search</span> */}
        </Label>
      </NavLink>

      <NavLink to="/NavLinks">
        <Label>
          <span role="img" aria-label="NavLinks-icon">
            🔗
          </span>
          {/* <span>NavLinks</span> */}
        </Label>
      </NavLink>
    </StyledNav>
  );
}

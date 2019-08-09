import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import HomeIcon from "../assets/svg/home.svg";
import SearchIcon from "../assets/svg/search.svg";
import LinksIcon from "../assets/svg/list.svg";

const StyledNav = styled.nav`
  background-color: hsla(0, 0%, 15%, 0.70);
  backdrop-filter: blur(25px);
  border-top: 1px solid #000;
  bottom: 0;
  color: white;
  display: flex;
  justify-content: space-around;
  position: fixed;
  width: 100vw;
  z-index: 999;
  padding: 12px 12px 24px 12px;

  a {
    -webkit-tap-highlight-color: transparent;
    text-decoration: none;
    width: 20%;
  }
`;

const Label = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    height: 36px;
  }
`;

export default function TabBar() {
  return (
    <StyledNav>
      <NavLink to="/">
        <Label>
          <img src={HomeIcon} alt="Home" />
          {/* <span role="img" aria-label="home-icon" />
          <span>Home</span> */}
        </Label>
      </NavLink>

      <NavLink to="/search">
        <Label>
          <img src={SearchIcon} alt="Search" />
          {/* <span role="img" aria-label="search-icon">
            🔍
          </span>
          <span>Search</span> */}
        </Label>
      </NavLink>

      <NavLink to="/links">
        <Label>
          <img src={LinksIcon} alt="Links" />
          {/* <span role="img" aria-label="NavLinks-icon">
            🔗
          </span>
          <span>Links</span> */}
        </Label>
      </NavLink>
    </StyledNav>
  );
}

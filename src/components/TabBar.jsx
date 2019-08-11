import React from "react";
import { NavLink } from "react-router-dom";
// import styled from "styled-components";

import HomeIcon from "../assets/svg/home.svg";
import SearchIcon from "../assets/svg/search.svg";
import LinksIcon from "../assets/svg/list.svg";

import "./TabBar.scss";

// const nav = styled.nav`
//   background-color: hsl(0, 0%, 15%);
//   border-top: 1px solid #333;
//   bottom: 0;
//   color: white;
//   display: flex;
//   justify-content: space-around;
//   position: fixed;
//   width: 100vw;
//   z-index: 999;
//   padding: 12px 12px 24px 12px;

//   @supports (
//     (-webkit-backdrop-filter: blur(30px)) or (backdrop-filter: blur(30px))
//   ) {
//     background-color: hsla(0, 0%, 15%, 0.69);
//     backdrop-filter: blur(30px);
//   }

//   a {
//     -webkit-tap-highlight-color: transparent;
//     text-decoration: none;
//     width: 20%;
//     &.active {
//       color: red;
//     }
//   }
// `;

// const div = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   img {
//     height: 36px;
//   }
// `;

export default function TabBar() {
  return (
    <nav>
      <NavLink exact to="/">
        <div>
          <img src={HomeIcon} alt="Home" />
          <span role="img" aria-div="home-icon" />
          <span>Home</span>
        </div>
      </NavLink>

      <NavLink exact to="/search">
        <div>
          <img src={SearchIcon} alt="Search" />
          <span>Search</span>
        </div>
      </NavLink>

      <NavLink exact to="/links">
        <div>
          <img src={LinksIcon} alt="Links" />
          <span>Links</span>
        </div>
      </NavLink>
    </nav>
  );
}

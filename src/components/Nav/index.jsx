import React from "react";
import { NavLink } from "react-router-dom";

import "./style.scss";

import HomeIcon from "./svg/home.svg";
import SearchIcon from "./svg/search.svg";
import LinksIcon from "./svg/list.svg";

export default function Nav() {
  return (
    <nav className="tab-bar">
      <NavLink exact to="/">
        <div className="label">
          <img src={HomeIcon} alt="Home" />
          <span>Home</span>
        </div>
      </NavLink>

      <NavLink exact to="/search">
        <div className="label">
          <img src={SearchIcon} alt="Search" />
          <span>Search</span>
        </div>
      </NavLink>

      <NavLink exact to="/links">
        <div className="label">
          <img src={LinksIcon} alt="Links" />
          <span>Links</span>
        </div>
      </NavLink>
    </nav>
  );
}

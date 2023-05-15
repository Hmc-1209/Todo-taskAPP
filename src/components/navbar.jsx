import React, { Component } from "react";

import Title from "./common/title";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav>
        <Title title="Todo" />

        <NavLink
          to="/contents"
          className={({ isActive }) => {
            return isActive ? "navLink active" : "navLink";
          }}
        >
          Contents
        </NavLink>

        <NavLink
          to="/tags"
          className={({ isActive }) => {
            return isActive ? "navLink active" : "navLink";
          }}
        >
          Tags
        </NavLink>

        <input
          class="btn"
          type="text"
          className="searchBar"
          placeholder="Search task"
        />
      </nav>
    );
  }
}

export default Navbar;

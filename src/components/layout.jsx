import React, { Component } from "react";
import { Outlet } from "react-router-dom";

/* Components */
import SideBarL from "./sidebarL";
import Navbar from "./navbar";

class Layout extends Component {
  state = {};
  render() {
    return (
      <>
        <Navbar />

        <hr style={{ marginBottom: "3%" }} />

        <div style={{ display: "flex" }}>
          <SideBarL />
          <Outlet />
        </div>
      </>
    );
  }
}

export default Layout;

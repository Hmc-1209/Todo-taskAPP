import React, { Component } from "react";
import Repositories from "./repositories";

class SideBarL extends Component {
  state = {};
  render() {
    return (
      <div className="sidebarL">
        <Repositories />
      </div>
    );
  }
}

export default SideBarL;

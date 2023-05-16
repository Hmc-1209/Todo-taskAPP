import React from "react";
import { Outlet } from "react-router-dom";

// Components
import SideBarL from "./SidebarL";
import Navbar from "./Navbar";

const Layout = () => {
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
};

export default Layout;

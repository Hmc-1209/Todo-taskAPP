import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

// Components
import SideBarL from "./SidebarL";
import Navbar from "./Navbar";

export const AppContext = createContext(null);

const Layout = () => {
  const [tasks, setTasks] = useState(["Task1", "Task2"]);
  const [repos, setRepos] = useState(["Repo1"]);
  const [tags, setTags] = useState(["School", "Lab", "Friend"]);
  const [selectedRepo, setSelectedRepo] = useState(repos[0]);

  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        repos,
        setRepos,
        tags,
        setTags,
        selectedRepo,
        setSelectedRepo,
      }}
    >
      <Navbar />

      <hr style={{ marginBottom: "3%" }} />

      <div style={{ display: "flex" }}>
        <SideBarL />
        <Outlet />
      </div>
    </AppContext.Provider>
  );
};

export default Layout;

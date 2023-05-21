import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// Components
import SideBarL from "./SidebarL";
import Navbar from "./Navbar";

export const AppContext = createContext(null);

const getRepos = () => {
  // If no repos
  if (!window.localStorage.getItem("repos")) {
    // Setting default repo
    window.localStorage.setItem("repos", JSON.stringify(["Repo1"]));
    // Setting default task
    window.localStorage.setItem(
      "tasks",
      JSON.stringify([
        {
          repoName: "Repo1",
          tasks: [
            {
              taskName: "task1",
              due: Date(),
              tags: "",
              notes: "",
              status: "unfinished",
            },
          ],
        },
      ])
    );
  }
  const data = window.localStorage.getItem("repos");
  return JSON.parse(data);
};

const getTasks = (repo) => {
  const data = window.localStorage.getItem("tasks");
  if (!data) {
    console.log("can't get data");
    return [];
  } else {
    return JSON.parse(data).find((element) => element.repoName === repo).tasks;
  }
};

const Layout = () => {
  const [repos, setRepos] = useState(getRepos());
  const [selectedRepo, setSelectedRepo] = useState(repos[0]);
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState(["School", "Lab", "Friend"]);

  useEffect(() => {
    // console.log(getTasks(selectedRepo));
    setTasks(getTasks(selectedRepo));
    setRepos(getRepos(selectedRepo));
  }, [selectedRepo]);

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

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
    window.localStorage.setItem("repos", JSON.stringify(["BaseRepo"]));
    // Setting default task
    window.localStorage.setItem(
      "tasks",
      JSON.stringify([
        {
          repoName: "BaseRepo",
          tasks: [
            {
              taskName: "BaseTask",
              due: Date(),
              tags: "none",
              notes: "This is a base repo due to not reading a null element",
              status: "This should nerver been used",
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
    return [];
  } else {
    return JSON.parse(data).find((element) => element.repoName === repo).tasks;
  }
};

const repoNameLegal = (new_name) => {
  let name = JSON.parse(window.localStorage.getItem("repos"));
  return name.find((name) => name === new_name) ? 0 : 1;
};

const Layout = () => {
  const [repos, setRepos] = useState(getRepos());
  const [selectedRepo, setSelectedRepo] = useState(repos[0]);
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState(["School", "Lab", "Friend"]);
  const [editing, setEditing] = useState(2);
  const [editingItem, setEditingItem] = useState(null);
  const [editingType, setEditingType] = useState(null);
  const [reRender, setReRerender] = useState(0);

  useEffect(() => {
    setTasks(getTasks(selectedRepo));
    setRepos(getRepos(selectedRepo));
  }, [selectedRepo, reRender]);

  const changeEditingState = () => {
    if (editing === 2) setEditing(0);

    if (editing === 1) {
      const new_name = document.getElementById("selectedItem").value;
      if (new_name !== "" && repoNameLegal(new_name)) {
        // Change repos datas
        let repos_data = JSON.parse(window.localStorage.getItem("repos"));
        repos_data.splice(repos_data.indexOf(editingItem), 1, new_name);

        // Change tasks datas
        let tasks_data = JSON.parse(window.localStorage.getItem("tasks"));

        console.log(
          "1",
          tasks_data,
          tasks_data.find((element) => element.repoName === editingItem)
        );

        tasks_data.find(
          (element) => element.repoName === editingItem
        ).repoName = new_name;

        window.localStorage.setItem("repos", JSON.stringify(repos_data));
        window.localStorage.setItem("tasks", JSON.stringify(tasks_data));

        setSelectedRepo(new_name);
      }
      setReRerender(reRender + 1);
      setEditingItem(null);
      setEditingType(null);
      setEditing(0);
    }
  };

  return (
    <div
      style={{ marginTop: "3%", marginLeft: "12%", marginRight: "12%" }}
      onClick={changeEditingState}
    >
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
          editing,
          setEditing,
          editingItem,
          setEditingItem,
          editingType,
          setEditingType,
        }}
      >
        <Navbar />

        <hr style={{ marginBottom: "3%" }} />

        <div style={{ display: "flex" }}>
          <SideBarL />
          <Outlet />
        </div>
      </AppContext.Provider>
    </div>
  );
};

export default Layout;

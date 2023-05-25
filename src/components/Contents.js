import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";

// Context
import { AppContext } from "./Layout";
import { addEmptyTask, deleteRepo } from "./functions/localStorageCRUD";

const Contents = () => {
  let {
    tasks,
    repos,
    selectedRepo,
    setSelectedRepo,
    setEditing,
    editingItem,
    setEditingItem,
    setEditingType,
    reRender,
    setReRender,
  } = useContext(AppContext);

  const addTask = (selectedRepo) => {
    addEmptyTask(selectedRepo);
    setReRender(reRender + 1);
    // setSelectedRepo("BaseRepo");
  };

  // On delete particular repo
  const delRepo = () => {
    if (repos.length !== 1) {
      const selectedIndex = deleteRepo(selectedRepo);
      // Select the base repo if no repos left, else if deleting the first repo, select the second, else if deleting the only repo, select the base one
      setSelectedRepo(
        selectedRepo === repos[1]
          ? repos.length === 2
            ? JSON.parse(window.localStorage.getItem("repos"))[0]
            : JSON.parse(window.localStorage.getItem("repos"))[1]
          : JSON.parse(window.localStorage.getItem("repos"))[selectedIndex - 1]
      );
    }
  };

  // Selected repo name for editing
  const selectElement_repos = (name) => {
    setEditing(1);
    setEditingItem(name);
    setEditingType("repos");
  };

  return (
    <div className="contents">
      {selectedRepo === "BaseRepo" && repos.length === 1 && (
        <div className="contentHint">Create a repo to start</div>
      )}
      {selectedRepo === "BaseRepo" && repos.length !== 1 && (
        <div className="contentHint">Select a repo</div>
      )}
      {selectedRepo !== "BaseRepo" && (
        <>
          {/* Title */}
          {editingItem !== selectedRepo ? (
            <div
              className="repoName"
              onClick={() => selectElement_repos(selectedRepo)}
            >
              {selectedRepo}
            </div>
          ) : (
            <input
              className="repoRename"
              autoFocus={true}
              placeholder={selectedRepo}
              id={"selectedItem"}
            />
          )}

          {/* Tasks */}
          {tasks.map((task) => (
            <div className="task" key={task.id}>
              <div>{task.taskName}</div>

              <br />
              <div>{task.due}</div>
            </div>
          ))}

          {/* Bottom */}
          <div className="contentBottom">
            <button
              className="addTaskBtn"
              onClick={() => addTask(selectedRepo)}
            >
              +
            </button>

            {repos.length !== 1 && (
              <button className="deleteBtn" onClick={delRepo}>
                <FaTrash className="trashIcon" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Contents;

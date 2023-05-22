import React, { useContext } from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

// Context
import { AppContext } from "./Layout";
import { deleteRepo } from "./function/localStorageCRUD";

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
  } = useContext(AppContext);

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

  const selectElement_repos = (name) => {
    setEditing(1);
    setEditingItem(name);
    setEditingType("repos");
  };

  return (
    <div className="contents">
      {console.log()}
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
            <div className="task" key={task.taskName}>
              {task.taskName}
              <br />
              {task.due}
            </div>
          ))}

          {/* Bottom */}
          <div className="contentBottom">
            <button className="addTaskBtn">+</button>
            <FaPencilAlt className="icon" />
            {repos.length !== 1 && (
              <button className="deleteBtn" onClick={delRepo}>
                <FaTrash className="icon" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Contents;

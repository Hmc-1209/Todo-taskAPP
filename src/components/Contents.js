import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";

// Context
import { AppContext } from "./Layout";
import {
  addEmptyTask,
  deleteRepo,
  getTaskName,
  getTaskNote,
} from "./functions/localStorageCRUD";

// Move circus
const moveCaretAtEnd = (e) => {
  var temp_value = e.target.value;
  e.target.value = "";
  e.target.value = temp_value;
};

const Contents = () => {
  let {
    tasks,
    repos,
    selectedRepo,
    setSelectedRepo,
    setEditing,
    editingItem,
    setEditingItem,
    editingType,
    setEditingType,
    reRender,
    setReRender,
    delRepoConfirm,
    setDelRepoConfirm,
  } = useContext(AppContext);

  const addTask = (selectedRepo) => {
    addEmptyTask(selectedRepo);
    setReRender(reRender + 1);
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
      setDelRepoConfirm(0);
    }
  };
  const delConfirm = () => {
    if (delRepoConfirm) {
      delRepo();
    } else {
      setEditing(3);
      setEditingType("delRepo");
      setDelRepoConfirm(1);
    }
  };

  // Selected repo name for editing
  const selectElement_repos = (name) => {
    setEditing(1);
    setEditingItem(name);
    setEditingType("repos");
  };

  // Selected task id for editing task_name
  const selectElement_task_name = (task_id) => {
    setEditing(2);
    setEditingItem(task_id);
    setEditingType("task:name");
  };

  // Selected task id for editing task_note
  const selectElement_task_note = (task_id) => {
    setEditing(4);
    setEditingItem(task_id);
    setEditingType("task:note");
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

          {/* Functional */}
          <div className="contentRepoFunctional">
            <button
              className="addTaskBtn"
              onClick={() => addTask(selectedRepo)}
            >
              +
            </button>

            {repos.length !== 1 && (
              <>
                <button className="deleteBtn" onClick={delConfirm}>
                  <FaTrash className="trashIcon" />
                </button>
                {delRepoConfirm ? (
                  <button className="delConfirm" onClick={delRepo}>
                    !
                  </button>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>

          {/* Tasks */}
          {tasks
            .filter((task) => task.id !== 0)
            .map((task) => (
              <div className="task" key={task.id}>
                <div className="taskLeft">
                  {editingItem !== task.id || editingType !== "task:name" ? (
                    <div
                      onClick={() => selectElement_task_name(task.id)}
                      style={{ paddingBottom: "2%" }}
                    >
                      {task.taskName}
                    </div>
                  ) : (
                    <input
                      className="taskRename"
                      id={"selectedItem"}
                      autoFocus={true}
                      placeholder={getTaskName(selectedRepo, task.id)}
                      style={{ paddingBottom: "2%" }}
                    />
                  )}
                  <hr style={{ width: "90%" }} />
                  <br />
                  <div>{task.due}</div>
                </div>
                {editingItem !== task.id || editingType !== "task:note" ? (
                  <div
                    className="taskNote"
                    onClick={() => selectElement_task_note(task.id)}
                  >
                    {task.notes}
                  </div>
                ) : (
                  <textarea
                    className="taskChangeNote"
                    autoFocus={true}
                    onFocus={moveCaretAtEnd}
                    id="selectedItem"
                    spellCheck={false}
                  >
                    {getTaskNote(selectedRepo, task.id)}
                  </textarea>
                )}
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Contents;

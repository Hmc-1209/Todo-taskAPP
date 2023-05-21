import React, { useContext } from "react";

// Context
import { AppContext } from "./Layout";

const Contents = () => {
  let { tasks, repos, selectedRepo, setSelectedRepo } = useContext(AppContext);

  // On delete particular repo
  const delRepo = () => {
    if (repos.length !== 1) {
      let taskData = window.localStorage.getItem("tasks");
      taskData = taskData
        ? JSON.parse(taskData).filter(
            (element) => element.repoName !== selectedRepo
          )
        : [];
      let repoData = window.localStorage.getItem("repos");
      repoData = repoData
        ? JSON.parse(repoData).filter((element) => element !== selectedRepo)
        : [];
      window.localStorage.setItem("tasks", JSON.stringify(taskData));
      window.localStorage.setItem("repos", JSON.stringify(repoData));
      setSelectedRepo(JSON.parse(window.localStorage.getItem("repos"))[0]);
    }
  };

  return (
    <div className="contents">
      {/* Title */}
      <div className="repoName">-- {selectedRepo} --</div>
      {/* Tasks */}
      {tasks.map((task) => (
        <div className="task" key={task.taskName}>
          {task.taskName}
          <br />
          {task.due}
        </div>
      ))}
      {/* Bottom */}
      {repos.length !== 1 && (
        <div className="contentBottom">
          <button className="deleteBtn" onClick={delRepo}>
            Del
          </button>
        </div>
      )}
    </div>
  );
};

export default Contents;

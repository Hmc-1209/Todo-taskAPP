import React, { useContext, useEffect } from "react";

// Context
import { AppContext } from "./Layout";

const Repositories = () => {
  const { repos, setRepos, selectedRepo, setSelectedRepo } =
    useContext(AppContext);

  // Get the repo name for new repo, find the empty index
  const repo_name = () => {
    let index = 1,
      i = 0;
    while (true) {
      if (i === repos.length) {
        break;
      }
      if (repos[i] === "Repo" + index) {
        i = 0;
        index++;
      } else {
        i++;
      }
    }
    return "Repo" + index;
  };

  // Add a repository
  const addRepo = () => {
    const new_repo = repo_name();
    const data = repos.concat(new_repo);
    setRepos(data);
    // Update tasks
    let taskData = JSON.parse(window.localStorage.getItem("tasks"));
    window.localStorage.setItem(
      "tasks",
      JSON.stringify(
        taskData.concat({
          repoName: new_repo,
          tasks: [
            {
              taskName: "task1",
              due: Date(),
              tags: "",
              notes: "",
              status: "unfinished",
            },
          ],
        })
      )
    );
  };
  useEffect(() => {
    window.localStorage.setItem("repos", JSON.stringify(repos));
  }, [repos]);

  // Check if the repository has been selected
  const repoClass = (repo) => {
    return repo === selectedRepo ? "repo selectedRepo" : "repo";
  };

  // Set the selected repository
  const selectRepo = (repo) => {
    setSelectedRepo(repo.target.outerText.split(" ")[0]);
  };

  return (
    <>
      {repos
        .filter((repo) => repo !== "BaseRepo")
        .map((repo) => (
          <div
            className={repoClass(repo)}
            onClick={(repo) => selectRepo(repo)}
            key={repo}
          >
            {repo}
          </div>
        ))}
      <button className="addTag" onClick={addRepo}>
        +
      </button>
    </>
  );
};

export default Repositories;

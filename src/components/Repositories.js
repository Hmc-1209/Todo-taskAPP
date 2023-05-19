import React, { useContext } from "react";

// Context
import { AppContext } from "./Layout";

const Repositories = () => {
  const { repos, setRepos, selectedRepo, setSelectedRepo } =
    useContext(AppContext);

  // Add a repository
  const addRepo = () => {
    setRepos(repos.concat("Repo" + (repos.length + 1)));
  };
  // Check if the repository has been selected
  const repoClass = (repo) => {
    return repo === selectedRepo ? "repo selectedRepo" : "repo";
  };
  // Set the selected repository
  const selectRepo = (repo) => {
    console.log(repo.target.outerText);
    setSelectedRepo(repo.target.outerText.split(" ")[0]);
  };

  return (
    <>
      {repos.map((repo) => (
        <div className={repoClass(repo)} onClick={(repo) => selectRepo(repo)}>
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

import React from "react";

const Repositories = () => {
  const repos = ["Repo1", "Repo2", "Repo3", "Repo4"];
  return repos.map((repo) => <div className="repo">{repo}</div>);
};

export default Repositories;

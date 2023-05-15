import React, { Component } from "react";

class Repositories extends Component {
  state = {
    repos: ["Repo1", "Repo2", "Repo3"],
  };
  render() {
    return this.state.repos.map((repo) => <div className="repo">{repo}</div>);
  }
}

export default Repositories;

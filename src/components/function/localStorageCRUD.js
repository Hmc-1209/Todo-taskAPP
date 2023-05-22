export const deleteRepo = (selectedRepo) => {
  let taskData = window.localStorage.getItem("tasks");
  // Get the deleted repo's index
  const selectedIndex = JSON.parse(taskData).findIndex(
    (element) => element.repoName === selectedRepo
  );
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
  return selectedIndex;
};

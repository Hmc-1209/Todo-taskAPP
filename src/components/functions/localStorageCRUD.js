import { getNowDate } from "./date";

const get_task_index = (taskData) => {
  let id_index = 1;
  while (1) {
    // eslint-disable-next-line
    if (!taskData.find((task) => task.id === id_index)) break;
    id_index++;
  }
  return id_index;
};

/* Create base repo and task */
export const createBase = () => {
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
            due: getNowDate(),
            tags: "none",
            notes: "This is a base repo due to not reading a null element",
            status: "This should nerver been used",
            id: 0,
          },
        ],
      },
    ])
  );
};

/* When delete a repo */
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

/* When a repo name changed */
export const changeRepoName = (new_name, editingItem) => {
  // Change repos datas
  let repos_data = JSON.parse(window.localStorage.getItem("repos"));
  repos_data.splice(repos_data.indexOf(editingItem), 1, new_name);

  // Change tasks datas
  let tasks_data = JSON.parse(window.localStorage.getItem("tasks"));

  tasks_data.find((element) => element.repoName === editingItem).repoName =
    new_name;

  window.localStorage.setItem("repos", JSON.stringify(repos_data));
  window.localStorage.setItem("tasks", JSON.stringify(tasks_data));
};

/* When a repo name changed, adjust the corresponding repoName in tasks */
export const updateTasksOnCreate = (new_repo) => {
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
            due: getNowDate(),
            tags: "",
            notes: "",
            status: "unfinished",
            id: 0,
          },
        ],
      })
    )
  );
};

/* When clicking the add task button, generate an empty task */
export const addEmptyTask = (selectedRepo) => {
  let Data = JSON.parse(window.localStorage.getItem("tasks"));
  let taskData = Data.find((repo) => repo.repoName === selectedRepo).tasks;

  Data.find((repo) => repo.repoName === selectedRepo).tasks = [
    {
      taskName: "Task",
      due: getNowDate(),
      tags: "",
      notes: "",
      status: "unfinished",
      id: get_task_index(taskData),
    },
  ].concat(taskData);

  console.log(Data);

  window.localStorage.setItem("tasks", JSON.stringify(Data));
};

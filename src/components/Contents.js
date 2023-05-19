import React, { useContext } from "react";

// Context
import { AppContext } from "./Layout";

const Contents = () => {
  const { tasks } = useContext(AppContext);

  return (
    <div className="contents">
      {tasks.map((task) => (
        <div className="task"> {task} </div>
      ))}
    </div>
  );
};

export default Contents;

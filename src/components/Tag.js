import React, { useContext } from "react";
import { AppContext } from "./Layout";

const Tags = () => {
  const { tags } = useContext(AppContext);

  return (
    <div className="tags">
      {tags.map((tag) => (
        <div className="tag">{tag}</div>
      ))}
    </div>
  );
};

export default Tags;

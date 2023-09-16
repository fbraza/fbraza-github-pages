import { Link } from "gatsby";
import React from "react";
import kebabCase from "lodash/kebabCase";

const Tags = ({tags}) => {
  return (
    <div className="flex flex-wrap">
      {tags.map((tag) => (
        <Link
          key={tag}
          to={`/tags/${kebabCase(tag)}`}
          className="font-semibold text-slate-700 border rounded py-2 px-2 border-slate-400 mr-2 mb-2 bg-slate-100 dark:bg-slate-700 dark:border-gray-600 dark:text-gray-400"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
};

export default Tags;

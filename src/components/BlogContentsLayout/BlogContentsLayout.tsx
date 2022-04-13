import { children } from "cheerio/lib/api/traversing";
import React from "react";
import style from "./BlogContentsLayout.module.scss";

const BlogContentsLayout: React.FC = ({ children }) => {
  return (
    <>
      <div className={style.container}>{children}</div>
    </>
  );
};

export default BlogContentsLayout;

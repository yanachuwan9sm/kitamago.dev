import React from "react";

import { Blog } from "../../types/blog";

import style from "./ArticleLink.module.scss";

import { ArticleLinkContent } from "../../types/blog";

const ArticleLink: React.VFC<ArticleLinkContent> = ({ article }) => {
  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          <div>{article.title}</div>
        </div>
      </div>
    </>
  );
};

export default ArticleLink;

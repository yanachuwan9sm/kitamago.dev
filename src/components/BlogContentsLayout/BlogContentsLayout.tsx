import React from 'react';

import { children } from 'cheerio/lib/api/traversing';

import style from './BlogContentsLayout.module.scss';

const BlogContentsLayout: React.FC = ({ children }) => {
  return (
    <>
      <div className={style.container}>{children}</div>
    </>
  );
};

export default BlogContentsLayout;

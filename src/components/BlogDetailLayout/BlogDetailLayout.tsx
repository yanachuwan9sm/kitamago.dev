import React from 'react';

import BlogContents from '../BlogContents/BlogContents';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Layout from '../Layout/Layout';
import SideBar from '../SideBar/SideBar';

import style from './BlogDetailLayout.module.scss';

import type { BlogDetailLayoutProps as Props } from '@/src/pages/blog/[id]';

const BlogDetailLayout: React.FC<Props> = ({ content, tags, highlightedBody, ...props }) => {
  return (
    <>
      <Layout>
        <Breadcrumb
          blogPageInfo={{
            categoryId: content.tags[0].id,
            categoryName: content.tags[0].tag,
            blogTitle: content.title,
          }}
          pageTitle={content.title}
        />
        <div className={style.container}>
          <BlogContents blog={content} highlightedBody={highlightedBody} />
          <SideBar tags={tags} />
        </div>
      </Layout>
    </>
  );
};

export default BlogDetailLayout;

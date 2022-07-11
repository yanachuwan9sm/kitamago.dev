import React from 'react';

import BlogContents from '../BlogContents/BlogContents';
import Layout from '../Layout/Layout';
import SideBar from '../SideBar/SideBar';

import type { BlogDetailLayoutProps as Props } from '@/src/pages/blog/[id]';

const BlogDetailLayout: React.FC<Props> = ({ content, tags, highlightedBody, ...props }) => {
  return (
    <>
      <Layout>
        <BlogContents blog={content} highlightedBody={highlightedBody} />
        <SideBar tags={tags} />
      </Layout>
    </>
  );
};

export default BlogDetailLayout;

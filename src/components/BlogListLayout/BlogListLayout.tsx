import React from 'react';

import LatestArticle from '../LatestArticle/LatestArticle';
import Layout from '../Layout/Layout';
import SideBar from '../SideBar/SideBar';

import type { getContentsResponse as Props } from '@/src/libs/getContents';

const BlogListLayout: React.FC<Props> = ({ contents, tags, ...props }) => {
  return (
    <>
      <Layout>
        <LatestArticle blogs={contents} />
        <SideBar tags={tags} />
      </Layout>
    </>
  );
};

export default BlogListLayout;

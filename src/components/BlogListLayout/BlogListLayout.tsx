import React from 'react';

import BlogList from '../BlogList/BlogList';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Layout from '../Layout/Layout';
import SideBar from '../SideBar/SideBar';

import style from './BlogListLayout.module.scss';

import type { getContentsResponse } from '@/src/libs/getContents';

type Props = getContentsResponse;

const BlogListLayout: React.FC<Props> = ({ contents, tags, ...props }) => {
  return (
    <>
      <Layout>
        {props.selectedTag !== null ? (
          <Breadcrumb
            blogPageInfo={{
              categoryId: '',
              categoryName: '',
              blogTitle: '',
            }}
            pageTitle={props.selectedTag?.tag as string}
          />
        ) : null}
        <div className={style.container}>
          <BlogList contents={contents} heading={props.selectedTag?.tag} />
          <SideBar tags={tags} />
        </div>
      </Layout>
    </>
  );
};

export default BlogListLayout;

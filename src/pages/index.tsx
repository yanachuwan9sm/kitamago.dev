import type { GetStaticProps, NextPage } from 'next';

import { getGlobalContents } from '../libs/getContents';

import type { getContentsResponse as Props } from '../libs/getContents';

import BlogContentsLayout from '@/src/components/BlogContentsLayout/BlogContentsLayout';
import LatestArticle from '@/src/components/LatestArticle/LatestArticle';
import Seo from '@/src/components/Seo/Seo';
import SideBar from '@/src/components/SideBar/SideBar';

// microCMSに対してAPIリクエスト
export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await getGlobalContents();

  return {
    props: { ...data },
  };
};

const Home: NextPage<Props> = ({ contents, tags }) => {
  return (
    <>
      <Seo />
      <BlogContentsLayout>
        <LatestArticle blogs={contents} />
        <SideBar tags={tags} />
      </BlogContentsLayout>
    </>
  );
};

export default Home;

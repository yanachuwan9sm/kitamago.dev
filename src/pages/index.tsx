import type { GetStaticProps, NextPage } from 'next';

import { getGlobalContents } from '../libs/getContents';

import type { getContentsResponse as Props } from '../libs/getContents';

import BlogListLayout from '@/src/components/BlogListLayout/BlogListLayout';
import Seo from '@/src/components/Seo/Seo';

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await getGlobalContents();

  return {
    props: { ...data },
  };
};

const Home: NextPage<Props> = (props) => {
  return (
    <>
      <Seo />
      <BlogListLayout {...props} />
    </>
  );
};

export default Home;

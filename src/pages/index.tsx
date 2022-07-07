import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import { client } from '../libs/client';

import type { Blog, Tag } from '../types/blog';

import BlogContentsLayout from '@/src/components/BlogContentsLayout/BlogContentsLayout';
import LatestArticle from '@/src/components/LatestArticle/LatestArticle';
import Seo from '@/src/components/Seo/Seo';
import SideBar from '@/src/components/SideBar/SideBar';

// microCMSに対してAPIリクエスト
export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.get({ endpoint: 'blog' });
  const blog: Blog[] = data.contents;
  const tags = await client.get({
    endpoint: 'tag',
    queries: { orders: '-publishedAt' },
  });

  const dataList = await client.getList({ endpoint: 'blog' });
  console.log(dataList);

  return {
    props: {
      blogs: blog,
      tags: tags.contents,
    },
  };
};

type Props = {
  blogs: Blog[];
  tags: Tag[];
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ blogs, tags }: Props) => {
  return (
    <>
      <Seo />
      <BlogContentsLayout>
        <LatestArticle blogs={blogs} />
        <SideBar tags={tags} />
      </BlogContentsLayout>
    </>
  );
};

export default Home;

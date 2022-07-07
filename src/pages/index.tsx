import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import AnimationBg from '../components/AnimationBg/AnimationBg';
import BlogContentsLayout from '../components/BlogContentsLayout/BlogContentsLayout';
import { Carousel } from '../components/Carousel/Carousel';
import LatestArticle from '../components/LatestArticle/LatestArticle';
import Seo from '../components/Seo/Seo';
import SideBar from '../components/SideBar/SideBar';
import { client } from '../libs/client';
import style from '../pages/index.module.scss';

import type { Blog, Tag } from '../types/blog';

// microCMSに対してAPIリクエスト
export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.get({ endpoint: 'blog' });
  const blog: Blog[] = data.contents;
  const tags = await client.get({
    endpoint: 'tag',
    queries: { orders: '-publishedAt' },
  });

  // const carouselArray: carouselItems[] = blog.map((blog) => ({
  //   url: `/blog/${blog.id}`,
  //   title: blog.title,
  //   image: blog.image.url,
  //   alt: blog.title,
  //   updatedAt: blog.updatedAt.slice(0, 10),
  //   tags: blog.tags,
  // }));

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

// type carouselItems = {
//   url: string;
//   title: string;
//   image: string;
//   alt: string;
//   updatedAt: string;
//   tags: Tag[];
// };

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

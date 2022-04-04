import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import style from "../pages/index.module.scss";

import { client } from "../libs/client";
import { Blog } from "../types/blog";
import { Carousel } from "../components/Carousel/Carousel";
import AnimationBg from "../components/AnimationBg/AnimationBg";

// microCMSに対してAPIリクエスト
export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });
  const blog: Blog[] = data.contents;

  const carouselArray: carouselItems[] = blog.map((blog) => ({
    url: `/blog/${blog.id}`,
    title: blog.title,
    image: blog.image.url,
    alt: blog.title,
    updatedAt: blog.updatedAt.slice(0, 10),
  }));

  return {
    props: {
      blogs: blog,
      carouselArray: carouselArray,
    },
  };
};

type Props = {
  blogs: Blog[];
  carouselArray: carouselItems[];
};

type carouselItems = {
  url: string;
  title: string;
  image: string;
  alt: string;
  updatedAt: string;
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blogs,
  carouselArray,
}: Props) => {
  return (
    <>
      <AnimationBg />
      <Carousel carouselItems={carouselArray} />
      {/* 記事一覧表示 */}
      <div className={style.container}>
        <ul>
          {blogs.map((blog: any) => (
            <li key={blog.id}>
              <Link href={`/blog/${blog.id}`}>
                <a>{blog.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;

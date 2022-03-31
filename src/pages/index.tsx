import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import styles from "../../styles/Home.module.css";
import scssStyles from "../pages/index.module.scss";

import { client } from "../libs/client";
import { Blog } from "../types/blog";
import Layout from "../components/Layout/Layout";

// microCMSに対してAPIリクエスト
export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });
  const blog: Blog[] = data.contents;

  return {
    props: {
      blogs: blog,
    },
  };
};

type Props = {
  blogs: Blog[];
  // tags: Tag[];
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blogs,
}: Props) => {
  console.log(blogs);

  return (
    <>
      {/* 記事一覧表示 */}
      <div>
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

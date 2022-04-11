import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Image from "next/image";

import cheerio from "cheerio";
import hljs from "highlight.js";

import style from "./blog.module.scss";
import "highlight.js/styles/hybrid.css";

import { client } from "../../libs/client";
import { ArticleLinkContent, Blog } from "../../types/blog";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import SideBar from "../../components/SideBar/SideBar";
import Toc from "../../components/Toc/Toc";
import Link from "next/link";
import BlogContents from "../../components/BlogContents/BlogContents";

// 静的生成のためのパスを指定
export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = await client.get({ endpoint: "blog" });

  const paths = blogs.contents.map((content: Blog) => `/blog/${content.id}`);
  return {
    paths, //どのパスが事前レンダリングされるかを決定
    fallback: false, //getStaticPathsによって返されないパスは404となる
  };
};

// microCMSへAPIリクエスト
export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const id = ctx.params?.id as string;
  const blog: Blog = await client.get({ endpoint: "blog", contentId: id });

  // 繰り返しフィールドに応じて記事本文の情報のみを抽出
  const BodyArray = Array(blog.contents?.length);

  blog.contents?.forEach((content, idx) => {
    if (content.fieldId === "richEditor") {
      BodyArray.push(content.body);
    }
  });
  // 取得した記事本文の文字列配列を文字列に変換
  const body = BodyArray.join("");

  const $ = cheerio.load(body);
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });

  return {
    props: {
      blog,
      highlightedBody: $.html(),
    },
  };
};

type Props = {
  blog: Blog;
  highlightedBody: string;
};

const BlogId: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blog,
  highlightedBody,
}: Props) => {
  return (
    <>
      <main>
        {/* パンくずリスト */}
        <Breadcrumb
          blogPageInfo={{
            categoryId: blog.tags[0].id,
            categoryName: blog.tags[0].tag,
            blogTitle: blog.title,
          }}
          pageTitle={blog.title}
        />
        <div className={style.container}>
          <BlogContents blog={blog} highlightedBody={highlightedBody} />

          <SideBar />
        </div>
      </main>
    </>
  );
};

export default BlogId;

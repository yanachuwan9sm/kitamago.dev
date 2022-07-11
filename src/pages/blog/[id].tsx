import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { useRouter } from 'next/router';

import cheerio from 'cheerio';
import hljs from 'highlight.js';

import Seo from '../../components/Seo/Seo';

import 'highlight.js/styles/github-dark-dimmed.css';
import type { Blog, contentBody } from '@/src/types/blog';
import type { Tag } from '@/src/types/tag';
import type { MicroCMSListContent, MicroCMSListResponse } from 'microcms-js-sdk';

import BlogDetailLayout from '@/src/components/BlogDetailLayout/BlogDetailLayout';
import { getBlogDetail, getCategories, getGlobalContents } from '@/src/libs/getContents';

type Props = {
  content: Blog & MicroCMSListContent;
  tags: MicroCMSListResponse<Tag>['contents'];
  highlightedBody: string;
};

export type BlogDetailLayoutProps = Props;

// シンタックスハイライトの生成
const processingSyntaxHighlight = async (contents: contentBody[]) => {
  // 繰り返しフィールドに応じて記事本文の情報のみを抽出
  const BodyArray = Array(contents.length);
  contents.forEach((content) => {
    if (content.fieldId === 'richEditor') {
      BodyArray.push(content.body);
    }
  });

  // 取得した記事本文の文字列配列を文字列に変換
  const body = BodyArray.join('');

  const $ = cheerio.load(body);
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });

  return $.html();
};

// 静的生成のためのパスを指定
export const getStaticPaths: GetStaticPaths = async () => {
  const { contents } = await getGlobalContents();
  const paths = contents.map((content) => ({
    params: {
      id: content.id,
    },
  }));

  return {
    paths,
    fallback: false, // getStaticPathsによって返されないパスは404エラーを返却
  };
};

// microCMSへAPIリクエスト
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (params === undefined || typeof params.id !== 'string')
    throw Error('pagesのディレクトリ構造かファイル名が間違っています。');

  // const id = ctx.params?.id as string;

  // const blog: Blog = await client.get({ endpoint: 'blog', contentId: id });
  // const tags = await client.get({ endpoint: 'tag' });

  const content = await getBlogDetail(params.id);
  const tags = (await getCategories({ orders: '-publishedAt' })).contents;
  const highlightedBody = await processingSyntaxHighlight(content.contents);

  // if (content.contents !== undefined) {
  //   // 繰り返しフィールドに応じて記事本文の情報のみを抽出
  //   const BodyArray = Array(content.contents.length);
  //   content.contents.forEach((content) => {
  //     if (content.fieldId === 'richEditor') {
  //       BodyArray.push(content.body);
  //     }
  //   });

  //   // 取得した記事本文の文字列配列を文字列に変換
  //   const body = BodyArray.join('');

  //   const $ = cheerio.load(body);
  //   $('pre code').each((_, elm) => {
  //     const result = hljs.highlightAuto($(elm).text());
  //     $(elm).html(result.value);
  //     $(elm).addClass('hljs');
  //   });

  //   return {
  //     content: content,
  //     highlightedBody: $.html(),
  //     tags: tags,
  //   };
  // }

  // return {
  //   content: content,
  //   highlightedBody: highlightedBody,
  //   tags: tags,
  // };

  return {
    props: {
      content: content,
      tags: tags,
      highlightedBody: highlightedBody,
    },
  };
};

const BlogId: NextPage<Props> = (props) => {
  const router = useRouter();
  const pagePath = process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.asPath;
  return (
    <>
      <Seo pageTitle={props.content.title} pagePath={pagePath} pageImg={props.content.image.url} />

      <BlogDetailLayout {...props} />
    </>
  );
};

export default BlogId;

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import BlogListLayout from '../../components/BlogListLayout/BlogListLayout';
import Seo from '../../components/Seo/Seo';

import type { getContentsResponse as Props } from '../../libs/getContents';
import type { Tag } from '@/src/types/Tag';
import type { MicroCMSListResponse } from 'microcms-js-sdk';

import { getCategories, getGlobalContents } from '@/src/libs/getContents';

// 取得したパスより一致するカテゴリーのid値を取得
const filterTagId = async (tags: MicroCMSListResponse<Tag>['contents'], targetQuery: string) => {
  return tags.find((tag) => tag.tag === targetQuery);
};

// 静的生成のためのパスを指定
export const getStaticPaths: GetStaticPaths = async () => {
  const { tags } = await getGlobalContents();
  const paths = tags.map((tag) => ({
    params: {
      id: tag.tag,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

// microCMSへAPIリクエスト
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (params === undefined || typeof params.id !== 'string') throw Error('カテゴリーの名前が間違っています');

  const tags = await getCategories();
  const tag = await filterTagId(tags.contents, params.id);
  const content = await getGlobalContents(tag?.id as string);

  console.log(content.contents);
  return {
    props: { ...content },
  };
};

const CategoryId: NextPage<Props> = (props, { contents, tags }) => {
  const router = useRouter();
  const { id } = router.query;

  const pagePath = process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.asPath;

  return (
    <>
      <Seo pageTitle={id as string} pagePath={pagePath} />
      <BlogListLayout {...props} />
    </>
  );
};

export default CategoryId;

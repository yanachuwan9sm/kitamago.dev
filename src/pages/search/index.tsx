import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { MicroCMSListContent } from 'microcms-js-sdk';
import useSWR from 'swr';

import BlogContentsLayout from '../../components/BlogContentsLayout/BlogContentsLayout';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import CategoryArticleList from '../../components/CategoryArticleList/CategoryArticleList';
import Seo from '../../components/Seo/Seo';
import SideBar from '../../components/SideBar/SideBar';
import { client } from '../../libs/client';

import style from './index.module.scss';

import type { Blog, Tag } from '../../types/blog';
import type { MicroCMSListResponse } from 'microcms-js-sdk';

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const data = await client.get({ endpoint: 'tag' });

  return {
    props: {
      tags: data.contents,
    },
  };
};

type Props = {
  tags: Tag[];
};

const SearchArtile: NextPage<Props> = ({ tags }: Props) => {
  const router = useRouter();

  const pagePath = process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.asPath;

  const { data, error } = useSWR<MicroCMSListResponse<Blog>>(`/api/search?q=${router.query.q}`, (url) =>
    fetch(url).then((res) => res.json())
  );
  console.log(data);

  if (error) {
    // ここにエラー処理用のコンポーネントを表示
    return <p>通信エラーが起きました</p>;
  }

  return (
    <>
      <Seo pageTitle={`検索結果 : ${router.query.q}`} pagePath={pagePath} />
      <main>
        {/* パンくずリスト */}
        <Breadcrumb
          blogPageInfo={{
            categoryId: '',
            categoryName: '',
            blogTitle: '',
          }}
          pageTitle={`検索ワード [ ${router.query.q} ]`}
        />
        <BlogContentsLayout>
          {data === undefined ? (
            <div className={style.container}>検索中</div>
          ) : data.contents.length === 0 ? (
            <div className={style.container}>記事がありません</div>
          ) : (
            <CategoryArticleList id={router.query.q as string} blogs={data.contents} />
          )}
          <SideBar tags={tags} />
        </BlogContentsLayout>
      </main>
    </>
  );
};

export default SearchArtile;

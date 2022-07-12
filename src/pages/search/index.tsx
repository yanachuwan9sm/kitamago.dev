import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import useSWR from 'swr';

import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Seo from '../../components/Seo/Seo';
import SideBar from '../../components/SideBar/SideBar';

import style from './index.module.scss';

import type { Blog } from '@/src/types/blog';
import type { Tag } from '@/src/types/tag';
import type { MicroCMSListContent, MicroCMSListResponse } from 'microcms-js-sdk';

import BlogList from '@/src/components/BlogList/BlogList';
import Footer from '@/src/components/Footer/Footer';
import Header from '@/src/components/Header/Header';
import { getCategories } from '@/src/libs/getContents';

type Props = {
  tags: (Tag & MicroCMSListContent)[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const tags = (await getCategories({ orders: '-publishedAt' })).contents;

  return {
    props: {
      tags,
    },
  };
};

const SearchArtile: NextPage<Props> = ({ tags }) => {
  const router = useRouter();
  const pagePath = process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.asPath;

  const { data, error } = useSWR<MicroCMSListResponse<Blog>>(`/api/search?q=${router.query.q}`, (url) =>
    fetch(url).then((res) => res.json())
  );

  if (error) {
    return <p>通信エラーが発生しました</p>;
  }

  return (
    <>
      <Seo pageTitle={`検索結果 : ${router.query.q}`} pagePath={pagePath} />
      <Header />
      <main className={style.main}>
        <Breadcrumb
          blogPageInfo={{
            categoryId: '',
            categoryName: '',
            blogTitle: '',
          }}
          pageTitle={`検索ワード [ ${router.query.q} ]`}
        />
        <div className={style.container}>
          {data === undefined ? (
            <div className={style.container}>検索中</div>
          ) : data.contents.length === 0 ? (
            <div className={style.container}>記事がありません</div>
          ) : (
            // <CategoryArticleList id={router.query.q as string} blogs={data.contents} />
            <BlogList heading={router.query.q as string} contents={data.contents} />
          )}
          <SideBar tags={tags} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SearchArtile;

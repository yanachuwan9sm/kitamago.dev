import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { useRouter } from 'next/router';

import BlogContentsLayout from '../../components/BlogContentsLayout/BlogContentsLayout';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import CategoryArticleList from '../../components/CategoryArticleList/CategoryArticleList';
import Seo from '../../components/Seo/Seo';
import SideBar from '../../components/SideBar/SideBar';
import { client } from '../../libs/client';

import type { Blog, Tag } from '../../types/blog';

// 取得したパスより一致するカテゴリーのid値を取得
const filterTagId = (tags: Tag[], targetQuery: string) => {
  return tags.filter((tag: Tag) => tag.tag === targetQuery);
};

// 静的生成のためのパスを指定
export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await client.get({ endpoint: 'tag' });
  const paths = tags.contents.map((content: Tag) => `/category/${content.tag}`);
  return {
    paths, //どのパスが事前レンダリングされるかを決定
    fallback: false, //getStaticPathsによって返されないパスは404となる
  };
};

// microCMSへAPIリクエスト
export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  // microCMSの filter機能 はidでしか取得出来ない為、
  // 取得したパスより一致するカテゴリーのid値を取得する
  const data = await client.get({ endpoint: 'tag' });
  const tags: Tag[] = data.contents;
  const params = ctx.params?.id as string;
  const id = filterTagId(tags, params);

  const blogs = await client.get({
    endpoint: 'blog',
    queries: { filters: `tags[contains]${id[0].id}` },
  });

  return {
    props: {
      blogs: blogs.contents,
      tags: tags,
    },
  };
};

type Props = {
  blogs: Blog[];
  tags: Tag[];
};

const CategoryId: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ blogs, tags }: Props) => {
  const router = useRouter();
  const { id } = router.query;

  const pagePath = process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.asPath;

  return (
    <>
      <Seo pageTitle={id as string} pagePath={pagePath} />
      <main>
        {/* パンくずリスト */}
        <Breadcrumb
          blogPageInfo={{
            categoryId: '',
            categoryName: '',
            blogTitle: '',
          }}
          pageTitle={id as string}
        />

        <BlogContentsLayout>
          <CategoryArticleList id={id as string} blogs={blogs} />
          <SideBar tags={tags} />
        </BlogContentsLayout>
      </main>
    </>
  );
};

export default CategoryId;

import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";

import Image from "next/image";
import { useRouter } from "next/router";
import { client } from "../../libs/client";
import { Blog, Tag } from "../../types/blog";

// 取得したパスより一致するカテゴリーのid値を取得
const filterTagId = (tags: Tag[], targetQuery: string) => {
  return tags.filter((tag: Tag) => tag.tag === targetQuery);
};

// 静的生成のためのパスを指定
export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await client.get({ endpoint: "tag" });
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
  const data = await client.get({ endpoint: "tag" });
  const tags: Tag[] = data.contents;
  const params = ctx.params?.id as string;
  const id = filterTagId(tags, params);

  const blogs = await client.get({
    endpoint: "blog",
    queries: { filters: `tags[contains]${id[0].id}` },
  });

  return {
    props: {
      blogs: blogs.contents,
    },
  };
};

type Props = {
  blogs: Blog[];
};

const CategoryId: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blogs,
}: Props) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <main>
      <p>Tags : {id}</p>
      {blogs && (
        <ul>
          {blogs.map((blog) => (
            <>
              <li key={blog.id}>
                <h2>{blog.title}</h2>
                <p>{blog.publishedAt}</p>
              </li>
            </>
          ))}
        </ul>
      )}
    </main>
  );
};

export default CategoryId;

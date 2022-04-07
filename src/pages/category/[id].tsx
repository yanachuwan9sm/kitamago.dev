import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Sidebar } from "react-feather";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import SideBar from "../../components/SideBar/SideBar";
import { client } from "../../libs/client";
import { Blog, Tag } from "../../types/blog";

import style from "./category.module.scss";

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
      {/* パンくずリスト */}
      <Breadcrumb
        blogPageInfo={{
          categoryId: "",
          categoryName: "",
          blogTitle: "",
        }}
        pageTitle={id as string}
      />

      <div className={style.container}>
        <div className={style.content}>
          <h1>{id}</h1>

          {blogs && (
            <ul>
              {blogs.map((blog) => (
                <>
                  <li key={blog.id}>
                    <Link href={`/blog/${blog.id}`}>
                      <a>
                        <Image
                          className={style.carouselItemImage}
                          src={blog.image.url}
                          width="580px"
                          height="360px"
                        />
                        <h2>{blog.title}</h2>
                        <p>{blog.publishedAt.slice(0, 10)}</p>
                      </a>
                    </Link>
                  </li>
                </>
              ))}
            </ul>
          )}
        </div>

        <SideBar />
      </div>
    </main>
  );
};

export default CategoryId;

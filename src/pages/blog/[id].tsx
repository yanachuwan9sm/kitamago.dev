import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { client } from "../../libs/client";
import { Blog } from "../../types/blog";

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
  const data = await client.get({ endpoint: "blog", contentId: id });
  return {
    props: {
      blog: data,
    },
  };
};

type Props = {
  blog: Blog;
};

const BlogId: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blog,
}: Props) => {
  return (
    <main>
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
      {/* {blog.tags.map((tag) => (
        <li key={tag.id}>
          #{tag.tag}
        </li>
      ))} */}
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
      />
    </main>
  );
};

export default BlogId;

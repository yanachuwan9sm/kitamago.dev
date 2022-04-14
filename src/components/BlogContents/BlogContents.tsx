import Image from "next/image";
import Link from "next/link";
import React from "react";

import style from "./BlogContents.module.scss";

import Toc from "../Toc/Toc";
import { Blog } from "../../types/blog";
import ArticleLink from "../ArticleLink/ArticleLink";
import { highlightCode } from "../../utils/highlightCode";

interface Props {
  blog: Blog;
  highlightedBody: string;
}

const BlogContents: React.VFC<Props> = ({ blog, highlightedBody }) => {
  return (
    <>
      <div className={style.content}>
        {/* 記事タイトル */}
        <h1>{blog.title}</h1>

        {/* カテゴリー・投稿日時 */}
        <div className={style.discription}>
          <p>{blog.publishedAt.slice(0, 10)}</p>
          <ul>
            {blog.tags.map((tag) => (
              <li key={tag.id}>
                <Link href="/category/[id]" as={`/category/${tag.tag}`}>
                  <a> {tag.tag}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 記事タイトル画像 */}
        <Image src={blog.image.url} width="500" height="380" alt="blog-image" />

        {/* 目次 */}
        <Toc htmlString={highlightedBody} />

        {/* 記事内容 */}
        {blog.contents?.map((content, i) =>
          content.fieldId === "richEditor" ? (
            <>
              <div className={style.body}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${highlightCode(content.body)}`,
                  }}
                />
              </div>
            </>
          ) : content.fieldId === "articleLink" ? (
            <ArticleLink key={i} {...content} />
          ) : (
            ""
          )
        )}
      </div>
    </>
  );
};

export default BlogContents;
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { highlightCode } from '../../utils/highlightCode';
import ArticleLink from '../ArticleLink/ArticleLink';
import Toc from '../Toc/Toc';

import style from './BlogContents.module.scss';

import type { Blog } from '../../types/blog';
import type { MicroCMSListContent } from 'microcms-js-sdk';

interface Props {
  blog: Blog & MicroCMSListContent;
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
        <div className={style.image}>
          <Image src={blog.image.url} layout="fill" objectFit="contain" alt="" />
        </div>

        {/* 目次 */}
        <Toc htmlString={highlightedBody} />

        <div className={style.body}>
          {/* 記事内容 */}
          {blog.contents?.map((content, i) =>
            content.fieldId === 'richEditor' ? (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${highlightCode(content.body)}`,
                  }}
                />
              </>
            ) : content.fieldId === 'articleLink' ? (
              <ArticleLink key={i} {...content} />
            ) : content.fieldId === 'table' ? (
              <>
                <div className={style.table}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: content.html,
                    }}
                  />
                </div>
              </>
            ) : content.fieldId === 'article_image' ? (
              <>
                <Image
                  src={content.articleimg.url}
                  width={content.articleimg.width}
                  height={content.articleimg.height}
                  alt="blog-image"
                />
              </>
            ) : (
              ''
            )
          )}
        </div>
      </div>
    </>
  );
};

export default BlogContents;

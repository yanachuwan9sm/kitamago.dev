import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import style from './BlogList.module.scss';

import type { Blog } from '../../types/blog';
import type { MicroCMSListContent } from 'microcms-js-sdk';

interface Props {
  heading?: string | undefined;
  contents: (Blog & MicroCMSListContent)[];
}

const BlogList: React.VFC<Props> = ({ heading, contents }) => {
  return (
    <>
      <div className={style.container}>
        <h1>{heading !== undefined ? heading : '最新記事'}</h1>
        {contents && (
          <ul>
            {contents.map((content) => (
              <>
                <li key={content.id}>
                  <Link href={`/blog/${content.id}`}>
                    <a>
                      <Image src={content.image.url} width="580px" height="360px" />
                      <div className={style.article_date}>
                        <p>{content.publishedAt.slice(0, 10)}</p>
                        <p>{content.updatedAt.slice(0, 10)}</p>
                      </div>
                      <h2>{content.title}</h2>
                    </a>
                  </Link>
                </li>
              </>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default BlogList;

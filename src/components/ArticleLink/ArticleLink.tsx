import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Blog } from '../../types/blog';

import style from './ArticleLink.module.scss';

import type { ArticleLinkContent } from '../../types/blog';

const ArticleLink: React.VFC<ArticleLinkContent> = ({ article }) => {
  return (
    <>
      <div className={style.container}>
        <Link href={`/blog/${article.id}`}>
          <a>
            <span className={style.linkicon}>PICK UP</span>
            <div className={style.inner}>
              <div className={style.linkimage}>
                <Image className={style.carouselItemImage} src={article.image.url} width="160px" height="100px" />
              </div>
              <div className={style.linkbody}>
                <span>{article.title}</span>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
};

export default ArticleLink;

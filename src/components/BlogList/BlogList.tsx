import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import { IconContext } from 'react-icons';
import { FaThLarge } from 'react-icons/fa';
import { FaThList } from 'react-icons/fa';
import { FaSquare } from 'react-icons/fa';

import style from './BlogList.module.scss';

import type { Blog } from '../../types/blog';
import type { MicroCMSListContent } from 'microcms-js-sdk';

interface Props {
  heading?: string | undefined;
  contents: (Blog & MicroCMSListContent)[];
}

type displayType = 'visual' | 'detail' | '2row';

const BlogList: React.VFC<Props> = ({ heading, contents }) => {
  const [display, setDisplay] = useState<displayType>('detail');

  return (
    <>
      <div className={style.container}>
        <div className={style.heading_wrapper}>
          <h1>{heading !== undefined ? heading : 'New Arciles'}</h1>

          <ul className={style.display_toggle}>
            <li>
              <IconContext.Provider value={{ size: '20px' }}>
                <button
                  className={display === 'visual' ? style.icon_button + style.active : style.icon_button}
                  onClick={() => setDisplay('visual')}
                >
                  <FaSquare />
                </button>
              </IconContext.Provider>
            </li>
            <li>
              <IconContext.Provider value={{ size: '20px' }}>
                <button
                  className={display === 'detail' ? style.icon_button + style.active : style.icon_button}
                  onClick={() => setDisplay('detail')}
                >
                  <FaThList />
                </button>
              </IconContext.Provider>
            </li>
            <li>
              <IconContext.Provider value={{ size: '20px' }}>
                <button
                  className={display === '2row' ? style.icon_button + style.active : style.icon_button}
                  onClick={() => setDisplay('2row')}
                >
                  <FaThLarge />
                </button>
              </IconContext.Provider>
            </li>
          </ul>
        </div>

        <hr className={style.divide} />

        {contents && (
          <ul
            className={
              display === 'visual'
                ? style.listItemContainer_visual
                : display === 'detail'
                ? style.listItemContainer_detail
                : display === '2row'
                ? style.listItemContainer_2row
                : style.listItemContainer
            }
          >
            {contents.map((content) => (
              <>
                <li key={content.id} className={style.listItem}>
                  <div className={style.article_layout}>
                    <div className={style.article_image}>
                      <Link href={`/blog/${content.id}`}>
                        <a>
                          <Image src={content.image.url} layout="fill" objectFit="contain" alt="" />
                        </a>
                      </Link>
                    </div>
                    <div className={style.article_content}>
                      <div className={style.article_date}>
                        <p>{content.publishedAt.slice(0, 10)}</p>
                        <p>{content.updatedAt.slice(0, 10)}</p>
                      </div>
                      <Link href={`/blog/${content.id}`}>
                        <a>
                          <h2 className={style.article_title}>{content.title}</h2>
                        </a>
                      </Link>
                    </div>
                  </div>
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

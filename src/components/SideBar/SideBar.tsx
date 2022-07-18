import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Profile from '../Profile/Profile';

import style from './SideBar.module.scss';

import type { Tag } from '@/src/types/Tag';
import type { MicroCMSListContent } from 'microcms-js-sdk';

interface Props {
  tags: (Tag & MicroCMSListContent)[];
}

const SideBar: React.VFC<Props> = ({ tags }) => {
  const [inputData, setInputData] = useState('');
  const router = useRouter();

  return (
    <>
      <aside className={style.sidebar}>
        <div className={style.s_container}>
          <div className={style.s_content}>
            <div className={style.search_container}>
              <input
                className={style.search_input}
                type="text"
                value={inputData}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputData(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key == 'Enter') {
                    e.preventDefault();
                    router.push({
                      pathname: '/search',
                      query: { q: inputData },
                    });
                  }
                }}
                placeholder="ブログ内検索"
                aria-label="検索ワード"
              />
              <button
                type="button"
                className={inputData.length > 0 ? `${style.search_button} ${style.is_active}` : style.search_button}
                onClick={() =>
                  router.push({
                    pathname: '/search',
                    query: { q: inputData },
                  })
                }
              ></button>
            </div>
          </div>
        </div>
        <div className={style.s_container}>
          <div className={style.s_header}>プロフィール</div>
          <div className={style.s_content}>
            <Profile />
          </div>
        </div>
        <div className={style.s_container}>
          <div className={style.s_header}>タグ</div>
          <div className={style.s_content}>
            {tags && (
              <ul className={style.s_taglist}>
                {tags.map((tag) => (
                  <>
                    <li key={tag.id} className={style.s_taglistitem}>
                      <Link href={`/category/${tag.tag}`}>
                        <a>
                          <p>{tag.tag}</p>
                        </a>
                      </Link>
                    </li>
                  </>
                ))}
              </ul>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;

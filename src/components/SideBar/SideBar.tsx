import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { client } from "../../libs/client";
import { Tag } from "../../types/blog";
import Profile from "../Profile/Profile";
import style from "./SideBar.module.scss";

interface Props {
  tags: Tag[];
}

const SideBar: React.VFC<Props> = ({ tags }) => {
  const [inputData, setInputData] = useState("");
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputData(e.target.value)
                }
                placeholder="検索"
                aria-label="検索ワード"
              />
              <button
                type="button"
                className={style.search_button}
                onClick={() =>
                  router.push({
                    pathname: "/search",
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
              <ul>
                {tags.map((tag) => (
                  <>
                    <li key={tag.id}>
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
        <div className={style.s_container}>
          <div className={style.s_header}>新着記事</div>
          <div className={style.s_content}>kitamago</div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;

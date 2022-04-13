import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import React from "react";

import { client } from "../../libs/client";
import { Tag } from "../../types/blog";
import Profile from "../Profile/Profile";
import style from "./SideBar.module.scss";

interface Props {
  tags: Tag[];
}

const SideBar: React.VFC<Props> = ({ tags }) => {
  return (
    <>
      <aside className={style.sidebar}>
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

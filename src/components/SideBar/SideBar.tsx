import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import React from "react";

import { client } from "../../libs/client";
import { Tag } from "../../types/blog";
import Profile from "../Profile/Profile";
import style from "./SideBar.module.scss";

//
// getStaticPropsページからのみエクスポートできます。
// ページ以外のファイルからエクスポートすることはできません。
// この制限の理由の1つは、ページがレンダリングされる前に
// Reactが必要なすべてのデータを持っている必要があることです。
//
// interface Props {
//   tags: Tag[];
// }

// export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
//   const data = await client.get({ endpoint: "tag" });
//   const tags: Tag[] = data.contents;

//   return {
//     props: {
//       tags: tags,
//     },
//   };
// };

const SideBar = () => {
  return (
    <>
      <div className={style.sidebar}>
        <div className={style.s_container}>
          <div className={style.s_header}>プロフィール</div>
          <div className={style.s_content}>
            <Profile />
          </div>
        </div>
        <div className={style.s_container}>
          <div className={style.s_header}>タグ</div>
          <div className={style.s_content}>
            {/* {tags && (
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
            )} */}
          </div>
        </div>
        <div className={style.s_container}>
          <div className={style.s_header}>profile</div>
          <div className={style.s_content}>kitamago</div>
        </div>
      </div>
    </>
  );
};

export default SideBar;

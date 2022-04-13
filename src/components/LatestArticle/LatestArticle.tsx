import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Blog } from "../../types/blog";
import style from "./LatestArticle.module.scss";

interface Props {
  blogs: Blog[];
}

const LatestArticle: React.VFC<Props> = ({ blogs }) => {
  return (
    <>
      <div className={style.content}>
        <h1>新着記事</h1>
        {blogs && (
          <ul>
            {blogs.map((blog) => (
              <>
                <li key={blog.id}>
                  <Link href={`/blog/${blog.id}`}>
                    <a>
                      <Image
                        className={style.carouselItemImage}
                        src={blog.image.url}
                        width="580px"
                        height="360px"
                      />
                      <h2>{blog.title}</h2>
                      <p>{blog.publishedAt.slice(0, 10)}</p>
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

export default LatestArticle;

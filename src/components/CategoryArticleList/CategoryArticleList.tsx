import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Blog } from "../../types/blog";
import style from "./CategoryArticleList.module.scss";

interface Props {
  id: string;
  blogs: Blog[];
}

const CategoryArticleList: React.VFC<Props> = ({ id, blogs }) => {
  return (
    <>
      <div className={style.content}>
        <h1>{id}</h1>
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

export default CategoryArticleList;

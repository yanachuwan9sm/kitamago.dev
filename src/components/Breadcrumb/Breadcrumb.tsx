import Link from "next/link";
import { useRouter } from "next/router";
import style from "../Breadcrumb/Breadcrumb.module.scss";

interface Props {
  blogPageInfo: {
    categoryId: string;
    categoryName: string;
    blogTitle: string;
  };
  pageTitle: string;
}

const Breadcrumb: React.FC<Props> = ({ blogPageInfo, pageTitle }) => {
  const router = useRouter();
  const path = router.asPath;

  // 記事ページかどうかをパスより判定する
  const isBlogPage = /\/blog\/.+$/.test(path);

  return (
    <>
      <ul className={style.breadcrumb}>
        {/* サイト名 */}
        <li className={style.crumbitem}>
          <Link href="/">
            <a>kitamago-log</a>
          </Link>
        </li>
        {/* 記事ページ */}
        {isBlogPage && (
          <>
            {/* カテゴリー */}
            <li className={style.crumbitem}>
              <Link
                href="/category/[id]"
                as={`/category/${blogPageInfo?.categoryName}`}
              >
                <a>{blogPageInfo?.categoryName}</a>
              </Link>
            </li>
            {/* 記事タイトル */}
            <li className={style.crumbitem}>{blogPageInfo?.blogTitle}</li>
          </>
        )}
        {/* 記事ページ以外(カテゴリー考慮なし) */}
        {!pageTitle && <li className={style.crumbitem}>{pageTitle}</li>}
      </ul>
    </>
  );
};

export default Breadcrumb;

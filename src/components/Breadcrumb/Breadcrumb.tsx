import Link from 'next/link';
import { useRouter } from 'next/router';

import { FaHome } from 'react-icons/fa';

import style from '../Breadcrumb/Breadcrumb.module.scss';

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
      <div className={style.container}>
        <ul className={style.breadcrumb}>
          {/* サイト名 */}
          <li className={style.crumbitem}>
            <Link href="/">
              <a>
                <FaHome />
                ホーム
              </a>
            </Link>
          </li>
          {/* 記事ページ */}
          {isBlogPage && (
            <>
              {/* カテゴリー */}
              <li className={style.crumbitem}>
                <Link href="/category/[id]" as={`/category/${blogPageInfo?.categoryName}`}>
                  <a>{blogPageInfo?.categoryName}</a>
                </Link>
              </li>
              {/* 記事タイトル */}
              <li className={style.crumbitem}>{blogPageInfo?.blogTitle}</li>
            </>
          )}
          {/* 記事ページ以外(カテゴリー考慮なし) */}
          {!isBlogPage && <li className={style.crumbitem}>{pageTitle}</li>}
        </ul>
      </div>
    </>
  );
};

export default Breadcrumb;

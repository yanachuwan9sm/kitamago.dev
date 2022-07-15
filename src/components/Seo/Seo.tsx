import Head from 'next/head';
import type { VFC } from 'react';

interface MetaType {
  pageTitle?: string;
  pageDescription?: string;
  pagePath?: string;
  pageImg?: string;
  pageImgWidth?: number;
  pageImgHeight?: number;
}

const Seo: VFC<MetaType> = ({ pageTitle, pageDescription, pagePath, pageImg, pageImgWidth, pageImgHeight }) => {
  const defaultTitle = 'kitamago-log';
  const defaultDescription = 'ビギナーフロントエンドエンジニアの技術ブログ';

  const title = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle;
  const description = pageDescription ? pageDescription : defaultDescription;
  const url = pagePath;
  const imgUrl = pageImg;
  const imgWidth = pageImgWidth ? pageImgWidth : 680;
  const imgHeight = pageImgHeight ? pageImgHeight : 510;

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={description} />
      {/* OGP設定 */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content={String(imgWidth)} />
      <meta property="og:image:height" content={String(imgHeight)} />
      {/* Twitterカード設定 */}
      <meta name="twitter:image" content={imgUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      {/* Google Search Console */}
      <meta name="google-site-verification" content="55w4tS9g30GLrsSYulK6rm-SKy61iRBFhGhOyfG0lEE" />
      <link rel="icon" href="/favicon.ico" />
      {/* Font Awesome */}
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"></link>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap"
        rel="stylesheet"
      ></link>
      <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap" rel="stylesheet"></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Anton&family=Ubuntu:wght@500&display=swap"
        rel="stylesheet"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Secular+One&family=Ubuntu:wght@500&display=swap"
        rel="stylesheet"
      ></link>
    </Head>
  );
};

export default Seo;

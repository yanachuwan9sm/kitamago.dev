// import { MicroCMSListContent } from "microcms-js-sdk";

// 記事に関する型定義
export type Blog = {
  id: string;
  contents: (
    | RichEditorContent
    | ArticleLinkContent
    | TableContent
    | ArticleImgContent
  )[];
  title: string;
  tags: Tag[];
  image: {
    url: string;
    height: number;
    width: number;
  };
  description: string;
  toc_visible: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

// カテゴリーに関する型定義
export type Tag = {
  id: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

// カスタムフィールド リッチエディターに関する型定義
export type RichEditorContent = {
  fieldId: "richEditor";
  body: string;
};

// カスタムフィールド 投稿済み記事ページのリンク　に関する型定義
export type ArticleLinkContent = {
  fieldId: "articleLink";
  article: Blog;
};

// カスタムフィールド table に関する型定義
export type TableContent = {
  fieldId: "table";
  html: string;
};

// カスタムフィールド article_image に関する型定義
export type ArticleImgContent = {
  fieldId: "article_image";
  articleimg: {
    url: string;
    height: number;
    width: number;
  };
};

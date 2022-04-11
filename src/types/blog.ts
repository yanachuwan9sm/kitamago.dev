// import { MicroCMSListContent } from "microcms-js-sdk";

// 記事に関する型定義
export type Blog = {
  id: string;
  //contents: Article | null;
  contents: (RichEditorContent | ArticleLinkContent)[];
  title: string;
  tags: Tag[];
  image: {
    url: string;
    height: number;
    width: number;
  };
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

// 記事のボディコンテンツに関する型定義
// export type Article = {
//   contents: (RichEditorContent | ArticleLinkContent)[];
// } & MicroCMSListContent;

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

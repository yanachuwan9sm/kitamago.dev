import type { MicroCMSImage } from 'microcms-js-sdk';

// カスタムフィールド article_image に関する型定義
export type ArticleImgContent = {
  fieldId: 'article_image';
  articleimg: MicroCMSImage;
};

import type { ArticleImgContent } from './ArticleImgContent';
import type { ArticleLinkContent } from './ArticleLinkContent';
import type { RichEditorContent } from './RichEditorContent';
import type { TableContent } from './TableContent';
import type { Tag } from './tag';
import type { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk';

// 記事に関する型定義
export type Blog = {
  contents: contentBody[];
  title: string;
  tags: (Tag & MicroCMSListContent)[];
  image: MicroCMSImage;
  description: string;
  toc_visible: boolean;
};

// 記事の内容部分(Body)に関する型定義
export type contentBody = RichEditorContent | ArticleLinkContent | TableContent | ArticleImgContent;

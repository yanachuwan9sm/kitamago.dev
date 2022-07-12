import type { Blog } from './blog';
import type { MicroCMSListContent } from 'microcms-js-sdk';

export type ArticleLinkContent = {
  fieldId: 'articleLink';
  article: Blog & MicroCMSListContent;
};

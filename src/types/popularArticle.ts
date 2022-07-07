import type { Blog } from './blog';
import type { MicroCMSListContent } from 'microcms-js-sdk';

export type popularArticle = {
  articles: (Blog & MicroCMSListContent)[];
};

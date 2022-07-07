import { client } from './client';

import type { Blog } from '../types/blog';
import type { Tag } from '../types/tag';
import type { MicroCMSQueries } from 'microcms-js-sdk';

// 記事全体を取得する
export const getBlogs = (queries?: MicroCMSQueries) => client.getList<Blog>({ endpoint: 'blog', queries });

// 記事詳細を取得する
export const getBlogDetail = (queries?: MicroCMSQueries) => (contentId: string) =>
  client.getListDetail<Blog>({ endpoint: 'blog', contentId, queries });

// カテゴリー情報を取得する
export const getCategories = (queries?: MicroCMSQueries) => client.getList<Tag>({ endpoint: 'tag', queries });

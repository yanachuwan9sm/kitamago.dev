import { client } from './client';

import type { Blog } from '../types/blog';
import type { Tag } from '../types/tag';
import type { MicroCMSListContent, MicroCMSListResponse, MicroCMSQueries } from 'microcms-js-sdk';

// 記事全体を取得する
export const getBlogs = (queries?: MicroCMSQueries) => client.getList<Blog>({ endpoint: 'blog', queries });

// 記事詳細を取得する
export const getBlogDetail = (contentId: string, queries?: MicroCMSQueries) =>
  client.getListDetail<Blog>({ endpoint: 'blog', contentId, queries });

// カテゴリー情報を取得する
export const getCategories = (queries?: MicroCMSQueries) => client.getList<Tag>({ endpoint: 'tag', queries });

// microCMSコンテンツを取得した際の返り値を定義
export type getContentsResponse = {
  contents: MicroCMSListResponse<Blog>['contents']; // 記事のデータ一覧
  tags: MicroCMSListResponse<Tag>['contents']; // タグのデータ一覧
  currentPage: number; //現在のページ数
  pager: number[]; //ページネーション
  selectedTag?: (Tag & MicroCMSListContent) | null; //選択されているタグ
};

// 1ページに表示する記事の最大数
export const pageDisplayLimit = 6;

export async function getGlobalContents(currentPage = 1, tagId?: string): Promise<getContentsResponse> {
  const filters = tagId === undefined ? '' : `tag[equals]${tagId}`;

  //次ページで表示する記事を取得
  const offset = (currentPage - 1) * pageDisplayLimit;

  // 記事情報及びタグ情報を取得する
  const [{ contents, totalCount }, { contents: tags }] = await Promise.all([
    getBlogs({
      limit: pageDisplayLimit,
      filters: filters,
      offset: offset,
    }),
    getCategories({ orders: '-publishedAt' }),
  ]);

  // ページ数を記事のデータ数から計算する
  const pager = [...Array(Math.ceil(totalCount / pageDisplayLimit)).keys()];

  const selectedTag = tags.find((content) => content.id === tagId) || null;

  return { contents, tags, currentPage, pager, selectedTag };
}

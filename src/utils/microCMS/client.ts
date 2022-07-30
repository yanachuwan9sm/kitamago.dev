import { createClient } from 'microcms-js-sdk';

const serviceDomain = process.env.SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (serviceDomain === undefined) throw Error('.envファイルに`SERVICE_DOMAIN`が設定されていません');
if (apiKey === undefined) throw Error('.envファイルに`MICROCMS_API_KEY`が設定されていません');

export const client = createClient({
  serviceDomain,
  apiKey,
});

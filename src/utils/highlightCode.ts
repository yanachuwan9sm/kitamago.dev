import cheerio from 'cheerio';

import hljs from './highlight';

export const highlightCode = (body: string) => {
  const $ = cheerio.load(body);
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });

  return $.html();
};

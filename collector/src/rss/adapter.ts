import Parser from 'rss-parser';
import { RSS_URL_SVT } from '../static/url';
import { type NewsItem, tryCatch, log } from 'common';

const parser = new Parser();

export async function getNewsRss(): Promise<NewsItem[]> {
  const [feed, error] = await tryCatch(parser.parseURL(RSS_URL_SVT));
  if (error) {
    log.error(`Failed to fetch RSS feed: ${error.message}`);
    throw error;
  }
  const newsRss = parseNewsRss(feed);
  return newsRss;
}

type Feed = Parser.Output<{
  [key: string]: unknown;
}>;

export function parseNewsRss(feed: Feed): NewsItem[] {
  return feed.items.reduce((acc, item) => {
    if (item.title && item.link && item.pubDate && item.content) {
      acc.push({
        title: item.title,
        link: item.link,
        pubDate: rssDateToIsoString(item.pubDate),
        content: item.content,
      });
    } else {
      log.warn(`Skipping item due to missing fields: ${JSON.stringify(item)}`);
    }
    return acc;
  }, [] as NewsItem[]);
}

export function rssDateToIsoString(rssDate: string): string {
  const date = new Date(rssDate);
  return date.toISOString();
}

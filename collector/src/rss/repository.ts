import { log, tryCatch, type NewsItem } from 'common';
import { dbClient } from 'common/database';

export async function setNewsItems(newsItems: NewsItem[]): Promise<void> {
  const [result, error] = await tryCatch(
    dbClient.news.createMany({ data: newsItems, skipDuplicates: true })
  );

  if (error) {
    throw error;
  }

  log.info(`Stored ${result.count} new news items.`);
}

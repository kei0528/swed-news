import { log, tryCatch } from 'common';
import { getNewsRss } from './adapter';
import { setNewsItems } from './repository';

class RssService {
  static async getAndStoreNews() {
    const [news, getNewsError] = await tryCatch(getNewsRss());
    if (getNewsError) {
      log.error(`Error fetching news RSS: ${getNewsError.message}`);
      return;
    }

    const [, setNewsError] = await tryCatch(setNewsItems(news));
    if (setNewsError) {
      log.error(`Error storing news items: ${setNewsError.message}`);
      return;
    }

    log.info('Successfully fetched and stored news items from RSS feed.');
  }
}

export default RssService;

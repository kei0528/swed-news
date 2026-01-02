import { getNewsRss } from './adapter';

class RssService {
  static async getAndStoreNews() {
    await getNewsRss();
  }
}

export default RssService;

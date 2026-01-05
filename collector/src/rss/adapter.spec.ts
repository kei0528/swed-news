import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import Parser from 'rss-parser';
import { getNewsRss, parseNewsRss, rssDateToIsoString } from './adapter';
import { log } from 'common';

jest.mock('common', () => ({
  log: {
    error: jest.fn(),
    warn: jest.fn(),
  },
  tryCatch: jest.fn(),
}));

jest.mock('rss-parser');

const mockCommon = jest.requireMock('common') as {
  log: { error: jest.Mock; warn: jest.Mock };
  tryCatch: jest.Mock<() => Promise<[unknown, null] | [null, Error]>>;
};
const mockTryCatch = mockCommon.tryCatch;

describe('adapter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rssDateToIsoString', () => {
    it('should convert RSS date to ISO string', () => {
      const rssDate = 'Mon, 01 Jan 2024 12:00:00 GMT';
      const result = rssDateToIsoString(rssDate);

      expect(result).toBe('2024-01-01T12:00:00.000Z');
    });

    it('should handle different date formats', () => {
      const rssDate = '2024-01-15T10:30:00Z';
      const result = rssDateToIsoString(rssDate);

      expect(result).toBe('2024-01-15T10:30:00.000Z');
    });
  });

  describe('parseNewsRss', () => {
    it('should parse valid feed items into NewsItem array', () => {
      const feed = {
        items: [
          {
            title: 'Test Article 1',
            link: 'https://example.com/article1',
            pubDate: 'Mon, 01 Jan 2024 12:00:00 GMT',
            content: 'Content for article 1',
          },
          {
            title: 'Test Article 2',
            link: 'https://example.com/article2',
            pubDate: 'Tue, 02 Jan 2024 14:00:00 GMT',
            content: 'Content for article 2',
          },
        ],
      } as Parser.Output<{ [key: string]: unknown }>;

      const result = parseNewsRss(feed);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        title: 'Test Article 1',
        link: 'https://example.com/article1',
        pubDate: '2024-01-01T12:00:00.000Z',
        content: 'Content for article 1',
      });
      expect(result[1]).toEqual({
        title: 'Test Article 2',
        link: 'https://example.com/article2',
        pubDate: '2024-01-02T14:00:00.000Z',
        content: 'Content for article 2',
      });
    });

    it('should skip items with missing required fields', () => {
      const feed = {
        items: [
          {
            title: 'Valid Article',
            link: 'https://example.com/valid',
            pubDate: 'Mon, 01 Jan 2024 12:00:00 GMT',
            content: 'Valid content',
          },
          {
            title: 'Missing link',
            pubDate: 'Mon, 01 Jan 2024 12:00:00 GMT',
            content: 'Content without link',
          },
          {
            link: 'https://example.com/missing-title',
            pubDate: 'Mon, 01 Jan 2024 12:00:00 GMT',
            content: 'Content without title',
          },
        ],
      } as Parser.Output<{ [key: string]: unknown }>;

      const result = parseNewsRss(feed);

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Valid Article');
      expect(log.warn).toHaveBeenCalledTimes(2);
    });

    it('should log warning for skipped items', () => {
      const invalidItem = {
        title: 'Incomplete Article',
        link: 'https://example.com/incomplete',
      };
      const feed = {
        items: [invalidItem],
      } as Parser.Output<{ [key: string]: unknown }>;

      parseNewsRss(feed);

      expect(log.warn).toHaveBeenCalledWith(
        `Skipping item due to missing fields: ${JSON.stringify(invalidItem)}`
      );
    });

    it('should return empty array for feed with no items', () => {
      const feed = {
        items: [],
      } as Parser.Output<{ [key: string]: unknown }>;

      const result = parseNewsRss(feed);

      expect(result).toEqual([]);
    });

    it('should handle feed with all invalid items', () => {
      const feed = {
        items: [
          { title: 'No link' },
          { link: 'https://example.com' },
          { pubDate: 'Mon, 01 Jan 2024 12:00:00 GMT' },
        ],
      } as Parser.Output<{ [key: string]: unknown }>;

      const result = parseNewsRss(feed);

      expect(result).toEqual([]);
      expect(log.warn).toHaveBeenCalledTimes(3);
    });
  });

  describe('getNewsRss', () => {
    it('should successfully fetch and parse RSS feed', async () => {
      const mockFeed = {
        items: [
          {
            title: 'News Article',
            link: 'https://example.com/news',
            pubDate: 'Mon, 01 Jan 2024 12:00:00 GMT',
            content: 'News content',
          },
        ],
      } as Parser.Output<{ [key: string]: unknown }>;

      mockTryCatch.mockResolvedValue([mockFeed, null]);

      const result = await getNewsRss();

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('News Article');
      expect(mockTryCatch).toHaveBeenCalled();
    });

    it('throw when RSS fetch fails', async () => {
      const mockError = new Error('Network error');
      mockTryCatch.mockResolvedValue([null, mockError]);

      await expect(getNewsRss()).rejects.toThrow('Network error');
    });
  });
});

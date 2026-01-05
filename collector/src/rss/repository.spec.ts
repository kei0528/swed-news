import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { type NewsItem } from 'common';
import { mockDbClient } from '../tests/mocks/prisma';
import { setNewsItems } from './repository';

jest.mock('common', () => ({
  log: {
    info: jest.fn(),
  },
  tryCatch: jest.fn(),
}));

jest.mock('common/database', () => ({
  dbClient: mockDbClient,
}));

const mockCommon = jest.requireMock('common') as {
  log: { info: jest.Mock };
  tryCatch: jest.Mock<() => Promise<[unknown, null] | [null, Error]>>;
};

const mockTryCatch = mockCommon.tryCatch;

describe('repository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setNewsItems', () => {
    const sampleNews: NewsItem[] = [
      {
        title: 'Title 1',
        link: 'https://example.com/1',
        pubDate: '2024-01-01T00:00:00.000Z',
        content: 'Content 1',
      },
      {
        title: 'Title 2',
        link: 'https://example.com/2',
        pubDate: '2024-01-02T00:00:00.000Z',
        content: 'Content 2',
      },
    ];

    it('stores news items and logs the inserted count', async () => {
      const createManyPromise = Promise.resolve({ count: sampleNews.length });
      mockDbClient.news.createMany.mockReturnValue(createManyPromise);
      mockTryCatch.mockResolvedValue([{ count: sampleNews.length }, null]);

      await setNewsItems(sampleNews);

      expect(mockDbClient.news.createMany).toHaveBeenCalledWith({
        data: sampleNews,
        skipDuplicates: true,
      });
      expect(mockTryCatch).toHaveBeenCalledWith(createManyPromise);
      expect(mockCommon.log.info).toHaveBeenCalledWith(
        `Stored ${sampleNews.length} new news items.`
      );
    });

    it('throws when createMany returns an error', async () => {
      const createManyPromise = Promise.resolve({ count: 0 });
      const dbError = new Error('DB insert failed');
      mockDbClient.news.createMany.mockReturnValue(createManyPromise);
      mockTryCatch.mockResolvedValue([null, dbError]);

      await expect(setNewsItems(sampleNews)).rejects.toThrow('DB insert failed');

      expect(mockDbClient.news.createMany).toHaveBeenCalledWith({
        data: sampleNews,
        skipDuplicates: true,
      });
      expect(mockCommon.log.info).not.toHaveBeenCalled();
    });
  });
});

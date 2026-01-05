import { jest } from '@jest/globals';

// Singleton Prisma client mock used across tests
export const mockDbClient = {
  news: {
    createMany: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

export function resetMockDbClient() {
  Object.values(mockDbClient.news).forEach((fn) => fn.mockReset());
}

import { describe, it, expect } from '@jest/globals';
import { tryCatch } from './tryCatch';

describe('tryCatch', () => {
  it('returns result and null error when promise resolves', async () => {
    const promise = Promise.resolve('ok');

    const [result, error] = await tryCatch(promise);

    expect(result).toBe('ok');
    expect(error).toBeNull();
  });

  it('returns null result and error when promise rejects', async () => {
    const rejection = new Error('boom');
    const promise = Promise.reject(rejection);

    const [result, error] = await tryCatch(promise);

    expect(result).toBeNull();
    expect(error).toBe(rejection);
  });
});

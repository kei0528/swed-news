import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { log } from './log';

describe('log', () => {
  let consoleLogSpy: jest.SpiedFunction<typeof console.log>;
  let consoleWarnSpy: jest.SpiedFunction<typeof console.warn>;
  let consoleErrorSpy: jest.SpiedFunction<typeof console.error>;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  describe('info', () => {
    it('should call console.log with formatted info message', () => {
      const message = 'Test info message';
      log.info(message);

      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledWith(`💁‍♂️ [INFO]: ${message}`);
    });

    it('should handle empty message', () => {
      log.info('');

      expect(consoleLogSpy).toHaveBeenCalledWith('💁‍♂️ [INFO]: ');
    });
  });

  describe('warn', () => {
    it('should call console.warn with formatted warning message', () => {
      const message = 'Test warning message';
      log.warn(message);

      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
      expect(consoleWarnSpy).toHaveBeenCalledWith(`⚠️ [WARN]: ${message}`);
    });

    it('should handle empty message', () => {
      log.warn('');

      expect(consoleWarnSpy).toHaveBeenCalledWith('⚠️ [WARN]: ');
    });
  });

  describe('error', () => {
    it('should call console.error with formatted error message', () => {
      const message = 'Test error message';
      log.error(message);

      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(`🚨 [ERROR]: ${message}`);
    });

    it('should handle empty message', () => {
      log.error('');

      expect(consoleErrorSpy).toHaveBeenCalledWith('🚨 [ERROR]: ');
    });
  });
});

const config = require('./jest.config.js');

// jest.config.test.js - Unit tests for jest.config.js


describe('jest.config.js', () => {
  it('should export an object', () => {
    expect(typeof config).toBe('object');
    expect(config).not.toBeNull();
  });

  it('should define two projects (server and client)', () => {
    expect(Array.isArray(config.projects)).toBe(true);
    expect(config.projects.length).toBe(2);

    const [server, client] = config.projects;

    expect(server.displayName).toBe('server');
    expect(server.testEnvironment).toBe('node');
    expect(Array.isArray(server.testMatch)).toBe(true);
    expect(server.testMatch[0]).toMatch(/server\/tests\/\*\*\/\*\.test\.js/);
    expect(Array.isArray(server.moduleFileExtensions)).toBe(true);
    expect(server.coverageDirectory).toMatch(/coverage\/server/);
    expect(Array.isArray(server.collectCoverageFrom)).toBe(true);

    expect(client.displayName).toBe('client');
    expect(client.testEnvironment).toBe('jsdom');
    expect(Array.isArray(client.testMatch)).toBe(true);
    expect(client.testMatch[0]).toMatch(/client\/src\/\*\*\/\*\.test\.\{js,jsx\}/);
    expect(Array.isArray(client.moduleFileExtensions)).toBe(true);
    expect(client.coverageDirectory).toMatch(/coverage\/client/);
    expect(Array.isArray(client.collectCoverageFrom)).toBe(true);
    expect(typeof client.moduleNameMapper).toBe('object');
    expect(typeof client.transform).toBe('object');
  });

  it('should have correct global config options', () => {
    expect(config.verbose).toBe(true);
    expect(config.collectCoverage).toBe(true);
    expect(Array.isArray(config.coverageReporters)).toBe(true);
    expect(config.coverageReporters).toEqual(
      expect.arrayContaining(['text', 'lcov', 'clover', 'html'])
    );
    expect(typeof config.coverageThreshold).toBe('object');
    expect(config.coverageThreshold.global).toMatchObject({
      statements: expect.any(Number),
      branches: expect.any(Number),
      functions: expect.any(Number),
      lines: expect.any(Number),
    });
    expect(typeof config.testTimeout).toBe('number');
    expect(config.testTimeout).toBeGreaterThanOrEqual(1000);
  });
});
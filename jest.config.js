const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  modulePaths: ['<rootDir>/src'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
};

module.exports = createJestConfig(customJestConfig);

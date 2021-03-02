module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: './(src|tests)/.*\\.(spec|test|steps)?\\.(ts|js)$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testEnvironment: 'node',
  collectCoverage: false,
  coverageReporters: ["json", "lcov", "text", "clover"] // "text-summary"
};

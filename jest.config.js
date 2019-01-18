module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  setupTestFrameworkScriptFile: './src/test/setup.js',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js?$',
  moduleFileExtensions: ['js', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {},
};

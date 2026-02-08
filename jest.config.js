module.exports = {
  testEnvironment: 'node',
  verbose: true,
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  setupFilesAfterEnv: [],
  clearMocks: true,
};

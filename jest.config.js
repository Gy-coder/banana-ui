/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};

module.exports = config;

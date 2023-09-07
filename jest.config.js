/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('jest').Config} */
require('dotenv').config({ path: '.env' });

const config = {
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  roots: ["<rootDir>/src/", "<rootDir>/tests/"]
};

module.exports = config;

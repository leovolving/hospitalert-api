const env = process.env.NODE_ENV || 'development';

const DATABASE_URL = (
  process.env.DATABASE_URL ||
 global.DATABASE_URL ||
 'postgres://localhost/dev-hospitalert-api'
);

const TEST_DATABASE_URL = (
  process.env.TEST_DATABASE_URL ||
  global.TEST_DATABASE_URL ||
  'postgres://localhost/test-hospitalert-api'
);

module.exports = {
  APP_ID: '126180944566416',
  APP_SECRET: '0814de4bafcdf036efa68e3165e34ffe',
  CLIENT_URL: 'http://localhost:3000',
  PORT: process.env.PORT || 8080,
  DATABASE_URL: env === 'test' ? TEST_DATABASE_URL : DATABASE_URL,
  SEQUELIZE_OPTIONS: {logging: env === 'test' ? false : console.log}
};
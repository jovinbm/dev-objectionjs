const { knex } = require('../lib/knex');

beforeAll(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
});

afterAll(async () => {
  await knex.destroy();
});

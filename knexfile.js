const path = require('path');
const { rootConfig } = require('./src/config');

module.exports = {
  development: {
    ...rootConfig.db,
    migrations: {
      directory: path.join(__dirname, 'src/db/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'src/db/seeds'),
    },
  },
};

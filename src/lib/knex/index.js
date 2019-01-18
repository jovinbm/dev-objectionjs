const Knex = require('knex');
const { Model } = require('objection');
const { rootConfig } = require('../../config');

const knex = Knex({
  ...rootConfig.db,
});

Model.knex(knex);

exports.knex = knex;

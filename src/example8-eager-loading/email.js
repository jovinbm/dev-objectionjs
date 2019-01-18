const { knex } = require('../lib/knex');

exports.ensureNoUserWithSameEmail = async newEmail => {
  const userWithSameEmailExists = await knex('user')
    .select('id')
    .where('email', newEmail)
    .limit(1)
    .then(results => results.length > 0);

  if (userWithSameEmailExists) {
    throw new Error('Email not available');
  }
};

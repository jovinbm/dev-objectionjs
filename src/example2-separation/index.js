const { knex } = require('../lib/knex');
const { ensureNoUserWithSameEmail } = require('./email');
const { hashPassword } = require('./passwords');

exports.addUserWithPets = async (newUser, pets) => {
  // validate that there is no user with same email
  await ensureNoUserWithSameEmail(newUser.email);

  // hash the password
  const password = await hashPassword(newUser.password);

  // add password hash to object
  newUser.password = password;

  // insert user
  await knex('user').insert(newUser);

  // insert pets
  for (const pet of pets) {
    pet.user_uuid = newUser.uuid;
    await knex('pet').insert(pet);
  }
};

const bcrypt = require('bcrypt-nodejs');
const { knex } = require('../lib/knex');

exports.addUserWithPets = async (newUser, pets) => {
  // validate that there is no user with same email
  const userWithSameEmailExists = await knex('user')
    .select('id')
    .where('email', newUser.email)
    .limit(1)
    .then(results => results.length > 0);

  if (userWithSameEmailExists) {
    throw new Error('Email not available');
  }

  // hash the password
  const password = await new Promise((resolve, reject) => {
    bcrypt.hash(newUser.password, null, null, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

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

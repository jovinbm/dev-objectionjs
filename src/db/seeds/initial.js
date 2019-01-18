const casual = require('casual');

const password = '$2a$10$0etyTzUBIGQaskvaSQnT5usa8SJ5fRf12tiFwVTiBm.Usmm0kIWqa'; // password is test

const users = [];
const pets = [];
const petTypes = ['dog', 'cat', 'lizard'];

new Array(10).fill(0).map(() => {
  users.push({
    uuid: casual.uuid,
    first_name: casual.first_name,
    last_name: casual.last_name,
    email: casual.email,
    bio: casual.text,
    password,
  });
  return;
});

users.map(user => {
  petTypes.map(petType => {
    const hasPet = casual.random_element([true, true, false]);
    if (hasPet) {
      pets.push({
        uuid: casual.uuid,
        user_uuid: user.uuid,
        type: petType,
        name: casual.first_name,
      });
    }
    return;
  });
  return;
});

exports.seed = async knex => {
  await knex('user').del();
  await knex('pet').del();

  await knex('user').insert(users);
  await knex('pet').insert(pets);
};

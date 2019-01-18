const casual = require('casual');
const { knex } = require('./lib/knex');

const defaultPassword = 'test';

const getNewUserObject = () => {
  return {
    uuid: casual.uuid,
    first_name: casual.first_name,
    last_name: casual.last_name,
    email: casual.email,
    bio: casual.text,
    // NOTE: password, not password hash
    password: defaultPassword,
  };
};

const getNewPetObject = () => {
  return {
    uuid: casual.uuid,
    type: casual.random_element(['dog', 'cat', 'lizard']),
    name: casual.first_name,
  };
};

const tests = [
  { name: 'example-1', fn: require('./example1-knex').addUserWithPets },
  { name: 'example-2', fn: require('./example2-separation').addUserWithPets },
  { name: 'example-3', fn: require('./example3-models').addUserWithPets },
  {
    name: 'example-4',
    fn: require('./example4-custom-immediate-properties').addUserWithPets,
  },
  {
    name: 'example-5',
    fn: require('./example5-custom-async-properties').addUserWithPets,
  },
  { name: 'example-6', fn: require('./example6-relations').addUserWithPets },
  {
    name: 'example-7',
    fn: require('./example7-insert-graph').addUserWithPets,
  },
  {
    name: 'example-10',
    fn: require('./example10-0-advanced-processing').addUserWithPets,
  },
];

describe('adds new user and two pets', async () => {
  tests.map(test => {
    it(`${test.name}`, async () => {
      try {
        // create a new user object
        const newUser = getNewUserObject();
        const [pet1, pet2] = [
          getNewPetObject(newUser.uuid),
          getNewPetObject(newUser.uuid),
        ];

        await test.fn(newUser, [pet1, pet2]);

        // validate
        const dbUser = await knex('user')
          .where('uuid', newUser.uuid)
          .then(users => users[0]);
        const pets = await knex('pet')
          .select('uuid')
          .where('user_uuid', newUser.uuid);

        expect(dbUser).toBeDefined();
        expect(dbUser).toHaveProperty('uuid', newUser.uuid);
        expect(dbUser).toHaveProperty('first_name', newUser.first_name);
        expect(dbUser).toHaveProperty('last_name', newUser.last_name);
        expect(dbUser).toHaveProperty('email', newUser.email);
        expect(dbUser).toHaveProperty('bio', newUser.bio);

        expect(pets).toHaveLength(2);
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });
  });
});

describe('hashes passwords', async () => {
  tests.map(test => {
    it(`${test.name}`, async () => {
      try {
        const newUser = getNewUserObject();

        await test.fn(newUser, []);

        // validate
        const dbUser = await knex('user')
          .where('uuid', newUser.uuid)
          .then(users => users[0]);

        expect(dbUser).toBeDefined();
        expect(dbUser.password.length).toBeGreaterThan(0);
        expect(dbUser.password).not.toEqual(defaultPassword);
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });
  });
});

describe('does not allow duplicate emails', async () => {
  tests.map(test => {
    it(`${test.name}`, async () => {
      try {
        // create a new user object
        const newUser = getNewUserObject();
        const existingUser = await knex('user')
          .select(['email'])
          .limit(1)
          .then(users => users[0]);

        newUser.email = existingUser.email;
        expect(test.fn(newUser, [])).rejects.toThrow(/not available/i);

        // validate
        const dbUser = await knex('user')
          .select(['uuid', 'first_name', 'last_name'])
          .where('uuid', newUser.uuid)
          .then(users => users[0]);

        expect(dbUser).not.toBeDefined();
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });
  });
});

require('../lib/knex');
const { User } = require('./models/User');

async function execute() {
  // related query
  const user = await User.query()
    .limit(1)
    .then(users => users[0]);
  const pets = await user.$relatedQuery('pets');
  const dogPets = await user.$relatedQuery('pets').where('type', 'dog');

  // eager loading
  const users1 = await User.query()
    .limit(10)
    .eager('pets');

  const users2 = await User.query()
    .limit(10)
    .eager({ pets: true });

  const users3 = await User.query()
    .limit(10)
    .eager('pets(onlyDogs)', {
      onlyDogs: builder => {
        builder.where('type', 'dog');
      },
    });
  // more info: http://vincit.github.io/objection.js/#eager-loading

  console.log([pets, dogPets, users1, users2, users3]);
}

execute().catch(console.error);

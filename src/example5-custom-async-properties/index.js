const { Pet } = require('./models/Pet');
const { User } = require('./models/User');
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
  // TODO: debug user
  const user = await User.query().insert(newUser);

  // insert pets
  for (const pet of pets) {
    pet.user_uuid = newUser.uuid;
    await Pet.query().insert(pet);
  }

  // TODO: userPets
  const userPets = await user.getPets();

  console.log(userPets && '');
};

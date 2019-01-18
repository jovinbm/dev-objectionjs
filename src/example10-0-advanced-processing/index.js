const { User } = require('./models/User');

exports.addUserWithPets = async (newUser, pets) => {
  // insert user
  const user = await User.query().insertGraph({
    ...newUser,
    pets,
  });

  // TODO: userPets
  const userPets = await user.getPets();

  console.log(userPets && '');
};

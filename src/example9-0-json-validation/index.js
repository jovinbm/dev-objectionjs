require('../lib/knex');
const { User } = require('./models/User');

async function execute() {
  try {
    await User.query().insert({
      first_name: '',
      last_name: '',
      email: '',
    });
  } catch (error) {
    console.log(error);
  }
}

execute().catch(console.error);

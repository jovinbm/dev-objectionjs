const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'user';
  }

  static get idColumn() {
    return 'uuid';
  }

  fullName() {
    // this is an instance of User. Already has first_name and last_name
    // no need to pass them as arguments
    return `${this.first_name} ${this.last_name}`;
  }

  getPets() {
    // this is an instance of User. Already has uuid
    // no need to pass uuid
    const { Pet } = require('./Pet');
    return Pet.query().where('user_uuid', this.uuid);
  }
}

exports.User = User;

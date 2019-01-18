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
}

exports.User = User;

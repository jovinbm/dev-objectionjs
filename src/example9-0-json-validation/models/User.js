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

  static get relationMappings() {
    const { Pet } = require('./Pet');
    return {
      pets: {
        relation: Model.HasManyRelation,
        modelClass: Pet,
        join: {
          from: 'user.uuid',
          to: 'pet.user_uuid',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['uuid', 'first_name', 'last_name', 'email', 'password', 'bio'],
      properties: {
        uuid: { type: 'string', minLength: 36, maxLength: 36 },
        first_name: { type: 'string', minLength: 1, maxLength: 255 },
        last_name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
        bio: { type: 'string', minLength: 1 },
      },
    };
  }
}

exports.User = User;

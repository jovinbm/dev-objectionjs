const { Model } = require('objection');
const { ensureNoUserWithSameEmail } = require('../email');
const { hashPassword } = require('../passwords');

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

  // http://vincit.github.io/objection.js/#_s_beforeinsert
  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);

    // validate email
    await ensureNoUserWithSameEmail(this.email);

    // hash password
    const passwordHash = await hashPassword(this.password);
    this.$set({
      password: passwordHash,
    });
  }

  // before update: http://vincit.github.io/objection.js/#_s_beforeupdate
}

exports.User = User;

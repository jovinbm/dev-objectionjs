const { Model } = require('objection');

class Pet extends Model {
  static get tableName() {
    return 'pet';
  }

  static get idColumn() {
    return 'uuid';
  }

  static get relationMappings() {
    const { User } = require('./User');
    return {
      owner: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: { from: 'pet.user_uuid', to: 'user.uuid' },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['uuid', 'user_uuid', 'name', 'type'],
      properties: {
        uuid: { type: 'string', minLength: 36, maxLength: 36 },
        user_uuid: { type: 'string', minLength: 36, maxLength: 36 },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        type: { enum: ['cat', 'dog', 'lizard'] },
      },
    };
  }
}

exports.Pet = Pet;

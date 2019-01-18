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
}

exports.Pet = Pet;

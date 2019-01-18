const { Model } = require('objection');

class Pet extends Model {
  static get tableName() {
    return 'pet';
  }

  static get idColumn() {
    return 'uuid';
  }
}

exports.Pet = Pet;



const Model = require('objection').Model;

class Account extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'account';
  }
}
module.exports = Account;
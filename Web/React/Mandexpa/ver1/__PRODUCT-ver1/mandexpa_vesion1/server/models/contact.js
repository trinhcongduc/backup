

const Model = require('objection').Model;

class Contact extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'contact';
  }
}
module.exports = Contact;
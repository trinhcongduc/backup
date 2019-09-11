
const Model = require('objection').Model;

class Country extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'country';
    }
}
module.exports = Country;
const Model = require('objection').Model;

class Property_match extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'property_match';
    }
}
module.exports = Property_match;
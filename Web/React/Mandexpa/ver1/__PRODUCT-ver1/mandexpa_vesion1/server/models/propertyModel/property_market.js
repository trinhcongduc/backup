const Model = require('objection').Model;

class Property_Market extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'property_marketing';

    }
}
module.exports = Property_Market;
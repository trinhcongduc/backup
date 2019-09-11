const Model = require('objection').Model;

class Property_Location extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'property_location';

    }
}
module.exports = Property_Location;
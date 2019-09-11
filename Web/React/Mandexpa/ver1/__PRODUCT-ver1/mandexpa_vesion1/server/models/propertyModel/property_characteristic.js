const Model = require('objection').Model;

class Property_Character extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'property_characteristic';
    }
}
module.exports = Property_Character;
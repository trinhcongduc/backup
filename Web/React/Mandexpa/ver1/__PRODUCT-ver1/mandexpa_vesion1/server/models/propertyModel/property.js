const Model = require('objection').Model;

class Property extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'property';
    }
}
module.exports = Property;
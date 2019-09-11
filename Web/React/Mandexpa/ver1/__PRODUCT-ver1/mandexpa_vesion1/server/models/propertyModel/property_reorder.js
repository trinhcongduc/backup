const Model = require('objection').Model;

class Property_ReOrder extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'property_reorder';

    }
}
module.exports = Property_ReOrder;
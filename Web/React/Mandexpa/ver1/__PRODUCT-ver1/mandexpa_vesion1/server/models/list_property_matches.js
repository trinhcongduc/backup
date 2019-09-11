const Model = require('objection').Model;

class List_property_matches extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'list_property_matches';
    }
}
module.exports = List_property_matches;
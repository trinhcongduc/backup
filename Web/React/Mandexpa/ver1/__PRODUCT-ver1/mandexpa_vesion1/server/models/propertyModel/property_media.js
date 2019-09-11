const Model = require('objection').Model;

class Property_Media extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'property_media';

    }
}
module.exports = Property_Media;
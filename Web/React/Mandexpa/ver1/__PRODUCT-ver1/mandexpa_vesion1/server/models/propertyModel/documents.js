const Model = require('objection').Model;

class Documents extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'documents';
    }
}
module.exports = Documents;
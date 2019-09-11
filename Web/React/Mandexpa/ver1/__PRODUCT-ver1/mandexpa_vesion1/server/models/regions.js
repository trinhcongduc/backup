
const Model = require('objection').Model;

class Regions extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'regions';
    }
}
module.exports = Regions;
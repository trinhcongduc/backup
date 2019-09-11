
const Model = require('objection').Model;

class City extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'city';
    }
}
module.exports = City;

const Model = require('objection').Model;

class Category extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'category';
    }
}
module.exports = Category;
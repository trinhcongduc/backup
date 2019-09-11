const Model = require('objection').Model;

class Agenda extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'agenda';
    }
}
module.exports = Agenda;
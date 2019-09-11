const Model  = require('objection').Model;

class Subscribers extends Model{
    static get tableName(){
        return 'subscribers';
    }
}
module.exports = Subscribers;
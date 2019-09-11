const Model = require('objection').Model;

class Subscriptions extends Model{
    static get tableName(){
        return 'subscriptions';
    }
}

module.exports = Subscriptions;
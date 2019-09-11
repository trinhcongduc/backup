
var Bcrypt = require('bcrypt-nodejs');
const Knex = require('knex');
const knexConfig = require('../knex');
const { Model } = require('objection');
var Account = require('../models/account');
const knexConection = Knex(knexConfig.development);
Model.knex(knexConection);

console.log('Generate Admin account');

var salt = Bcrypt.genSaltSync(10);

var data = 
     {   
        type: 'admin',
        firstname : 'Super',
        lastname : 'Admin',
        password: Bcrypt.hashSync('123@123a',salt),
        email: 'quan@joombooking.com',
        birthday: '1992-10-10',
        state:'1'
      };

Account.query().insert(data);

const seed = function () {
  return Account.query().del().then(() => {

    return Account.query().insert(data).then((result)=>{
      // console.log(result);

    })

  })
}
seed();


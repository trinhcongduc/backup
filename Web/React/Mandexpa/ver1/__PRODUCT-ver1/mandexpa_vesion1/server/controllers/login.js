
var Bcrypt = require('bcrypt-nodejs');
var Boom = require('boom');
var Account = require('../models/account');
const jwt=require('jsonwebtoken');
const Logger = require('../classes/logger');

exports.login = async(req, h) => {
    try{
            let account = await Account.query().findOne({email: req.payload.email}) .where('state',1);
            //console.log(account);
            if(!account){
                return Boom.badData('Invalid username');
            }
            if (!Bcrypt.compareSync(req.payload.password, account.password)) {
                return Boom.badData('Invalid password');
            }

            let rtoken =await jwt.sign({id:account.id,email:account.email},'sessionkey',{expiresIn: 60*60*24*30});

            const accountinfor = {
                ...account,
                token:rtoken
            };
        accountinfor.fullname = accountinfor.firstname+" "+accountinfor.lastname;
            delete accountinfor.password;
            if(!rtoken) return;
            return {accountinfor};
        }
    catch(err){
        return Boom.boomify(err, { statusCode: 422 });
    }
};
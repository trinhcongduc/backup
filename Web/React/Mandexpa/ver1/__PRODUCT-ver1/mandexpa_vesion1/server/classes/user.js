var method = User.prototype;
var Boom = require('boom');
var Bcrypt = require('bcrypt-nodejs');
var Account = require('../models/account');

function User(account) {
    this.data = account;
}

method.create = function(data){
    var Bcrypt = require('bcrypt');
    if(!$data.username){
        throw Boom.badData('Invalid username');
    }
    var accountData = {
		...data,
		password: Bcrypt.hashSync(data.password, 10),
		username: data.username,
	};
    return Account.query.insert(accountData);
}

// Create session for login
method.generate_session = function() {
    var Session = require('../models/session');
    //luu session
    //clear expired session
    if(!this.data.id){
        throw Boom.unauthorized('Account not found');
    }

    //session_model.remove({expired:{$lte: (new Date()).toISOString()}});
    //tao session
    var expired = new Date();
    expired.setMonth(expired.getMonth() + 1);
    
    return Session.query().insert({
        user_id: this.data.id,
        token: Bcrypt.hashSync(this.data.id + this.data.username, 10),
        passwordHash:"",
        expired: expired.toISOString(),
        created: new Date()
    }).then((session) => {
        return ({
            account: this.data,
            message: 'Login successfully',
            sessionid: session.token,
            expired: session.expired
        });
    }).catch((err) => {
        throw Boom.boomify(err,{statusCode:404});
    });
};

method.load_user_from_session = function(session_id) {
    var session_model = require('../models/session');
    return session_model.query().findOne({token: session_id}).then((session) => {                
        if(!session){
            throw new Error('Session expired');
        }
        //load user
        return Account.query().findById(session.user_id).then((account) => {
            // console.log(account);
            if(account){
                //update session expired
                var expired = new Date();
                expired.setMonth(expired.getMonth() + 1);
                session.expired = expired.toISOString();
                session.save();
            }            
            return account;
        });
    }).catch((err) => {
        throw err;
    });
   
};
module.exports = User;
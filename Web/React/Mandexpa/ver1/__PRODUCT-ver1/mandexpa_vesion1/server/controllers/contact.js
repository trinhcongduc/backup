var request = require('request');
var Boom = require('boom');
var Contact = require('../models/contact');
var fs = require('fs');
const Logger = require('../classes/logger');
const Config = require('../config');




// get list of contact
exports.list = async(req, h) => {
    var id =req.auth.credentials.user.id;
	// console.log('user',(req.auth.credentials.user.id));
	try {
        if(req.auth.credentials.user.type === "admin"){
            return await Contact.query().select('contact.*')
                .from('contact')
                .where('state',1)
                .orderBy('contact.id')
                .skipUndefined();
        }
        else if(req.auth.credentials.user.type !== "admin"){
            return await Contact.query().select('contact.*')
                .from('contact')
                .where('account_id',id)
                .where('state',1)
                .orderBy('contact.id')
                .skipUndefined();
        }
    }
    catch (err) {
        return Boom.boomify(err, { statusCode: 422 });
    }

};


//Get singe contact by ID
exports.get = async(req, h) => {
   try{
       var contact = await Contact.query().findById(req.params.id);
       if(contact.account_id === req.auth.credentials.user.id && contact.state === 1){
           return contact;
       }
       else {
           return false;
       }
   }
   catch (err) {
       console.log(Boom.boomify(err, {statusCode: 422}))
       return Boom.boomify(err, { statusCode: 422 });
   }

}
//get type contact
exports.gettypecontact = async(req,h) =>{
    // console.log((req.auth.credentials.user));
    const constants = Config.get('/constants');
    var dataobject = constants.NAMEOBJECT;
    return {dataobject};
}
/**
 * POST a Contact
 * thu2603
 */
exports.create = async(req, h) => {
    // console.log((req.auth.credentials.user));
    req.payload.account_id = req.auth.credentials.user.id;
    req.payload.create_account_id = req.auth.credentials.user.created_by;
    req.payload.state = 1;
	return  await Contact.query().insert(req.payload).then(contact => {
		return contact;
	}).catch((err) => {
        return Boom.boomify(err, { statusCode: 422 });
	});
}
exports.update = async (req, h) =>{
    try{
        try{
            var contact = await Contact.query().findById(req.params.id);
            if(contact.account_id === req.auth.credentials.user.id && contact.state ===1){
                return await Contact.query().update(req.payload).where('id',req.params.id)
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(Boom.boomify(err, {statusCode: 422}))
            return Boom.boomify(err, { statusCode: 422 });
        }
    }catch(err){
        return Boom.boomify(err, { statusCode: 422 });
    }
};
//delete contact
exports.delete = async (req, h) =>{
        try{
            var contact = await Contact.query().findById(req.params.id);
            var actor = req.auth.credentials.user
            if(contact.account_id === req.auth.credentials.user.id){
                const state = {
                    state : 0
                }
                // send mail
                try {
                    const template = Config.get('/emailTemplate/deleteContact');
                    const constants = Config.get('/constants');
                    const mailer = req.server.plugins.mailer;
                    const emailOptions = {
                        subject: template.subject,
                        to: { name : contact.firstname!==null?contact.firstname:"" + " " + contact.lastname!==null?contact.lastname:"",
                              address : contact.email}
                    };
                    const context = {
                        name : actor.firstname!==null?actor.firstname:"" + " " + actor.lastname!==null?actor.lastname:"",
                        websiteName: constants.WEB_NAME,
                    }
                    mailer.sendEmail(emailOptions, template.template, context)
                } catch (err) {
                    console.log('----------------------',err)
                    // Logger.error("AccountController.create", err);
                }
                return await Contact.query().update(state).where('id',req.params.id)
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(Boom.boomify(err, {statusCode: 422}))
            return Boom.boomify(err, { statusCode: 422 });
        }
};
//recevie mail
exports.receviemail = async (req, h) =>{
        try{
            const actor = req.auth.credentials.user
            var contact = await Contact.query().findById(req.params.id);
            if(contact.account_id === actor.id){
                const state = {
                    state_email : 0
                }
                // send mail
                try {
                    const template = Config.get('/emailTemplate/recevieMail');
                    const constants = Config.get('/constants');
                    const mailer = req.server.plugins.mailer;
                    const emailOptions = {
                        subject: template.subject,
                        to: { name : actor.firstname!==null?actor.firstname:"" + " " + actor.lastname!==null?actor.lastname:"",
                              address : actor.email}
                    };
                    const context = {
                        name : contact.firstname!==null?contact.firstname:"" + " " + contact.lastname!==null?contact.lastname:"",
                        websiteName: constants.WEB_NAME,
                    }
                    mailer.sendEmail(emailOptions, template.template, context)
                } catch (err) {
                    console.log('----------------------',err)
                    // Logger.error("AccountController.create", err);
                }
                return await Contact.query().update(state).where('id',req.params.id)
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(Boom.boomify(err, {statusCode: 422}))
            return Boom.boomify(err, { statusCode: 422 });
        }
};

// get list of contact by conditions

exports.listConditions = async (req, h) => {
    var actor_id =req.auth.credentials.user.id;
    var conditions =  req.payload;
    if(conditions === undefined){
        conditions={}
    }else{
        // conditions = JSON.parse(conditions);
    }

    return await Contact.query().select('*')
        .where(conditions)
        .andWhere('id','<>',actor_id)
        .skipUndefined()
        .then(contact=>{
            if(contact.length){
                var datas = contact.map(item=>{
                    delete item.password;
                    item.value= item.id;
                    item.label= item.firstname +" "+ item.lastname;
                    return item
                });
                return datas
            }else{
                return 'null';
            }
        })
        .catch(err => {
            console.log("--->",err);
            return Boom.boomify(err, {statusCode: 422});
        });
};






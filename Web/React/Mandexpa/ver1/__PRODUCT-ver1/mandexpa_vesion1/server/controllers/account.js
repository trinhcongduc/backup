const request = require('request');
const Boom = require('boom');
const Account = require('../models/account');
const Config = require('../config');
const fs = require('fs');
const EmailHelper = require('../helpers/notify');
const UploadHelper = require('../helpers/upload');
const path = require('path');
const jwt=require('jsonwebtoken');
const Property = require('../models/propertyModel/property');
const Helper = require('../helpers');
const Contact = require('../models/contact');
const Property_match = require("../models/property_match");
processData = (data) => {
    return new Promise((resolve, reject) => {
        resolve(data);
    })
};


const perPage = 100;

// get list of account by normal account
exports.list = async (req, h) => {

    let actor_id =req.auth.credentials.user.id;
    let page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    return Account.query().select('*')
        .andWhere('id','<>',actor_id)
        .andWhere('state',1)
        .andWhere('created_by',actor_id)
        .skipUndefined().offset((page - 1) * perPage)
        .limit(perPage).orderBy('id', 'desc').then(accounts => {
            accounts = accounts.map((acc) => {
                delete acc.password;
                return acc;
            });
            return {accounts};
        }).catch(err => {
            return Boom.boomify(err, {statusCode: 422});
        });
};

// get list of account by conditions
exports.listConditions = async (req, h) => {
    let actor_id =req.auth.credentials.user.id;
    let conditions =  req.payload.conditions;
    let pagination =  req.payload.pagination;

    if(conditions === undefined){
        conditions={}
    }else{
        if(conditions.reason_social !== undefined && Number.isInteger(conditions.reason_social)){
            let acc =  await Account.query().findById(conditions.reason_social);
            conditions.reason_social = acc.reason_social;
        }
    }

    let builder = Account.query().select('*').where('state',1).andWhere('id','<>',actor_id);

    let condition_key = Object.keys(conditions);
    let condition_in = {};
    let condition_or = {};
    let condition_operator = {};
    if(condition_key.indexOf('condition_in') > -1){
        condition_in = conditions.condition_in;
        delete conditions.condition_in;
        let key_condition_in = Object.keys(condition_in);
        key_condition_in.map(item=>{
            builder.whereIn(item,condition_in[item])
        });
    }

    if(condition_key.indexOf('condition_or') > -1){
        condition_or = conditions.condition_or;
        delete conditions.condition_or;
        let key_condition_or = Object.keys(condition_or);
        key_condition_or.map(item=>{
            if(item === "activation"){
                if(condition_or[item].operator === "<>"){
                    builder.where(function () {
                        this.orWhere(item,'<>',condition_or[item].value);
                        this.orWhere(function () {
                            this.whereNull(item);
                        });
                    })
                }else{
                    builder.where(item,condition_or[item].value)
                }
            }
            else if(condition_or[item].toLowerCase() === 'is null' || condition_or[item].toLowerCase() === 'is not null' ){
                builder = Helper.modelBuilder.WhereNull_notNull(builder,item,)
            }else{
                builder.orWhere(item,condition_or[item])
            }

        });
    }

    if(condition_key.indexOf('condition_operator') > -1){
        condition_operator = conditions.condition_operator;
        delete conditions.condition_operator;
        let key_condition_operator = Object.keys(condition_operator);
        key_condition_operator.map(item=>{
            builder.where(item,condition_operator[item].operator,condition_operator[item].value)
        });
    };

    builder.where(conditions);


    if(pagination !== undefined && pagination !== null && Object.keys(pagination).length > 0){
        let rowsPerPage = pagination.rowsPerPage;
        let page = pagination.page;
        let orderBy = pagination.orderBy;
        let order = pagination.order;

        builder.offset((page - 1)* rowsPerPage);
        builder.limit(rowsPerPage);
        if(orderBy !== undefined && order !== undefined){
            builder.orderBy(orderBy,order);
        }

        let account_number = Account.query().count('id as count');
        if(condition_key.indexOf('condition_in') > -1) {
            let key_condition_in = Object.keys(condition_in);
            key_condition_in.map(item => {
                account_number.whereIn(item, condition_in[item])
            });
        }

        if(condition_key.indexOf('condition_operator') > -1){
            let key_condition_operator = Object.keys(condition_operator);
            console.log("key_condition_operator===>",key_condition_operator);
            key_condition_operator.map(item=>{
                account_number.where(item,condition_operator[item].operator,condition_operator[item].value)
            });
        }

        if(condition_key.indexOf('condition_or') > -1){
            let key_condition_or = Object.keys(condition_or);
            key_condition_or.map(item=>{
                if(item === "activation"){
                    if(condition_or[item].operator === "<>"){
                        account_number.where(function () {
                            this.orWhere(item,'<>',condition_or[item].value);
                            this.orWhere(function () {
                                this.whereNull(item);
                            });
                        })
                    }else{
                        account_number.where(item,condition_or[item].value)
                    }
                }
                else if(condition_or[item].toLowerCase() === 'is null' || condition_or[item].toLowerCase() === 'is not null' ){
                    account_number = Helper.modelBuilder.WhereNull_notNull(account_number,item,)
                }else{
                    account_number.orWhere(item,condition_or[item])
                }

            });
        };

        console.log("conditions",conditions);
        account_number.where(conditions);
        account_number.first().skipUndefined();


        return await Promise.all([builder,account_number].map(async  item=>{
            return await  item;
        })).then(res=>{
            res[0] = res[0].map(item=>{
                item.fullname = item.firstname+" "+item.lastname;
                return item;
            });
            return {
                data:res[0],
                count:res[1].count,
            };
        }).catch(err=>{
            console.log("err========>",err);
            return Boom.boomify(err, {statusCode: 422});
        })
    }
    else{
        builder.where(conditions);
        return await builder.skipUndefined()
            .then(users=>{
                if(users.length){
                    let datas = users.map(item=>{
                        delete item.password;
                        item.value= item.id;
                        item.label=  item.firstname + " " + item.lastname;
                        item.fullname=  item.firstname + " " + item.lastname;
                        return item
                    });
                    return datas
                }else{
                    return 'null';
                }
            })
            .catch(err => {
                return Boom.boomify(err, {statusCode: 422});
            });
    }



};

// get list Agency by conditions
exports.listAgency = async (req, h) => {

    let actor_id =req.auth.credentials.user.id;
    let conditions =  req.payload;
    if(conditions === undefined){
        conditions={}
    }else{
        if(conditions.reason_social !== undefined && Number.isInteger(conditions.reason_social)){
            let acc =  await Account.query().findById(conditions.reason_social);
            conditions.reason_social = acc.reason_social;
        }
    }
    return await Account.query().select('*')
        .where(conditions)
        .where('state',1)
        .skipUndefined()
        .then(users=>{
            if(users.length){
                let datas = users.map(item=>{
                    delete item.password;
                    item.value= item.id;
                    item.label=  item.firstname + " " + item.lastname;
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

// General get list by condition
exports.listWithConditions = async (req,h) => {

};

// get list of account by super admin
exports.listbyAdmin = async (req, h) => {
    let actor_id =req.auth.credentials.user.id;
    let page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    return Account.query().select('*')
        .where('type', '<>', 'admin')
        .where('state',1)
        .where('type', '<>', 'staff')
        .skipUndefined().offset((page - 1) * perPage)
        .limit(perPage).orderBy('id', 'desc')
        .then(accounts => {
            accounts = accounts.map((acc) => {
                delete acc.password;
                return acc;
            });
            return {accounts};
        }).catch(err => {
            return Boom.boomify(err, {statusCode: 422});
        });
};

//Get singe account by ID
exports.get = async (req, h) => {
    return Account.query().findById(req.params.id).skipUndefined().then(account => {
        delete account.password;
        if(account.state === 1){
            return account;
        }
        return false
    });
};

//delete account
exports.delete = async (req, h) => {
    let actor =req.auth.credentials.user;
    const state = {
        state : 0
    };
    const account_delete = await Account.query().findById(req.params.id).skipUndefined();
    let  mail_send_to = [];
    const admin = await Account.query().select('account.firstname','account.lastname','account.email').where('type','=','admin').where('state',1).skipUndefined();
    admin.map((item)=>{
        mail_send_to.push({
            name : (item.firstname!==null?item.firstname:"") + " " + (item.lastname!==null?item.lastname:""),
            address : item.email
        })
    });
    if(actor.type === admin){
        mail_send_to.push({
            name : (account_delete.firstname!==null?account_delete.firstname:"") + " " + (account_delete.lastname!==null?account_delete.lastname:""),
            address : account_delete.email
        })
    }
    else {
        mail_send_to.push({
            name : (actor.firstname!==null?actor.firstname:"" )+ " " + (actor.lastname!==null?actor.lastname:""),
            address : actor.email
        })
    }
    try {
        const property_created_by_account = await Property.query().update(state).where('created_by',account_delete.id);
        const propertymatch_created_by_account = await Property_match.query().update(state).where('created_by',account_delete.id);
        const contact_created_by_account = await Contact.query().update(state).where('account_id',account_delete.id);
        // console.log('----------------------',property_created_by_account)
        // if(property_created_by_account.length>0){
        //     var property_id =[];
        //     property_created_by_account.map(item =>{
        //         property_id.push(item.id)
        //     })
        //     console.log('----------------------')
        //     const delete_property = Property.query().update(state).where('c',property_id);
        // }
    } catch (err) {
        console.log('----------------------',err)
        // Logger.error("AccountController.create", err);
    }
    // send mail

    try {
        const template = Config.get('/emailTemplate/deleteAccount');
        const constants = Config.get('/constants');
        const mailer = req.server.plugins.mailer;
        const emailOptions = {
            subject: template.subject,
            to: mail_send_to
        };
        const context = {
            name: (account_delete.firstname!== null?account_delete.firstname:"")+  (account_delete.lastname!==null?account_delete.lastname:"") ,
            websiteName: constants.WEB_NAME,
        }
        mailer.sendEmail(emailOptions, template.template, context)
    } catch (err) {
        console.log('----------------------',err)
        // Logger.error("AccountController.create", err);
    }
    return await Account.query().update(state).where('id',req.params.id).then(account => {

        return account;
    });
};

exports.create = async (req, h) => {
    try {
        let data = req.payload;
        let actor_id =req.auth.credentials.user.id;
        let actor =req.auth.credentials.user;
        // if (data.logo_change) {
        //     var ImageURL = data.logo_preview;
        // }
        // delete data.logo_preview;
        // delete data.logo_change;
        let Bcrypt = require('bcrypt-nodejs');
        if (!data.email) {
            throw Boom.badData('Invalid email');
        }
        let salt = Bcrypt.genSaltSync(10);
        data.created_date = Helper.dateHelper.getDateyyyymmdd();
        let accountData = {
            ...data,
            password: Bcrypt.hashSync(data.password, salt),
            created_by:actor_id,
            state : 1,
        };

        // Check duplicate email?
        let checkEmail  =  await EmailHelper.checkAccountEmail(accountData.email);
        if(checkEmail === 'false' || checkEmail === false){
            return Boom.badRequest("Duplicate email");
        }



        // send mail
        try {
            let  mail_send_to = [];
            mail_send_to.push({
                name: (data.firstname!==null?data.firstname:"") + " " + (data.lastname!==null?data.lastname:""),
                address: data.email
            })
            if(actor.type!=="admin"){
                mail_send_to.push({
                    name : (actor.firstname!==null?actor.firstname:"") + " " + (actor.lastname!==null?actor.lastname:""),
                    address : actor.email
                })
            }
            else {
                const admin = await Account.query().select('account.firstname','account.lastname','account.email').where('type','=','admin').where('state',1).skipUndefined();
                admin.map((item)=>{
                    mail_send_to.push({
                        name : (item.firstname!==null?item.firstname:"") + " " + (item.lastname!==null?item.lastname:""),
                        address : item.email
                    })
                });
            }

            const template = Config.get('/emailTemplate/createAccount');
            const constants = Config.get('/constants');
            const mailer = req.server.plugins.mailer;
            const emailOptions = {
                subject: template.subject,
                to: mail_send_to
            };
            const context = {
                name: (data.firstname!==null?data.firstname:"")+ " " + (data.lastname!==null?data.lastname:""),
                email: data.email,
                password: data.password,
                websiteName: constants.WEB_NAME,
            };
            mailer.sendEmail(emailOptions, template.template, context)
        } catch (err) {
            // Logger.error("AccountController.create", err);
        }

        let number_account_child = await Account.query().select("number_account_child").where('id',actor_id);
        number_account_child =  number_account_child[0].number_account_child;
        number_account_child = parseInt(number_account_child) + 1;
        return await Account.query().insert(accountData).then(accounts => {
            let updateAccount =  Account.query().update({'number_account_child':number_account_child}).where('id',actor_id).then(data=>{
                console.log('UPDATE ACCOUNT SUCCESSFULLY');
            }).catch(err=>{
                console.log("CATCH auto update actor account==>",err);
            });

            // if (typeof ImageURL !== "undefined") {
            //     // get images format
            //     let block = ImageURL.split(";");
            //     let contentType = block[0].split(":")[1];
            //     let extend = contentType.split("/")[1];
            //     let realData = block[1].split(",")[1];
            //     let bitmap = new Buffer(realData, 'base64');
            //     let date = new Date().getTime();
            //
            //     // create path of image
            //     const dispath_user = 'store/public/images/user_' + accounts.id;
            //     const dispath_userLogo = dispath_user + '/logo/';
            //     const filename = 'logo_' + date + '.' + extend;
            //     const filePath = dispath_userLogo + filename;
            //
            //
            //     // console.log("begin save folder ------------------------->");
            //     let path = UploadHelper.uploadImage(ImageURL,'store/public/images/user/user_' + accounts.id+'/logo');
            //
            //
            //     try{
            //         const updateLogo = Account.query().update({'logo': path}).where('id', accounts.id).then(data => {
            //             console.log("ok upload");
            //         }).catch(err => {
            //             console.log("false upload");
            //         });
            //     }
            //     catch (e) {
            //         console.log("=====>ERROR UPDATE LOGO")
            //     }
            //     accounts.logo = path;
            //     // console.log('----------------------------->', accounts.logo);
            // }

            return accounts;
        }).catch(err => {
            return Boom.boomify(err, {statusCode: 422});
        });

    } catch (err) {
        return Boom.boomify(err, {statusCode: 422});
    }
};

exports.addlistpropertyseen = async (req,h)=>{
    try {
        let actor_id =  req.auth.credentials.user.id;
        const account = await Account.query().findById(actor_id).skipUndefined();

        let properties_seen = []
        if(account.properties_seen!==null && account.properties_seen!=="" && account.properties_seen!==[]){

            properties_seen = JSON.parse(account.properties_seen)
        }
        let check = false;
        if(properties_seen.length>0){
            properties_seen.map(item=>{
                if(item===parseInt(req.params.id)){
                    check = true
                }
            })
        }
        if(!check){
            properties_seen.push(parseInt(req.params.id))
        }
        const data = {
            properties_seen : JSON.stringify(properties_seen)
        };
        try{
            const property = await Property.query().findById(parseInt(req.params.id)).skipUndefined();
            let quantity_account_seen = parseInt(property.quantity_account_seen)
            let property_update = {
                quantity_account_seen : quantity_account_seen + 1,
            }
            // console.log('------',property_update.quantity_account_seen)
            const updateProperty = await Property.query().update(property_update).where('id',parseInt(req.params.id))
        }catch (e) {
            console.log(e)
        }
        const updateList = await Account.query().update(data).where('id', actor_id)
        return updateList;
    }
    catch (err) {
        console.log(Boom.boomify(err, {statusCode: 422}))
        return Boom.boomify(err, {statusCode: 422});
    }
};

exports.update = async (req, h) => {
    try {
        let actor = req.auth.credentials.user;

        let accountData = req.payload;

        console.log("accountData===========>",accountData);
        // if (accountData.logo_change) {
        //     var ImageURL = accountData.logo_preview;
        // }else{
        //     delete  accountData.logo_preview
        // }
        // delete accountData.logo_preview;
        // delete accountData.logo_change;
        let Bcrypt = require('bcrypt-nodejs');
        if (!accountData.email) {
            throw Boom.badData('Invalid email');
        }

        if(accountData.password !== ''){
            var salt = Bcrypt.genSaltSync(10);
            accountData = {
                ...accountData,
                password: Bcrypt.hashSync(accountData.password, salt)
            };
        }else{
            delete accountData.password;
        }

        const  account = await Account.query().findById(accountData.id).skipUndefined();
        if( account.id === actor.id || account.created_by === actor.id || actor.type === 'admin'){
            return await Account.query().update(accountData).where('id', accountData.id).then(status => {
                // send mail
                try {
                    let mail_send_to = {
                        name: (accountData.firstname!== null?accountData.firstname:"")+ (accountData.lastname!==null?accountData.lastname:"") ,
                        address: accountData.email
                    }
                
                    if(actor.id === account.created_by){

                        mail_send_to = {
                            name: (actor.firstname!== null?actor.firstname:"")+ (actor.lastname!==null?actor.lastname:"") ,
                            address: actor.email
                        }
                    }
                    const template = Config.get('/emailTemplate/updateAccount');
                    const constants = Config.get('/constants');
                    const mailer = req.server.plugins.mailer;
                    const emailOptions = {
                        subject: template.subject,
                        to: mail_send_to
                    };
                    const context = {
                        name: (accountData.firstname!== null?accountData.firstname:"")+(accountData.lastname!==null?accountData.lastname:"") ,
                        email: accountData.email,
                        updated_at : Helper.dateHelper.getDateyyyymmdd(),
                        websiteName: constants.WEB_NAME,
                    }
                    mailer.sendEmail(emailOptions, template.template, context)
                } catch (err) {
                    console.log('----------------------',err)
                }

                // if (typeof ImageURL !== "undefined") {
                //
                //     let path = UploadHelper.uploadImage(ImageURL,'store/public/images/user/user_' + accountData.id+'/logo');
                //
                //     const updateLogo = Account.query().update({'logo': path}).where('id', accountData.id).then(data => {
                //     }).catch(err => {
                //         console.log("false upload");
                //     });
                //     accountData.logo = path;
                // }

                return accountData;
            }).catch(err => {
                return Boom.boomify(err, {statusCode: 422});
            });
        }
        else {
            console.log('1')
            return false;
        }


    } catch (err) {
        return Boom.boomify(err, {statusCode: 422});
    }
};

//
exports.getLogin = async (req, h) => {
    let userLogin =  null;
    return jwt.verify(req.headers.sessionid,'sessionkey',(err,authData)=>{
        try{
            return Account.query().findById(authData.id) .where('state','<>',0).skipUndefined().then((acc)=>{
                userLogin = acc;
                userLogin.fullname = userLogin.firstname + " " + userLogin.lastname;
                delete userLogin.password;
                return userLogin;
            });
        }catch (e) {
            return userLogin;
        }
    }).catch(err=>{
        return userLogin;
    });
};


exports.checkNumberAccountChild =  async (req,h)=>{
    let actor_id =  req.auth.credentials.user.id;
    // console.log("checkNumberAccountChild===>",actor_id);
    return Account.query().where('id',actor_id).where('state',1)
        .skipUndefined()
        .then(acccount=>{
            if(acccount[0].number_agents > acccount[0].number_account_child){
                return 1;
            }else{
                // return Boom.boomify({message:"Cannot create more account"}, {statusCode: 400});
                return Boom.badRequest({message:"Cannot create more account"})
            }
        }).catch(err => {
            return Boom.boomify(err, {statusCode: 422});
        });

};

/**
 * Function upload Account's images
 * Upload 1 or multiple images once
 * @param req
 * @return {Promise<*>}
 */
exports.uploadImages = async req =>{
    try{
        let files = req.payload;
        let keys_image = Object.keys(files);
        let day = Helper.dateHelper.getDateTimeZone('now','MM.DD');
        const paths =  await Promise.all(keys_image.map(item=>{
            let path = Helper.upload.uploadFile(files[item]._data,files[item].hapi.filename,'store/public/images/logo/'+day.toString());
            return {
                path:path,
                key:item
            }
        }));
        return paths;
    }catch (err) {
        return Boom.boomify(err,{statusCode:422})
    }
};

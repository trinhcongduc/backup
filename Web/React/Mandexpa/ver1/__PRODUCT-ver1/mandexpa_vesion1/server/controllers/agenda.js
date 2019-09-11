const request = require('request');
const Boom = require('boom');
const Agenda = require('../models/agenda');
const Helper = require("../helpers/upload");
const fs = require('fs');
const Logger = require('../classes/logger');
const Config = require('../config');
const Property = require('../models/propertyModel/property');
const Contact = require('../models/contact');
const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
const path = require('path');
exports.create = async(req, h) => {
    try{
        const constants = Config.get('/constants');
        var user = req.auth.credentials.user;
        const property = await Property.query()
            .select('property.*','account.email','account.firstname','account.lastname','account.type as type_agency')
            .findById(req.payload.property_id)
            .leftJoin('account', function() {
                this.on('account.id', '=', 'property.created_by')
            })
        var contact = null;
        var owner_property_id = null;
        var owner_property = JSON.parse(property.host_1);
        var mail_send_to = [{
            name : (property.firstname!==null?property.firstname:"") + " " + (property.lastname!==null?property.lastname:""),
            address : property.email
        }]
        if(owner_property!== null && owner_property.id!=="" && property.type_agency !== constants.USER_ROLES.PROMOTER){
            owner_property_id = owner_property.id;
            try {
                contact = await Contact.query()
                    .select('contact.firstname','contact.lastname','contact.email')
                    .findById(owner_property_id)
                    .skipUndefined();
                mail_send_to.push({
                    name : (contact.firstname!==null?contact.firstname:"") + " " + (contact.lastname!==null?contact.lastname:""),
                    address : contact.email,
                })
            }
            catch (err) {
                console.log(Boom.boomify(err, { statusCode: 422 }));
                return {}
            }
        }
        var agenda = {
            property_id : req.payload.property_id,
            owner_property_id : owner_property_id,
            created_by : req.auth.credentials.user.id,
            property_created_by : property.created_by,
            meeting_date : new Date(req.payload.date),
            meeting_hour : new Date(req.payload.hour),
            created_at : new Date(),
            subject : req.payload.subject,
            status : 0,
        }
        if(agenda.property_created_by !== agenda.created_by){
            return  await Agenda.query().insert(agenda).then(agenda => {
                // send mail
                try {
                    const template = Config.get('/emailTemplate/createAgenda');
                    const mailer = req.server.plugins.mailer;
                    const emailOptions =
                        {
                            subject: (user.firstname!==null?user.firstname:"")+ " " + (user.lastname!==null?user.lastname:"") + template.subject,
                            to: mail_send_to,
                        };
                    const context = {
                        agency_name: (user.firstname!==null?user.firstname:"")+ " " + (user.lastname!==null?user.lastname:""),
                        code: property.code,
                        property_name: property.title_des,
                        websiteName: constants.WEB_NAME,
                    }
                    mailer.sendEmail(emailOptions, template.template, context)
                } catch (err) {
                    Logger.error("agendaController.create", err);
                }
                return agenda;
            }).catch((err) => {
                console.log(Boom.boomify(err, { statusCode: 422 }));
                return {}
            });
        }
        else {
            return {}
        }
    }
    catch (err) {
        console.log("ERROR",err)
        return {}
    }
}
exports.list = async(req, h) => {
    try{
        var id =req.auth.credentials.user.id;
        if(req.auth.credentials.user.type === "admin"){
            return await Agenda.query().select('agenda.*','agenda.id as agenda_id','account.firstname','account.lastname','property.*','property_media.image','property_characteristic.*','city.title as title_town',
                'agenda.created_at as agenda_created_at','agenda.created_by as agenda_created_by')
                .from('agenda')
                .leftJoin('account', function() {
                    this.on('account.id', '=', id)
                })
                .leftJoin('property', function() {
                    this.on('property.id', '=', 'agenda.property_id')
                })
                .leftJoin('property_media', function () {
                    this.on('property_media.property_id', '=', 'property.id')
                    this.on('property_media.primaryImage','=',1)
                })
                .leftJoin('property_location', function () {
                    this.on('property_location.property_id', '=', 'property.id');

                })
                .leftJoin('city', function () {
                    this.on('city.id', '=', 'property_location.town');
                })
                .leftJoin('property_characteristic', function () {
                    this.on('property_characteristic.property_id', '=', 'property.id');
                })
                .orderBy('agenda.id')
                .skipUndefined();
        }
        else if(req.auth.credentials.user.type !== "admin"){
            var agenda = [];
            try {
                var  agenda_created_by_user =  await Agenda.query().select('agenda.*','agenda.id as agenda_id','account.firstname','account.reason_social','account.lastname','property.*','property_media.image','property_characteristic.*','city.title as title_town',
                    'agenda.created_at as agenda_created_at','agenda.created_by as agenda_created_by')
                    .from('agenda')
                    .where('agenda.property_created_by',id)
                    // .orWhere('agenda.created_by',id)
                    .leftJoin('account', function() {
                        this.on('account.id', '=', 'agenda.created_by')
                    })
                    .leftJoin('property', function() {
                        this.on('property.id', '=', 'agenda.property_id')
                    })
                    .leftJoin('property_media', function () {
                        this.on('property_media.property_id', '=', 'property.id')
                        this.on('property_media.primaryImage','=',1)
                    })
                    .leftJoin('property_location', function () {
                        this.on('property_location.property_id', '=', 'property.id');

                    })
                    .leftJoin('city', function () {
                        this.on('city.id', '=', 'property_location.town');
                    })
                    .leftJoin('property_characteristic', function () {
                        this.on('property_characteristic.property_id', '=', 'property.id');
                    })
                    .orderBy('agenda.id', 'desc')
                    .skipUndefined();
                var  agenda_property_created_by =  await Agenda.query().select('agenda.*','agenda.id as agenda_id','account.firstname','account.lastname','property.*','property_media.image','property_characteristic.*','city.title as title_town',
                    'agenda.created_at as agenda_created_at','agenda.created_by as agenda_created_by')
                    .from('agenda')
                    // .where('agenda.property_created_by',id)
                    .where('agenda.created_by',id)
                    .leftJoin('account', function() {
                        this.on('account.id', '=', 'agenda.property_created_by')
                    })
                    .leftJoin('property', function() {
                        this.on('property.id', '=', 'agenda.property_id')
                    })
                    .leftJoin('property_media', function () {
                        this.on('property_media.property_id', '=', 'property.id')
                        this.on('property_media.primaryImage','=',1)
                    })
                    .leftJoin('property_location', function () {
                        this.on('property_location.property_id', '=', 'property.id');

                    })
                    .leftJoin('city', function () {
                        this.on('city.id', '=', 'property_location.town');
                    })
                    .leftJoin('property_characteristic', function () {
                        this.on('property_characteristic.property_id', '=', 'property.id');
                    })
                    .orderBy('agenda.id', 'desc')
                    .skipUndefined();
                if(agenda_created_by_user!==null && agenda_created_by_user!== undefined && agenda_created_by_user!== []){
                    agenda_created_by_user.map(item =>{
                        agenda.push(item)
                    })
                }
                if(agenda_property_created_by!==null && agenda_property_created_by!== undefined && agenda_property_created_by!== []){
                    agenda_property_created_by.map(item =>{
                        agenda.push(item)
                    })
                }
            }
           catch (e) {
               console.log(e)
           }
            return agenda;
        }
    }
    catch (err) {
        console.log(Boom.boomify(err, { statusCode: 422 }));
        return {}
    }
}

exports.change_status = async (req, h) => {
        try {
            const constants = Config.get('/constants');
            const user = req.auth.credentials.user;
            const agenda = await Agenda.query()
                .select('agenda.*', 'account.email', 'account.firstname', 'account.lastname', 'account.reason_social')
                .findById(req.payload.id).leftJoin('account', function () {
                    this.on('account.id', '=', 'agenda.created_by')
                });

            if (agenda.property_created_by === req.auth.credentials.user.id) {
                var mail_send_to = [{
                    name: (agenda.firstname !== null ? agenda.firstname : "" + " " )+ (agenda.lastname !== null ? agenda.lastname : ""),
                    address: agenda.email
                }]
                if (agenda.owner_property_id !== null) {
                    try {
                        const contact = await Contact.query()
                            .select('contact.firstname', 'contact.lastname', 'contact.email')
                            .findById(agenda.owner_property_id)
                            .skipUndefined();
                        mail_send_to.push({
                            name: (contact.firstname !== null ? contact.firstname : "") + " " + (contact.lastname !== null ? contact.lastname : ""),
                            address: contact.email,
                        })
                    } catch (err) {
                        console.log(Boom.boomify(err, {statusCode: 422}));
                    }
                }
                const property_agenda = await Property.query()
                    .select('property.number_pay', 'property.total_commission_inclusive', 'property_location.*','city.title as title_town')
                    .from('property')
                    .where('property.id', agenda.property_id)
                    .leftJoin('property_location', function () {
                        this.on('property_location.property_id', '=', 'property.id');

                    })
                    .leftJoin('city', function () {
                        this.on('city.id', '=', 'property_location.town');
                    })
                    .orderBy('property.id')
                    .skipUndefined()
                //create doc

                const property_data = Object.assign({}, property_agenda[0])
                var path_doc = "";
                if (agenda.subject === 1 && req.payload.status === 1) {
                    try {


                        var content = fs
                            .readFileSync(path.resolve(Helper.pathroot(), 'store/public/documents/agenda_doc/Mandexpa.docx'), 'binary');

                        var zip = new JSZip(content);

                        var doc = new Docxtemplater();
                        doc.loadZip(zip);

                        //set the templateVariables

                    } catch (error) {
                        console.log(error);
                    }
                    doc.setData({
                        reason_social_a : (user.reason_social!==null&&user.reason_social!==undefined)?user.reason_social:"",
                        reason_social_b : (agenda.reason_social!==null&&agenda.reason_social!==undefined)?agenda.reason_social:"",
                        agency_name_a : (user.firstname!==null&&user.firstname!==undefined?user.firstname:"")+ " " +(user.lastname!==null&&user.lastname!==undefined?user.lastname:""),
                        agency_name_b : (agenda.firstname!==null&&agenda.firstname!==undefined?agenda.firstname:"")+ " " +(agenda.lastname!==null&&agenda.lastname!==undefined?agenda.lastname:""),
                        temperature : (property_data.temperature!==undefined&&property_data.temperature!==null)?property_data.temperature:"",
                        street_name : (property_data.street_name!==undefined&&property_data.street_name!==null)?property_data.street_name:"",
                        postal_code : (property_data.postal_code!==undefined&&property_data.postal_code!==null)?property_data.postal_code:"",
                        town : (property_data.title_town!==undefined&&property_data.title_town!==null)?property_data.title_town:"",
                        price_property : (property_data.number_pay!==undefined&&property_data.number_pay!==null)?property_data.number_pay:"",
                        total_amount :  (property_data.total_commission_inclusive!==undefined&&property_data.total_commission_inclusive!==null)?property_data.total_commission_inclusive:"",

                    });
                    try {
                        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                        doc.render()
                    } catch (error) {
                        var e = {
                            message: error.message,
                            name: error.name,
                            stack: error.stack,
                            properties: error.properties,
                        }
                        console.log(JSON.stringify({error: e}));
                        // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
                        throw error;
                    }

                    var buf = doc.getZip()
                        .generate({type: 'nodebuffer'});

                    // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
                    path_doc = Helper.uploadFile(buf, 'Bon_de_visite_2019_Mandexpa.docx', 'store/private/agenda/' + agenda.id);
                }
                const agenda_update = {
                    status: req.payload.status,
                    path_doc: path_doc
                }
                const change_status_agenda = await Agenda.query().update(agenda_update).where('id', req.payload.id)
                // fs.writeFileSync(path.resolve(Helper.pathroot(), 'document/agenda_doc/output.docx'), buf);
                const mailer = req.server.plugins.mailer;
                if (req.payload.status === 1) {
                    const template1 = Config.get('/emailTemplate/acceptAgenda');
                    mail_send_to.map(data => {
                        // send mail
                        try {
                            var emailOptions =
                                {
                                    subject: (user.firstname !== null ? user.firstname : "") + " " + (user.lastname ? user.lastname : "") + template1.subject,
                                    to: data,
                                };
                            var context = {
                                property_id: property_data.code!==null? property_data.code :"",
                                agency_name: (user.firstname !== null ? user.firstname : "") + " " + (user.lastname ? user.lastname : ""),
                                date: req.payload.date_visit,
                                hour: req.payload.hour_visit,
                                websiteName: constants.WEB_NAME,
                                link_doc : "",
                            };
                            mailer.sendEmail(emailOptions, template1.template, context)
                        } catch (err) {
                            console.log("send mail", err);
                        }
                    })
                    return change_status_agenda;
                } else if (req.payload.status === 2) {
                    const template2 = Config.get('/emailTemplate/declineAgenda');
                    mail_send_to.map(data => {
                        // send mail
                        try {
                            var emailOptions =
                                {
                                    subject: (user.firstname !== null ? user.firstname : "") + " " + (user.lastname ? user.lastname : "") + template2.subject,
                                    to: data,
                                };
                            var context = {
                                property_id: property_data.code!==null? property_data.code :"",
                                agency_name_a: (user.firstname !== null ? user.firstname : "") + " " + (user.lastname ? user.lastname : ""),
                                agency_name_B: (agenda.firstname !== null ? agenda.firstname : "") + " " + (agenda.lastname ? agenda.lastname : ""),
                                websiteName: constants.WEB_NAME,
                            };
                            mailer.sendEmail(emailOptions, template2.template, context)
                        } catch (err) {
                            console.log("send mail", err);
                        }
                    })
                    return change_status_agenda;
                }
                return change_status_agenda;
            } else {
                return null;

            }
        }
        catch (e) {
            return e
        }
}

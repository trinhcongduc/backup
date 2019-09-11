const Boom = require('boom');
const UploadHelper = require("../helpers/upload");
const Knex = require('knex');
const Hogan = require('hogan.js');
const Hoek = require('hoek');
const os = require('os');
const Account = require('../models/account');
const Documents = require('../models/propertyModel/documents');
const Property = require('../models/propertyModel/property');
const Character = require("../models/propertyModel/property_characteristic");
const Location = require("../models/propertyModel/property_location");
const Media = require('../models/propertyModel/property_media');
const Market = require('../models/propertyModel/property_market');
const Category = require('../models/category');
const ReOrder = require('../models/propertyModel/property_reorder');
const Config = require('../config');
const Contact = require('../models/contact');
const constants = require('../config/constant');
const property_config = require('../config/objectConfig/propertyConfig');
const Helper = require('../helpers');
const FindPropertyMatchHelper = require("../helpers/findPropertyMatch");
const moment = require('moment');
const pdfshift = require('pdfshift')('c70a9b43679441bbbe18cf921dba09d3');

const fs = require('fs');
processData = (data) => {
    return new Promise((resolve, reject) => {
        resolve(data);
    })
};

const perPage = 10;

/**
 * Function get singe property by ID
 * @param req
 * @param h
 * @returns {Promise<*>}
 */
exports.get = async (req, h) => {
    let id = req.params.id;
    let actor = req.auth.credentials.user;
    try {
        const property = await Property.query().select('property.*', 'account.firstname', 'account.lastname', 'account.reason_social')
            .findById(id)
            .leftJoin('account', function () {
                this.on('account.id', '=', 'property.created_by');
            })
            .where('property.state', '<>', 0)
            .skipUndefined();
        const documents = await Documents.query().where({ 'property_id': id }).skipUndefined();
        const character = await Character.query().where('property_id', id).skipUndefined();
        const location = await Location.query().select('property_location.*', 'city.title as title_town', 'regions.title as title_area')
            .where({ 'property_id': id })
            .leftJoin('city', function () {
                this.on('city.id', '=', 'property_location.town');
            })
            .leftJoin('regions', function () {
                this.on('regions.id', '=', 'property_location.area');
            })
            .skipUndefined();
        const market = await Market.query().where({ 'property_id': id }).skipUndefined();
        const media = await Media.query().where({ 'property_id': id }).orderBy('primaryImage', 'desc').skipUndefined();
        let reorder = await ReOrder.query().where({ 'property_id': id,'state' : 1 }).skipUndefined();
        if (property === null || property === undefined) {

            return null;
        }
        if (property.status_mandate !== property_config.type_mandate.for_rent && property.status_mandate !== property_config.type_mandate.for_sale && property.status_mandate !== null && property.status_mandate !== "" && actor.id !== property.created_by && actor.type !== "admin"  && actor.id !== reorder[0].buyer_id && actor.id !== reorder[0].collaborators_id && actor.id !== reorder[0].company_sell_id) {

            return null;
        }

        if (reorder.length) {
            reorder = reorder[0]
        } else {
            reorder = null
        }

        return { property, location, documents, character, market, media, reorder };

    }
    catch (err) {
        console.log(err)
        return Boom.boomify(err, { statusCode: 422 });
    }
};

/**
 * Function get list property in from database
 * @param req
 * @param h
 * @returns {Promise<*>}
 */

exports.list = async (req, h) => {

    const pagination =  req.payload.pagination;
    const actor_id =  req.auth.credentials.user.id;


    let queryBuilder = Property.query().select('property.*', 'property_location.*',
        'docsVisit.file_doc as doc_visit','docsPurchase.file_doc as doc_purchase',
        'property_media.*','property_marketing.*', 'property_characteristic.*', 'city.title as title_town',
        'property_reorder.buyer_id','property_reorder.collaborators_id','property_reorder.company_sell_id',
        'account.firstname','account.lastname','account.logo',

    )
        .from('property');
    let counter =  Property.query().count('property.id as count').first().from('property');
    let stringQueryArr = ['type_property', 'type_construction'];

    Object.keys(req.query).map(key => {
        if (stringQueryArr.indexOf(key) >= 0) {
            queryBuilder.where(key, 'like', '%' + req.query[key] + '%');
            counter.where(key, 'like', '%' + req.query[key] + '%');
        }

    });
    try {
        queryBuilder.where('property.state', '<>', 0);
        counter.where('property.state', '<>', 0);
        if (req.query['status_mandate'] !== undefined) {
            queryBuilder.where('property.status_mandate',req.query['status_mandate']);
            counter.where('property.status_mandate',req.query['status_mandate']);
        }
        if (req.query['search_engine'] !== undefined) {
            queryBuilder.where('title_des', 'like', '%'+req.query['search_engine']+'%');
            counter.where('title_des', 'like', '%'+req.query['search_engine']+'%');
        }
        if (req.query['min_currency'] !== undefined) {
            queryBuilder.where('number_pay', '>=', parseInt(req.query['min_currency']));
            counter.where('number_pay', '>=', parseInt(req.query['min_currency']));
        }
        if (req.query['max_currency'] !== undefined) {
            queryBuilder.where('number_pay', '<=', parseInt(req.query['max_currency']));
            counter.where('number_pay', '<=', parseInt(req.query['max_currency']));
        }
        if (req.query['surface_min'] !== undefined) {
            queryBuilder.where('living_space', '>=', parseInt(req.query['surface_min']));
            counter.where('living_space', '>=', parseInt(req.query['surface_min']));
        }
        if (req.query['surface_max'] !== undefined) {
            queryBuilder.where('living_space', '<=', parseInt(req.query['surface_max']));
            counter.where('living_space', '<=', parseInt(req.query['surface_max']));
        }

        // Join user create
        queryBuilder.leftJoin('account', function () {
            this.on('account.id', '=', 'property.created_by');
        });
        counter.leftJoin('account', function () {
            this.on('account.id', '=', 'property.created_by');
        });

        // Join property_document

        queryBuilder.leftJoin('documents as docsVisit',function(){
            this.on('docsVisit.property_id','property.id');
            this.on('docsVisit.uploaded_by',actor_id);
            this.on('docsVisit.kind','=',Knex.raw('?',['docVisit']));
        });
        queryBuilder.leftJoin('documents as docsPurchase',function(){
            this.on('docsPurchase.property_id','property.id');
            this.on('docsPurchase.uploaded_by',actor_id);
            this.on('docsPurchase.kind','=',Knex.raw('?',['docPurchase']));
    });


        // Join property_location
        queryBuilder.leftJoin('property_location', function () {
            this.on('property_location.property_id', '=', 'property.id');
        });
        counter.leftJoin('property_location', function () {
            this.on('property_location.property_id', '=', 'property.id');
        });



        let stringQueryArr2 = ['sector', 'town'];
        Object.keys(req.query).map(key => {
            if (stringQueryArr2.indexOf(key) >= 0) {
                queryBuilder.where('property_location.' + key, 'like', '%' + req.query[key] + '%');
                counter.where('property_location.' + key, 'like', '%' + req.query[key] + '%');
            }
        });


        queryBuilder.leftJoin('city', function () {
            this.on('city.id', '=', 'property_location.town');
        });
        counter.leftJoin('city', function () {
            this.on('city.id', '=', 'property_location.town');
        });

        // Join property_characteristic
        queryBuilder.leftJoin('property_characteristic', function () {
            this.on('property_characteristic.property_id', '=', 'property.id');
            if (req.query['number_bedroom_min'] !== undefined) {
                this.on('property_characteristic.number_bedroom', '>=', parseInt(req.query['number_bedroom_min']))
            }
            if (req.query['number_bedroom_max'] !== undefined) {
                this.on('property_characteristic.number_bedroom', '<=', parseInt(req.query['number_bedroom_max']))
            }
        });
        counter.leftJoin('property_characteristic', function () {
            this.on('property_characteristic.property_id', '=', 'property.id');
            if (req.query['number_bedroom_min'] !== undefined) {
                this.on('property_characteristic.number_bedroom', '>=', parseInt(req.query['number_bedroom_min']))
            }
            if (req.query['number_bedroom_max'] !== undefined) {
                this.on('property_characteristic.number_bedroom', '<=', parseInt(req.query['number_bedroom_max']))
            }
        });


        // Join property_media
        queryBuilder.leftJoin('property_media', function () {
            this.on('property_media.property_id', '=', 'property.id')
            this.on('property_media.primaryImage', '=', 1)
        });
        counter.leftJoin('property_media', function () {
            this.on('property_media.property_id', '=', 'property.id');
            this.on('property_media.primaryImage', '=', 1)
        });


        // Join property_media
        queryBuilder.leftJoin('property_marketing', function () {
            this.on('property_marketing.property_id', '=', 'property.id');
        });
        // counter.leftJoin('property_media', function () {
        //     this.on('property_marketing.property_id', '=', 'property.id');
        // });


        // Join property_reorder
        queryBuilder.leftJoin('property_reorder', function () {
            this.on('property_reorder.property_id', '=', 'property.id');
            this.on('property_reorder.state', '=', 1)
        });
        counter.leftJoin('property_reorder', function () {
            this.on('property_reorder.property_id', '=', 'property.id');
            this.on('property_reorder.state', '=', 1)
        });

        if(pagination){
            let page = pagination.page;
            let rowsPerPage = pagination.rowsPerPage;
            let orderBy = pagination.orderBy;
            let order = pagination.order;
            queryBuilder.offset((page - 1)* rowsPerPage)
                .limit(rowsPerPage)
                .orderBy(orderBy,order)
                .skipUndefined();
        }
        let data = await queryBuilder.orderBy('property.id', 'DESC').skipUndefined();
        let count = await counter.skipUndefined();
        let actor = req.auth.credentials.user;
        let data_property = [];
        if (actor.type !== constants.USER_ROLES.ADMIN) {
            data.map((item) => {
                if (item.status_mandate === property_config.type_mandate.for_rent || item.status_mandate === property_config.type_mandate.for_sale || item.status_mandate === null || item.status_mandate === "") {
                    if (actor.id !== item.created_by) {
                        data_property.push(item)
                    }
                }
                if (actor.id === item.created_by || actor.id === item.buyer_id || actor.id === item.collaborators_id || actor.id === item.company_sell_id) {

                    data_property.push(item)
                }
            })
        }
        else {
            data_property = data;
        }

        data_property = data_property.map(item=>{
            return this.handlerMarketingData(item);
        });
        return {
            data_property:data_property,
            count:count.count
        };
    }
    catch (err) {
        console.log(err);
        return Boom.boomify(err, { statusCode: 422 });
    }
};


/**
 * Function handler basic data from data get in  list function
 * @param data   : data from a property object.
 * @return {Promise<void>}
 */
exports.handlerMarketingData = (data) =>{
    let marketing_data = {};
    marketing_data = {...marketing_data,at_home:{
            value:parseInt(data.at_home),
            url:data.at_home_input,
            url_input:"at_home_input",
            agency:parseInt(data.at_home_agency),
        }};
    delete data.at_home;delete data.at_home_input;delete data.at_home_agency;

    marketing_data = {...marketing_data,immotop:{
            value:parseInt(data.immotop),
            url:data.immotop_input,
            url_input:"immotop_input",
            agency:parseInt(data.immotop_agency),
        }};
    delete data.immotop;delete data.immotop_input;delete data.immotop_agency;

    marketing_data = {...marketing_data,wortimmo:{
            value:parseInt(data.wortimmo),
            url:data.wortimmo_input,
            url_input:"wortimmo_input",
            agency:parseInt(data.wortimmo_agency),
        }};
    delete data.wortimmo;delete data.wortimmo_input;delete data.wortimmo_agency;

    marketing_data = {...marketing_data,luxbazard:{
            value:parseInt(data.luxbazard),
            url:data.editus_lu_input,
            url_input:"editus_lu_input",
            agency:parseInt(data.luxbazard_agency),
        }};
    delete data.luxbazard;delete data.editus_lu_input;delete data.luxbazard_agency;

    marketing_data = {...marketing_data,immo_lu:{
            value:parseInt(data.immo_lu),
            url:data.immo_lu_input,
            url_input:"immo_lu_input",
            agency:parseInt(data.immo_lu_agency),
        }};
    delete data.immo_lu;delete data.immo_lu_input;delete data.immo_lu_agency;

    marketing_data = {...marketing_data,editus_lu:{
            value:parseInt(data.editus_lu),
            url:data.editus_lu_input,
            url_input:"editus_lu_input",
            agency:parseInt(data.editus_lu_agency),
        }};
    delete data.editus_lu;delete data.editus_lu_input;delete data.editus_lu_agency;

    marketing_data = {...marketing_data,editus_home:{
            value:parseInt(data.editus_home),
            url:data.editus_home_input,
            url_input:"editus_home_input",
            agency:parseInt(data.editus_home_agency),
        }};
    delete data.editus_home;delete data.editus_home_input;delete data.editus_home_agency;

    marketing_data = {...marketing_data,luxembourg_wort:{
            value:parseInt(data.luxembourg_wort),
            url:data.luxembourg_wort_input,
            url_input:"luxembourg_wort_input",
            agency:parseInt(data.luxembourg_wort_agency),
        }};
    delete data.luxembourg_wort;delete data.luxembourg_wort_input;delete data.luxembourg_wort_agency;

    marketing_data = {...marketing_data,distribution_flyers:{
            value:parseInt(data.distribution_flyers),
            url:data.distribution_flyers_input,
            url_input:"distribution_flyers_input",
            agency:parseInt(data.distribution_flyers_agency),
        }};
    delete data.distribution_flyers;delete data.distribution_flyers_input;delete data.distribution_flyers_agency;

    delete data.vitrine_agences;delete data.distribution_flyers_input;delete data.distribution_flyers_agency;

    data.marketing_data = marketing_data;
    return data;

};





/**
 * Function create and auto copy a property (restful api)
 * @param req
 * @param h
 * @returns {Promise<*>}
 */
exports.create = async (req, h) => {
    let actor_id = req.auth.credentials.user.id;
    let datas = req.payload;
    const actor = req.auth.credentials.user;
    const { action_copy } = datas;

    let properties_main;
    try {
        // object main property
        properties_main = Object.assign(datas.main_fields, datas.des_fields);
        properties_main = Object.assign(properties_main,
            {
                type: datas.type,
                kind_property: datas.kind_property,
                host_1: datas.host_1 || null,
                host_2: datas.host_2 || null,
                host_3: datas.host_3 || null,
            });
        let main_key = Object.keys(properties_main);
        delete properties_main.contract;
        for (let i = 0; i < main_key.length; i++) {
            if (typeof properties_main[main_key[i]] === "object") {
                properties_main[main_key[i]] = JSON.stringify(properties_main[main_key[i]]);
            }
            if (properties_main[main_key[i]] === "") {
                properties_main[main_key[i]] = null
            }
        }
        if (properties_main.type === property_config.type.RENT) {
            if (properties_main.status_mandate === property_config.status_property.rent.SOLD || properties_main.status_mandate === property_config.status_property.rent.CANCELLED) {
                properties_main.state = -1
            }
        } else {
            if (properties_main.status_mandate === property_config.status_property.sale.SOLD || properties_main.status_mandate === property_config.status_property.sale.CANCELLED) {
                properties_main.state = -1
            }
        }
        properties_main.created_by = actor_id;
        properties_main.code = Helper.propertyHelper.create_property_code();
        properties_main.updated_at = new Date();
        properties_main.created_date = Helper.dateHelper.getDateyyyymmdd();
    } catch (e) {
        console.log("ERROR---->MAIN");
    }

    let property_doc;
    try {
        // object document
        property_doc = datas.document_fields;
    } catch (e) {
        console.log("ERROR---->DOC");
    }

    let property_media;
    try {
        // object media
        property_media = datas.media_fields;
    } catch (e) {
        console.log("ERROR---->MEDIA");
    }

    let property_market;
    try {
        // object marketing
        property_market = datas.marketing_fields;
        property_market.urlYoutube = datas.media_fields.urlYoutube;
        let market_key = Object.keys(property_market);
        for (let i = 0; i < market_key.length; i++) {
            if (typeof property_market[market_key[i]] === "object") {
                property_market[market_key[i]] = JSON.stringify(property_market[market_key[i]]);
            }
        }
    } catch (e) {
        console.log("ERROR---->MARKET");
    }

    let property_location;
    try {
        // object location
        property_location = datas.location_fields;
        let location_key = Object.keys(property_location);
        for (let i = 0; i < location_key.length; i++) {
            if (typeof property_location[location_key[i]] === "object") {
                property_location[location_key[i]] = JSON.stringify(property_location[location_key[i]]);
            }
        }
    } catch (e) {
        console.log("ERROR---->LOCATION");
    }

    try {
        // object characteristic
        var property_character = datas.character_fields;
        let character_key = Object.keys(property_character);
        for (let i = 0; i < character_key.length; i++) {
            if (typeof property_character[character_key[i]] === "object") {
                property_character[character_key[i]] = JSON.stringify(property_character[character_key[i]]);
            }
        }
        delete property_character.detail_rooms;
    } catch (e) {
        console.log("ERROR---->CHARACTER");
    }


    try {
        // insert media to DB
        console.log("DOCUMENTS==-->",property_doc);
        const save_res = await this.save(req, properties_main, property_location, property_character, property_market, property_media, property_doc);

        var { property, docs_id } = save_res;

        //Copy this property
        if (action_copy) {
            properties_main.title_des = properties_main.title_des + " - COPY";
            const copy_res = this.save(req, properties_main, property_location, property_character, property_market, property_media, property_doc);
        }

        // send mail
        let mail_send_to = [
            {
                name: (actor.firstname !== null ? actor.firstname : "") + " " + (actor.lastname !== null ? actor.lastname : ""),
                address: actor.email
            }
        ];

        const admin = await Account.query().select('account.firstname', 'account.lastname', 'account.email').where('type', '=', 'admin').where('state', 1).skipUndefined();
        admin.map((item) => {
            mail_send_to.push({
                name: (item.firstname !== null ? item.firstname : "") + " " + (item.lastname !== null ? item.lastname : ""),
                address: item.email
            })
        });
        const host_id = JSON.parse(property.host_1);
        let contact = null;

        if (host_id.id !== null && host_id.id !== undefined && host_id.id !== "") {
            contact = await Contact.query().findById(host_id.id).where('state', 1).skipUndefined();
        }

        if (actor.type !== constants.USER_ROLES.PROMOTER && contact !== null && contact !== undefined) {
            mail_send_to.push({
                name: (contact.firstname !== null ? contact.firstname : "") + " " + (contact.lastname !== null ? contact.lastname : ""),
                address: contact.email
            })
        }

        try {
            const template = Config.get('/emailTemplate/createProperty');
            const mailer = req.server.plugins.mailer;
            const emailOptions =
            {
                subject: template.subject,
                to: mail_send_to,
            };
            const context = {
                property_title: (property.title_des !== null && property.title_des !== undefined) ? property.title_des : "",
                property_id: (property.code !== null && property.code !== undefined) ? property.code : "",
                websiteName: constants.WEB_NAME,
            }
            mailer.sendEmail(emailOptions, template.template, context)
        } catch (err) {
            console.log("---------------", err)
        }
        FindPropertyMatchHelper.getPropertyMatches(req);

        return {
            id: property.id || 0,
            docs_id: docs_id || null,
            properties_main: properties_main || null,
            property_media: property_media || null,
            property_market: property_market || null,
            property_location: property_location || null,
            property_character: property_character || null,
            property_doc: property_doc || null,
            property: property || null
        };
    } catch (err) {
        console.log("---------------", err)
        return Boom.boomify(err, { statusCode: 422 });
    };
};

/**
 * Function save property from data available
 * @param req
 * @param properties_main
 * @param property_location
 * @param property_character
 * @param property_market
 * @param property_media
 * @param property_doc
 * @returns {Promise<{property: *, location: *, character: *, marketing: *, property_media: *, docs_id}>}
 */
exports.save = async (req, properties_main, property_location, property_character, property_market, property_media, property_doc) => {

    // save main field property to DB
    const property = await Property.query().insert(properties_main);
    property_location.property_id = property.id;
    property_character.property_id = property.id;
    property_market.property_id = property.id;
    if (typeof property_location.floor !== "number") {
        property_location.floor = 0;
    };
    // insert media to DB
    const location = await Location.query().insert(property_location);
    // insert media to DB
    const character = await Character.query().insert(property_character);
    // insert media to DB
    const marketing = await Market.query().insert(property_market);

    // save image in media
    let check_imagePrimary = [];
    let property_media_images = property_media.images;

    const media_detail_imgs = property_media.images.map(async data => {
        check_imagePrimary.push(data.primaryImage);
        return {
            position: data.id,
            title: data.title,
            image:data.path,
            primaryImage: data.primaryImage,
            property_id: property.id || 0,
            created_date: Helper.dateHelper.getDateyyyymmdd()
        }
    });

    property_media = await Promise.all(media_detail_imgs);
    if (check_imagePrimary.indexOf(true) < 0 && property_media.length > 0) {
        property_media[0].primaryImage = "1"
    }

    // insert media to DB
    property_media = await Promise.all(property_media.map(data => {
        return Media.query().insert(data);
    }));


    //save documents
    let property_documents = await Promise.all(property_doc.map(async data => {
        data.property_id = property.id;
        data.created_date = Helper.dateHelper.getDateyyyymmdd();
        return doc_details = Documents.query().insert(data);
    }));


    return {
        property: property,
        location: location,
        character: character,
        marketing: marketing,
        property_media: property_media,
        property_documents: property_documents,
    }
};

/**
 * Function copy property from (restful api)
 * @param req
 * @param h
 * @returns {Promise<void>}
 */
exports.copy = async (req, h) => {
    // const actor =  req.auth.credentials.user.id;
    const property_id = req.params.id;

    const property_main = await Property.query().findById(property_id);
    const property_character = Character.query().where('property_id', property_id).first();
    const property_media = Media.query().where('property_id', property_id);
    const property_location = Location.query().where('property_id', property_id).first();;
    const property_marketing = Market.query().where('property_id', property_id).first();
    const property_reorder = ReOrder.query().where('property_id', property_id).where('state','=',1).skipUndefined().first();
    const property_document = Documents.query().where('property_id', property_id);

    const datas = [property_character, property_media, property_marketing, property_reorder, property_document, property_location];

    // get list data of property from tables
    const property_arr = await Promise.all(datas.map(async item => {
        item = await item;
        if (item !== undefined) {
            return {
                name: Array.isArray(item) ? (item.length > 0 ? item[0].constructor.name : '') : item.constructor.name,
                data: item
            };
        } else {
            return null;
        }
    }));
    let property = {};

    property_arr.map(item => {
        if (item !== null) {
            switch (item.name) {
                case 'Property_Character': {
                    property.property_character = item.data;
                    break;
                }
                case 'Property_Media': {
                    property.property_media = item.data;
                    break;
                }
                case 'Property_Market': {
                    property.property_marketing = item.data;
                    break;
                }
                case 'Documents': {
                    property.property_document = item.data;
                    break;
                }
                case 'Property_ReOrder': {
                    property.property_reorder = item.data;
                    break;
                }
                case 'Property_Location': {
                    property.property_location = item.data;
                    break;
                }
            }
        }
        return item;
    });
    property.property_main = property_main;

    this.copyProperty(req,property);
    return property;
};
/**
 * Function copy property from data available
 * @param req
 * @param property_data
 * @returns {Promise<null>}
 */
exports.copyProperty = async (req, property_data) => {
    const property_main = property_data.property_main;
    const property_character = property_data.property_character;
    const property_media = property_data.property_media;
    const property_location = property_data.property_location;
    const property_marketing = property_data.property_marketing;
    const property_document = property_data.property_document;
    const property_reorder = property_data.property_reorder;

    //insert to data base
    let property_save = 0;
    let final_save = [];
    if (property_main !== undefined) {
        delete property_main.id;
        property_main.created_date = Helper.dateHelper.getDateTimeZone();
        property_main.title_des = property_main.title_des + " - COPY";
        property_main.code = Helper.propertyHelper.create_property_code();
        property_save = await Property.query().insert(property_main);
        final_save.push(property_save);
    }
    if (property_character !== undefined) {
        delete property_character.id;
        property_character.property_id = property_save.id;
        const character_save = Character.query().insert(property_character);
        final_save.push(character_save);
    }
    if (property_media !== undefined) {
        delete property_media.id;
        if (property_media.length > 0) {
            const media_save = Promise.all(property_media.map(async item => {

                let timestamp = new Date().getTime();

                // copy file from src to new destination.
                let src = item.image;
                let destination = 'store/public/images/property/' + property_save.id + '/';
                let old_file = item.image;

                //handle get name of old file.
                old_file = old_file.split('/');
                let filename = timestamp + '_' + old_file[old_file.length - 1];

                try {
                    if (Helper.upload.copyFile(src, destination, filename)) {
                        delete item.id;
                        item.property_id = property_save.id;
                        item.image = destination + filename;
                        return await Media.query().insert(item);
                    }
                } catch (err) {
                    return Boom.boomify(err, { statusCode: 422 });
                }
            }));

            final_save.push(media_save);
        }
    }
    if (property_marketing !== undefined) {
        delete property_marketing.id;
        property_media.property_id = property_save.id;
        const market_save = Market.query().insert(property_marketing);
        final_save.push(market_save);
    }

    if (property_document !== undefined) {

        if (property_document.length > 0) {
            const document_save = Promise.all(property_document.map(async item => {

                let timestamp = new Date().getTime();

                // copy file from src to new destination.
                let src = item.file_doc;
                let destination = 'store/private/documents/' + property_save.id + '/';
                let old_file = item.file_doc;


                //handle get name of old file.
                old_file = old_file.split('/');
                old_file = old_file[old_file.length - 1];
                old_file = old_file.split('_');
                old_file.shift();
                let filename = timestamp + '_' + old_file.join('_');

                try {
                    if (Helper.upload.copyFile(src, destination, filename)) {
                        delete item.id;
                        item.property_id = property_save.id;
                        item.file_doc = destination + filename;
                        return await Documents.query().insert(item);
                    }
                } catch (err) {
                    return Boom.boomify(err, { statusCode: 422 });
                }
            }));
            final_save.push(document_save);
        }
    }
    if (property_location !== undefined) {
        delete property_location.id;
        property_location.property_id = property_save.id;
        const location_save = Location.query().insert(property_location);
        final_save.push(location_save);
    }
    if (property_reorder !== undefined) {
        delete property_reorder.id;
        property_reorder.property_id = property_save.id;
        const reorder_save = ReOrder.query().insert(property_reorder);
        final_save.push(reorder_save);
    }


    const _final = await Promise.all(final_save.map(async item => {
        item = await item;
        return item;
    }));


    return null;
};

/**
 * Function delete property (restful api)
 * @param req
 * @param h
 * @returns {Promise<*>}
 */
exports.delete = async (req, h) => {
    try {
        const actor = req.auth.credentials.user;
        const property = await Property.query().findById(req.params.id);
        if (property.created_by === actor.id && property !== 0) {
            const state = {
                state: 0
            }

            // send mail
            let mail_send_to = [];
            const host_id = JSON.parse(property.host_1);
            let contact = null;
            if (host_id.id !== null && host_id.id !== undefined && host_id.id !== "") {
                contact = await Contact.query().findById(host_id.id).where('state', 1).skipUndefined();
            }
            if (actor.type !== constants.USER_ROLES.PROMOTER && contact !== null && contact !== undefined) {
                mail_send_to.push({
                    name: (contact.firstname !== null ? contact.firstname : "") + " " + (contact.lastname !== null ? contact.lastname : ""),
                    address: contact.email
                })
            }
            const admin = await Account.query().select('account.firstname', 'account.lastname', 'account.email').where('type', '=', 'admin').where('state', 1).skipUndefined();
            admin.map((item) => {
                mail_send_to.push({
                    name: (item.firstname !== null ? item.firstname : "") + " " + (item.lastname !== null ? item.lastname : ""),
                    address: item.email
                })
            });
            try {
                const template = Config.get('/emailTemplate/deleteProperty');
                const constants = Config.get('/constants');
                const mailer = req.server.plugins.mailer;
                const emailOptions = {
                    subject: template.subject,
                    to: mail_send_to
                };
                const context = {
                    property_title: (property.title_des !== null && property.title_des !== undefined) ? property.title_des : "",
                    property_id: (property.code !== null && property.code !== undefined) ? property.code : "",
                    websiteName: constants.WEB_NAME,
                }
                mailer.sendEmail(emailOptions, template.template, context)
            } catch (err) {
                console.log('----------------------', err)
                // Logger.error("AccountController.create", err);
            }
            let delete_property = await Property.query().update(state).where('id', req.params.id);
            FindPropertyMatchHelper.getPropertyMatches(req);
            return delete_property;
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.log(Boom.boomify(err, { statusCode: 422 }))
        return Boom.boomify(err, { statusCode: 422 });
    }
};

/**
 * Function update a property (restful api)
 * @param req
 * @param h
 * @returns {Promise<*>}
 */
exports.update = async (req, h) => {
    let datas = req.payload;
    const actor = req.auth.credentials.user;
    const actor_id = req.auth.credentials.user.id;
    const property_data = await Property.query().findById(req.payload.id);
    if (property_data.created_by === actor.id && property_data !== 0) {
        // Change property status to SOLD.
        if (datas.reorder && datas.reorder.isSold && Helper.helper.isEmpty(datas.reorder)) {
            try {

                let _id = datas.reorder.id;
                delete datas.reorder.checkChange;
                delete datas.reorder.isSold;
                delete datas.reorder.isChange;
                Object.keys(datas.reorder).map(item => {
                    if (!datas.reorder[item]) {
                        delete datas.reorder[item]
                    }
                    if (typeof datas.reorder[item] === "boolean") {
                        datas.reorder[item] = datas.reorder[item] ? 1 : 0;
                    }
                    if (typeof datas.reorder[item] == "object") {
                        if (datas.reorder[item] && datas.reorder[item].length < 1) {
                            datas.reorder[item] = '';
                        } else {
                            datas.reorder[item] = JSON.stringify(datas.reorder[item]);
                        }
                    }
                    if (datas.reorder[item] === "") {
                        datas.reorder[item] = null;
                        delete datas.reorder[item]
                    }
                });
                if(actor.type === 'staff'){
                    datas.reorder.company_sell_id = actor.created_by
                }
                else {
                    datas.reorder.company_sell_id = actor.id
                }
                if (datas.reorder.is_solo) {
                    datas.reorder.buyer_id = null;
                    datas.reorder.buyer_profit = null;
                    //send mail
                    try {
                        console.log('11111111111111111111111111')
                        this.sendMailForContactAdmin(req.payload.id,actor,"SOLO",req)
                    }catch (e) {
                        console.log(e)
                    }
                }
                else {
                    if(datas.reorder.buyer_id !== null || datas.reorder.buyer_id !== "" || datas.reorder.buyer_id !== undefined){
                        datas.reorder.is_solo = 0;
                        datas.reorder.confirm_collaberate = property_config.types_confirm_collaberate.request_by_seller;
                        //send mail
                        try {
                            this.sendMailForAgencyAdmin(req.payload.id,actor,"REQUEST",req,datas.reorder.collaborators_id,datas.reorder.buyer_id)
                        }catch (e) {
                            console.log(e)
                        }
                    }
                }


                if (_id) {
                    delete datas.reorder.id;
                    const reorder = await ReOrder.query().update(datas.reorder).where('id', _id).where('state',1);
                } else {
                    datas.reorder.property_id = req.payload.id;
                    datas.reorder.created_by = actor_id;
                    const reorder = await ReOrder.query().insert(datas.reorder);
                }

                // const update_property = await Property.query().update({ status_mandate: 'SOLD' }).where('id', req.payload.id);
                if(property_data.status_mandate !== datas.main_fields.status_mandate && datas.main_fields.status_mandate!== undefined){

                    const update_property = await Property.query().update({ status_mandate: datas.main_fields.status_mandate }).where('id', req.payload.id);
                }

                // return {
                //     id: req.payload.id
                // }
            } catch (err) {
                console.log('--------------------',err)
                return Boom.boomify(err, { statusCode: 422 });
            }
        }
        let property_main;
            try {
                property_main = Object.assign(datas.main_fields, datas.des_fields);
                property_main = Object.assign(property_main,
                    {
                        host_1: datas.host_1 || null,
                        host_2: datas.host_2 || null,
                        host_3: datas.host_3 || null,
                    });
                if (property_main.host_1.id === "") {
                    delete property_main.host_1
                }
                if (property_main.host_2.id === "") {
                    delete property_main.host_2
                }
                if (property_main.host_3.id === "") {
                    delete property_main.host_3
                }
                delete property_main.contract;
                let main_key = Object.keys(property_main);
                property_main.updated_at = new Date();
                for (let i = 0; i < main_key.length; i++) {
                    if (typeof property_main[main_key[i]] === "object") {
                        property_main[main_key[i]] = JSON.stringify(property_main[main_key[i]]);
                    }
                }
                let property_doc;
                try {
                    // object document
                    property_doc = datas.document_fields;
                    // create file image

                } catch (e) {
                    console.log("ERROR---->DOC");
                }
                let property_media
                try {
                    // object media
                    property_media = datas.media_fields;

                } catch (e) {
                    console.log("ERROR---->MEDIA");
                }
                let property_market;
                try {
                    // object marketing
                    property_market = datas.marketing_fields;
                    property_market.urlYoutube = datas.media_fields.urlYoutube;
                    let market_key = Object.keys(property_market);
                    for (let i = 0; i < market_key.length; i++) {
                        if (typeof property_market[market_key[i]] === "object") {
                            property_market[market_key[i]] = JSON.stringify(property_market[market_key[i]]);
                        }
                    }
                } catch (e) {
                    console.log("ERROR---->MARKET");
                }

                let property_location;
                try {
                    // object location
                    property_location = datas.location_fields;
                    if (typeof property_location.floor !== "number") {
                        delete property_location.floor;
                    }
                    ;
                    let location_key = Object.keys(property_location);
                    for (let i = 0; i < location_key.length; i++) {
                        if (typeof property_location[location_key[i]] === "object") {
                            property_location[location_key[i]] = JSON.stringify(property_location[location_key[i]]);
                        }
                    }
                } catch (e) {
                    console.log("ERROR---->LOCATION", e);
                }
                let property_character;
                try {
                    /*
                     * object characteristic
                     */
                    property_character = datas.character_fields;
                    let character_key = Object.keys(property_character);
                    for (let i = 0; i < character_key.length; i++) {
                        if (typeof property_character[character_key[i]] === "object") {
                            property_character[character_key[i]] = JSON.stringify(property_character[character_key[i]]);
                        }
                    }
                    delete property_character.detail_rooms;
                } catch (e) {
                    console.log("ERROR---->CHARACTER");
                }
                // delete doc
                let detele_doc = datas.doc_delete
                if (detele_doc.length > 0) {
                    const remove_doc = await Documents.query()
                        .delete()
                        .whereIn('id', detele_doc)
                }
                if (datas.marketing_fields.urlYoutube === undefined) {
                    delete datas.marketing_fields.urlYoutube;
                }
                if(property_main.status_mandate !== undefined){
                    if(property_main.status_mandate !== property_config.type_mandate.negotiating && property_main.status_mandate !== property_config.type_mandate.sold_success && property_main.status_mandate !== property_config.type_mandate.sold){
                        try{
                            // console.log('-------------------------------ERROR:>11111111111111111111')
                            const reorder = await ReOrder.query().update({state : 0}).where('property_id', req.payload.id);
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                }
                const property = await Property.query().update(property_main).where('id', req.payload.id);
                let docs_id;
                try {
                    if (Helper.helper.isEmpty(property_location)) {
                        const location = await Location.query().update(property_location).where('property_id', req.payload.id);
                    }
                    if (Helper.helper.isEmpty(property_character)) {
                        const character = await Character.query().update(property_character).where('property_id', req.payload.id);
                    }
                    if (Helper.helper.isEmpty(datas.marketing_fields)) {

                        let host_id = JSON.parse(property_data.host_1);
                        let contact = null;
                        let mail_send_to = [];
                        if (property_main.host_1 !== null && property_main.host_1 !== undefined) {
                            host_id = JSON.parse(property_main.host_1);
                        }
                        if (host_id.id !== null && host_id.id !== undefined && host_id.id !== "") {
                            contact = await Contact.query().select('contact.firstname', 'contact.email', 'contact.lastname').findById(host_id.id).where('state', 1).skipUndefined();
                        }
                        if (contact !== null && contact !== undefined) {
                            mail_send_to.push({
                                name: (contact.firstname !== null ? contact.firstname : "") + " " + (contact.lastname !== null ? contact.lastname : ""),
                                address: contact.email
                            })
                        }
                        else if (actor.type === constants.USER_ROLES.PROMOTER) {
                            mail_send_to.push({
                                name: (actor.firstname !== null ? actor.firstname : "") + " " + (actor.lastname !== null ? actor.lastname : ""),
                                address: actor.email
                            })
                        }
                        try {
                            const template = Config.get('/emailTemplate/updateMarketingProperty');
                            const mailer = req.server.plugins.mailer;
                            const emailOptions =
                            {
                                subject: template.subject,
                                to: mail_send_to,
                            };
                            const context = {
                                property_id:(property_data.code !== null && property_data.code !== undefined) ? property_data.code : "",
                                websiteName: constants.WEB_NAME,
                            }
                            mailer.sendEmail(emailOptions, template.template, context)
                        } catch (err) {
                            console.log('-------------------------------ERROR:>', err)
                        }

                        const marketing = await Market.query().update(datas.marketing_fields).where('property_id', req.payload.id);
                    }


                    /*
                     * remove image unused
                     */
                    console.log("image use===>",property_media.images);
                    let listIdImageUse = [];
                    for (let i = 0; i < property_media.images.length; i++) {
                        if (property_media.images[i].property_id && property_media.images[i].state > 0) {
                            listIdImageUse.push(property_media.images[i].id)
                        }
                    }
                    console.log("id image use===>",listIdImageUse);
                    if (listIdImageUse.length > 0) {
                        const removeImageUnused = await Media
                            .query()
                            .delete()
                            .whereNotIn('id', listIdImageUse)
                            .andWhere('property_id', '=', req.payload.id);
                    }else{
                        await  Media.query().delete().where('property_id','=',req.payload.id)
                    }


                    /*
                     * save image in media
                     */
                    const media_detail_imgs = property_media.images.map(data => {

                        //insert and save new image
                        if (!data.property_id) {
                            return {
                                position: data.id,
                                title: data.title,
                                image:data.path,
                                primaryImage: data.primaryImage,
                                owned_by:data.owned_by,
                                property_id: req.payload.id || 0,
                                created_date: Helper.dateHelper.getDateyyyymmdd()
                            }
                        }
                        // update old data
                        else {
                            return {
                                isUpdate: true,
                                property_id: data.property_id,
                                primaryImage: data.primaryImage,
                                title: data.title,
                                id: data.id
                            }
                        }
                    });
                    // property_media = await Promise.all(media_detail_imgs);


                    // insert media to DB
                    await Promise.all(media_detail_imgs.map(async data => {
                        if (data.isUpdate) {
                            id = data.id;
                            delete data.id;
                            delete data.isUpdate;
                            return Media.query().update(data).where('id', id);
                        } else {
                            delete  data.owned_by;
                            return Media.query().insert(data)
                        }
                    }));

                    /*
                     * save documents
                     */
                    docs_id = await Promise.all(property_doc.map(async data => {
                        data.property_id = req.payload.id;
                        data.created_date = Helper.dateHelper.getDateyyyymmdd();
                        let data_by = data.by;
                        delete data.by;
                        delete data.file;
                        let doc_details = await Documents.query().insert(data);
                        return {
                            id: doc_details.id,
                            by: data_by || data.kind
                        }
                    }));


                } catch (err) {
                    console.log('--------------media', err);
                }
                FindPropertyMatchHelper.getPropertyMatches(req);

                if(datas.action_copy === true){
                    req.params.id = req.payload.id;
                    this.copy(req,h);
                }

                return {
                    id: req.payload.id,
                    docs_id: docs_id || null,

                };
            } catch (err) {
                return Boom.boomify(err, { statusCode: 422 });
            }
        // }
    }
    else {
        return false;
    }
};

/**
 * Function cancel a property by user .
 * @param req
 * @param h
 * @return {Promise<T | never>}
 */
exports.cancel = async (req, h) => {
    const actor = req.auth.credentials.user;
    const payload = req.payload;
    const _id = req.params.id;
    let email_template = Config.get('/emailTemplate/cancelProperty');
    let emailAdmin = Config.get('/emailAdmin');
    const data = {
        status_mandate: payload.status_mandate,
        cancel_reason: payload.cancel_reason,
    };

    const property = await Property.query().findById(_id);

    let email_context = {
        agency_name: actor.firstname + " " + actor.lastname,
        property_title: property.title_des,
        cancel_reason: payload.cancel_reason,
    };


    return Property.query().update(data).where('id', _id)
        .then(res => {
            Helper.notify.sendMail(email_template, [{ name: 'Admin', address: emailAdmin }], email_context, req);
            return res;
        })
        .catch(err => {
            return Boom.boomify(err, { statusCode: 422 })
        })
};

/**
 * Function print property PDF with PDFShift library
 * @param req
 * @param h
 * @return {Promise<*>}
 */
exports.printFilePDF = async (req, h) => {
    let id = req.query.id;
    let type_print = req.query.type_print;

    try {
        const property = await Property.query().select('property.*', 'account.*')
            .findById(id)
            .leftJoin('account', function () {
                this.on('account.id', '=', 'property.created_by');
            })
            .where('property.state', '<>', 0)
            .skipUndefined();
        const character = await Character.query().where('property_id', id).skipUndefined();
        let category = []
        if (character[0].facilityDetails !== null && character[0].facilityDetails !== undefined && character[0].facilityDetails !== "null") {
            category = await Category.query().whereIn('id', character[0].facilityDetails.split(',')).where('parent_id', 146)

        }
        const location = await Location.query().select('property_location.*', 'city.title as title_town', 'regions.title as title_area')
            .where({ 'property_id': id })
            .leftJoin('city', function () {
                this.on('city.id', '=', 'property_location.town');
            })
            .leftJoin('regions', function () {
                this.on('regions.id', '=', 'property_location.area');
            }).first()
            .skipUndefined();
        const media = await Media.query().where({ 'property_id': id }).orderBy('primaryImage', 'desc').skipUndefined();
        if (property === null || property === undefined) {
            return null;
        }
        let data_category = [];
        await category.map((item) => {
            data_category.push(item.title)
        }
        );
        let data_image = [];
        await media.map((item) => {
            data_image.push(item.image)
        });
        await property_config.title_mandate.map((item) => {
            if (property.status_mandate === item.value) {
                property.status_mandate = item.label
            }
        });

        let data = {
            sub_type_property: property.sub_type_property,
            sector:  location.sector!==""?location.sector.charAt(0).toUpperCase() + location.sector.slice(1):'',
            town: location.title_town,
            street_name: location.street_name,
            number_pay: property.number_pay,
            color: JSON.parse(property.color),
            status_mandate: property.status_mandate,
            logo: property.logo,
            reason_social: property.reason_social,
            address: property.address,
            code_postal: property.postalcode,
            ville: property.city,
            telephone: property.telephone,
            email: property.email,
            images: data_image,
            number_bedroom: character[0].number_bedroom,
            number_bathroom: character[0].number_bathroom,
            living_space: property.living_space,
            park_inside: property.park_inside,
            total_area_building: property.total_area_building,
            code: property.code,
            date_avai: moment(new Date(property.date_avai)).format('DD/MM/YYYY'),
            energy_efficiency: JSON.parse(property.energy_efficiency),
            category: data_category.join(','),
            outdoor_space: property.outdoor_space == 0 ? "Non" : "Oui",
            des_pro: property.des_pro,
        };

        let path = await Helper.propertyHelper.create_pdf_brochure(id,data,type_print);
        return path

    }
    catch (err) {
        console.log(Boom.boomify(err, { statusCode: 422 }))
        return Boom.boomify(err, { statusCode: 422 });
    }
};


/**
 * Function upload Property images
 * Upload 1 or multiple images once
 * @param req
 * @return {Promise<*>}
 */
exports.uploadImagesProperty = async req =>{
    try{
        let files = req.payload;
        let keys_image = Object.keys(files);
        let day = Helper.dateHelper.getDateTimeZone('now','MM.DD');
        const paths =  await Promise.all(keys_image.map(item=>{
            let path = Helper.upload.uploadFile(files[item]._data,files[item].hapi.filename,'store/public/images/property/'+day.toString());
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

/**
 * Function upload file of Property
 * Upload single file once
 * file has structured  {fileType:fileData}
 * @param req
 * @return {Promise<*>}
 */
exports.uploadDocumentsProperty = async req =>{
    try{
        let file = req.payload;
        console.log("file=======>",file);
        let key = Object.keys(file)[0];
        let day = Helper.dateHelper.getDateTimeZone('now','MM.DD');
        let path_store = 'store/private/documents/properties/property/';

        const path =  Helper.upload.uploadFile(file[key]._data,file[key].hapi.filename,path_store+day.toString()+'');
        return path;
    }catch (err) {
        return Boom.boomify(err,{statusCode:422})
    }
};

/**
 * Function upload file offer of Property
 * Upload single file once
 * file has structured  {fileType:fileData}
 * @param req
 * @return {Promise<*>}
 */
exports.uploadOfferDocuments = async req =>{
    try{
        const actor_id = req.auth.credentials.user.id;
        const file = req.payload;
        console.log("file==========>",file);
        const id = req.params.id;
        const key = Object.keys(file)[0];
        const day = Helper.dateHelper.getDateTimeZone('now','MM.DD');
        let path_store = 'store/private/documents/properties/property/';
        if(key === "docVisit"){
            path_store = 'store/private/documents/properties/docVisit/'+id+'/';
        }else if(key === "docPurchase"){
            path_store = 'store/private/documents/properties/docPurchase/'+id+'/'+actor_id+'/';
        }
        const path =  Helper.upload.uploadFile(file[key]._data,file[key].hapi.filename,path_store+day.toString()+'/'+actor_id);

        let data = {
            property_id:id,
            kind:key,
            file_doc:path,
            uploaded_by: actor_id,
            created_date:Helper.dateHelper.getDateyyyymmdd()
        };

        const check_exist = await Documents.query().select("id")
            .where({
                property_id:id,
                uploaded_by:actor_id,
                kind:key}).first().skipUndefined();

        console.log("check_exist=========>",check_exist);
        if(check_exist !== undefined && check_exist.id !== null ){
             data = {
                file_doc:path,
                uploaded_by: actor_id,
                created_date:Helper.dateHelper.getDateyyyymmdd()
            };
             return Documents.query().update(data).where({id:check_exist.id}).then(res=>{
                 return res;
             })
        }else{
            return Documents.query().insert(data).then(res=>{
                return res;
            });
        }
    }catch (err) {
        return Boom.boomify(err,{statusCode:422})
    }
};







exports.confirmCollaberate = async req =>{
    let id = req.params.id;
    const actor = req.auth.credentials.user;
    let reorder = await ReOrder.query().where({ 'property_id': id,'state' : 1 }).skipUndefined();
    reorder = reorder[0];

    if(actor.id === reorder.buyer_id){
        let type_confirm = property_config.types_confirm_collaberate.confirm_by_buyer;
        let reorderUpdate = await ReOrder.query().update({confirm_collaberate : type_confirm}).where('id',reorder.id);
        //send mail
        try {
            this.sendMailForAgencyAdmin(id,actor,"CONFIRM",req,reorder.company_sell_id,reorder.seller_id)
        }catch (e) {
            console.log(e)
        }
        return true;
    }
    return false;

};
exports.vadidateCollaberate = async req =>{
    let id = req.params.id;
    const actor = req.auth.credentials.user;
    let reorder = await ReOrder.query().where({ 'property_id': id, 'state' : 1 }).skipUndefined();
    reorder = reorder[0];
    if(actor.id === reorder.seller_id && reorder.confirm_collaberate ===  property_config.types_confirm_collaberate.confirm_by_buyer){
        const reorderUpdate = await ReOrder.query().update({confirm_collaberate : property_config.types_confirm_collaberate.vadidate_by_seller}).where('id',reorder.id);
        //send mail
        try {
            this.sendMailForContactAdmin(id,actor,"VADIDATE",req)
        }catch (e) {
            console.log(e)
        }
        return true;
    }

    return false;

};
exports.sendMailForContactAdmin = async (property_id,actor,type,req) =>{
    const property = await Property.query().findById(property_id).skipUndefined();
    // send mail
    let mail_send_to = [
        {
            name: (actor.firstname !== null ? actor.firstname : "") + " " + (actor.lastname !== null ? actor.lastname : ""),
            address: actor.email
        }
    ];

    const admin = await Account.query().select('account.firstname', 'account.lastname', 'account.email').where('type', '=', 'admin').where('state', 1).skipUndefined();
    admin.map((item) => {
        mail_send_to.push({
            name: (item.firstname !== null ? item.firstname : "") + " " + (item.lastname !== null ? item.lastname : ""),
            address: item.email
        })
    });
    const host_id = JSON.parse(property.host_1);
    let contact = null;

    if (host_id.id !== null && host_id.id !== undefined && host_id.id !== "") {
        contact = await Contact.query().findById(host_id.id).where('state', 1).skipUndefined();
    }

    if (actor.type !== constants.USER_ROLES.PROMOTER && contact !== null && contact !== undefined) {
        mail_send_to.push({
            name: (contact.firstname !== null ? contact.firstname : "") + " " + (contact.lastname !== null ? contact.lastname : ""),
            address: contact.email
        })
    }

    try {
        let template = null;
        if(type === "VADIDATE"){
            template = Config.get('/emailTemplate/collaborateVadidate');
        }
        if(type === "SOLO"){
            template = Config.get('/emailTemplate/collaborateSolo');
        }
        const mailer = req.server.plugins.mailer;
        const emailOptions =
            {
                subject:  (actor.lastname !== null ? actor.lastname : "") + " " + template.subject + " " + ((property.code !== null && property.code !== undefined) ? property.code : ""),
                to: mail_send_to,
            };
        const context = {
            property_title: (property.title_des !== null && property.title_des !== undefined) ? property.title_des : "",
            property_id: (property.code !== null && property.code !== undefined) ? property.code : "",
            name:(actor.firstname !== null ? actor.firstname : "") + " " + (actor.lastname !== null ? actor.lastname : ""),
            websiteName: constants.WEB_NAME,
        }
        mailer.sendEmail(emailOptions, template.template, context)
    } catch (err) {
        console.log("---------------", err)
    }

}
exports.sendMailForAgencyAdmin = async (property_id,actor,type,req,agency_id,staff_id) =>{
    const property = await Property.query().findById(property_id).skipUndefined();
    const agency = await Account.query().findById(agency_id).skipUndefined();
    // send mail
    let mail_send_to = [
        {
            name: (agency.firstname !== null ? agency.firstname : "") + " " + (agency.lastname !== null ? agency.lastname : ""),
            address: agency.email
        }
    ];
    if(agency_id !== staff_id){
        const staff = await Account.query().findById(staff_id).skipUndefined();
        mail_send_to.push({
            name: (staff.firstname !== null ? staff.firstname : "") + " " + (staff.lastname !== null ? staff.lastname : ""),
            address: staff.email
        })
    }
    const admin = await Account.query().select('account.firstname', 'account.lastname', 'account.email').where('type', '=', 'admin').where('state', 1).skipUndefined();
    admin.map((item) => {
        mail_send_to.push({
            name: (item.firstname !== null ? item.firstname : "") + " " + (item.lastname !== null ? item.lastname : ""),
            address: item.email
        })
    });


    try {
        let template = null;
        if(type === "REQUEST"){
            template = Config.get('/emailTemplate/collaborateRequest');
        }
        if(type === "CONFIRM"){
            template = Config.get('/emailTemplate/collaborateConfirm');
        }
        const mailer = req.server.plugins.mailer;
        const emailOptions =
            {
                subject:  (actor.lastname !== null ? actor.lastname : "") +" " + template.subject + " " + ((property.code !== null && property.code !== undefined) ? property.code : ""),
                to: mail_send_to,
            };
        const context = {
            property_title: (property.title_des !== null && property.title_des !== undefined) ? property.title_des : "",
            property_id: (property.code !== null && property.code !== undefined) ? property.code : "",
            name:(actor.firstname !== null ? actor.firstname : "") + " " + (actor.lastname !== null ? actor.lastname : ""),
            websiteName: constants.WEB_NAME,
        }
        mailer.sendEmail(emailOptions, template.template, context)
    } catch (err) {
        console.log("---------------", err)
    }
};



exports.updateMarketingUrl = async (req) =>{
    try{
        const actor_id = req.auth.credentials.user.id;
        const payload = req.payload;
        const id = req.params.id;
        return Market.query().update(payload).where("property_id",id).then(res=>{
            return res;
        }).catch(err=>{
            return Boom.boomify(err,{statusCode:422})
        })
    }catch (e) {
        return Boom.boomify(e,{statusCode:422})
    }
};
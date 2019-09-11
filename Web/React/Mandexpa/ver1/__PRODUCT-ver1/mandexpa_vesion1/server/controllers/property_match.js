const Knex = require("knex");
const Boom = require("boom");
const fs = require('fs');
const hogan = require('hogan.js')
const moment = require("moment");
const Property_match = require("../models/property_match");
const Property = require("../models/propertyModel/property");
const Constants_params =  require("../config/constants-params");
const Config_Property = require('../config/objectConfig/propertyConfig');
const Config = require('../config');
const Helper = require('../helpers');
var Contact = require('../models/contact');
var List_property_matches = require('../models/list_property_matches');
const maxNumber = Math.pow(10,10);
const minNumber = -Math.pow(10,10);



exports.create = async (req,h) => {
    const actor_id = req.auth.credentials.user.id;
    const payload = req.payload;
    payload.created_by = actor_id;
    payload.date_avai = moment(payload.date_avai).format("YYYY/MM/DD");
    payload.created_date = moment(new Date()).format("YYYY/MM/DD");
    Object.keys(payload).map(item=>{
        if(payload[item] === "" || (typeof payload[item] ==="object"&&!payload[item].length && payload[item].length !== undefined)){
            delete payload[item];
        }
        if(typeof payload[item] ==="object"){
            if(payload[item].length < 1){
                payload[item] = '';
            }else{
                payload[item] =  JSON.stringify(payload[item]);
            }

        }
        if(typeof payload[item] ==="boolean"){
            payload[item] = payload[item]?"1":"0";
        }
    });
    payload.created_date =  Helper.dateHelper.getDateyyyymmdd();

    return  await Property_match.query().insert(payload).then(data => {
        return data;
    }).catch((err) => {
        console.log(err);
        return Boom.boomify(err, { statusCode: 422 });
    });
};

// get list of property_match
exports.list = async(req, h) => {
    let id =req.auth.credentials.user.id;
    let queryBuilder = Property_match.query().select('property_match.*').from('property_match');
    let stringQueryArr = ['type_property','type_construction'];
    Object.keys(req.query).map(key => {
        if(stringQueryArr.indexOf(key) >= 0) {
            console.log('key',key);
            queryBuilder.where(key, 'like', '%'+req.query[key]+'%');
        }
    });
    try{
        queryBuilder.where('property_match.created_by',id)
        if(req.query['min_currency']!==undefined && req.query['max_currency']===undefined){

            queryBuilder.where('price_min', '>=',parseInt(req.query['min_currency']));
        }
        else if(req.query['min_currency'] ===undefined && req.query['max_currency']!==undefined){

            queryBuilder.where('price_max', '<=',parseInt(req.query['max_currency']));
        }
        else if (req.query['min_currency'] !==undefined && req.query['max_currency']!==undefined){

            queryBuilder.where('price_min', '>=',parseInt(req.query['min_currency']));
            queryBuilder.where('price_max', '<=',parseInt(req.query['max_currency']));
        }
        //
        if(req.query['surface_min']!==undefined && req.query['surface_max']===undefined){
            queryBuilder.where('living_space_min', '>=',parseInt(req.query['surface_min']));
        }
        else if(req.query['surface_min'] ===undefined && req.query['surface_max']!==undefined){
            queryBuilder.where('living_space_max', '<=',parseInt(req.query['surface_max']));
        }
        else if (req.query['surface_min'] !==undefined && req.query['surface_max']!==undefined){
            queryBuilder.where('living_space_min', '>=',parseInt(req.query['surface_min']));
            queryBuilder.where('living_space_max', '<=',parseInt(req.query['surface_max']));
        }
        //
        if(req.query['number_bedroom_min']!==undefined && req.query['number_bedroom_max']===undefined){
            queryBuilder.where('bedrooms_min', '>=',parseInt(req.query['number_bedroom_min']));
        }
        else if(req.query['surface_min'] ===undefined && req.query['number_bedroom_max']!==undefined){
            queryBuilder.where('bathrooms_max', '<=',parseInt(req.query['number_bedroom_max']));
        }
        else if (req.query['number_bedroom_min'] !==undefined && req.query['surface_max']!==undefined){
            queryBuilder.where('bedrooms_min', '>=',parseInt(req.query['number_bedroom_min']));
            queryBuilder.where('bathrooms_max', '<=',parseInt(req.query['number_bedroom_max']));
        }


        let data = await  queryBuilder.orderBy('property_match.id').skipUndefined();
        var list_property_match = [];
        await Promise.all(data.map(  async (item)=>{
                let id = item.id;
                item.list_matches = 0;
                let subquery = List_property_matches.query().max('id').groupBy('property_matches_id');
                let new_propertys = 0;
                let number_property_matches = 0;
                const listProperty =  await List_property_matches.query().select('list_property_matches.ids_match','list_property_matches.state')
                    .where('property_matches_id','=',id)
                    .whereIn('id',subquery);

                // get number property matches
                item.list_matches = listProperty.ids_match;


                if(listProperty[0] !== undefined){
                    number_property_matches =  listProperty[0].ids_match.split(',').length;
                    if(listProperty[0].state === 0 ){
                        let subquery1 =  List_property_matches.query().max('id').where('state','=',1).groupBy('property_matches_id');
                        const listPropertyUserMatch =  await List_property_matches.query().select('list_property_matches.ids_match')
                            .where('property_matches_id','=',id)
                            .whereIn('id',subquery1);
                        if(listPropertyUserMatch[0] !== undefined){
                            let propertys_system_match = (listProperty[0].ids_match).split(',');
                            let propertys_user_match = (listPropertyUserMatch[0].ids_match).split(',');
                            let propertys = propertys_system_match.filter((item) => !propertys_user_match.includes(item));

                            if(propertys !== undefined){
                                new_propertys = propertys.length;
                            }
                        }else{
                            new_propertys = listProperty[0].ids_match.split(',').length
                        }
                    }
                }else{

                }
                item.new_propertys = new_propertys;
                item.list_matches = number_property_matches;
                list_property_match.push(item)
        }
        ));

        return list_property_match

    }
    catch (err) {
        console.log(err)
        return Boom.boomify(err, { statusCode: 422 });
    }
};

// get data for edit function

exports.get = async (req,h)=>{
    var id = req.auth.credentials.user.id;
    var property_matches_id = req.params.id;
    const property_match = await Property_match.query()
        .where("id",property_matches_id)
        .andWhere("created_by",id)
        .skipUndefined()
        .catch(err=>{
            return Boom.boomify(err, {statusCode: 422});
        });
    // property_match[0].more_infor =  property_match[0].more_infor.split(",");
    return property_match[0];



};

// update fields property matches

exports.update = async (req,h)=>{
    var id = req.auth.credentials.user.id;
    var datas = req.payload;
    var data_id =datas.id;
    Object.keys(datas).map(item=>{
        if(typeof datas[item] ==="boolean"){
            datas[item] = datas[item]?1:0;
        }
        if(typeof datas[item] == "object" ){
            if(datas[item].length < 1){
                datas[item] = '';
            }else{
                datas[item] =  JSON.stringify(datas[item]);
            }
        }
        if(datas[item] === ""){
            datas[item] = null
        }

    });
    delete  datas.id;
    return await Property_match.query().update(datas).where("id",data_id)
        .then(data=>{
            return data
        })
        .catch(err=>{
            return Boom.boomify(err, {statusCode: 422});
        })
};


// Check list Matching property matches

exports.matching = async (req,h)=>{
    var id = req.auth.credentials.user.id;
    const actor =  req.auth.credentials.user;
    try{
        var propMatches_id = req.params.id;
        const propMatchesDetail = await Property_match.query().findById(propMatches_id).skipUndefined();
        var criterias = JSON.parse(propMatchesDetail.criterias);


        var queryBuilder = Property.query().select('property.id as _id','property.*', 'property_location.*','property_characteristic.*','property_media.*').from('property');
        queryBuilder.leftJoin('property_location', 'property.id', 'property_location.property_id');
        queryBuilder.leftJoin('property_characteristic', 'property.id', 'property_characteristic.property_id');
        queryBuilder.leftJoin('property_media',function () {
            this.on('property.id', 'property_media.property_id');
            this.on("property_media.primaryImage",1);
        });
        queryBuilder.where("property.created_by","<>",id);
        queryBuilder.where("property.status_mandate","<>",'SOLD');
        queryBuilder.where("property.status_mandate","<>",'CANCELLED');
        queryBuilder.where("property.status_mandate","<>",'BOOKED');
        queryBuilder.where("property.status_mandate","<>",'NEGOTIATING');
        queryBuilder.where("property.status_mandate","<>",'SOLD_SUCCESS');
        queryBuilder.where("property.state",1);
        queryBuilder.andWhere(function () {
            // Find property by all condition filled
            if(propMatchesDetail.search_type === Constants_params.property_match_search_type.SEARCH_ALL_FIELD){

                if(propMatchesDetail.rooms_min || propMatchesDetail.rooms_max){
                    // console.log("====>number_room");
                    propMatchesDetail.rooms_min = propMatchesDetail.rooms_min?propMatchesDetail.rooms_min:minNumber;
                    propMatchesDetail.rooms_max = propMatchesDetail.rooms_max?propMatchesDetail.rooms_max:maxNumber;
                    this.whereBetween('number_room',[propMatchesDetail.rooms_min,propMatchesDetail.rooms_max]);

                }
                if(propMatchesDetail.bathrooms_min || propMatchesDetail.bathrooms_max){
                    // console.log("====>number_bathroom");
                    propMatchesDetail.bathrooms_min = propMatchesDetail.bathrooms_min?propMatchesDetail.bathrooms_min:minNumber;
                    propMatchesDetail.bathrooms_max = propMatchesDetail.bathrooms_max?propMatchesDetail.bathrooms_max:maxNumber;
                    this.whereBetween('number_bathroom',[propMatchesDetail.bathrooms_min,propMatchesDetail.bathrooms_max])
                }
                if(propMatchesDetail.bedrooms_min || propMatchesDetail.bedrooms_max){
                    console.log("====>number_bedroom");
                    propMatchesDetail.bedrooms_min = propMatchesDetail.bedrooms_min?propMatchesDetail.bedrooms_min:minNumber;
                    propMatchesDetail.bedrooms_max = propMatchesDetail.bedrooms_max?propMatchesDetail.bedrooms_max:maxNumber;
                    this.whereBetween('number_bedroom',[propMatchesDetail.bedrooms_min,propMatchesDetail.bedrooms_max])
                }
                if(propMatchesDetail.separate_wc_min || propMatchesDetail.separate_wc_max){
                    // console.log("====>number_wc");
                    propMatchesDetail.separate_wc_min = propMatchesDetail.separate_wc_min?propMatchesDetail.separate_wc_min:minNumber;
                    propMatchesDetail.separate_wc_max = propMatchesDetail.separate_wc_max?propMatchesDetail.separate_wc_max:maxNumber;
                    this.whereBetween('number_wc',[propMatchesDetail.separate_wc_min,propMatchesDetail.separate_wc_max])
                }
                if(propMatchesDetail.living_space_min || propMatchesDetail.living_space_max){
                    // console.log("====>living_space");
                    propMatchesDetail.living_space_min = propMatchesDetail.living_space_min?propMatchesDetail.living_space_min:minNumber;
                    propMatchesDetail.living_space_max = propMatchesDetail.living_space_max?propMatchesDetail.living_space_max:maxNumber;
                    this.whereBetween('living_space',[propMatchesDetail.living_space_min,propMatchesDetail.living_space_max])
                }
                if(propMatchesDetail.floor_property_min || propMatchesDetail.floor_property_max){
                    // console.log("====>number_floors_building");
                    propMatchesDetail.floor_property_min = propMatchesDetail.floor_property_min?propMatchesDetail.floor_property_min:minNumber;
                    propMatchesDetail.floor_property_max = propMatchesDetail.floor_property_max?propMatchesDetail.floor_property_max:maxNumber;
                    this.whereBetween('number_floors_building',[propMatchesDetail.floor_property_min,propMatchesDetail.floor_property_max])
                }

                if(propMatchesDetail.price_min || propMatchesDetail.price_max){
                    // console.log("====>price");
                    
                    propMatchesDetail.price_min = propMatchesDetail.price_min?propMatchesDetail.price_min:minNumber;
                    propMatchesDetail.price_max = propMatchesDetail.price_max?propMatchesDetail.price_max:maxNumber;
                    this.whereBetween('number_pay',[parseInt(propMatchesDetail.price_min),parseInt(propMatchesDetail.price_max)])
                }
                if(propMatchesDetail.area_min || propMatchesDetail.area_max){
                    propMatchesDetail.area_min = propMatchesDetail.area_min?propMatchesDetail.area_min:minNumber;
                    propMatchesDetail.area_max = propMatchesDetail.area_max?propMatchesDetail.area_max:maxNumber;
                    this.whereBetween('total_area_building',[propMatchesDetail.area_min,propMatchesDetail.area_max])
                }
                if(propMatchesDetail.sector ){
                    // console.log("====>sector");
                    this.where('sector',propMatchesDetail.sector);
                }
                if(propMatchesDetail.outdoor_space ){
                    // console.log("====>outdoor_space");
                    this.where('outdoor_space',propMatchesDetail.outdoor_space);
                }
                if(propMatchesDetail.kind_property ){
                    // console.log("====>kind_property");
                    this.where('kind_property',propMatchesDetail.kind_property);
                }
                console.log("=-==================--->",propMatchesDetail.type_construction);
                if(propMatchesDetail.type_construction && propMatchesDetail.type_construction.length > 0){
                    // console.log("====>type_construction",propMatchesDetail.type_construction);
                    this.where('type_construction',propMatchesDetail.type_construction);
                }

                if(criterias && criterias.town){
                    // console.log("====>town");
                    this.whereIn('town',criterias.town)
                }
                if(criterias && criterias.postal_code){
                    // console.log("====>postal_code");
                    this.whereIn('postal_code',criterias.postal_code)
                }

                if(propMatchesDetail.more_infor){
                    var more_infor = propMatchesDetail.more_infor.split(',');
                    for(let i = 0;i < more_infor.length;i++){
                        this.where('facilityDetails','like','%'+more_infor[i]+'%')
                    }
                }

            }else{

                if(propMatchesDetail.rooms_min || propMatchesDetail.rooms_max){
                    // console.log("====>number_room");
                    propMatchesDetail.rooms_min = propMatchesDetail.rooms_min?propMatchesDetail.rooms_min:minNumber;
                    propMatchesDetail.rooms_max = propMatchesDetail.rooms_max?propMatchesDetail.rooms_max:maxNumber;
                    this.orWhere(function () {
                        this.whereBetween('number_room',[propMatchesDetail.rooms_min,propMatchesDetail.rooms_max]);
                    });

                }
                if(propMatchesDetail.bathrooms_min || propMatchesDetail.bathrooms_max){
                    // console.log("====>number_bathroom");
                    propMatchesDetail.bathrooms_min = propMatchesDetail.bathrooms_min?propMatchesDetail.bathrooms_min:minNumber;
                    propMatchesDetail.bathrooms_max = propMatchesDetail.bathrooms_max?propMatchesDetail.bathrooms_max:maxNumber;
                    this.orWhere(function () {
                        this.whereBetween('number_bathroom',[propMatchesDetail.bathrooms_min,propMatchesDetail.bathrooms_max])
                    });

                }
                if(propMatchesDetail.bedrooms_min || propMatchesDetail.bedrooms_max){
                    // console.log("====>number_bedroom");
                    propMatchesDetail.bedrooms_min = propMatchesDetail.bedrooms_min?propMatchesDetail.bedrooms_min:minNumber;
                    propMatchesDetail.bedrooms_max = propMatchesDetail.bedrooms_max?propMatchesDetail.bedrooms_max:maxNumber;
                    this.orWhere(function () {
                        this.whereBetween('number_bedroom',[propMatchesDetail.bedrooms_min,propMatchesDetail.bedrooms_max]);
                    });
                }
                if(propMatchesDetail.separate_wc_min || propMatchesDetail.separate_wc_max){
                    // console.log("====>number_wc");
                    propMatchesDetail.separate_wc_min = propMatchesDetail.separate_wc_min?propMatchesDetail.separate_wc_min:minNumber;
                    propMatchesDetail.separate_wc_max = propMatchesDetail.separate_wc_max?propMatchesDetail.separate_wc_max:maxNumber;
                    this.orWhere(function () {
                        this.whereBetween('number_wc',[propMatchesDetail.separate_wc_min,propMatchesDetail.separate_wc_max]);
                    });
                }
                if(propMatchesDetail.living_space_min || propMatchesDetail.living_space_max){
                    // console.log("====>living_space");
                    propMatchesDetail.living_space_min = propMatchesDetail.living_space_min?propMatchesDetail.living_space_min:minNumber;
                    propMatchesDetail.living_space_max = propMatchesDetail.living_space_max?propMatchesDetail.living_space_max:maxNumber;
                    this.orWhere(function () {
                        this.whereBetween('living_space',[propMatchesDetail.living_space_min,propMatchesDetail.living_space_max]);
                    });
                }
                if(propMatchesDetail.floor_property_min || propMatchesDetail.floor_property_max){
                    // console.log("====>number_floors_bulding");
                    propMatchesDetail.floor_property_min = propMatchesDetail.floor_property_min?propMatchesDetail.floor_property_min:minNumber;
                    propMatchesDetail.floor_property_max = propMatchesDetail.floor_property_max?propMatchesDetail.floor_property_max:maxNumber;
                    this.orWhere(function () {
                        this.whereBetween('number_floors_bulding',[propMatchesDetail.floor_property_min,propMatchesDetail.floor_property_max])
                    });
                }
                if(propMatchesDetail.price_min || propMatchesDetail.price_max){
                    // console.log("====>price");
                    
                    propMatchesDetail.price_min = propMatchesDetail.price_min?propMatchesDetail.price_min:minNumber;
                    propMatchesDetail.price_max = propMatchesDetail.price_max?propMatchesDetail.price_max:maxNumber;
                    this.orWhere(function () {
                        this.whereBetween('number_pay',[parseInt(propMatchesDetail.price_min),parseInt(propMatchesDetail.price_max)])
                    });
                }
                if(propMatchesDetail.area_min || propMatchesDetail.area_max){
                    propMatchesDetail.area_min = propMatchesDetail.area_min?propMatchesDetail.area_min:minNumber;
                    propMatchesDetail.area_max = propMatchesDetail.area_max?propMatchesDetail.area_max:maxNumber;
                    this.orWhere(function () {
                        this.whereBetween('total_area_building',[propMatchesDetail.area_min,propMatchesDetail.area_max])
                    });
                }
                if(propMatchesDetail.sector ){
                    // console.log("====>sector");
                    this.orWhere(function () {
                        this.where('sector',propMatchesDetail.sector);
                    });
                }
                if(propMatchesDetail.outdoor_space ){
                    // console.log("====>outdoor_space");
                    this.orWhere(function () {
                        this.where('outdoor_space',propMatchesDetail.outdoor_space);
                    });
                }
                if(propMatchesDetail.kind_property ){
                    // console.log("====>kind_property");
                    this.orWhere(function () {
                        this.where('kind_property',propMatchesDetail.kind_property);
                    });
                }
                if(propMatchesDetail.type_construction && propMatchesDetail.type_construction.length ){
                    // console.log("====>type_construction",propMatchesDetail.type_construction);
                    this.orWhere(function () {
                        this.where('type_construction',propMatchesDetail.type_construction);
                    });
                }
                if(criterias && criterias.town){
                    // console.log("====>town");
                    this.orWhere(function () {
                        this.whereIn('town',criterias.town)
                    });
                }
                if(criterias && criterias.postal_code){
                    // console.log("====>postal_code");

                    this.orWhere(function () {
                        this.whereIn('postal_code',criterias.postal_code);
                    });
                }
                if(propMatchesDetail.more_infor){
                    var more_infor = propMatchesDetail.more_infor.split(',');
                    this.orWhere(function () {
                        for(let i = 0;i < more_infor.length;i++){
                            this.orWhere('facilityDetails','like','%'+more_infor[i]+'%')
                        }
                    });
                }
            }
        });


        const results = await queryBuilder;


        var path_property = Config_Property.path_property_client;
        var list_property = [];
        var list_property_id = [];
        var mail_send_to = [];
        var contact = null;
        var host_id = propMatchesDetail.host_id;
        results.map((item) => {
                list_property.push(" " + path_property + item._id + " ");
                list_property_id.push(item._id);
        });
        //add List_property_matches
        var property_matches_data = {
            number_res : list_property_id.length,
            ids_match : list_property_id.join(','),
            created_by : actor.id,
            property_matches_id : propMatchesDetail.id,
            state : 1,
        };
        const property_matches = await List_property_matches.query().insert(property_matches_data);
        if (host_id !== null && host_id !== undefined && host_id !== "") {
            contact = await Contact.query().select('contact.firstname','contact.email','contact.lastname').findById(host_id).where('state',1).where('state_email',1).skipUndefined();
        }
        console.log('-----------------', contact)
        if (contact !== null && contact !== undefined) {
            console.log('-----------------check')
            mail_send_to.push({
                name: (contact.firstname !== null ? contact.firstname : "") + " " + (contact.lastname !== null ? contact.lastname : ""),
                address: contact.email
            })
        }
        mail_send_to.push({
            name: (actor.firstname !== null ? actor.firstname : "" )+ " " + (actor.lastname !== null ? actor.lastname : ""),
            address: actor.email
        });

        return results;
    }catch (err) {
        console.log("Matching property error===>",err);
        return Boom.boomify(err,{statusCode:422})
    }
};



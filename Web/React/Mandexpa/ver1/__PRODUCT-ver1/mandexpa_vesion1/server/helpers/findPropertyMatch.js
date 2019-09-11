const Property = require("../models/property");
const Property_match = require("../models/property_match");
const Account = require("../models/account");
const Contact = require("../models/contact");
const Constants_params =  require("../config/constants-params");
const List_property_matches = require('../models/list_property_matches');
const Config_Property = require('../config/objectConfig/propertyConfig');
const Config = require('../config');
const Hogan = require('hogan.js');
const Helper = require('./index');
const fs = require('fs');
const maxNumber = Math.pow(10,10);
const minNumber = -Math.pow(10,10);
const language = Config.get('/language');
/**
 * get current Date format yyyy/mm/dd
 * @returns {string}
 */
exports.getPropertyMatches = async (req)=> {
    const list_propMatchesDetail = await Property_match.query().select('property_match.*').skipUndefined();
    await list_propMatchesDetail.map(async propMatchesDetail =>{
        let criterias = JSON.parse(propMatchesDetail.criterias);
        let queryBuilder = Property.query().select('property.id as _id','property.*','city.title as city_title','property_location.*','account.*','property_characteristic.*','property_media.image as main_image').from('property');
        queryBuilder.leftJoin('property_location', 'property.id', 'property_location.property_id');
        queryBuilder.leftJoin('city', 'city.id', 'property_location.town');
        queryBuilder.leftJoin('property_characteristic', 'property.id', 'property_characteristic.property_id');
        queryBuilder.leftJoin('account', 'property.created_by', 'account.id');
        queryBuilder.leftJoin('property_media', function () {
            this.on('property_media.property_id', '=', 'property.id')
            this.on('property_media.primaryImage', '=', 1)
        });
        queryBuilder.where("property.created_by","<>",propMatchesDetail.created_by);
        queryBuilder.where("property.status_mandate","<>",'SOLD');
        queryBuilder.where("property.status_mandate","<>",'CANCELLED');
        queryBuilder.where("property.status_mandate","<>",'BOOKED');
        queryBuilder.where("property.status_mandate","<>",'NEGOTIATING');
        queryBuilder.where("property.status_mandate","<>",'SOLD_SUCCESS');
        queryBuilder.where("property.state",1);
        queryBuilder.andWhere(function () {
            // Find property by all condition filled
            console.log("TYPE_SEARCHING_____>",propMatchesDetail.search_type);
            if(propMatchesDetail.search_type === Constants_params.property_match_search_type.SEARCH_ALL_FIELD){

                if(propMatchesDetail.rooms_min || propMatchesDetail.rooms_max){
                    propMatchesDetail.rooms_min = propMatchesDetail.rooms_min?propMatchesDetail.rooms_min:minNumber;
                    propMatchesDetail.rooms_max = propMatchesDetail.rooms_max?propMatchesDetail.rooms_max:maxNumber;
                    this.whereBetween('number_room',[propMatchesDetail.rooms_min,propMatchesDetail.rooms_max]);

                }
                if(propMatchesDetail.bathrooms_min || propMatchesDetail.bathrooms_max){
                    propMatchesDetail.bathrooms_min = propMatchesDetail.bathrooms_min?propMatchesDetail.bathrooms_min:minNumber;
                    propMatchesDetail.bathrooms_max = propMatchesDetail.bathrooms_max?propMatchesDetail.bathrooms_max:maxNumber;
                    this.whereBetween('number_bathroom',[propMatchesDetail.bathrooms_min,propMatchesDetail.bathrooms_max])
                }
                if(propMatchesDetail.bedrooms_min || propMatchesDetail.bedrooms_max){
                    propMatchesDetail.bedrooms_min = propMatchesDetail.bedrooms_min?propMatchesDetail.bedrooms_min:minNumber;
                    propMatchesDetail.bedrooms_max = propMatchesDetail.bedrooms_max?propMatchesDetail.bedrooms_max:maxNumber;
                    this.whereBetween('number_bedroom',[propMatchesDetail.bedrooms_min,propMatchesDetail.bedrooms_max])
                }
                if(propMatchesDetail.separate_wc_min || propMatchesDetail.separate_wc_max){
                    propMatchesDetail.separate_wc_min = propMatchesDetail.separate_wc_min?propMatchesDetail.separate_wc_min:minNumber;
                    propMatchesDetail.separate_wc_max = propMatchesDetail.separate_wc_max?propMatchesDetail.separate_wc_max:maxNumber;
                    this.whereBetween('number_wc',[propMatchesDetail.separate_wc_min,propMatchesDetail.separate_wc_max])
                }
                if(propMatchesDetail.living_space_min || propMatchesDetail.living_space_max){
                    propMatchesDetail.living_space_min = propMatchesDetail.living_space_min?propMatchesDetail.living_space_min:minNumber;
                    propMatchesDetail.living_space_max = propMatchesDetail.living_space_max?propMatchesDetail.living_space_max:maxNumber;
                    this.whereBetween('living_space',[propMatchesDetail.living_space_min,propMatchesDetail.living_space_max])
                }
                if(propMatchesDetail.floor_property_min || propMatchesDetail.floor_property_max){
                    propMatchesDetail.floor_property_min = propMatchesDetail.floor_property_min?propMatchesDetail.floor_property_min:minNumber;
                    propMatchesDetail.floor_property_max = propMatchesDetail.floor_property_max?propMatchesDetail.floor_property_max:maxNumber;
                    this.whereBetween('number_floors_building',[propMatchesDetail.floor_property_min,propMatchesDetail.floor_property_max])
                }

                if(propMatchesDetail.price_min || propMatchesDetail.price_max){
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
                    this.where('sector',propMatchesDetail.sector);
                }
                if(propMatchesDetail.outdoor_space ){
                    this.where('outdoor_space',propMatchesDetail.outdoor_space);
                }
                if(propMatchesDetail.kind_property ){
                    this.where('kind_property',propMatchesDetail.kind_property);
                }
                if(propMatchesDetail.type_construction && propMatchesDetail.type_construction.length){
                    this.where('type_construction',propMatchesDetail.type_construction);
                }

                if(criterias && criterias.town){
                    this.whereIn('town',criterias.town)
                }
                if(criterias && criterias.postal_code){
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
                    propMatchesDetail.rooms_min = propMatchesDetail.rooms_min?propMatchesDetail.rooms_min:minNumber;
                    propMatchesDetail.rooms_max = propMatchesDetail.rooms_max?propMatchesDetail.rooms_max:maxNumber;
                    this.orWhere(function () {
                        this.whereBetween('number_room',[propMatchesDetail.rooms_min,propMatchesDetail.rooms_max]);
                    });

                }
                if(propMatchesDetail.bathrooms_min || propMatchesDetail.bathrooms_max){
                    propMatchesDetail.bathrooms_min = propMatchesDetail.bathrooms_min?propMatchesDetail.bathrooms_min:minNumber;
                    propMatchesDetail.bathrooms_max = propMatchesDetail.bathrooms_max?propMatchesDetail.bathrooms_max:maxNumber;
                    this.orWhere(function () {
                        this.whereBetween('number_bathroom',[propMatchesDetail.bathrooms_min,propMatchesDetail.bathrooms_max])
                    });

                }
                if(propMatchesDetail.bedrooms_min || propMatchesDetail.bedrooms_max){
                    propMatchesDetail.bedrooms_min = propMatchesDetail.bedrooms_min?propMatchesDetail.bedrooms_min:minNumber;
                    propMatchesDetail.bedrooms_max = propMatchesDetail.bedrooms_max?propMatchesDetail.bedrooms_max:maxNumber;
                    this.orWhere(function () {
                        this.whereBetween('number_bedroom',[propMatchesDetail.bedrooms_min,propMatchesDetail.bedrooms_max]);
                    });
                }
                if(propMatchesDetail.separate_wc_min || propMatchesDetail.separate_wc_max){
                    propMatchesDetail.separate_wc_min = propMatchesDetail.separate_wc_min?propMatchesDetail.separate_wc_min:minNumber;
                    propMatchesDetail.separate_wc_max = propMatchesDetail.separate_wc_max?propMatchesDetail.separate_wc_max:maxNumber;
                    this.orWhere(function () {
                        this.whereBetween('number_wc',[propMatchesDetail.separate_wc_min,propMatchesDetail.separate_wc_max]);
                    });
                }
                if(propMatchesDetail.living_space_min || propMatchesDetail.living_space_max){
                    propMatchesDetail.living_space_min = propMatchesDetail.living_space_min?propMatchesDetail.living_space_min:minNumber;
                    propMatchesDetail.living_space_max = propMatchesDetail.living_space_max?propMatchesDetail.living_space_max:maxNumber;
                    this.orWhere(function () {
                        this.whereBetween('living_space',[propMatchesDetail.living_space_min,propMatchesDetail.living_space_max]);
                    });
                }
                if(propMatchesDetail.floor_property_min || propMatchesDetail.floor_property_max){
                    propMatchesDetail.floor_property_min = propMatchesDetail.floor_property_min?propMatchesDetail.floor_property_min:minNumber;
                    propMatchesDetail.floor_property_max = propMatchesDetail.floor_property_max?propMatchesDetail.floor_property_max:maxNumber;
                    this.orWhere(function () {
                        this.whereBetween('number_floors_bulding',[propMatchesDetail.floor_property_min,propMatchesDetail.floor_property_max])
                    });
                }
                if(propMatchesDetail.price_min || propMatchesDetail.price_max){
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
                    this.orWhere(function () {
                        this.where('sector',propMatchesDetail.sector);
                    });
                }
                if(propMatchesDetail.outdoor_space ){
                    this.orWhere(function () {
                        this.where('outdoor_space',propMatchesDetail.outdoor_space);
                    });
                }
                if(propMatchesDetail.kind_property ){
                    this.orWhere(function () {
                        this.where('kind_property',propMatchesDetail.kind_property);
                    });
                }
                if(propMatchesDetail.type_construction && propMatchesDetail.type_construction.length ){
                    this.orWhere(function () {
                        this.where('type_construction',propMatchesDetail.type_construction);
                    });
                }
                if(criterias && criterias.town){
                    this.orWhere(function () {
                        this.whereIn('town',criterias.town)
                    });
                }
                if(criterias && criterias.postal_code){
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

        queryBuilder.orderBy('created_date','desc');
        let result = await queryBuilder;
        var list_property_id = [];
        result.map((item) => {
            list_property_id.push(item.id);
        })
        let pre_list_property = await this.getLastListPropertyMatch(propMatchesDetail.id)
        if(pre_list_property === undefined || pre_list_property === null){
            pre_list_property = []
        }
        else {
            pre_list_property = (pre_list_property.ids_match).split(',')
        }
        var list_property_id_check = list_property_id.sort(function(a, b){return a - b});
        var pre_list_property_check = pre_list_property.sort(function(a, b){return a - b});
        if (list_property_id_check.join() === pre_list_property_check.join()) {
            // console.log('-------------------------------1');
        }
        else {
            //add List_property_matches
            var property_matches_data = {
                number_res: list_property_id.length,
                ids_match: list_property_id.join(),
                created_by: propMatchesDetail.created_by,
                property_matches_id: propMatchesDetail.id,
                state:0,
            }
            await List_property_matches.query().insert(property_matches_data)
            //send mail
            var path_property = Config_Property.path_property_client;
            var mail_send_to = [];
            var list_property = [];
            var contact = null;
            var host_id = propMatchesDetail.host_id;
            result.map((item) => {
                list_property.push(" " + path_property + item.id + " ");
            });

            let actor = await Account.query().select('account.firstname','account.email','account.lastname','account.mobile').findById(propMatchesDetail.created_by).where('state',1).skipUndefined();
            mail_send_to.push({
                name: (actor.firstname !== null ? actor.firstname : "") + " " + (actor.lastname !== null ? actor.lastname : ""),
                address: actor.email
            });

            if (host_id !== null && host_id !== undefined && host_id !== "") {
                contact = await Contact.query().select('contact.firstname', 'contact.email', 'contact.lastname').findById(host_id).where('state', 1).where('state_email', 1).skipUndefined();
            }
            if (contact !== null && contact !== undefined) {
                mail_send_to.push({
                    name: (contact.firstname !== null ? contact.firstname : "") + " " + (contact.lastname !== null ? contact.lastname : ""),
                    address: contact.email
                })
            }
            console.log("++SEND TO++++++++++++++> ",mail_send_to);
            this.sendmailResultMatches(req,result,actor,mail_send_to);
        }
    })
};
exports.getLastListPropertyMatch = async (id)=> {
    var subquery = List_property_matches.query().max('id').groupBy('property_matches_id');
    const listProperty = await List_property_matches.query().select('list_property_matches.ids_match')
        .where('property_matches_id','=',id)
        .whereIn('id',subquery)
    return listProperty[0];
}


/**
 * Function send mail html to user has property matches
 * @param req
 * @param data
 * @param actor
 * @param mail_send_to
 * @return {Promise<void>}
 */
exports.sendmailResultMatches = async (req,data,actor,mail_send_to) =>{

    const mailer = req.server.plugins.mailer;


    if(data.length >  0){
        let result_item = '';
        const main_content = fs.readFileSync('./emails/list_property_matches/create_property_match.html',{encoding:'utf8'});

        await Promise.all(data.map(item=>{
            let price = Helper.currency.numberWithCommas(item.number_pay);
            let context_item = {
                sector:item.sector!== ""?language[item.sector]:'',
                town:item.city_title,
                property_price:  price,
                status:item.status_mandate === Config_Property.type_mandate.for_sale?'A Vendre':'A Louer' ,
                property_type:item.type,
                property_title:item.title_des ,
                number_bedroom:item.number_bedroom ,
                number_floors_building:item.number_floors_building ,
                number_wc:item.number_wc,
                number_bath:item.number_bathroom ,
                property_description:item.des_pro,
                property_link:Config_Property.path_property_client + item._id,
                main_image:Config.get('/URL_SERVER')+'/'+item.main_image,
                URL_SERVER:Config.get('/URL_SERVER'),
            };

            let item_content = fs.readFileSync('./emails/list_property_matches/item_matches.html',{encoding:'utf8'});

            let item1 = Hogan.compile(item_content).render(context_item).toString();
            result_item += item1;
        }));

        let context_main = {
            firstname:actor.firstname,
            lastname:actor.lastname,
            mobile:actor.mobile,
            user_email:actor.email,
            list_result:result_item,
        };
        let result = Hogan.compile(main_content).render(context_main).toString();

        result = result.split('&lt;').join('<');
        result = result.split('&gt;').join('>');
        result = result.split('&quot;').join('"');


        let emailOptions = {
            subject: 'Résultats de recherche de votre Property Match',
            to: mail_send_to,
        };


        try{
            mailer.sendEmailWithContent(emailOptions, result);
        }catch (e) {
            console.log("==CANNOT SEND MAIL LIST PROPERTY MATCHES==============>",err)
        }
    }


}


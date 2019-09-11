const Property = require("../models/property");
const Account = require("../models/account");
const Property_match = require("../models/property_match");
const Config = require("../config");
const Boom = require('boom');

exports.statistic = async (req) =>{
    const actor_id = req.auth.credentials.user.id;

    try{
        // count number property created by this user
        let user_property_builder =  Property.query().count("id as counter");
        user_property_builder.where({"created_by":actor_id});
        user_property_builder.where("state","<>","0");
        user_property_builder.first().skipUndefined();


        // count number property is sold of this user
        const status_sold =  Config.get('/propertyConfig/type_mandate/sold');
        let property_sold = Property.query().count("id as counter");
        property_sold.where({"created_by":actor_id,"status_mandate":status_sold});
        property_sold.first().skipUndefined();

        // count number number property match is created by this user
        let propertyMatch =  Property_match.query().count("id as counter");
        propertyMatch.where({"created_by":actor_id});
        propertyMatch.first().skipUndefined();

        return Promise.all([user_property_builder,property_sold,propertyMatch].map(async item=>{
            return await item;
        })).then(res=>{
            return {
                property:res[0],
                sold_property:res[1],
                property_match:res[2],
            }
        }).catch(err=>{
            return Boom.boomify(err,{statusCode:422})
        })
    }catch (e) {
        return Boom.boomify(e,{statusCode:422})
    }
};
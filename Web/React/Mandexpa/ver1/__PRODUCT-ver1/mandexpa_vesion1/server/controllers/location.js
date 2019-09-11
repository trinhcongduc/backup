var request = require('request');
var Boom = require('boom');
var City = require('../models/city');
var Regions = require('../models/regions');


processData = (data) => {
    return new Promise((resolve, reject) => {
        resolve(data);
    })
}
// get list city in sys
exports.listCity = async(req, h) => {
    try{
        if(req.params.type !== null){
            return await City.query()
                .where('type',req.params.type)
                .skipUndefined()
                .orderBy('id');
        }
        return [];
    }catch(err){
        return Boom.boomify(err, { statusCode: 422 });
    }
};
exports.listRegions = async(req, h) => {
    try{
        if(req.params.id !== null && !isNaN(req.params.id)){
            return await Regions.query()
                .skipUndefined()
                .where('parent_id',parseInt(req.params.id))
                .orderBy('id');
        }else{
            return await Regions.query()
                .skipUndefined()
                .orderBy('id');

        }
    }catch(err){
        return Boom.boomify(err, { statusCode: 422 });
    }
};
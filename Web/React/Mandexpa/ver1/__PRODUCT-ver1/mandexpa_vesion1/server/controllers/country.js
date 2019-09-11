var request = require('request');
var Boom = require('boom');
var Country = require('../models/country');


processData = (data) => {
    return new Promise((resolve, reject) => {
        resolve(data);
    })
}


// get list country in sys
exports.list = async(req, h) => {
    try{
        return await Country.query()
            .skipUndefined()
            .orderBy('id');
    }catch(err){
        return Boom.boomify(err, { statusCode: 422 });
    }
};
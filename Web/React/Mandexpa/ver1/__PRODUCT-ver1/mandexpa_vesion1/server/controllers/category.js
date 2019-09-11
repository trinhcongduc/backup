var request = require('request');
var Boom = require('boom');
var Category = require('../models/category');


processData = (data) => {
    return new Promise((resolve, reject) => {
        resolve(data);
    })
};

exports.listCatParent = async (req, h) => {
    var conditions =  req.payload;
    var page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    return Category.query().select('*')
        .where(conditions)
        .skipUndefined()
        .catch(err => {
            return Boom.boomify(err, {statusCode: 422});
        });
};

exports.listCatChild = async (req, h) => {
    var page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    var parent_id = req.params.parent_id;
    return Category.query().select('*')
        .andWhere('parent_id',parent_id)
        .andWhere('state','1')
        .skipUndefined().catch(err => {
            return Boom.boomify(err, {statusCode: 422});
        });
};


exports.listRoomsType = async (req, h) => {
    var page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    return Category.query().select('*')
        .where('type','room')
        .andWhere('state',1)
        .skipUndefined().catch(err => {
            return Boom.boomify(err, {statusCode: 422});
        });
};


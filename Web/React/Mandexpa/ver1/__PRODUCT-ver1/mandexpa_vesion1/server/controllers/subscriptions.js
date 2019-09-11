'use strict';

const request = require('request');
const Subscriptions =  require('../models/subscriptions/subscriptions');
const Config =  require('../config');
const Helper = require('../helpers');
const Boom = require('boom');

/**
 * Function create a subscription by admin
 * @param req
 * @param h
 * @return {Promise<*>}
 */
exports.create = async (req,h) =>{
    const actor_id =  req.auth.credentials.user.id;
    let payload = req.payload;
    try{
        let exact_number_days = payload.number_package;
        let package_type = payload.package_type;
        let MONTH = Config.get('/subscriptionConfig/package_type/MONTH');
        let YEAR = Config.get('/subscriptionConfig/package_type/YEAR');
        if(package_type === MONTH){
            exact_number_days = exact_number_days*30;
        }
        else if(package_type === YEAR){
            exact_number_days = exact_number_days*365;
        }
        payload.exact_number_days = exact_number_days;

        return Subscriptions.query().insert(payload).then(res=>{
            return res;
        }).catch(err=>{
           return Boom.boomify(err,{statusCode: 422})
        });

        return payload;
    }catch (err) {
        return Boom.boomify(err,{statusCode: 422})
    }
};

/**
 * Function get list subscription and pagination
 * @param req
 * @param h
 * @return {Promise<*>}
 */
exports.list = async (req,h) =>{
  try{
      let payload = req.payload;
      let page = payload.page;
      let rowsPerPage = payload.rowsPerPage;
      let orderBy = payload.orderBy;
      let order = payload.order;
      let get_result = Subscriptions.query().select('*')
          .offset((page - 1)* rowsPerPage)
          .limit(rowsPerPage)
          .orderBy(orderBy,order)
          .skipUndefined();
      let count = Subscriptions.query().count('id as count').first().skipUndefined();

      return await Promise.all( [get_result,count].map(async item=>{
          return await item;
      })).then(res=>{
          return {
              data:res[0],
              count:res[1].count,
          };
      }).catch(err=>{
          return Boom.boomify(err,{statusCode: 422})
      })

  }catch (err) {
      return Boom.boomify(err,{statusCode: 422})
  }
};


/**
 * Function get all list subscription and pagination
 * @param req
 * @param h
 * @return {Promise<*>}
 */
exports.listAll = async (req,h) =>{
    try{
        let get_result = Subscriptions.query().select('*')
            .skipUndefined();

        return await get_result.then(res=>{
            return res;
        }).catch(err=>{
            return Boom.boomify(err,{statusCode: 422})
        })

    }catch (err) {
        return Boom.boomify(err,{statusCode: 422})
    }
};


exports.update = async (req,h) =>{
    try{
        let payload =  req.payload;
        payload.state = payload.state === true?1:0;
        let id =  payload.id;
        delete payload.id;
        let exact_number_days = payload.number_package;
        let package_type = payload.package_type;
        let MONTH = Config.get('/subscriptionConfig/package_type/MONTH');
        let YEAR = Config.get('/subscriptionConfig/package_type/YEAR');
        if(package_type === MONTH){
            exact_number_days = exact_number_days*30;
        }
        else if(package_type === YEAR){
            exact_number_days = exact_number_days*365;
        }
        payload.exact_number_days = exact_number_days;
        console.log(payload);

        return Subscriptions.query().update(payload).where('id',id).skipUndefined().then(res=>{
            return res;
        }).catch(err=>{
            return Boom.boomify(err,{statusCode: 422})
        })
    }catch (e) {
        return Boom.boomify(e,{statusCode: 422})
    }
};

exports.delete = async (req,h) =>{
    try{
        let payload =  req.payload;
        return Subscriptions.query().delete().where('id',payload.id).skipUndefined().then(res=>{
            return res;
        }).catch(err=>{
            return Boom.boomify(err,{statusCode: 422})
        })
    }catch (e) {
        return Boom.boomify(e,{statusCode: 422})
    }
};
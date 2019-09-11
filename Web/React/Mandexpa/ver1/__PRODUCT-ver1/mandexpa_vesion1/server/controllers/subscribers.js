const Subscribers = require("../models/subscriptions/subscribers");
const Account =  require("../models/account");
const Config =  require('../config');
const Helper = require('../helpers');
const Boom = require('boom');


exports.create = async (req) =>{
    try{
        const actor_id = req.auth.credentials.user.id;
        const payload =  req.payload;
        payload.created_by = actor_id;
        payload.created_date = Helper.dateHelper.getDateTimeZone();

        let active_acc = Account.query().update({'activation':'ACTIVE'}).where('id',payload.user_id);
        let add_subscribers = Subscribers.query().insert(payload).skipUndefined();
        return Promise.all([active_acc,add_subscribers].map(async item =>{
            return await item;
        })).then( async res=>{
            let get_result = Subscribers.query().select('subscribers.*','acc.firstname','acc.lastname',"subs.title").from("subscribers");
            get_result.leftJoin('account as acc',"subscribers.user_id","acc.id");
            get_result.leftJoin('subscriptions as subs',"subscribers.sub_id","subs.id");
            get_result.where('subscribers.id',res[1].id).first().skipUndefined();

            let item = await  get_result;

            return  item;
        }).catch(err=>{
            return Boom.boomify(err,{statusCode: 422})
        })

    }
    catch (e) {
        return Boom.boomify(e,{statusCode: 422})
    }
};

exports.list = async (req) =>{
    try{
        const payload = req.payload;
        const currentDay =  Helper.dateHelper.getDateTimeZone('now',Config.get('/dateConfig/date_format/date_saveTo_db'));
        let page = payload.page;
        let rowsPerPage = payload.rowsPerPage;
        let orderBy = payload.orderBy;
        let order = payload.order;
        let subQuery = Subscribers.query().select("user_id").max("end_date as end").groupBy("user_id").as("sub_final_date").skipUndefined();
        let get_result = Subscribers.query().select('subscribers.*','acc.firstname','acc.lastname',"subs.title","sub_final_date.end as final_date").from("subscribers");

        get_result.leftJoin('account as acc',"subscribers.user_id","acc.id");
        get_result.leftJoin('subscriptions as subs',"subscribers.sub_id","subs.id");
        get_result.leftJoin(subQuery,"sub_final_date.user_id","subscribers.user_id");
        get_result.where('subscribers.start_date','<=',currentDay);
        get_result.where('subscribers.end_date','>=',currentDay);
        get_result.where('subscribers.state','1');

        get_result.offset((page - 1)* rowsPerPage)
            .limit(rowsPerPage)
            .orderBy(orderBy,order)
            .skipUndefined();
        let count = Subscribers.query().count('id as count');
        count.where('subscribers.start_date','<=',currentDay);
        count.where('subscribers.end_date','>=',currentDay);
        count.first().skipUndefined();

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
    }catch (e) {
        return Boom.boomify(e,{statusCode: 422})
    }
};

exports.delete = async (req) =>{
    try{
        let id =  req.params.id;
        let subscriber_detail = await Subscribers.query().findById(id).skipUndefined();
        if(subscriber_detail.user_id){

            let deactive_acc = Account.query().update({'activation':''}).where('id',subscriber_detail.user_id);
            let action_delete = Subscribers.query().delete().where('id',id).skipUndefined();
            return Promise.all([deactive_acc,action_delete].map(async item=>{
                return await item;
            })).then(res=>{
                return 1;
            }).catch(err=>{
                return Boom.boomify(err,{statusCode: 422})
            })
        }else{
            return Boom.boomify(err,{statusCode: 422})
        }

    }catch (e) {
        return Boom.boomify(e,{statusCode: 422})
    }
};

exports.upgrade = async (req) =>{
  try {
      const actor_id = req.auth.credentials.user.id;
      const payload = req.payload;
      // const id = req.params.id;
      console.log("payload==>",payload);
      // console.log("id==>",id);

      payload.created_by = actor_id;
      payload.created_date = Helper.dateHelper.getDateTimeZone();

      return Subscribers.query().insert(payload).skipUndefined().then(res=>{
          return res;
      }).catch(err=>{
          return Boom.boomify(err,{statusCode:422})
      });

  }  catch (err) {
      return Boom.boomify(err,{statusCode:422})
  }
};

/**
 * Function Scan the expired user list
 * @param req
 * @return {Promise<*|*>}
 */
exports.scanSubs = async (req) =>{
    try {
        const currentDay =  Helper.dateHelper.getDateTimeZone('now',Config.get('/dateConfig/date_format/date_saveTo_db'));
        let subQuery = Subscribers.query().select("user_id").max("end_date as end").groupBy("user_id").as("aaa").skipUndefined();
        let builder = Subscribers.query().select("*").from("subscribers");
        builder.leftJoin(subQuery,"aaa.user_id","subscribers.id");

        return builder.then(res=>{
            return res;
        }).catch(err=>{
            return Boom.boomify(err,{statusCode:422})
        })

    }catch (e) {
        return Boom.boomify(e,{statusCode:422})
    }
};

/**
 * Function get list
 * @param req
 * @return {Promise<void>}
 */
exports.subscriberHistory =  async (req) =>{
    try {
        const id =  req.params.id;
        let list =  Subscribers.query().select('subscribers.*','acc.firstname','acc.lastname',"subs.title").from("subscribers");
        list.leftJoin('account as acc',"subscribers.user_id","acc.id");
        list.leftJoin('subscriptions as subs',"subscribers.sub_id","subs.id");
        list.where("subscribers.user_id",id);
        list.orderBy("created_date","desc");
        list.skipUndefined();

        return list.then(res=>{
            return {
                user:{
                    fullname:res[0].firstname + " " + res[0].lastname
                },
                data:res
            };
        }).catch(err=>{
            return Boom.boomify(err,{statusCode:422})
        })
    }catch (e) {
        return Boom.boomify(err,{statusCode:422})
    }
};
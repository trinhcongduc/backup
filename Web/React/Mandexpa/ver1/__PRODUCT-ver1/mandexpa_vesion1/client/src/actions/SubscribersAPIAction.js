'use strict';
import api from 'Api';
import {
    GET_DETAIL_SUBSCRIBERS,
    GET_LIST_SUBSCRIBERS,
    UPDATE_LIST_SUBSCRIBERS,
    DELETE_SUBSCRIBERS,
    UPGRADE_SUBSCRIBER_USERS_PACKAGE,
} from "./types";

import {NotificationManager} from 'react-notifications';

export const createSubscriberAPI = (data) => dispatch =>{
    console.log("DATA==>",data);
    return new Promise((resolve,reject)=>{
        api.post("/subscriber/create",data).then(res=>{
            console.log("res========>",res);
            dispatch({payload:res.data,type:UPDATE_LIST_SUBSCRIBERS})
            NotificationManager.success('Add subscriber successful !');
            resolve(res);
        }).catch(err=>{
            console.log("error create subscriber",err.response);
            NotificationManager.error("Error when add subscriber.");
            reject(err);
        })
    })
};


export const listSubscriberAPI = (pagination) => dispatch =>{
    console.log("pagination==>",pagination);
    return new Promise((resolve,reject)=>{
        api.post("/subscriber/list",pagination).then(res=>{
            dispatch({payload:{data:res.data,condition_listing:pagination},type:GET_LIST_SUBSCRIBERS});
            // NotificationManager.success('Get subscriber successful !');
            resolve(res);
        }).catch(err=>{
            console.log("error get list subscriber",err.response);
            NotificationManager.error("Error when create subscriber.");
            reject(err);
        })
    })
};

export const getDetailSubscriber = (id)=>dispatch =>{
    return dispatch({type:GET_DETAIL_SUBSCRIBERS,payload:id})
};

export const deleteSubscriberAPI = (id) => dispatch =>{
    return new Promise((resolve,reject)=>{
        api.get("/subscriber/delete/"+id).then(res=>{
            dispatch({payload:{id:id},type:DELETE_SUBSCRIBERS});
            NotificationManager.success('Delete subscriber successful !');
            resolve(res);
        }).catch(err=>{
            console.log("error get list subscriber",err.response);
            NotificationManager.error("Error when delete subscriber.Please try again later.");
            reject(err);
        })
    })
};

export const upgradeSubscriberAPI = (data) => dispatch =>{
    return new Promise((resolve,reject)=>{
        api.post("/subscriber/upgrade",data).then(res=>{
            // dispatch({payload:{data:data},type:UPGRADE_SUBSCRIBER_USERS_PACKAGE});
            console.log("res===>",res);
            NotificationManager.success('Upgrade subscriber successful !');
            resolve(res);
        }).catch(err=>{
            console.log("error get list subscriber",err.response);
            NotificationManager.error("Error when upgrade subscriber.Please try again later.");
            reject(err);
        })
    })

};

export const subscriberHistoryAPI = (id) => dispatch =>{
    return new Promise((resolve,reject)=>{
        api.get("/subscriber/user-history/"+id).then(res=>{
            console.log("res===>",res);
            NotificationManager.success("Get subscriber's history successful !");
            resolve(res);
        }).catch(err=>{
            console.log("error get list subscriber",err.response);
            NotificationManager.error("Error when get subscriber's history.Please try again later.");
            reject(err);
        })
    })

};
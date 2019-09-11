'use strict';
import api from 'Api';
import {
    GET_LIST_SUBSCRIPTIONS,
    UPDATE_LIST_SUBSCRIPTIONS,
    UPDATE_SUBSCRIPTION,
    GET_DETAIL_SUBSCRIPTION,
    DELETE_SUBSCRIPTION,
} from "./types";
import {NotificationManager} from 'react-notifications';


export const CreateSubscription = (data) => dispatch =>{
    return new Promise((resolve ,reject)=>{
        console.log("DATA==-->",data);
        api.post('/subscriptions/create',data).then(res=>{
            dispatch({payload:res.data,type:UPDATE_LIST_SUBSCRIPTIONS});
            NotificationManager.success('Create subscription successful !');
            resolve(res);
        }).catch(err=>{
            NotificationManager.error('Error create subscription !');
            console.log("error=>",err.response);
            reject(err);
        })
    })
};

export const ListSubscription = (condition) => dispatch =>{
    return new Promise((resolve ,reject)=>{
        api.post('/subscriptions/list',condition).then(res=>{
            NotificationManager.success('Get list subscription successful !');
            dispatch({
                payload:{
                    data:res.data,
                    condition_listing: condition
                },
                type:GET_LIST_SUBSCRIPTIONS});
            resolve(res);
        }).catch(err=>{
            NotificationManager.error('Error when get list subscription !');
            console.log("error=>",err.response);
            reject(err);
        })
    })
};
export const ListAllSubscription = () => dispatch =>{
    return new Promise((resolve ,reject)=>{
        api.get('/subscriptions/listAll').then(res=>{
            resolve(res);
        }).catch(err=>{
            NotificationManager.error('Error when get list subscription !');
            console.log("error=>",err.response);
            reject(err);
        })
    })
};

export const GetDetailSubscription = (id)=>dispatch =>{
    return dispatch({type:GET_DETAIL_SUBSCRIPTION,payload:id})
};

export const EditSubscription = (data) => dispatch =>{

    return new Promise((resolve ,reject)=>{
        try{
            api.put('/subscription/update',data).then(res=>{
                NotificationManager.success('Update subscription successful !');
                dispatch({payload:data,type:UPDATE_SUBSCRIPTION});
                resolve(res);
            }).catch(err=>{
                NotificationManager.error('Error when update subscription !');
                console.log("error=>",err.response);
                reject(err);
            })
        }catch (e) {
            NotificationManager.error('Error when update subscription.Please try again later !');
        }
    })
};


export const DeleteSubscription = (id) => dispatch =>{
    console.log("DATA",id);
    return new Promise((resolve ,reject)=>{
        try{
            api.post('/subscription/delete',id).then(res=>{
                NotificationManager.success('Delete subscription successful !');
                dispatch({payload:id,type:DELETE_SUBSCRIPTION});
                resolve(res);
            }).catch(err=>{
                NotificationManager.error('Error when delete subscription !');
                console.log("error=>",err.response);
                reject(err);
            })
        }catch (e) {
            NotificationManager.error('Error when delete subscription.Please try again later !');
        }
    })
};
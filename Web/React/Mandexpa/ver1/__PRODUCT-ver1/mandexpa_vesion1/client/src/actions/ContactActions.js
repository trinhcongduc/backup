import { NotificationManager } from 'react-notifications';
import {
    CREATE_NEW_CONTACT, GET_LIST_CONTACT, GET_CONTACT_DETAIL, UPDATE_A_CONTACT, CREATE_NEW_HOST,CHOOSE_CONTACT,DETAIL_HOST
} from './types';
import api from 'Api';
import {isEmpty} from "Helpers";
export const createContact = (contact) => (dispatch) => {
    return new Promise((resolve,reject) => {
        api.post('/contact/create', contact)
            .then(response => {
                console.log(response);
                dispatch({type: CREATE_NEW_CONTACT, payload: response.data.contact});
                resolve(response.data);
                NotificationManager.success("Créez le contact avec succès!");
            })
            .catch(error => {
                console.log(error);
                reject(error);
                NotificationManager.error("La création du contact a échoué");
            })
    })
};
export const getListContact = () => dispatch => {
    return new Promise((resolve, reject) => {
        api.get('/contact/list').then(res => {
            dispatch({ type: GET_LIST_CONTACT, payload: res.data });
            resolve(res.data);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    })
};
export const getDeleteContactByID = (id) => dispatch =>{

    return new Promise((resolve,reject)=>{
        return api.get('/delete-contact/'+id)
            .then(res=>{
                // dispatch({type:GET_ACCOUNT_BYID,payload:res.data})
                // console.log("getAccountID:===>",res);
                resolve(res);
            })
            .then(() => {
                dispatch(getListContact())
            })
            .catch(err=>{
                reject(err);
                console.log(err);
            })
    })
};
export const getReceiveMailByID = (id) => dispatch =>{

    return new Promise((resolve,reject)=>{
        return api.get('/recevie-mail/'+id)
            .then(res=>{
                // dispatch({type:GET_ACCOUNT_BYID,payload:res.data})
                // console.log("getAccountID:===>",res);
                resolve(res);
            })
            .then(() => {
                dispatch(getListContact())
            })
            .catch(err=>{
                reject(err);
                console.log(err);
            })
    })
};
export const getContactDetail = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`/contact/${id}`)
            .then(response => {
                dispatch({  type: GET_CONTACT_DETAIL, payload: response.data });
                if(isEmpty(response.data)){
                    NotificationManager.error("Échec d'obtention des détails du contact");
                }
                else {
                    NotificationManager.success("Obtenir les détails du contact avec succès!");
                }
                resolve(response.data);
            })
            .catch(error => {
                console.log(error);
                NotificationManager.error(error);
                reject(response.data);
            })
    })
};
export const updateContact = (contact) => (dispatch) => {
    console.log(contact)
    return new Promise((resolve, reject) => {
            api.put(`/contact/update/${contact.id}`,contact)
                .then(response => {
                    dispatch({ type: UPDATE_A_CONTACT, payload: response.data.contact });
                    NotificationManager.success("Update contact success");
                    resolve(response.data.contact);
                })
                .catch(error => {
                    console.log(error);
                    NotificationManager.error("Edit contact failded");
                    reject(error)
                })
    }
    )
};
export const createHost = (contact,host) => (dispatch) => {
    return new Promise((resolve,reject) => {
        api.post('/contact/create', contact)
            .then(response => {
                console.log('contact',response.data);
                var host_name = response.data.firstname + ' '+ response.data.lastname;
                var info_host = {
                    name : host_name,
                    id : response.data.id,
                    host_type : host
                };
                console.log('infohost',info_host);
                dispatch({type: CREATE_NEW_HOST, payload: info_host });
                resolve({type: CREATE_NEW_HOST, payload: info_host });
                NotificationManager.success("Créez le contact avec succès!");
            })
            .catch(error => {
                console.log(error);
                reject(error);
                NotificationManager.error("La création du contact a échoué");
            })
    })
};
export const chooseHost = (info,host)=>dispatch => {
    return new Promise((resolve)=>{
        var info_host = {
            name : info.name,
            id : info.id,
            host_type : host
        };
        dispatch({type:CHOOSE_CONTACT,payload:info_host});
        resolve({action:CHOOSE_CONTACT,payload:info_host})
    });
};
export const detailHost = (host_1,host_2,host_3)=>dispatch => {
    return new Promise((resolve)=>{
        var info_host_1 = {
            name : host_1.name,
            id : host_1.id,
        };
        var info_host_2 = {
            name : host_2.name,
            id : host_2.id,
        };
        var info_host_3 = {
            name : host_3.name,
            id : host_3.id,
        };
        dispatch({type:DETAIL_HOST,host_1:info_host_1,host_2:info_host_2,host_3:info_host_3});
        resolve({action:DETAIL_HOST,payload:info_host_1})
    });
};

export const getListContactByConditions = (conditions,typeReducer)=>(dispatch) =>{
    return new Promise((resolve,reject)=>{
        return api.post("/contact/list-by-conditions",conditions)
            .then(res=>{
                // dispatch({ type: typeReducer,payload:res.data });
                resolve(res.data)
            }).catch(err=>{
                console.log(err.response);
                reject(err)
            })
    })
};

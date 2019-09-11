import { NotificationManager } from 'react-notifications';
import {
    LOGIN_USER,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    GET_AUTH_ACCOUNT,
    LOGIN_USER_SUCCESS,
    CREATE_NEW_USER,
    GET_LOGIN,
    GET_ACCOUNTS, GET_ACCOUNT_BYID,
    GET_AUTHENTICATION,
    PROPERTY_UPLOAD_IMAGE,
    GET_CURRENT_ACCOUNT,
} from './types';
import api from 'Api';
import {setCookie, removeCookie, getCookie} from '../helpers/session';
import {getAccountCurrent} from  'Helpers/helpers';

/**
 * Param infor account is executing
 */




/**
 *
 * auth action creators
 */

export const loginAccount = (email, password) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: LOGIN_USER });
        return api.post('/login', { email: email, password: password })
            .then((response) => {
                console.log("========>Response Login: ",response);
                setCookie('session_id', response.data.accountinfor.token, 10);
                dispatch({ type: GET_LOGIN,payload:response.data.accountinfor });
                dispatch({ type: GET_CURRENT_ACCOUNT,payload:response.data.accountinfor });
                NotificationManager.success('Connexion réussie!');
                const account =  btoa(""+JSON.stringify(response.data));
                localStorage.setItem("mandp", account);
                resolve(response.data.accountinfor);
            })
            .catch((error) => {
                dispatch({ type: LOGIN_USER_FAILURE, payload: error.message });
                NotificationManager.error("Identifiant ou mot de passe invalide");
                console.log(error.response);
                reject(error);
            });
    })
};


export const createAccount = (inforUser)=>(dispatch)=>{
    console.log("inforUser======>",inforUser);
    inforUser.color = JSON.stringify(inforUser.color);
    return new Promise((resolve, reject) => {
        api.post('/account/create', inforUser)
            .then(response => {
                // dispatch({type: CREATE_NEW_USER, payload: response.data});
                NotificationManager.success('Créer un compte avec succès!');
                resolve(response.data);
            })
            .catch(err => {
                console.log("false api===>",err.response);
                reject(err);
                NotificationManager.error(err.response.data.message);
                console.log(err.response);
            })
    })
};


export const updateAccount = (inforUser)=>(dispatch)=>{
    console.log("inforUser",inforUser);
    inforUser.color = JSON.stringify(inforUser.color);
    return new Promise((resolve, reject) => {
        api.put('/account/update', inforUser)
            .then(response => {
                //dispatch({type: CREATE_NEW_USER, payload: response.data});
                NotificationManager.success('Mettre à jour le compte avec succès!');
                resolve(response);
            })
            .catch(err => {
                console.log("false api",err.response);
                reject(err);
                NotificationManager.error("Erreur de mise à jour du compte. Veuillez réessayer plus tard.");
            })
        resolve(inforUser);
    })
};

export const logoutAccount = () => (dispatch) => {
    console.log('LOGOUT');
    dispatch({ type: LOGOUT_USER });
    dispatch({ type: GET_CURRENT_ACCOUNT,payload:{} });
    removeCookie('c_user');
    removeCookie('session_id');
    localStorage.removeItem('mandp')
};

export const getAuthAccount = () => dispatch => {
    let account_id = parseInt(getCookie('c_user'));
    return api.get('/accounts').then(res => {
        //console.log(account_id);
        dispatch({ type: GET_AUTH_ACCOUNT, payload: res.data });
    }).catch(err => {
        console.log(err);
    })
};

export const getAccountByID = (id) => dispatch =>{

    return new Promise((resolve,reject)=>{
        return api.get('/account/'+id)
            .then(res=>{
                dispatch({type:GET_ACCOUNT_BYID,payload:res.data})
                // console.log("getAccountID:===>",res);
                resolve(res);
            }).catch(err=>{
                reject(err);
                console.log(err);
            })
    })
};


export const getListAccount = (query)=>(dispatch) =>{
    const currentAccount =  getAccountCurrent();
    let url_type = currentAccount.type === 'admin'?'/account/listAdmin':'/account/list';

    if(query !== undefined && query !== null){
        let keys_query = Object.keys(query);
        if(keys_query.length){
            url_type += '?';
            keys_query.map(item => {
                url_type+= item + '=' + query[item] + '&'
            });
        }
    }

    return new Promise((resolve,reject)=>{
        return api.get(url_type)
            .then(res=>{
                dispatch({ type: GET_ACCOUNTS,payload:res.data.accounts });
                resolve(res.data)
            }).catch(err=>{
                console.log(err.response);
                reject(err.response)
            })
    })
};
export const getDeleteAccountByID = (id) => dispatch =>{

    return new Promise((resolve,reject)=>{
        return api.get('/delete-account/'+id)
            .then(res=>{
                // dispatch({type:GET_ACCOUNT_BYID,payload:res.data})
                // console.log("getAccountID:===>",res);
                resolve(res);
            })
            .then(() => {
                dispatch(getListAccount())
            })
            .catch(err=>{
                reject(err);
                console.log(err);
            })
    })
};

/**
 * Function get list account with condition
 * @param conditions
 * @param pagination  conditions for functional Pagination
 * @param typeReducer
 * @return {function(*=): Promise<any>}
 */
export const getListAccountByConditions = (conditions,pagination,typeReducer)=>(dispatch) =>{
    return new Promise((resolve,reject)=>{
        return api.post("/account/listByConditions",{conditions:conditions,pagination:pagination})
            .then(res=>{
                if(typeReducer !== null){
                    dispatch({ type: typeReducer,payload:res.data });
                }
                resolve(res.data)
            }).catch(err=>{
                console.log(err.response);
                reject(err)
            })
    })
};

/**
 * Function get list account with type is agency
 * @param conditions
 * @param typeReducer
 * @return {function(*=): Promise<any>}
 */
export const getListAgency = (conditions,typeReducer)=>(dispatch) =>{
    return new Promise((resolve,reject)=>{
        return api.post("/account/list-agency",conditions)
            .then(res=>{
                dispatch({ type: typeReducer,payload:res.data });
                resolve(res.data)
            }).catch(err=>{
                console.log(err.response);
                reject(err)
            })
    })
};


export const addListPropertySeen = (id)=>(dispatch) =>{
    return new Promise((resolve,reject)=>{
        return api.get('/account/add-list-property-seen/'+id)
            .then(res=>{
                resolve(res.data)
            })
            .then(() => {
                dispatch(getLogin())
            })
            .catch(err=>{
                console.log(err.response);
                reject(err)
            })
    })
};

export const getLogin = ()=>(dispatch) =>{
    return new Promise((resolve,reject)=>{
        return api.get('/account/getlogin')
            .then(res=>{
                dispatch({ type: GET_LOGIN,payload:res.data });
                dispatch({ type: GET_CURRENT_ACCOUNT,payload:res.data });
                let account = {accountinfor:res.data};
                 account =  btoa(""+JSON.stringify(account));
                localStorage.setItem("mandp",account);
                resolve(res);
            }).catch(err=>{
                console.log(err.response);
                console.log("getLogin ERROR");
                removeCookie('session_id');
                dispatch({ type: GET_LOGIN,payload:{id:0} });
                reject(err);
            })
    })
};

export const checkNumberAccountChild = ()=>(dispatch) =>{
    return new Promise((resolve,reject)=>{
        return api.get('/account/checkNumberAccountChild')
            .then(res=>{
                // console.log('==||======>',res);
                resolve(res);
            }).catch(err=>{
                reject(err);
            })
    })
};

export const UploadImage = data => dispatch =>{
    let formData = new FormData;
    let check_file = [];
    data.map((item,index)=>{
        if(item.property_id === undefined && item.path === undefined){
            check_file.push(true);
            formData.append(item.id,item.file);
        }
    });
    check_file =  check_file.indexOf(true) > -1;
    if(check_file){
        return new Promise((resolve,reject)=>{
            api.post('/account/upload-image',formData)
                .then(res=>{
                    console.log("upload images successful====>",res);
                    resolve(res);
                })
                .catch(err=>{
                    console.log("upload image fail===>",err.response);
                    reject(err.response)
                })
        })
    }
    else{
        return  Promise.resolve(null)
    }
};

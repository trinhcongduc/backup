import {getCookie} from "Helpers/session";
import api from "Api";
import {GET_CONTACT_TYPE} from "Actions/types";

export const getContactType  = () => dispatch => {
    return new Promise((resolve, reject) => {
        api.get('/contacttype').then(res => {
            dispatch({ type: GET_CONTACT_TYPE, payload: res.data.dataobject });
            resolve(res.data.dataObject);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    })
};
import api from "Api";
import {GET_CITY, GET_LIST_CONTACT, GET_REGIONS} from "Actions/types";

export const getCity = (type) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`/city/list/${type}`).then(res => {
            dispatch({ type: GET_CITY, payload: res.data });
            resolve(res.data);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    })
};
export const getRegions = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`/regions/list/${id}`).then(res => {
            dispatch({ type: GET_REGIONS, payload: res.data });
            resolve(res.data);
        }).catch(err => {
            console.log(err.response);
            reject(err);
        })
    })
};

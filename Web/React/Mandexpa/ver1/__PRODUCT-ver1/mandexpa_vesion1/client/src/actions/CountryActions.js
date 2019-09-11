import {getCookie} from "Helpers/session";
import api from "Api";
import {GET_ALL_COUNTRY} from "Actions/types";

export const getAllCountry = () => dispatch => {
    return api.get('/country/list').then(res => {
        dispatch({ type: GET_ALL_COUNTRY, payload: res.data });
    }).catch(err => {
        console.log("ERROR get all country",err);
    })
};
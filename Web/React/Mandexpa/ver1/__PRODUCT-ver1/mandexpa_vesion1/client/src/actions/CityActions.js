import api from "Api";
import {GET_ALL_CITY} from "Actions/types";

export const getAllCity = () => dispatch => {
    return api.get('/city/list').then(res => {
        dispatch({ type: GET_ALL_CITY, payload: res.data });
    }).catch(err => {
        console.log(err);
    })
};
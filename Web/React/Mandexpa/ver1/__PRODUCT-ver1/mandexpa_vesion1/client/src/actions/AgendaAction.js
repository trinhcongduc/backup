import { NotificationManager } from 'react-notifications';
import {

} from './types';
import api from 'Api';
import {GET_LIST_AGENDA} from "./types";
import {getAllFile} from "Actions/DocumentAction";

export const createAgenda = (data) => (dispatch) => {
    return new Promise((resolve,reject) => {
        console.log('data',data)
        api.post('/agenda/create', data)
            .then(response => {
                console.log(response);
                resolve(response.data);
                NotificationManager.success("Créez l'agenda avec succès!");
            })
            .catch(error => {
                console.log(error);
                reject(error);
                NotificationManager.error("L'agenda de création a échoué");
            })
    })
};
export const getListAgenda = () => dispatch => {
    return new Promise((resolve, reject) => {
        api.get('/agenda/list').then(res => {
            dispatch({ type: GET_LIST_AGENDA, payload: res.data });
            console.log("test",res.data);
            resolve(res.data);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    })
};
export const changeStatusAgenda = (id,status,date_visit,hour_visit) => dispatch => {
    return new Promise((resolve, reject) => {
        var data = {
            id : id,
            status : status,
            date_visit: date_visit,
            hour_visit : hour_visit,
        }
        api.post('/agenda/change_status',data).then(res => {
            console.log("data agenda",res.data);
            resolve(res.data);
        }).then(() => {
            dispatch(getListAgenda())
        })
            .catch(err => {
            console.log(err);
            reject(err);
        })
    })
};
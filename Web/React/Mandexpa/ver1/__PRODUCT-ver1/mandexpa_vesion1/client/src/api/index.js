import axios from 'axios';
import {URL_SERVER} from 'Constants/GeneralConfig';
import { NotificationManager } from 'react-notifications';
import { getCookie, removeCookie } from '../helpers/session';

// const session_id = getCookie('session_id');

const api = axios.create({
    baseURL: URL_SERVER,
    timeout: 1000000000,
    // headers: {
    //     //     'Content-Type': 'application/json'
    //     // }
});

api.interceptors.request.use(function (config) {
    const session_id = getCookie('session_id');
    // Do something before request is sent
    if (session_id) {
        config.headers.common['sessionid'] = session_id
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

api.interceptors.response.use(
    response => response,
    error => {
        console.log("=====>",error);
        if (error.response.status === 401) {
            NotificationManager.error("Session expired");
            // remove expired session_id and reload
            removeCookie('session_id');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
        return Promise.reject(error);
    }
);

export default api;
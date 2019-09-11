import api from "Api";
import { NotificationManager } from "react-notifications"
import axios from 'axios';
const CancelToken = axios.CancelToken;
let cancel;

/**
 * Function call in your componentWillUnmount for cancel any request do not resolved
 * @param message
 * @return {Function}
 * @constructor
 */
export const CancellationRequestDashBoard = (message) =>  dispatch =>{
    cancel();
};

export const getStatisticAPI = () => dispatch =>{
    return new Promise((resolve,reject)=>{
            api.get('/dashboard/statistic',{
                cancelToken: new CancelToken(function executor(c) {
                    cancel = c;
                })
            }).then(res=>{
                resolve(res);
            }).catch(err=>{
                if (axios.isCancel(err)) {
                    console.log('Request canceled', err.message);
                }else{
                    console.log("Error get statistic",err.response);
                    // NotificationManager.error("Error get statistic information");
                    reject(err);
                }


            })
    })
};
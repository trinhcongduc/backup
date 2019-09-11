import api from "Api";
import {NotificationManager} from "react-notifications";
import {
    GET_LIST_PROPERTY_MATCH,
    UPDATE_DATA_PROPERTY_EDIT,
    UPDATE_DATA_MATCHIN_PROPERTY,
} from "Actions/types";


export const createPropertyMatch = (datas) => dispatch => {
    console.log("PROPERTY_MATCH_DATA_CREATE__>",datas);
    return new Promise((resolve, reject) => {
        api.post('/property-matches/create',datas)
            .then(response => {
                NotificationManager.success("Create successfully!");
                resolve(response);
            })
            .catch(error => {
                console.log("=========--->CREATE ERROR: PROPERTY MATCH",error.response);
                NotificationManager.error("CREATE ERROR: PROPERTY MATCH");
                reject(error);
            })
    })
};
export const getListPropertyMatch = (filter) => dispatch => {
    let filter_string = '';
    if (filter){
        Object.keys(filter).map(key => {
            if(filter[key]!==null&&filter[key]!==""){
                if (Array.isArray(filter[key])) {
                    filter[key].map(item => {
                        filter_string = filter_string.concat(`&${key}=${item}`);
                    })
                } else {
                    filter_string = filter_string.concat(`&${key}=${filter[key]}`);
                }
            }
        });
    }
    return new Promise((resolve, reject) => {
        api.get(`/property-matches/list?${filter_string}`).then(res => {
            dispatch({ type: GET_LIST_PROPERTY_MATCH, payload: res.data });
            resolve(res.data);
        }).catch(err => {
            console.log(err.response);
            reject(err);
        })
    })
};

export const getPropertyMatchesDetail = (id)=>dispatch=>{
    return new Promise((resolve,reject)=>{
        api.get("/property-matches/edit/"+id)
            .then(res=>{
                dispatch({type:UPDATE_DATA_PROPERTY_EDIT,payload:res.data});
                // console.log("-->",res);
                NotificationManager.success("Get data successfully");
                resolve(res.data);
            }).catch(err=>{
            console.log("ERROR: get property matches edit",err.response);
            NotificationManager.error("GET DATA ERROR");
            reject(err);
        })

    })
};

export const updateFieldsPropertyMatches = (datas)=>dispatch=>{
    // console.log("PROPERTY_MATCH_DATA_UPDATE__",datas);
    return new Promise((resolve,reject)=>{
        api.post("/property-matches/update",datas)
            .then(res=>{
                // dispatch({type:UPDATE_DATA_PROPERTY_EDIT,payload:res.data});
                NotificationManager.success("Update data successfully");
                resolve(res.data);
            }).catch(err=>{
            console.log("ERROR: update data property matches",err.response);
            NotificationManager.error("UPDATE DATA ERROR");
            reject(err);
        })
    })
};

export const getMatchingPropsResults = (id)=>dispatch=>{
    return new Promise((resolve,rejected)=>{
        api.get("/property-matches/matching/"+id).then(res=>{
            console.log("RESULTS____>",res.data);
            dispatch({type:UPDATE_DATA_MATCHIN_PROPERTY,payload:res.data});
            NotificationManager.success("Get result successfully.");
            resolve(res.data);
        })
            .catch(err=>{
                console.log("ERROR: get matching property results",err.response);
                NotificationManager.error("Error: get matching property results");
                rejected(err.response);
            })
    })
};
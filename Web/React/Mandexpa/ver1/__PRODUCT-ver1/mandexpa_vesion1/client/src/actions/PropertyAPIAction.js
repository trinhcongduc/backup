import {
    GET_CONTACT_DETAIL,
    GET_LIST_PROPERTY,
    UPDATE_FAC_CHILD,
    UPDATE_FAC_PARENT,
    UPDATE_FIELD,
    UPDATE_ROOM_TYPE,
    GET_PROPERTY_DETAIL,
    PROPERTY_UPLOAD_IMAGE,
    PROPERTY_ADVANCED_FILTER,
} from "Actions/types";
import {getAccountCurrent} from "Helpers/helpers";
import api from 'Api';
import {isEmpty} from "Helpers/helpers";
import {NotificationManager} from 'react-notifications';
import axios from 'axios';
const CancelToken = axios.CancelToken;
let cancel;

/**
 * Function call in your componentWillUnmount for cancel any request do not resolved
 * @param message
 * @return {Function}
 * @constructor
 */
export const CancellationRequest = (message) =>  dispatch =>{
    cancel();
};

export const getListRoomTypes = () => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/category/list-room-type')
            .then(res => {
                dispatch({type: UPDATE_ROOM_TYPE, payload: res.data});
                resolve(res);
            })
            .catch(err => {
                console.log("ERROR get list room type: ", err);
                reject(err);
            })

    })
};

export const getListParentFacility = (conditions,type) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/category/list_parent',conditions)
            .then(res => {
                // dispatch({type: UPDATE_FAC_PARENT, payload: res.data});
                dispatch({type: type, payload: res.data});
                resolve(res);
            })
            .catch(err => {
                console.log("ERROR get list facility parent: ", err);
                reject(err);
            })

    })
};

export const getAllChildFacility = (datas,type) => async dispatch => {

    // map through the repo list
    const promises = datas.map(async data => {
        // request details from GitHub’s API with Axios
        var id = data.id;
        const response = await api.get('/category/' + id);
        return {
            parent_id: id,
            child: response.data
        }
    });

    // wait until all promises resolve
    const results = await Promise.all(promises);
    // dispatch({type: UPDATE_FAC_CHILD, payload: results});
    dispatch({type: type, payload: results});
    return results;
};

export const getDeletePropertyByID = (id) => dispatch =>{

    return new Promise((resolve,reject)=>{
        return api.get('/delete-property/'+id)
            .then(res=>{
                resolve(res);
            })
            .then(() => {
                dispatch(getListProperty(null))
            })
            .catch(err=>{
                reject(err);
                console.log(err);
            })
    })
};

export const createProperty = data => dispatch => {

    let data_send = Object.assign({},data);
    delete  data_send.reorder;

    let {documents} =  data_send.document_fields;
    data_send.document_fields = documents.map(item=>{
        delete item.file;
        return item;
    });


    // handle data main fields
    data_send.main_fields.auto_commission = data_send.main_fields.auto_commission ? 1:0;

    // handle data location fields
    data_send.location_fields.town = data_send.location_fields.town || null;
    // data_send.formData = formData;

    console.log("BEFORE_SEND=>", data_send);
    return new Promise((resolve, reject) => {
        api.post('/property/create', data_send)
            .then(response => {
                let {data} = response;
                console.log("DATA PROPERTY 1==>", response);
                resolve(response)
            })
            .catch((error) => {
                NotificationManager.error("Erreur lors de la création de la propriété. Veuillez essayer plus tard.");
                console.log("+++>ERROR CREATE", error.response);
                reject(error);
            });
    })
};

export const updateProperty = data => dispatch => {
    let data_send = {...data};

    let {documents} =  data_send.document_fields;
    data_send.document_fields = documents.map(item=>{
        delete item.file;
        return item;
    });

    console.log("BEFORE_UPDATE_SEND=>", data_send);
    return new Promise((resolve, reject) => {
        api.put('/property/update', data_send)
            .then(response => {
                if(data_send.reorder && !isEmpty(data_send.reorder)){
                    NotificationManager.success("Rapport de transaction enregistré");
                    resolve(response)
                }else {
                    NotificationManager.success("Mise à jour de la propriété avec succès!");
                    resolve(response)
                }

            })
            .catch((error) => {
                NotificationManager.error("Erreur mise à jour propriété.Veuillez essayer plus tard.");
                console.log("+++>ERROR UPDATE", error.response);
                reject(error);
            });
    })
};

export const getListProperty = (filter,pagination) => dispatch => {
    let filter_string = '';
    try{
        pagination = pagination !== undefined?pagination:null;
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
            api.post(`/property/list?${filter_string}`,{pagination:pagination},{
                cancelToken: new CancelToken(function executor(c) {
                    cancel = c;
                })
            }).then(res => {
                dispatch({type: GET_LIST_PROPERTY, payload: {pagination:pagination,data:res.data}});
                dispatch({type: PROPERTY_ADVANCED_FILTER, payload: filter});
                resolve(res);
            }).catch(err => {
                console.log("error when get list property",err.response);
                reject(err);
            })
        })
    }catch(error){
        if (axios.isCancel(error)) {
            console.log("Request canceled", error.message);
            throw new Error("Cancelled");
        }
    }
};

export const getPropertyDetail = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`/property/${id}`)
            .then(response => {
                dispatch({type: GET_PROPERTY_DETAIL, payload: response.data});
                console.log("response.data",response.data);
                if(isEmpty(response.data)){
                    NotificationManager.error("Error get bien detail");
                }
                else {
                    if(getAccountCurrent().id === response.data.property.created_by){
                        NotificationManager.success("Mode édition du bien ");
                    }
                }
                resolve(response.data);
            })
            .catch(error => {
                console.log(error);
                NotificationManager.error("Error get Property detail");
                reject(error);
            })
    })
};

export const getFileServer = (filePath) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`/file/${filePath}`,{
            responseType: 'arraybuffer',
        })
        .then(response => {
            resolve(response);
        })
        .catch(error => {
            console.log("=========--->GET_FILE_ERROR",error);
            NotificationManager.error("=========--->GET_FILE_ERROR");
            reject(error);
        })
    })
};

export const getFilePDF = (filter) => {
    return new Promise((resolve, reject) => {
        var filter_string = '';
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
        api.get(`/property/print_file_pdf?${filter_string}`)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                console.log(error.response);
                NotificationManager.error("Error print pdf");
                reject(error);
            })
    })
};

export const cancelProperty = data => dispatch =>{
    let _id = data.id;
    delete  data.id;
    return new Promise((resolve,reject)=>{
       return api.put('property/cancel/'+_id,data).then(res=>{

           resolve(res)
       }).catch(err=>{
           console.log("ERROR===========>",err.response);
           reject(err)
       })
    })
};
export const confirmCollaberateByAgencyB = (id) => dispatch =>{

    return new Promise((resolve,reject)=>{
       return api.put('property/confirm-collaberate/'+id).then(res=>{
           NotificationManager.success("La transaction est confirmée");
           resolve(res)
       }).catch(err=>{
           console.log("ERROR===========>",err.response);
           reject(err)
       })
    })
};
export const vadidateCollaberateByAgencyA = (id) => dispatch =>{

    return new Promise((resolve,reject)=>{
        return api.put('property/vaidate-collaberate/'+id).then(res=>{
            NotificationManager.success("La transaction est validée");
            resolve(res)
        }).catch(err=>{
            console.log("ERROR===========>",err.response);
            reject(err)
        })
    })
};
export const propertyUploadImage = data => dispatch =>{
    let formData = new FormData;
    let check_file = [];
    data.map((item,index) => {
        if(item.property_id === undefined && item.path === undefined){
            check_file.push(true);
            formData.append(item.id,item.file);
        }
    });
    check_file =  check_file.indexOf(true) > -1;
    if(check_file){
        return new Promise((resolve,reject)=>{
            api.post('/property/upload/images',formData)
                .then(res=>{
                    console.log("upload images successful====>",res);
                    dispatch({type:PROPERTY_UPLOAD_IMAGE,payload:res.data});
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

/**
 * Action upload document of property when create it
 * @param type      : document type
 * @param file      : document data
 * @return {function(*): Promise<any>}
 */
export const propertyUploadDocument = (type,file) => dispatch =>{
    console.log("action property upload file=->",file);
    let formData =  new FormData();
    formData.append(type,file);
    return new Promise((resolve,reject)=>{
        api.post('/property/documents',formData).then(res=>{
            resolve(res);
        }).catch(err=>{
            console.log("err==>",err.response);
            reject(err.response);
        })
    })
};

/**
 * Action upload file document offer of other agency
 * @param id        : property id
 * @param type      : document type
 * @param file      : document data
 * @return {function(*): Promise<any>}
 */
export const UploadPropertyOfferDocument = (id,type,file) => dispatch =>{
    console.log("action property upload file=->",file);
    let formData =  new FormData();
    formData.append(type,file);
    return new Promise((resolve,reject)=>{
        api.post('/property/documents/offer/'+id,formData).then(res=>{
            console.log("res",res);
            resolve(res);
        }).catch(err=>{
            console.log("err==>",err.response);
            reject(err.response);
        })
    })
};


export const updateMarketingUrl =  (data) =>dispatch =>{
    const {id} = data;
    delete data.id;
    return new Promise((resolve,reject)=>{
        api.put('/property/marketing/update/'+id,data).then(res=>{
            NotificationManager.success("Update url successful");
            resolve(res);
        }).catch(err=>{
            console.log("error when update marketing url ",err.response);
            NotificationManager.error("Error when update. please try again later!");
            reject(err);
        })
    })
};

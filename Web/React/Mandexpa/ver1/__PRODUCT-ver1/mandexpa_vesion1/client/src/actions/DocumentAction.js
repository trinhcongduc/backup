import {
    GET_ALL_FILE,
    GET_ORDER_INVOICES,
} from "Actions/types";
import api from 'Api';
import {NotificationManager} from 'react-notifications';
import {ACCOUNT_TYPE} from "Constants/GeneralConfig";
export const uploadDocument = data => dispatch => {

    // handle send  file to server.
    let formData = new FormData();
    formData.append("file", data.file);
    formData.append("description", data.description);
    formData.append("category", data.category);
    return new Promise((resolve, reject) => {
            api.post('/document/upload-document', formData).then(res => {
                formData = new FormData();
                NotificationManager.success("Upload file successfully!");
                resolve(res)
            }).then(() => {
                dispatch(getAllFile(data.category))
            })
                .catch((error)=>{
                NotificationManager.success("Error upload your file ");
                console.log("ERROR UPLOAD FILES",error.response)
            });
    })
};
export const deleteDocument = (id,category)=> dispatch => {

    return new Promise((resolve, reject) => {
        api.post(`/document/delete-document/${id}`).then(res => {
            NotificationManager.success("Delete file successfully!");
            resolve(res)
        }).then(() => {
            dispatch(getAllFile(category))
        })
            .catch((error)=>{
                NotificationManager.success("Error delete your file ");
                console.log("ERROR Delete file",error)
            });
    })
};
export const getAllFile = (category) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`/documents/list/${category}`).then(res => {
            dispatch({ type: GET_ALL_FILE, payload: res.data });
            resolve(res.data);
        }).catch(err => {
            console.log(err.response);
            reject(err);
        })
    })
};

export const getOrderInvoices =  (permission)=> dispatch =>{
    let api_url = '';
    if(permission === ACCOUNT_TYPE.ADMIN){
        api_url = '/invoice/listByAdmin'
    }else{
        api_url = '/invoice/list'
    }

    return new Promise((resolve,reject)=>{
        api.get(api_url).then(res=>{
            dispatch({type:GET_ORDER_INVOICES,payload:res.data});
            NotificationManager.success("Get list invoices success!");
            resolve(res);

        }).catch(err=>{
            console.log(err.response);
            NotificationManager.error("Error get list invoices",err);
            reject(err);
        })

    })
};
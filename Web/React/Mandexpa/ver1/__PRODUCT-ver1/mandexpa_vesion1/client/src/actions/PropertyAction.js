/**
 * Manager actions with updateFields fields's Property Tab
 */

import {
    UPDATE_TAB_MAIN_FIELDS,
    UPDATE_TAB_LOCATION_FIELDS,
    UPDATE_TAB_DESCRIPTION_FIELDS,
    UPDATE_TAB_CHARACTERISTIC_FIELDS,
    UPDATE_TAB_MEDIA_FIELDS,
    UPDATE_TAB_DOCUMENT_FIELDS,
    UPDATE_TAB_MARKETING_FIELDS,
    EDIT_IMAGE_TAB_MEDIA,
    UPDATE_TYPEOF_PROPERTY,
    SAVE_PRETAB_PROPERTY,
    CLEAR_PROPERTY,
    TAB_HAS_FIELD_REQUIRED,
    UPDATE_TAB_REORDER_FIELDS,
    CHANGE_TAB, CLEAR_DATA_PROPERTY_DETAILS,
} from "Actions/types";

/**
 *
 * @param typeName: type of reducer process
 * @param fields: field's value
 */
export const updateTypeofProperty = (fields)=>dispatch => {
    return new Promise((resolve)=>{
        dispatch({type:UPDATE_TYPEOF_PROPERTY,fields});
        resolve({action:UPDATE_TYPEOF_PROPERTY})
    })

};

export const updateFieldsPropertyMainTab = (fields)=>dispatch=> {
    //console.log("updateFieldsPropertyMainTab");
    return new Promise((resolve)=>{
        dispatch({type:UPDATE_TAB_MAIN_FIELDS,fields});
        resolve({action:UPDATE_TAB_MAIN_FIELDS})
    });
};

export const updateFieldsPropertyLocationTab = (fields)=>dispatch => {
    //console.log("updateFieldsPropertyLocationTab");
    return new Promise((resolve)=>{
        dispatch({type:UPDATE_TAB_LOCATION_FIELDS,fields});
        resolve({action:UPDATE_TAB_LOCATION_FIELDS})
    });
};

export const updateFieldsPropertyDesciptionTab = (fields)=>dispatch => {
    //console.log("updateFieldsPropertyDesciptionTab");
    return new Promise((resolve)=>{
        dispatch({type:UPDATE_TAB_DESCRIPTION_FIELDS,fields});
        resolve({action:UPDATE_TAB_DESCRIPTION_FIELDS})
    });

};

export const updateFieldsPropertyCharacterTab = (fields)=>dispatch=> {
    //console.log("updateFieldsPropertyCharacterTab");
    return new Promise((resolve)=>{
        dispatch({type:UPDATE_TAB_CHARACTERISTIC_FIELDS,fields});
        resolve({action:UPDATE_TAB_CHARACTERISTIC_FIELDS})
    });
};

export const updateFieldsPropertyMediaTab = (fields)=>dispatch => {
    //console.log("updateFieldsPropertyMediaTab");
    return new Promise((resolve)=>{
        dispatch({type:UPDATE_TAB_MEDIA_FIELDS,fields});
        resolve({action:UPDATE_TAB_MEDIA_FIELDS})
    });
};
export const editImagePropertyMediaTab = (data_image) => {
    //console.log("editImagePropertyMediaTab");
    return{
        type:EDIT_IMAGE_TAB_MEDIA,
        data_image
    }
};

export const updateFieldsPropertyDocumentTab = (fields,files_delete,status_upload)=>dispatch => {
    // console.log("status_upload_action--->",status_upload);
    return new Promise((resolve)=>{
        dispatch({type:UPDATE_TAB_DOCUMENT_FIELDS,fields,files_delete,status_upload});
        resolve({action:UPDATE_TAB_DOCUMENT_FIELDS})
    });
};

export const updateFieldsPropertyMarketingTab = (fields)=>dispatch=> {
    //console.log("updateFieldsPropertyMarketingTab");
    return new Promise((resolve)=>{
        dispatch({type:UPDATE_TAB_MARKETING_FIELDS,fields});
        resolve({action:UPDATE_TAB_MARKETING_FIELDS})
    });
};


export const updateFieldsPropertyReorderTab = (fields)=>dispatch=> {
    //console.log("updateFieldsPropertyMarketingTab");
    return new Promise((resolve)=>{
        dispatch({type:UPDATE_TAB_REORDER_FIELDS,fields});
        resolve({action:UPDATE_TAB_REORDER_FIELDS})
    });
};

export const saveKeyTabProperty = (keys,data)=>dispatch => {
    //console.log("saveKeyTabProperty");
    return new Promise((resolve)=>{
        dispatch({type:SAVE_PRETAB_PROPERTY,keys});
        resolve(data)
    });
};

// clear data fill
export const clearDataProperty = ()=>dispatch => {
    //console.log("saveKeyTabProperty");
    return new Promise((resolve)=>{
        dispatch({type:CLEAR_PROPERTY});
        resolve(1);
    });
};

// clear data get from server
export const clearDataPropertyDetails = ()=>dispatch => {
    //console.log("saveKeyTabProperty");
    return new Promise((resolve)=>{
        dispatch({type:CLEAR_DATA_PROPERTY_DETAILS});
        resolve(1);
    });
};

export const FieldRequiredInTab=(tab)=>dispatch=>{
    //console.log("The tab has a required field====> ",tab);
    return new Promise((resolve)=>{
        dispatch({type:TAB_HAS_FIELD_REQUIRED,tab:tab});
        resolve(1);
    });
};



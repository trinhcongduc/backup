/**
 *  Manager action of function Property Match
 */

import {
    UPDATE_FIELDS_PROPERTY_MATCH,
    CLEAR_PROPERTY_MATCHES_DATA_EDIT,
} from "Actions/types";


export const updateFieldsPropertyMatchs = (field)=>{
    return {
        type:UPDATE_FIELDS_PROPERTY_MATCH,
        field
    }
};

export const clear_data_edit = ()=>{
    return{
        type:CLEAR_PROPERTY_MATCHES_DATA_EDIT
    }
};
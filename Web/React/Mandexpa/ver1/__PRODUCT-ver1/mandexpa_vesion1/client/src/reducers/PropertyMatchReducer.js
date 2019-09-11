/**
 *   Property Match Reducer
 */

import {
    GET_LIST_PROPERTY_MATCH,
    UPDATE_FIELDS_PROPERTY_MATCH,
    UPDATE_DATA_PROPERTY_EDIT,
    CLEAR_PROPERTY_MATCHES_DATA_EDIT,
    UPDATE_DATA_MATCHIN_PROPERTY,
} from "Actions/types";

const INIT_STATE = {
    property_matches_edit:[],
    list_property_match : [],
    list_matching_property : [],
};

export default (state=INIT_STATE,action)=>{
    switch (action.type) {
        case UPDATE_FIELDS_PROPERTY_MATCH:{
            return{...state};
        }
        case GET_LIST_PROPERTY_MATCH:{
            return {...state,list_property_match:action.payload}
        }
        case UPDATE_DATA_PROPERTY_EDIT:{
            return {...state,property_matches_edit:action.payload}
        }
        case CLEAR_PROPERTY_MATCHES_DATA_EDIT:{
            return {...state,property_matches_edit:[]}
        }
        case UPDATE_DATA_MATCHIN_PROPERTY:{
            return {...state,list_matching_property:action.payload}
        }
        default: return state;
    }
}
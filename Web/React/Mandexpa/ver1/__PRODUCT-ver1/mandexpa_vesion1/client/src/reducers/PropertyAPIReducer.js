/**
 * Reducer Manager Data get from api of Property
 */

import {
    UPDATE_FIELD,
    UPDATE_FAC_PARENT,
    UPDATE_ROOM_TYPE,
    UPDATE_FAC_CHILD,
    GET_LIST_PROPERTY,
    GET_PROPERTY_DETAIL,
    UPDATE_TYPE_PROPERTY_PARENT,
    UPDATE_TYPE_PROPERTY_CHILD,
    UPDATE_CAT_PROPERTY,
    CLEAR_DATA_PROPERTY_DETAILS, PROPERTY_ADVANCED_FILTER,
} from "Actions/types";

/**
 * initial state of property
 */
const INIT_STATE = {
    facility_parent:[],
    facility_child:{},
    room_type:[],
    list_property : {data:[],count:0},
    detail_propertyFields:null,
    type_property_parent:[],
    type_property_child:[],
    cat_property:[],
    advanced_filter:{},
    condition_listing:{
        page:1,
        rowsPerPage:5,
        orderBy:'property.id',
        order:'desc',
    },

};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case UPDATE_FAC_PARENT:{
            return {...state,facility_parent:action.payload}
        }
        case UPDATE_FAC_CHILD:{
            return {...state,facility_child:action.payload}
        }
        case UPDATE_ROOM_TYPE:{
            return {...state,room_type:action.payload}
        }
        case GET_LIST_PROPERTY:{
            state.list_property = {
                data:action.payload.data.data_property,
                count:action.payload.data.count
            };

            return {...state}
        }
        case PROPERTY_ADVANCED_FILTER:{
            state.advanced_filter = action.payload !== null?action.payload:{};
            return {...state}
        }
        case GET_PROPERTY_DETAIL:{
            return {...state,detail_propertyFields:action.payload}
        }
        case UPDATE_TYPE_PROPERTY_PARENT:{
            return {...state,type_property_parent:action.payload}
        }
        case UPDATE_TYPE_PROPERTY_CHILD:{
            return {...state,type_property_child:action.payload}
        }
        case UPDATE_CAT_PROPERTY:{
            return {...state,cat_property:action.payload}
        }
        case CLEAR_DATA_PROPERTY_DETAILS:{
            state.detail_propertyFields = {};
            return {...state}
        }
        default: return { ...state };
    }
}

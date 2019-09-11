import {
    GET_ALL_FILE,
    GET_ORDER_INVOICES,
} from "Actions/types";

const INIT_STATE = {
    documents :[],
    invoices:[]
};
export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case GET_ALL_FILE :{
            return {...state,documents:action.payload};
        }
        case GET_ORDER_INVOICES:{
            return {...state,invoices:action.payload};
        }

        default: return { ...state };
    }
}
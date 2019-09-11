import {
    CREATE_NEW_CONTACT,
    GET_LIST_CONTACT,
    GET_CONTACT_DETAIL,
    UPDATE_A_CONTACT
} from "Actions/types";

const INIT_STATE = {
    contact: {},
    contacts :[],
    contactdetail : {},
    contactupdate : {},
};
export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case CREATE_NEW_CONTACT:{
            return {contact: action.payload};
        }
        case GET_LIST_CONTACT :{
            return {
                contacts : action.payload
            };
        }
        case GET_CONTACT_DETAIL : {
            return {
                contactdetail: action.payload
            };
        }
        case UPDATE_A_CONTACT : {
            return {
                contactupdate: action.payload
            };
        }
        default: return { ...state };
    }
}
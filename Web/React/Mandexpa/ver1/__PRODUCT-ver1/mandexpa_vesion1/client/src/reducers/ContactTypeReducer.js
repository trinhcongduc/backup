/**
 * Auth User Reducers
 */
import {
} from 'Actions/types';
import {GET_CONTACT_TYPE} from "Actions/types";

/**
 * initial auth user
 */
const INIT_STATE = {
    contacttype: [],
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case GET_CONTACT_TYPE: {
            return {
                contacttype: action.payload
            }
        }
        default: return { ...state };
    }
}

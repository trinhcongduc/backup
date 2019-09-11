/**
 * Country Reducers
 */
import {
} from 'Actions/types';
import {GET_ALL_COUNTRY} from "Actions/types";

/**
 * initial auth user
 */
const INIT_STATE = [];

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRY: {
            return action.payload
        }
        default: return [...state];
    }
}

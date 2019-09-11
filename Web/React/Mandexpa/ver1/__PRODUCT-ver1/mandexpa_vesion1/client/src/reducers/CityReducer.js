/**
 * Auth User Reducers
 */
import {
} from 'Actions/types';
import {GET_ALL_CITY} from "Actions/types";

/**
 * initial auth user
 */
const INIT_STATE = {
    cities: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_CITY: {
            return {
                cities: action.payload
            }
        }
        default: return { ...state };
    }
}

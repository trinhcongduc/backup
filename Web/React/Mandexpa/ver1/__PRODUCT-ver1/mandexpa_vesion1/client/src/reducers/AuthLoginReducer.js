/**
 * Auth User Reducers
 */
import {
    GET_LOGIN
} from 'Actions/types';

/**
 * initial auth user
 */
const INIT_STATE = {
    id:-1
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_LOGIN:{
            return action.payload;
        }
        default: return { ...state };
    }
}

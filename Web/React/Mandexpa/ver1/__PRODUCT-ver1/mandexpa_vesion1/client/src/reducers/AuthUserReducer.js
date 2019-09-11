/**
 * Auth User Reducers
 */
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    GET_AUTH_ACCOUNT,
    CREATE_NEW_USER,
    GET_ACCOUNT_BYID
} from 'Actions/types';

/**
 * initial auth user
 */
const INIT_STATE = {
    user: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case LOGIN_USER:
            return { ...state};

        case LOGIN_USER_SUCCESS:{
            return {user: action.payload};
        }
        case CREATE_NEW_USER:{
            return {user: action.payload};
        }

        case LOGIN_USER_FAILURE:
            return { user: null };

        case LOGOUT_USER:
            return {user: null}

        case GET_AUTH_ACCOUNT: {
            return {
                user: action.payload
            }
        }
        case GET_ACCOUNT_BYID: {
            return {
                user: action.payload
            }
        }
        default: return { ...state };
    }
}

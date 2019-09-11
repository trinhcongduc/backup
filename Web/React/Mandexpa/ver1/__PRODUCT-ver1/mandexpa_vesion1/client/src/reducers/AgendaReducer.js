/**
 * List AgendaReducer
 */
import {
} from 'Actions/types';
import {
    GET_LIST_AGENDA,
} from "Actions/types";

/**
 * initial auth user
 */
const INIT_STATE = {
    agendas: [],
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_LIST_AGENDA:{
            state.agendas = action.payload;
            return {...state};
        }
        default: return { ...state };
    }
}
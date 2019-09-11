import {
} from 'Actions/types';
import {SET_SALE_PLAN} from "Actions/types";
import {GET_ALL_COUNTRY} from "Actions/types";

const INIT_STATE = "0";

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case SET_SALE_PLAN:{
                return action.uploadDocument
            }
        default: return state;
    }
}

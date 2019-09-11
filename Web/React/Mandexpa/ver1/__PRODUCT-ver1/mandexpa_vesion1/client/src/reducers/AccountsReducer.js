/**
 * List Account Reducer
 */
import {
} from 'Actions/types';
import {
    GET_ACCOUNTS,
    GET_AGENCYS,
    GET_STAFFS,
    GET_ACCOUNTS_BY_CONDITIONS,
    GET_LIST_ACCOUNTS_BY_CONDITIONS,
    GET_CURRENT_ACCOUNT
} from "Actions/types";

/**
 * initial auth user
 */
const INIT_STATE = {
    list: {
        data:[],
        count:0
    },
    condition_listing:{
        page:1,
        rowsPerPage:5,
        orderBy:'id',
        order:'asc',
    },
    agencys: [],
    staffs: [],
    accounts_byConditions: [],
    currentAccount: {},
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ACCOUNTS:{
            state.list = action.payload;
            return {...state};
        }
        case GET_LIST_ACCOUNTS_BY_CONDITIONS:{
            state.list = {data:action.payload.data,count:action.payload.count};
            return {...state};
        }
        case GET_AGENCYS:{
            state.agencys =action.payload;
            return {...state};
        }
        case GET_STAFFS:{
            state.staffs =action.payload;
            return {...state};
        }
        case GET_ACCOUNTS_BY_CONDITIONS:{
            state.accounts_byConditions =action.payload;
            return {...state};
        }
        case GET_CURRENT_ACCOUNT:{
            state.currentAccount =action.payload;
            return {...state};
        }
        default: return { ...state };
    }
}

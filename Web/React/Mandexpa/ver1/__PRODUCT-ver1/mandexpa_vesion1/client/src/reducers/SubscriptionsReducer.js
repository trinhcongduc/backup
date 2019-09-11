
import {
    GET_DETAIL_SUBSCRIPTION,
    GET_LIST_SUBSCRIPTIONS,
    UPDATE_LIST_SUBSCRIPTIONS,
    UPDATE_SUBSCRIPTION,
    DELETE_SUBSCRIPTION,
} from "Actions/types"

const INIT_STATE={
    condition_listing:{
        page:1,
        rowsPerPage:5,
        orderBy:'id',
        order:'asc',
    },
    detail:{},
    list:{data:[],count:0},
};


export default (state = INIT_STATE,action)=>{
    switch (action.type) {
        case GET_LIST_SUBSCRIPTIONS:{
            return {
                ...state,
                condition_listing:action.payload.condition_listing,
                list:{...action.payload.data}
            };
        }
        case UPDATE_LIST_SUBSCRIPTIONS:{
            return  {...state,
                        list:{
                            data:[...state.list.data,action.payload]},
                            count:state.list.count + 1
                    };
        }
        case GET_DETAIL_SUBSCRIPTION:{
            let list = [...state.list.data];
            let detail = list.filter(item=>{
                return item.id === action.payload;
            });
            detail = detail.length?detail[0]:{};
            return {...state,detail:detail};
        }
        case UPDATE_SUBSCRIPTION:{
            let list = [...state.list.data];
            let {payload} = action;
            list = list.map(item =>{
                if(item.id === payload.id){
                    payload.state = payload.state === true?1:0;
                    item = payload;
                }
                return item
            });
            return  {...state,
                        list:{...list,data:list}
                    };
        }
        case DELETE_SUBSCRIPTION:{
            let list = [...state.list.data];
            let {payload} = action;
            list = list.filter(item =>{
                return item.id !== payload.id
            });
            return {
                detail:{},
                list:{
                    data:list,
                    count:state.list.count - 1
                }
            };
        }
        default: return [...state ];
    }
}
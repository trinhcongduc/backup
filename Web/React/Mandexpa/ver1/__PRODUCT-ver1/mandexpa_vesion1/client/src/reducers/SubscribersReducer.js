
import {
    GET_DETAIL_SUBSCRIBERS,
    GET_LIST_SUBSCRIBERS,
    UPDATE_LIST_SUBSCRIBERS,
    UPDATE_SUBSCRIBERS,
    DELETE_SUBSCRIBERS,
    UPDATE_SUBSCRIBER_USERS,
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
    users:{
        data:[],
        count:0
    },

};


export default (state = INIT_STATE,action)=>{
    switch (action.type) {
        case GET_LIST_SUBSCRIBERS:{
            return {
                ...state,
                condition_listing:action.payload.condition_listing,
                list:{...action.payload.data}
            };
        }
        case UPDATE_LIST_SUBSCRIBERS:{
            return  {...state,
                        list:{
                            data:[...state.list.data,action.payload],
                            count:state.list.count + 1}
                    };
        }
        case GET_DETAIL_SUBSCRIBERS:{
            let list = [...state.list.data];
            let detail = list.filter(item=>{
                return item.id === action.payload;
            });
            detail = detail.length?detail[0]:{};
            return {...state,detail:detail};
        }
        case UPDATE_SUBSCRIBERS:{
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
        case DELETE_SUBSCRIBERS:{
            let list = [...state.list.data];
            let {payload} = action;
            list = list.filter(item =>{
                return item.id !== payload.id
            });
            return {
                ...state,
                detail:{},
                list:{
                    data:list,
                    count:state.list.count - 1
                }
            };
        }
        case UPDATE_SUBSCRIBER_USERS:{
            let {payload} =  action;
            let user = {};
            user.data = payload.data;
            user.count = payload.count;

            return {...state,users:user}
        }
        default: return [...state ];
    }
}
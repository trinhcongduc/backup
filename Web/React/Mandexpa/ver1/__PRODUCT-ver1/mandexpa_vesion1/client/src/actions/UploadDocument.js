
import {SET_SALE_PLAN} from "Actions/types";


export const setSalePlan = (uploadDocument) => {
    return{
        type:SET_SALE_PLAN,
        uploadDocument
    }
};
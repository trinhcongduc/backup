
/**
 *  Param validate form type
 */

export const email = RegExp(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/
);
export const number_only = "/^[0-9\\b]+$/";
export const text_only = "[a-zA-Z]*";
export const minlength =(min) =>{
    return "/[0-9a-zA-Z]{"+min+",}/";
};
export const maxlength =(max) =>{
    return "/[0-9a-zA-Z]{,"+max+"}/";
};

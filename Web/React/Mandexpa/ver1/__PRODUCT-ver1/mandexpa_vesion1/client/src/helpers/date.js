import moment from "moment";
import "moment-timezone";
import AppConfig from "Constants/AppConfig";
import {getDateTimeZone} from "Helpers"

/**
 * Function get date format (old function :  not recommended )
 * @param date
 * @returns {*}
 */
export function dateFormat(date) {
    date = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(date);
    return date;
}

/**
 * Function display date with format by param @format
 * Default display date by format is configured in AppConfig
 * @param date
 * @param format
 * @param time_zone
 * @returns {string}
 */
export function datebyFormat(date,format=AppConfig.dateFormatDisplay,time_zone = AppConfig.time_zone) {

    date = getDateTimeZone(date,time_zone);
    return moment(date).format(format);

    // console.log("date=========",date);
    // if(date === 'now'){
    //     return getDateTimeZone(moment().format(format));
    // }
    // if(date){
    //     date = new Date(date);
    //     return getDateTimeZone(moment(date).format(format));
    // }else{
    //     return getDateTimeZone(moment().format(format));
    // }
}

/**
 * Function display date by format is configured in AppConfig
 * @param date
 * @returns {string}
 */
export function dateDisplayFormat(date) {
    if(date){
        date = new Date(date);
        return moment(date).format(AppConfig.dateFormatDisplay);
    }else{
        return moment().format(AppConfig.dateFormatDisplay);
    }
}


/**
 * Get date with format by timezone
 * @param date
 * @param timezone
 * @returns {*}
 */
exports.getDateTimeZone = (date,timezone=AppConfig.time_zone) => {
    try{
        if(date === 'now'){
            return moment().tz(timezone);
        }else{
            return moment(date).tz(timezone);
        }
    }catch (e) {
        console.log("=======>Error get date by timezone err",e);
        return e
    }

};

/**
 * Function render month list in digital format
 * @returns {Array}
 */
export function creatListMonth() {
    var  elements =  [];
    for(var index = 1;index <= 12;index++){
        elements.push({label:index,value:index})
    }
    return elements;
}


/**
 * Get Date
 */
export function getTheDate(timestamp, format) {
    let time = timestamp * 1000;
    let formatDate = format ? format : 'MM-DD-YYYY';
    return moment(time).format(formatDate);
}

/**
 * Convert Date To Timestamp
 */
export function convertDateToTimeStamp(date, format) {
    let formatDate = format ? format : 'YYYY-MM-DD';
    return moment(date, formatDate).unix();
}
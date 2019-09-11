const MomentTimeZone = require('moment-timezone');
const Config = require('../config');
const moment = require('moment');

/**
 * get current Date format yyyy/mm/dd
 * @returns {string}
 */
exports.getDateyyyymmdd = (format='Y/MM/DD') => {
    var now = new Date();
    return this.getDateTimeZone(now,format)
};

/**
 * Get date with format by timezone
 * @param date
 * @param format
 * @param timezone
 * @returns {*}
 */
exports.getDateTimeZone = (date,format = Config.get('/dateConfig/date_format/date_format_default') ,timezone = Config.get('/dateConfig/timezone/tz')) => {
    try{
        if(date === 'now'){
            return moment().tz(timezone).format(format);
        }else{
            return moment(date).tz(timezone).format(format);
        }
    }catch (e) {
        console.log("=======>Error get date by timezone err",e);
        return e
    }

};
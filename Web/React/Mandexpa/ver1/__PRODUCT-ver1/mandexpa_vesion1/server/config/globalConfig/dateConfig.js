const date_config = {
    timezone:{
        LUX:{
            country_code:'LU',
            UTC : 'GMT +2',
            tz  : 'Europe/Luxembourg'
        },
        VI:{
            country_code:'VI',
            UTC : 'GMT +7',
            tz  : 'Asia/Ho_Chi_Minh'
        }
    },
    DateFormat : {
        long_date:"MMMM d, yyyy",
        sort_date:"dd/MM/yyyy",
        time_format:"HH:mm",
        time_date_format:"MMMM d, yyyy h:mm aa",
        dateSaveDB : 'Y/MM/DD',
        date_display : 'DD-MM-Y',
        datetimeSaveDB : 'Y/MM/DD hh:mm',
        datetimeDisplay : 'DD/MM/Y hh:mm',
        custom : 'hh:mm:ss D/MM/Y',
    }
};

module.exports = date_config;
export const DAY_OF_WEEK  = [
    {label:"Lundi",value:1},
    {label:"Mardi",value:2},
    {label:"Mercredi",value:3},
    {label:"Jeudi",value:4},
    {label:"Vendredi",value:5},
    {label:"Samedi",value:6},
    {label:"Dimanche",value:0},
];

// time zone
export const time_zone ={
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
};


// variable global
export const configDateFormat = {
    long_date:"MMMM d, yyyy",
    sort_date:"dd/MM/yyyy",
    sort_date_2:"dd-MM-Y",
    time_format:"HH:mm",
    time_date_format:"MMMM d, yyyy h:mm aa",
    dateSaveDB : 'Y/MM/DD',
    date_display : 'DD/MM/Y',
    datetimeSaveDB : 'Y/MM/DD hh:mm',
    datetimeDisplay : 'DD/MM/Y hh:mm',
    custom : 'hh:mm:ss D/MM/Y',

};

//variable hour default

export const hour_default = {
    start:"8:00",
    end:"20:00",
};

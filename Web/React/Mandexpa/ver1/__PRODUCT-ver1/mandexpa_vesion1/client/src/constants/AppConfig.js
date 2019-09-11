/**
 * App Config File
 */
import {configDateFormat,hour_default,time_zone} from "./DateConfig";
import CurrenciesConfig from "./CurrenciesConfig";

const AppConfig = {
    appLogo: require('Assets/img/Logo-Mandexpa.svg'),       // App Logo
    brandName: 'Reactify',                                      // Brand Name
    navCollapsed: true,                                         // Sidebar collapse
    darkMode: false,                                            // Dark Mode
    boxLayout: false,                                           // Box Layout
    rtlLayout: false,                                           // RTL Layout
    miniSidebar: false,                                         // Mini Sidebar
    enableSidebarBackgroundImage: true,                         // Enable Sidebar Background Image
    sidebarImage: require('Assets/img/sidebar-4.jpg'),      // Select sidebar image
    isDarkSidenav: true,                                        // Set true to dark sidebar
    enableThemeOptions: false,                                  // Enable Theme Options
    currency_format:CurrenciesConfig.formatCurrency.NUMBER_SYMBOL,
    time_zone:time_zone.VI.tz,
    locale: {
        languageId: 'english',
        locale: 'en',
        name: 'English',
        icon: 'en',
        currency: CurrenciesConfig.LocalCurrencies.ENGLISH
    },
    // locale: {
    //     languageId: 'french',
    //     locale: 'fr',
    //     name: 'french',
    //     icon: 'fr',
    //     currency: CurrenciesConfig.LocalCurrencies.FRENCH
    // },
    enableUserTour: process.env.NODE_ENV === 'production',  // Enable / Disable User Tour
    copyRightText: 'Reactify © 2018 All Rights Reserved.',      // Copy Right Text
    // light theme colors
    themeColors: {
        'primary': '#614194',
        'secondary': '#677080',
        'success': '#00D014',
        'danger': '#FF3739',
        'warning': '#FFB70F',
        'info': '#00D0BD',
        'dark': '#464D69',
        'default': '#FAFAFA',
        'greyLighten': '#A5A7B2',
        'grey': '#677080',
        'white': '#FFFFFF',
        'purple': '#896BD6',
        'yellow': '#D46B08'
    },
    // dark theme colors
    darkThemeColors: {
        darkBgColor: '#424242'
    },

    //config date time
    date_format:configDateFormat.sort_date,
    dateFormatDisplay:configDateFormat.date_display,
    dateFormatSave:configDateFormat.dateSaveDB,
    hour_default: hour_default,                                 // Set hour default for fields hour in sys

    //upload configuration
    limit_size_image: 3,                                        // Mb
    limit_size_document: 10,                                    // Mb


    // google map key
    apiGoogleMap : "AIzaSyC5vs-VU7-PSNLSnqzWK7JisItkn3aPOko",
}

export default AppConfig;

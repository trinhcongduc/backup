
import AppConfig from "Constants/AppConfig";

/**
 * Function display price with format in Config
 * @param price
 * @param currency
 * @param format
 * @return {*}
 */
export function displayPriceWithCurrency(price,currency = AppConfig.locale.currency,format = AppConfig.currency_format){
    if(price){
        let price_display =  format;
        price_display = price_display.replace("{number}",price);
        price_display = price_display.replace("{symbol}",currency.symbol);
        return price_display;
    }else{
        return "";
    }
}

/**
 * Function money format
 * @param number
 * @return {*}
 */
export function numberWithCommas(number) {
    if(number !== null && number !== undefined && number.toString() !== ""){
        number = number.toString().split(' ').join('');
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
    }
    return number
}





/**
 * Function money format
 * @param number
 * @return {*}
 */
exports.numberWithCommas = (number) => {
    if(number !== null && number.toString() !== ""){
        number = number.toString().split(' ').join('');
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
    }
    return number
}
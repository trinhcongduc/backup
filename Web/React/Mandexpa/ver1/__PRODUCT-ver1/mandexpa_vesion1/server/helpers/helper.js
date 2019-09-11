const MomentTimeZone = require('moment-timezone');



/**
 * check obj empty
 * @param obj
 * @returns {boolean}
 */
exports.isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return true;
    }
    return false;
};

/**
 *  Create array keyword in alphabet
 */
exports.listAlphabet = (charA, charZ) => {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        var char = String.fromCharCode(i);
        a.push(char);
    }
    return a;
};


/**
 * Function  random number between  num1 and num2
 * @param num1
 * @param num2
 * @return {*}
 */
exports.random = (num1,num2) =>{
    return Math.floor(Math.random() * num2) + num1;
};


/**
 *
 * @param data
 * @return {number}
 */
exports.parseIntData = (data) => {
    if(data === "" || data === undefined || data === null){
        data = 0;
    }
    return parseInt(data);
}
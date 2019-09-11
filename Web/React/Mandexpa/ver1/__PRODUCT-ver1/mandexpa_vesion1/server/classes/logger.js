const log4js = require('log4js');

log4js.configure({
    appenders: { 
        info: { type: 'file', filename: 'logs/info.txt' },
        error: { type: 'file', filename: 'logs/error.txt' },
    },
    categories: { 
        default: { 
            appenders: ['info'], 
            level: 'info' 
        },
        error: { 
            appenders: ['error'], 
            level: 'error' 
        }
    }
  });

const infoLogger = log4js.getLogger('info');
const errorLogger = log4js.getLogger('error');

/**
 * function_name: name of current function
 * caller: object, who call this function
 * err: object or string error
 */
exports.error = (function_name, caller = null, err) => {
    var caller_string = "";
    var message = "";

    if(caller) {
        caller_string = caller.name + "(" + caller.phone + ")";
    }

    if (typeof err === "string") {
        message = err;
    }
    else if(err.isBoom) {
        message = err.response.data.message;
    } else {
        message = err.message;
    }

    errorLogger.error(function_name + ": Call by " + caller_string + ": " + message);
}

// module.exports = {infoLogger, errorLogger};

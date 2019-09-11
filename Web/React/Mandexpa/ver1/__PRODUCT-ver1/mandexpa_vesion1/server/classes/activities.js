var fs = require('fs');
var log_file = "./log.txt";
var ActivitiesLog = require('../models/activities-log');
var pusher = require('../classes/pusher');

// // state is SUCCESS or ERROR
// exports.log = (functionName, state, content) => {
//     let timestamp = new Date();
//     let data = timestamp + '::' + functionName + '::' + state + ' :: ' + content + '\n';
//     fs.writeFile(log_file, data, {encoding: 'utf8', flag: 'a+'}, (err) => {
//         if(err) console.log("Logging Error: " + err);
//     });
// }

exports.storeAndNotifyLog = (data, event) => {
    ActivitiesLog.create(data, (err, response) => {
        if (err) console.log(err);
        pusher.trigger('dashboard-activities', event, response);
    })
}
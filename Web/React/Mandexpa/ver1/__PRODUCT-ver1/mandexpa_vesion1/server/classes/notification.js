var https = require('https');

exports.sendOnesignalNotification = function (data) {
    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic NDVjMWEyNjMtMjk1Yy00ZmQ2LTgzYzgtZWEwZWRjZjRiYTEz"
    };

    var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
    };

    return new Promise((resolve, reject) => {
        var req = https.request(options, function (res) {
            res.on('data', function (data) {
                console.log("Response:");
                console.log(JSON.parse(data));
            });
            if(res.statusCode != 200) {
                reject(new Error(res.statusMessage));
            }
            resolve(res);
        });
    
        req.on('error', function (e) {
            reject(e);
        });
    
        req.write(JSON.stringify(data));
        req.end();
    })
};

var message = {
    app_id: "dc06a016-7b3e-4e73-a422-c2c3bc9b9605",
    contents: { "en": "English Message" },
    included_segments: ["All"]
};

// sendNotification(message);

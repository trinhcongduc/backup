const Pusher = require('pusher');
const Config = require('../config');

const channel =  Config.get('/pusherConfig/channel');
const appId =  Config.get('/pusherConfig/appId');
const key =  Config.get('/pusherConfig/key');
const secret =  Config.get('/pusherConfig/secret');
const cluster =  Config.get('/pusherConfig/cluster');

exports.pusherNotify = (event,data,channel = channel) => {
    try{
        let channels_client = new Pusher({
            appId: appId,
            key: key,
            secret: secret,
            cluster: cluster,
            encrypted: true
        });
        channels_client.trigger(channel, event, data);
    }catch (err) {
        console.log("Jump catch pusher notify.",);
        return err;
    }
};
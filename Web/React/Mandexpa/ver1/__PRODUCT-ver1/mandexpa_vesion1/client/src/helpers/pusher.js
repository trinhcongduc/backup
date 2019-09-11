import Pusher from "pusher-js";
import {pusher_params} from "Constants/GeneralConfig";

export function getPusherNotify(event,channel = pusher_params.channel) {
    let pusher = new Pusher(
        pusher_params.appId,
        {
            cluster: pusher_params.cluster,
            forceTLS: true
        });

    const channel_sub = pusher.subscribe(channel);
    return channel_sub.bind(event, data => {
        console.log("datadatadata",data);
        return data;
    });
}
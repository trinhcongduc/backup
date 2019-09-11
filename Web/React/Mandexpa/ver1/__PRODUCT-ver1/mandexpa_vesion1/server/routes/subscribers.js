'use strict';

const Subscribers = require('../controllers/subscribers');

module.exports = [
    {
        method:'POST',
        path:'/subscriber/create',
        config:{
            auth:{
                scope:['admin']
            }
        },
        handler:Subscribers.create
    },
    {
        method:'POST',
        path:'/subscriber/list',
        config:{
            auth:{
                scope:['admin']
            }
        },
        handler:Subscribers.list
    },
    {
        method:'POST',
        path:'/subscriber/upgrade',
        config:{
            auth:{
                scope:['admin']
            }
        },
        handler:Subscribers.upgrade
    },
    {
        method:'GET',
        path:'/subscriber/delete/{id}',
        config:{
            auth:{
                scope:['admin']
            }
        },
        handler:Subscribers.delete
    },
    {
        method:'GET',
        path:'/subscriber/scanSubs',
        config:{
            auth:false
        },
        handler:Subscribers.scanSubs
    },
    {
        method:'GET',
        path:'/subscriber/user-history/{id}',
        config:{
            auth:{
                scope:['admin','promoter','agency']
            }
        },
        handler:Subscribers.subscriberHistory
    }
];


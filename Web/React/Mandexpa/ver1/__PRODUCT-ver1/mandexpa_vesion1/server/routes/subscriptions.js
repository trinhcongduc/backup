'use strict';

const Subscriptions = require('../controllers/subscriptions');

module.exports = [
    {
        method:'POST',
        path:'/subscriptions/create',
        config:{
            auth:{
                scope:['admin']
            }
        },
        handler:Subscriptions.create
    },
    {
        method:'POST',
        path:'/subscriptions/list',
        config:{
            auth:{
                scope:['admin']
            }
        },
        handler:Subscriptions.list
    },
    {
        method:'GET',
        path:'/subscriptions/listAll',
        config:{
            auth:{
                scope:['admin']
            }
        },
        handler:Subscriptions.listAll
    },
    {
        method:'PUT',
        path:'/subscription/update',
        config:{
            auth:{
                scope:['admin']
            }
        },
        handler:Subscriptions.update
    },
    {
        method:'POST',
        path:'/subscription/delete',
        config:{
            auth:{
                scope:['admin']
            }
        },
        handler:Subscriptions.delete
    }
];


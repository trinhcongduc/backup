'use strict';
const LocationController = require('../controllers/location');

module.exports=[
    {
        method: 'GET',
        path: '/city/list/{type}',
        config: {
            auth: {
                scope: ['admin','staff','promoter','agency']
            },
        },
        handler: LocationController.listCity
    },
    {
        method: 'GET',
        path: '/regions/list/{id}',
        config: {
            auth: {
                scope: ['admin','staff','promoter','agency']
            },
        },
        handler: LocationController.listRegions
    },
]

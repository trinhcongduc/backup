'use strict';
const CountryController = require('../controllers/country');

module.exports = [
    {
        method: 'GET',
        path: '/country/list',
        config: {
            auth: {
                scope: ['admin','staff','promoter','agency']
            },
        },
        handler: CountryController.list
    },
];
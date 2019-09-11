'use strict';
const CategoryController = require('../controllers/category');
const Config = require('../config');

module.exports = [
    {
        method: 'POST',
        path: '/category/list_parent',
        config: {
            auth: {
                scope: ['admin', 'agency','promoter','staff']
            },
        },
        handler: CategoryController.listCatParent
    },
    {
        method: 'GET',
        path: '/category/{parent_id}',
        config: {
            auth: {
                scope: ['admin', 'agency','promoter','staff']
            },
        },
        handler: CategoryController.listCatChild
    },
    {
        method: 'GET',
        path: '/category/list-room-type',
        config: {
            auth: {
                scope: ['admin', 'agency','promoter','staff']
            },
        },
        handler: CategoryController.listRoomsType
    },
];
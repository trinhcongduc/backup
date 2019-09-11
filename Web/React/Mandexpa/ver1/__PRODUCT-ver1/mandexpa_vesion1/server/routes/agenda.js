'use strict';
const AgendaController = require('../controllers/agenda');
const Joi = require('joi');
module.exports = [
    {
        method: 'POST',
        path: '/agenda/create',
        config: {
            auth: {
                scope: ['admin','staff','promoter','agency']
            },
        },
        handler: AgendaController.create
    },
    {
        method: 'GET',
        path: '/agenda/list',
        config: {
            auth: {
                scope: ['admin','staff','promoter','agency']
            },
        },
        handler: AgendaController.list
    },
    {
        method: 'POST',
        path: '/agenda/change_status',
        config: {
            auth: {
                scope: ['staff','promoter','agency']
            },
        },
        handler: AgendaController.change_status
    },


]

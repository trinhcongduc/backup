'use strict';
const ContactController = require('../controllers/contact');
const Joi = require('joi');
module.exports = [
    {
        method: 'GET',
        path: '/contact/list',
        config: {
            auth: {
                scope: ['admin', 'staff', 'promoter', 'agency']
            },
        },
        handler: ContactController.list
    },
    {
        method: 'GET',
        path: '/contacttype',
        config: {
            auth: {
                scope: ['admin', 'staff', 'promoter', 'agency']
            },
        },
        handler: ContactController.gettypecontact
    },
    {
        method: 'GET',
        path: '/delete-contact/{id}',
        config: {
            auth: {
                scope: ['staff', 'promoter','agency']
            },
        },
        handler: ContactController.delete
    },
    {
        method: 'GET',
        path: '/recevie-mail/{id}',
        config: {
            auth: {
                scope: ['staff', 'promoter','agency']
            },
        },
        handler: ContactController.receviemail
    },
    {
        method: 'GET',
        path: '/contact/{id}',
        config: {
            auth: {
                scope: ['admin', 'staff', 'promoter', 'agency']
            },
        },
        handler: ContactController.get
    },

    {
        method: 'POST',
        path: '/contact/create',
        config: {
            auth: {
                scope: ['admin', 'staff', 'promoter', 'agency']
            },
        },
        handler: ContactController.create
    },
    {
        method: 'PUT',
        path: '/contact/update/{id}',
        config: {
            auth: {
                scope: ['admin', 'staff', 'promoter', 'agency']
            },
        },
        handler: ContactController.update

    },
    {
        method: 'POST',
        path: '/contact/list-by-conditions',
        config: {
            auth: {
                scope: ['admin','staff','agency','promoter']
            },
        },
        handler: ContactController.listConditions
    },

]

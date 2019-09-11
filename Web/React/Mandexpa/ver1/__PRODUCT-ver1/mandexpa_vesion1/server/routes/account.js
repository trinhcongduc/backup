'use strict';
const AccountController = require('../controllers/account');
const LoginController = require('../controllers/login');

module.exports = [
    {
        method: 'GET',
        path: '/account/list',
        config: {
            auth: {
                scope: ['admin', 'promoter','agency']
            },
        },
        handler: AccountController.list
    },
    {
        method: 'GET',
        path: '/account/listAdmin',
        config: {
            auth: {
                scope: ['admin']
            },
        },
        handler: AccountController.listbyAdmin
    },
    {
        method: 'GET',
        path: '/account/{id}',
        config: {
            auth: {
                scope: ['admin', 'promoter','agency','staff']
            },
        },
        handler: AccountController.get
    },
    {
        method: 'GET',
        path: '/delete-account/{id}',
        config: {
            auth: {
                scope: ['admin', 'promoter','agency']
            },
        },
        handler: AccountController.delete
    },
    {
        method: 'POST',
        path: '/login',
        config: {
            auth: false
        },
        handler: LoginController.login
    },
    {
        method:'POST',
        path: '/account/create',
        config:{
            auth: {
                scope: ['admin','agency','promoter']
            },
        },
        handler:AccountController.create
    },
    {
        method:'PUT',
        path: '/account/update',
        config:{
            auth: {
                scope: ['admin','agency','promoter','staff']
            },
        },
        handler:AccountController.update

    },
    {
        method:'GET',
        path: '/account/add-list-property-seen/{id}',
        config:{
            auth: {
                scope: ['admin','staff','agency','promoter']
            },
        },
        handler:AccountController.addlistpropertyseen

    },
    {
        method:'GET',
        path: '/account/getlogin',
        config:{
            auth: {
                scope: ['admin','staff','agency','promoter']
            },
        },
        handler:AccountController.getLogin

    },
    {
        method:'GET',
        path: '/account/checkNumberAccountChild',
        config:{
            auth: {
                scope: ['admin','agency','promoter']
            },
        },
        handler:AccountController.checkNumberAccountChild

    },
    {
        method: 'POST',
        path: '/account/listByConditions',
        config: {
            auth: {
                scope: ['admin','staff','agency','promoter']
            },
        },
        handler: AccountController.listConditions
    },
    {
        method: 'POST',
        path: '/account/list-agency',
        config: {
            auth: {
                scope: ['admin','staff','agency','promoter']
            },
        },
        handler: AccountController.listAgency
    },
    {
        method: 'POST',
        path: '/account/upload-image',
        config:{
            payload:{
                output: 'stream',
                timeout: false,
                parse: true,
                maxBytes: 52428800000,
            },
            auth:{
                scope:['admin','staff','promoter','agency']
            }
        },
        handler: AccountController.uploadImages
    },
];

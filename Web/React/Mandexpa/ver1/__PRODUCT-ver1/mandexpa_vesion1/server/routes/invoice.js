'use strict';

const invoice = require('../controllers/invoice');

module.exports = [
    {
        method: 'GET',
        path: '/invoice/create',
        config: {
            auth: false,
        },
        handler: invoice.createInvoice
    },
    {
        method:'GET',
        path: '/invoice/list',
        config: {
            auth: {
                scope: ['staff','agency','promoter']
            },
        },
        handler: invoice.listOrderInvoices
    },
    {
        method:'GET',
        path: '/invoice/listByAdmin',
        config: {
            auth:{
                scope:['admin']
            }
        },
        handler: invoice.listOrderInvoicesAdmin
    }
];
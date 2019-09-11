'use strict';
const PropertyController = require('../controllers/property');
const DocumentController = require('../controllers/document');

module.exports=[
    {
        method:'POST',
        path:'/property/create',
        config:{
            payload: {
                maxBytes: 52428800000,
                timeout: false,
            },
            auth:{
                scope:['promoter','agency','staff']
            }
        },
        handler:PropertyController.create
    },
    {
        method:'PUT',
        path:'/property/update',
        config:{
            payload: {
                maxBytes: 1000 * 1000 * 50, //50Mb
            },
            auth:{
                scope:['promoter','agency','staff']
            }
        },
        handler:PropertyController.update
    },
    {
        method:'PUT',
        path:'/property/cancel/{id}',
        config:{
            auth:{
                scope:['promoter','agency','staff']
            }
        },
        handler:PropertyController.cancel
    },
    {
        method: 'GET',
        path: '/delete-property/{id}',
        config: {
            auth: {
                scope: ['staff', 'promoter','agency']
            },
        },
        handler: PropertyController.delete
    },
    {
        method: 'POST',
        path: '/property/list',
        config: {
            auth: {
                scope: ['admin','staff','promoter','agency']
            },
        },
        handler: PropertyController.list
    },
    {
        method: 'GET',
        path: '/property/{id}',
        config: {
            auth: {
                scope: ['admin','staff','promoter','agency']
            },
        },
        handler: PropertyController.get
    },
    {
        method: 'GET',
        path: '/property/print_file_pdf',
        config: {
            auth: {
                scope: ['admin','staff','promoter','agency']
            },
        },
        handler: PropertyController.printFilePDF
    },
    {
        method: 'GET',
        path: '/property/copy/{id}',
        config: {
            auth: false,
        },
        handler: PropertyController.copy
    },
    {
        method:'POST',
        path:'/property/upload/images',
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
        handler:PropertyController.uploadImagesProperty
    },
    {
        method:'POST',
        path:'/property/documents',
        config:{
            payload:{
                output:'stream',
                timeout:false,
                parse:true,
                maxBytes:52428800000,
            },
            auth:{
                scope:['admin','staff','promoter','agency']
            }
        },
        handler:PropertyController.uploadDocumentsProperty
    },
    {
        method:'POST',
        path:'/property/documents/offer/{id}',
        config:{
            payload:{
                output:'stream',
                timeout:false,
                parse:true,
                maxBytes:52428800000,
            },
            auth:{
                scope:['admin','staff','promoter','agency']
            }
        },
        handler:PropertyController.uploadOfferDocuments
    },
    {
        method:'PUT',
        path:'/property/confirm-collaberate/{id}',
        config:{
            auth:{
                scope:['promoter','agency','staff']
            }
        },
        handler:PropertyController.confirmCollaberate
    },
    {
        method:'PUT',
        path:'/property/vaidate-collaberate/{id}',
        config:{
            auth:{
                scope:['promoter','agency','staff']
            }
        },
        handler:PropertyController.vadidateCollaberate
    },
    {
        method:'PUT',
        path:'/property/marketing/update/{id}',
        config:{
            auth:{
                scope:['promoter','agency','staff']
            }
        },
        handler:PropertyController.updateMarketingUrl
    },
]
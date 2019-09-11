'use strict';
const DocumentController = require('../controllers/document');

module.exports=[
    {
        method:'POST',
        path:'/document/upload-document',
        config:{
            payload: {
                output: 'stream',
                timeout: false,
                parse: true,
                maxBytes: 52428800000,
            },
            auth:{
                scope:['admin']
            }
        },
        handler:DocumentController.uploadDoc,
    },
    {
        method:'POST',
        path:'/property/save-document',
        config:{
            payload: {
                output: 'stream',
                timeout: false,
                parse: true,
                allow:"multipart/form-data",
                maxBytes: 52428800000,
            },
            auth:{
                scope:['promoter','agency','staff']
            }
        },
        handler:DocumentController.savePropertyDocument
    },
    {
        method:'POST',
        path:'/document/delete-document/{id}',
        config:{

            auth:{
                scope:['admin']
            }
        },
        handler:DocumentController.deleteDoc,
    },
    {
        method: 'GET',
        path: '/documents/list/{category}',
        config: {
            auth: {
                scope: ['admin','staff','promoter','agency']
            },
        },
        handler: DocumentController.list,
    }
]
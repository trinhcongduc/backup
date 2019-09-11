'use strict';
const Helper = require("../helpers/upload");
const  fs = require("fs");

module.exports = [
    {
        method: 'GET',
        path: '/store/{param*}',
        config: {
            auth: false,
        },
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true,
            }
        }
    },
    {
        method: 'GET',
        path: '/file/{param*}',
        handler:(request, h)=> {
            const pathroot = Helper.pathroot();
            let path = pathroot+"/store/private/documents/2/Mandexpa_repartition_des_fonctions (1).docx";
            return h.file(path);
        }
    }
];
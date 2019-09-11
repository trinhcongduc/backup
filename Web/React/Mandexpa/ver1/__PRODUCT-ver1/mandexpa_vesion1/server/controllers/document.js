const Boom = require('boom');
const Helper = require('../helpers');
const Knex = require('knex');
const Config = require('../config');
const Documents = require('../models/propertyModel/documents');
const PropertyMedia = require('../models/propertyModel/property_media');
const FindPropertyMatchHelper = require("../helpers/findPropertyMatch");

/**
 * Function save file upload from client side
 * @param req
 * @param h
 * @returns {Promise<*>}
 */
exports.savePropertyDocument = async (req, h) => {
    let datas = req.payload;
    try{
        console.log("==DOCUMENTS============>",datas);
        let property_id = datas.id;
        let key_data =  Object.keys(datas);
        if(datas.infor_doc !== undefined){
            let infor_doc = JSON.parse(datas.infor_doc);
            let paths = [];

            let key_files =  key_data.filter(item =>{
                return item.search('doc-')>-1||item.search('des_')>-1;
            });

            console.log("key_files>",key_files);
            //save file and update to DB
            await Promise.all(key_files.map(item=>{
                if(datas[item].hapi.filename){
                    let path = Helper.upload.uploadFile(datas[item]._data,datas[item].hapi.filename,'store/private/documents/'+property_id);
                    console.log("path--->",path);
                    paths.push(path);
                    let doc_id = infor_doc[infor_doc.map(inf=>inf.by).indexOf(item)].id;
                    return Documents.query().update({file_doc:path}).where('id', doc_id);
                }
            }));
        }else{
            return false;
        }
    }catch (err) {
        console.log("ERROR---->SAVE_DOC - "+err.message);
        return Boom.boomify(err, { statusCode: 422 });
    }
    FindPropertyMatchHelper.getPropertyMatches(req);
    return true;
};

processData = (data) => {
    return new Promise((resolve, reject) => {
        resolve(data);
    })
};

exports.uploadDoc = async (req, h) => {
    var data = req.payload;
    try{
        if(data.file !== undefined && data.description !== undefined){
            //save file and update to DB
            if(data.file.hapi.filename){
                var path = Helper.upload.uploadFile(data.file._data,data.file.hapi.filename,'store/private/documents/admin/');
                var file_doc = {
                    created_date : Helper.dateHelper.getDateyyyymmdd(),
                    uploaded_by : req.auth.credentials.user.id,
                    file_doc : path,
                    kind : 'doc-admin',
                    description: data.description,
                    category : data.category,
                };
                return await Documents.query().insert(file_doc);
            }
        }else{
            return false;
        }
    }catch (err) {
        return Boom.boomify(err, { statusCode: 422 });
    }
    return true;
};



exports.deleteDoc = async (req, h) => {
    try{
        if(req.auth.credentials.user.type === "admin") {
            return await Documents.query()
                .delete()
                .where('id', req.params.id)
        }
        else {
            return {};
        }
    }
    catch (err) {
        console.log('err delete', err.message);
        return Boom.boomify(err, { statusCode: 422 });
    }
};

exports.list = async(req, h) => {
    try {
        if(req.auth.credentials.user.type === "admin"){
            return await Documents.query().select('documents.*')
                .from('documents')
                .where('kind','doc-admin')
                .where('category',req.params.category)
                .orderBy('documents.id')
                .skipUndefined();
        }
        else if(req.auth.credentials.user.type !== "admin"){
            return await Documents.query().select('documents.description','documents.file_doc','documents.created_date')
                .from('documents')
                .where('kind','doc-admin')
                .where('category',req.params.category)
                .orderBy('documents.id')
                .skipUndefined();
        }
    }
    catch (err) {
        console.log('failed' + err.message)
        return Boom.boomify(err, { statusCode: 422 });
    }

}


// exports.downloadFile= async (req,res,h)=>{
//     const pathroot = Helper.upload.pathroot();
//     const dataDownload =  Fs.readFileSync(pathroot+"/store/public/images/user/user_216/logo/1549131065632.png");
//     res.writeHead(200, {
//         'Content-Type': 'application/octet-stream',
//         'Content-Disposition': 'attachment; filename=downloadX.csv'
//     });
//     res.write(dataDownload);
// }
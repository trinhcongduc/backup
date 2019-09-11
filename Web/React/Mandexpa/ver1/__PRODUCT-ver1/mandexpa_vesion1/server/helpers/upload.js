const fs = require('fs');
const path = require('path');
const Upload = require('./upload');
const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');

/**
 * Function create folders
 * @param dirPath
 */
exports.mkdirSync =  (dirPath) => {
    try {
        fs.mkdirSync(dirPath)
    } catch (err) {
        if (err.code !== 'EXIST') throw err
    }
};

/**
 * Function get path root
 * @return {string}
 */
exports.pathroot =()=> {
    return path.dirname(require.main.filename || process.mainModule.filename)+'/';
};


/**
 * Function create folder in sys
 * @param root          : Path root
 * @param destination   : path folder
 * @returns {boolean}
 */
exports.createFolder = (root,destination)=>{
    try{
          destination = destination.split("/");
        for(var i=0;i<destination.length;i++){
            var new_path = root +'/'+ destination[i];
            if(!fs.existsSync(new_path)){
                fs.mkdirSync(new_path);
            }
            root = new_path;
        }
        return true;
    }catch (err) {
        console.log("===>ERROR create folder",);
        throw err;
    }
};


/**
 * Function save image from client to sys
 * @param ImageURL_base64       : data image by format base64
 * @param destination           : path to location save file
 * @returns {string}            : image's path
 */
exports.uploadImage=(ImageURL_base64,destination)=>{

   try{
       var  root =  Upload.pathroot();
       var  public_folder =  Upload.pathroot()+'public';

       // get images format
       var block = ImageURL_base64.split(";");
       var contentType = block[0].split(":")[1];
       var extend = contentType.split("/")[1];
       var realData = block[1].split(",")[1];
       var bitmap = new Buffer.from(realData, 'base64');
       var date = new Date().getTime();

       // create folder
       module.exports.createFolder(root,destination);

       var path = root+'/'+destination+'/'+date+'.'+extend;

       // create file image
       fs.writeFileSync(path, bitmap);

       return destination+'/'+date+'.'+extend;
   }catch (e) {
       console.log("ERROR save img->",e);
   }
};

/**
 * Function save file from client to sys
 * @param file          : file has format Buffer
 * @param nameFile
 * @param destination   : path to location save file
 * @returns {string}
 */
exports.uploadFile = (file,nameFile,destination) =>{
    try{
        let  path_root =  Upload.pathroot();
        let timestamp = new Date().getTime();
        let auto_increment = 0;

        nameFile =  nameFile.replace(' ','_');
        destination =  destination.replace(' ','_');

        //create folders necessary
        module.exports.createFolder(path_root,destination);
        let path_file='';
        let path='';
        do{
            path_file = destination+'/'+timestamp+auto_increment+'_'+nameFile;
            path =  path_root+'/'+path_file;
            auto_increment++;
        }while(fs.existsSync(path));
        fs.writeFileSync(path, file);

        return path_file;

    }catch (err) {
        console.log("ERROR upload file===>",err);
        throw (err)
    }
};
/**
 * Function render file Word from sample file
 * @param datas  : data repleace
 * @param filename
 * @param destination  : :path to location save file
 * @param path_original_file  : folder capacity sample file
 * @returns {*}
 */
exports.renderWordFile = (datas,filename,destination,path_original_file) =>{
    try {
        var content = fs.readFileSync(path.resolve(this.pathroot(), path_original_file), 'binary');

        var zip = new JSZip(content);

        var doc = new Docxtemplater();
        doc.loadZip(zip);

        //set the templateVariables

    } catch (error) {
        console.log(error);
    }
    // set data for file word
    if(datas){
        doc.setData(datas);
    }
    try {
        // render the document (replace all occurences of {virtual data} by real data)
        doc.render()
    } catch (error) {
        var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
        }
        console.log(JSON.stringify({error: e}));
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
        throw error;
    }

    var buf = doc.getZip()
        .generate({type: 'nodebuffer'});

    // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
    path_doc = this.uploadFile(buf, filename, destination);
    return path_doc;
};


/**
 * Function copy file from src to dest with filename
 * @param src
 * @param dest
 * @param filename
 * @return {Promise<*>}
 */
exports.copyFile = async (src,dest,filename) =>{

    src =  this.pathroot() + src;

    if(fs.existsSync(src) && this.createFolder(this.pathroot(),dest)){
        try{
            dest =  this.pathroot() + dest;
            fs.copyFile(src,dest+filename, (err) => {
                if (err) {
                    console.log("ERRROR==>",err);
                    return err;
                }
                console.log('COPIED');
            });
            return true;
        }catch (err) {
            return err;
        }
    }else{
        return false;
    }
};




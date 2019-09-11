const Config = require('../config');
const URL_SERVER = Config.get('/URL_SERVER');
const key_pdfshift  = Config.get('/key_pdfshift');

const pdfshift = require('pdfshift')(key_pdfshift);
const helper_upload = require("../helpers/upload");
const helper = require("../helpers/helper");
const fs = require('fs');
/**
 * Function create PDF brochure for property
 * @param id
 * @param data
 * @param type_print
 * @return {Promise<*>}
 */
exports.create_pdf_brochure = async(id,data,type_print) => {
    var file = "";
    console.log('-----',key_pdfshift)
    var landscape = {
        landscape : false
    }
    if(type_print === "1"){
        file = "./store/public/documents/pdf_brochure/annonces_vitrine_mandexpa_portrait.html";
        landscape = {
            landscape : false
        }
    }
    else {
        file = "./store/public/documents/pdf_brochure/annonces_vitrine_mandexpa_landscape.html";
        landscape = {
            landscape : true,
            zoom: 0.65
        }
    }
    let html = fs.readFileSync(file);
    let html1 = html.toString('utf8');
    let color = rgbToHex(data.color.r, data.color.g, data.color.b)
    html1 = html1.replace('{{sub_type_property}}', data.sub_type_property?data.sub_type_property:"");
    html1 = html1.replace('{{sector}}', data.sector?data.sector:"");
    html1 = html1.replace('{{town}}', data.town?data.town:"");
    html1 = html1.replace('{{number_pay}}', data.number_pay?numberWithCommas(data.number_pay):"");
    html1 = html1.replace('{{status_mandate}}', data.status_mandate?data.status_mandate:"");
    html1 = html1.replace('{{number_bedroom}}', data.number_bedroom?data.number_bedroom:"");
    html1 = html1.replace('{{park_inside}}', data.park_inside?data.park_inside:"");
    html1 = html1.replace('{{number_bathroom}}', data.number_bathroom?data.number_bathroom:"");
    html1 = html1.replace('{{number_bathroom1}}', data.number_bathroom?data.number_bathroom:"");
    html1 = html1.replace('{{living_space}}', data.living_space?data.living_space:"");
    html1 = html1.replace('{{total_area_building}}', data.total_area_building?data.total_area_building:"");
    html1 = html1.replace('{{code}}', data.code?data.code:"");
    html1 = html1.replace('{{date_avai}}', data.date_avai?data.date_avai:"");
    html1 = html1.replace('{{color}}', color?color:"");
    html1 = html1.replace('{{category}}', data.category?data.category:"");
    html1 = html1.replace('{{outdoor_space}}', data.outdoor_space?data.outdoor_space:"");
    html1 = html1.replace('{{des_pro}}', data.des_pro?data.des_pro:"");
    if(data.images.length !== undefined){
        if (data.images.length >= 1) {
            html1 = html1.replace('{{main_image}}', URL_SERVER +"/"+ data.images[0]);
        }
        if (data.images.length >= 2) {
            html1 = html1.replace('{{sidebar_image_1}}', URL_SERVER +"/"+ data.images[1]);
        }
        if (data.images.length >=3 ) {
            html1 = html1.replace('{{sidebar_image_2}}', URL_SERVER +"/"+ data.images[2]);
        }
        if (data.images.length >=4 ) {
            html1 = html1.replace('{{sidebar_image_3}}', URL_SERVER +"/"+ data.images[3]);
        }
        if (data.images.length >=5 ) {
            html1 = html1.replace('{{sidebar_image_4}}', URL_SERVER +"/"+ data.images[4]);
        }
    }
   
    html1 = html1.replace('{{telephone}}', data.telephone);
    html1 = html1.replace('{{ville}}', data.ville);
    html1 = html1.replace('{{email}}', data.email);
    html1 = html1.replace('{{code_postal}}', data.code_postal);
    html1 = html1.replace('{{address}}', data.address);
    html1 = html1.replace('{{raison_social}}', data.reason_social);
    html1 = html1.replace('{{logo}}', URL_SERVER +"/"+ data.logo);
    html1 = html1.replace('{{logo_mandexpa}}', URL_SERVER +"/"+ 'store/public/logo_site/mandexpa_logo.png');
    if(data.energy_efficiency!== undefined && data.energy_efficiency!== null && data.energy_efficiency!== "null"){
        if(data.energy_efficiency.length >= 1){

            if(data.energy_efficiency[0] === "A"){
                html1 = html1.split('{{energy_efficiency1}}').join('A');
                html1 = html1.replace('{{color-a}}', "color-gray");
            }
            else if(data.energy_efficiency[0] === "B"){
                html1 = html1.split('{{energy_efficiency1}}').join('B');
                html1 = html1.replace('{{color-b}}', "color-gray");
            }
            else if(data.energy_efficiency[0] === "C"){
                html1 = html1.split('{{energy_efficiency1}}').join('C');
                html1 = html1.replace('{{color-c}}', "color-gray");
            }
            else if(data.energy_efficiency[0] === "D"){
                html1 = html1.split('{{energy_efficiency1}}').join('D');
                html1 = html1.replace('{{color-d}}', "color-gray");
            }
            else if(data.energy_efficiency[0] === "E"){
                html1 = html1.split('{{energy_efficiency1}}').join('E');
                html1 = html1.replace('{{color-e}}', "color-gray");
            }
            else if(data.energy_efficiency[0] === "F"){
                html1 = html1.split('{{energy_efficiency1}}').join('F');
                html1 = html1.replace('{{color-f}}', "color-gray");
            }
            else if(data.energy_efficiency[0] === "G"){
                html1 = html1.split('{{energy_efficiency1}}').join('G');
                html1 = html1.replace('{{color-g}}', "color-gray");
            }
            else if(data.energy_efficiency[0] === "H"){
                html1 = html1.split('{{energy_efficiency1}}').join('H');
                html1 = html1.replace('{{color-h}}', "color-gray");
            }
            else if(data.energy_efficiency[0] === "I"){
                html1 = html1.split('{{energy_efficiency1}}').join('I');
                html1 = html1.replace('{{color-i}}', "color-gray");
            }
    
            if(data.energy_efficiency.length === 2){
                if(data.energy_efficiency[1] === "A"){
                
                    html1 = html1.replace('{{energy_efficiency2}}', "<span class=\"temp\" style=\"background-color: #d2232a;color: #fff;text-align: center;padding: 5px 12px;\">A</span>");
                }
                else if(data.energy_efficiency[1] === "B"){
                    html1 = html1.replace('{{energy_efficiency2}}', "<span class=\"temp\" style=\"background-color: #d2232a;color: #fff;text-align: center;padding: 5px 12px;\">B</span>");
                }
                else if(data.energy_efficiency[1] === "C"){
                    html1 = html1.replace('{{energy_efficiency2}}', "<span class=\"temp\" style=\"background-color: #d2232a;color: #fff;text-align: center;padding: 5px 12px;\">C</span>");
                }
                else if(data.energy_efficiency[1] === "D"){
                    html1 = html1.replace('{{energy_efficiency2}}', "<span class=\"temp\" style=\"background-color: #d2232a;color: #fff;text-align: center;padding: 5px 12px;\">D</span>");
                }
                else if(data.energy_efficiency[1] === "E"){
                    html1 = html1.replace('{{energy_efficiency2}}', "<span class=\"temp\" style=\"background-color: #d2232a;color: #fff;text-align: center;padding: 5px 12px;\">E</span>");
                }
                else if(data.energy_efficiency[1] === "F"){
                    html1 = html1.replace('{{energy_efficiency2}}', "<span class=\"temp\" style=\"background-color: #d2232a;color: #fff;text-align: center;padding: 5px 12px;\">F</span>");
                }
                else if(data.energy_efficiency[1] === "G"){
                    html1 = html1.replace('{{energy_efficiency2}}', "<span class=\"temp\" style=\"background-color: #d2232a;color: #fff;text-align: center;padding: 5px 12px;\">G</span>");
                }
                else if(data.energy_efficiency[1] === "H"){
                    html1 = html1.replace('{{energy_efficiency2}}', "<span class=\"temp\" style=\"background-color: #d2232a;color: #fff;text-align: center;padding: 5px 12px;\">H</span>");
                }
                else if(data.energy_efficiency[1] === "I"){
                    html1 = html1.replace('{{energy_efficiency2}}', "<span class=\"temp\" style=\"background-color: #d2232a;color: #fff;text-align: center;padding: 5px 12px;\">I</span>");
                }
            }
            else {
                html1 = html1.replace('{{energy_efficiency2}}',"")
            }
        }else {
            html1 = html1.replace('{{energy_efficiency1}}',"")
            html1 = html1.replace('{{energy_efficiency2}}',"")
        }
    }
    else {
        html1 = html1.split('{{energy_efficiency1}}').join("")
        html1 = html1.replace('{{energy_efficiency2}}',"")
    }
    console.log('path------------------',html1)
    return await pdfshift.convert(html1,landscape).then(async function (content_file) {
        var path = await helper_upload.uploadFile(content_file, 'annonces_vitrine_mandexpa.pdf', 'store/public/property/pdf_brochure/' + id);
        console.log('path------------------',path)
        return path;

    }).catch(function ({ message, code, response, errors = null }) {
        console.log('-message------', message);
        console.log('--code-----', code);
        return null;
    })
}


/**
 * Function create code for property
 * @returns {number}
 */
exports.create_property_code = () => {
    let code = Math.floor(Date.now() / 1000);
    return code;
};

/**
 * Function create  number code of invoice property
 * @param prefix
 * @return {string}
 */
exports.create_unique_invoice_number = (prefix) => {
    let order = '';
    let chars = '0123456789' + helper.listAlphabet('A','Z').join('');
    let i = 0;
    while (i <= 6) {
        let num = helper.random(0,chars.length);
        order = order + chars.substr(num,1);
        i++;
    }
    return order;
};

function componentToHex(c) {
    var hex = Number(c).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
}

function rgbToHex(r, g, b ) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function numberWithCommas(number) {
    if(number!== null){
        if(number.toString() !== ""){
            number = number.toString().split(' ').join('');
            return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
        }
    }
    
    return number
};

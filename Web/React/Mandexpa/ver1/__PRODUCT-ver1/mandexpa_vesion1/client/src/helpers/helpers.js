'use strict'
import React, { Component } from 'react';
import MenuItem  from '@material-ui/core/MenuItem';
import FileSaver from "file-saver";


/**
 * Helpers Functions
 */

/**
 * Function to convert hex to rgba
 */
export function hexToRgbA(hex, alpha) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
    }
    throw new Error('Bad Hex');
}

/**
 * Text Truncate
 */
export function textTruncate(str, length, ending) {
    if (length == null) {
        length = 100;
    }
    if (ending == null) {
        ending = '...';
    }
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    } else {
        return str;
    }
}

/**
 * Function to return current app layout
 */
export function getAppLayout(url) {
    let location = url.pathname;
    let path = location.split('/');
    return path[1];
}

/**
 * Function to render select element
 * @data : array object
 * @config : array [value,name]
 */

export function renderSelectIndex(start,end,type="listoption") {
    let  elements =  [];
    if(type === "listoption"){
        for(let index = start;index <= end;index++){
            elements.push(<MenuItem key={index} value={index}>{index}</MenuItem>)
        }
    }else{
        for(let index = start;index <= end;index++){
            elements = elements.concat([{value:index,label:index}])
        }
    }
    return elements;
}

export function createListIndex(start,end) {
    let elements = [];
    for(let index = start;index <= end;index++){
        elements.push({label:index.toString(),value:index})
    }
    return elements;
}

export function isEmpty(obj) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

/**
 * Get current account information
 * @returns {*}
 */
export function getAccountCurrent() {
    let account =  localStorage.getItem("mandp");
    if(account === null){
        return {type:"null"};
    }
    account = atob(account);
    account =JSON.parse(account);
    return account.accountinfor;
}

/**
 * Function check user type in each Component
 */
export function checkUserPermission(account,permissions) {
    if(typeof account !== "undefined"){
        if(typeof permissions ==="object"&&permissions.length){
            let length = permissions.length;
            for(let i = 0;i<length;i++){
                if(account.type === permissions[i]){
                    return true;
                }
            }
        }
        if(account.type === permissions) return true;
    }
    return false;
}
/**
 *  Create array keyword in alphabet
 */
export function listAlphabet(charA, charZ) {
    let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        let char = String.fromCharCode(i);
        a.push({value:char,label:char});
    }
    return a;
}


/**
 * Download file from response API
 */

export function DownloadFileFromResAPI(res) {
    const MimeTypesMap = {
        txt:'text/plain;charset=utf-8',
        png: 'image/png',
        gif: 'image/gif',
        jpg: 'image/jpg',
        jpeg: 'image/jpeg',
        pdf: 'application/pdf',
        mp4: 'video/mp4',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ppt: 'application/vnd.ms-powerpoint',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    };

    let filename = "taythien.docx";
    let mime = MimeTypesMap.docx;

    const blob = new Blob([res.data], {
        type: mime,
    });
    FileSaver.saveAs(blob, filename);
}

/**
 *
 * @param value
 * @param Options
 * @return {null}
 */
export function findDataOptionSelector(value,Options) {


    let res =  Options.filter(item=>{
        return item.value === value
    });
    return res[0]?res[0]:null;

}

/**
 *
 * @param value
 * @param Options
 * @return {string}
 */
export function findDataLabel(value,Options) {
    let data ="";
    Options.map(item=>{
            if (item.value === value){
                data = item.label;
            }
            return 1;
        }
    );
    return data;
}

/**
 *
 * @param value
 * @param Options
 * @return {string}
 */
export function findDataLabelFacility(value,Options) {
    let data ="";

    Options.map(item=>{
            if (item.id === parseInt(value)){
                data = item.title;
            }
            return 1;
        }
    );
    return data;
}

/**
 * Function get image's dimension
 * @param src       source of image (url)
 * @param callback  function callback
 * @return {{}}
 */
export async function  dimensionImage(src) {
    let  img = new Image();
    return new Promise(resolve => {
        img.onload =  function() {
            const result = {
                height:this.height,
                width:this.width,
            };
            resolve(result);
        };
        img.src = src;
    }).then(res=>{
        return res;
    });
}







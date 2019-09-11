/**
 * Reducer Manager Fields of Property
 */
import {
    UPDATE_TAB_MAIN_FIELDS,
    UPDATE_TAB_LOCATION_FIELDS,
    UPDATE_TAB_DESCRIPTION_FIELDS,
    UPDATE_TAB_CHARACTERISTIC_FIELDS,
    UPDATE_TAB_MEDIA_FIELDS,
    UPDATE_TAB_DOCUMENT_FIELDS,
    UPDATE_TAB_MARKETING_FIELDS,
    EDIT_IMAGE_TAB_MEDIA,
    UPDATE_TYPEOF_PROPERTY, SAVE_PRETAB_PROPERTY,
    CREATE_NEW_HOST,
    CHOOSE_CONTACT,
    CLEAR_PROPERTY,
    TAB_HAS_FIELD_REQUIRED,
    DETAIL_HOST,
    UPDATE_TAB_REORDER_FIELDS, PROPERTY_UPLOAD_IMAGE
} from "Actions/types";

import {PROPERTY_TYPE} from "Constants/ComponentConfigs/PropertyConfig"
import {dateFormat} from "Helpers";
import moment from "moment";

/**
 * initial state fields of property
 */
var date = new Date();
const INIT_STATE = {
    id:null,
    process_tab:1,
    type:PROPERTY_TYPE.type.SALE,
    kind_property:PROPERTY_TYPE.kind.RESIDENTIAL,
    main_fields:{
        outdoor_space: 1,
        certificate_date: dateFormat(date),
        hour_visit_start: dateFormat( new Date(moment(date.setHours(8,0,0))),),
        hour_visit_end: dateFormat( new Date(moment(date.setHours(20,0,0))),),
    },
    location_fields:{},
    des_fields:{},
    character_fields:{},
    media_fields:{
        images:[],
        status_upload:true
    },
    reorder:{},
    document_fields:{
        documents:[],
        status_document_upload:true,
        status_document_des_upload:true,
    },
    marketing_fields:{},
    preTab:null,
    readySubmit:false,
    host_1 : {
        id : "",
        name : "",
    },
    host_2 : {
        id : "",
        name : "",
    },
    host_3 : {
        id : "",
        name : "",
    },
    doc_delete : [],

};
export default (state = INIT_STATE, action) => {

    const {fields} = action;
    switch (action.type) {
        case CLEAR_PROPERTY:{
            return {
                id:null,
                process_tab:1,
                type:PROPERTY_TYPE.type.SALE,
                kind_property:PROPERTY_TYPE.kind.COMMERCIAL,
                main_fields:{
                    outdoor_space: 1,
                    certificate_date: dateFormat(date),
                    hour_visit_start: dateFormat( new Date(moment(date.setHours(8,0,0))),),
                    hour_visit_end: dateFormat( new Date(moment(date.setHours(20,0,0))),),
                },
                location_fields:{},
                des_fields:{},
                character_fields:{},
                media_fields:{
                    images:[],
                    status_upload:true
                },
                reorder:{},
                document_fields:{
                    documents:[],
                    status_document_upload:true,
                    status_document_des_upload:true,
                },
                status_document_upload:true,
                marketing_fields:{},
                preTab:null,
                readySubmit:false,
                host_1 : {
                    id : "",
                    name : "",
                },
                host_2 : {
                    id : "",
                    name : "",
                },
                host_3 : {
                    id : "",
                    name : "",
                },
                doc_delete : [],
            };
        }
        case UPDATE_TYPEOF_PROPERTY:{
            state.type = fields.type;
            state.kind_property = fields.kind_property;
            return {...state}
        }
        case UPDATE_TAB_MAIN_FIELDS:{
            if(fields.des_file){
                let {status_upload_doc} =  fields;
                delete  fields.status_upload_doc;
                state.document_fields.documents =  state.document_fields.documents.filter(item=>{
                    return item.kind !== 'des_file';
                });
                state.document_fields.documents = [...state.document_fields.documents,fields.des_file];
                state.document_fields.status_document_des_upload = status_upload_doc;
            }
            delete fields.des_file;
            state.main_fields = Object.assign(state.main_fields,fields);
            return {...state};
        }
        case UPDATE_TAB_LOCATION_FIELDS:{
            state.location_fields= Object.assign(state.location_fields,fields);
            return{...state};
        }
        case UPDATE_TAB_DESCRIPTION_FIELDS:{
            state.des_fields = Object.assign(state.des_fields,fields);
            return{...state};
        }
        case UPDATE_TAB_CHARACTERISTIC_FIELDS:{
            state.character_fields = Object.assign(state.character_fields,fields);
            return {...state};
        }
        case UPDATE_TAB_REORDER_FIELDS:{
            state.reorder = Object.assign(state.reorder,fields);
            return {...state};
        }
        case UPDATE_TAB_MEDIA_FIELDS:{
           if(fields.images && fields.images.length){
               state.media_fields.images = fields.images;
               let new_images = fields.images.filter(item=>{return item.property_id === undefined && item.path === undefined});
               if(new_images.length > 0){
                   state.media_fields.status_upload = false;
               }
           }
           if(fields.urlYoutube){
               state.media_fields.urlYoutube = fields.urlYoutube;
           }

           return {...state}
        }
        case PROPERTY_UPLOAD_IMAGE:{
            let {media_fields} = state;
            let {images} = media_fields;
            let {payload} =  action;
            let keys = payload.map(item=>{
                return parseInt(item.key);
            });
            images = images.map(item=>{
                if(keys.indexOf(item.id)>-1){
                    item.path =  payload.filter(it=>{return parseInt(it.key) === item.id})[0].path;
                }
                return item;
            });
            state.media_fields.images = images;
            state.media_fields.status_upload = true;
            return {...state}
        }
        case EDIT_IMAGE_TAB_MEDIA:{
            var {media_fields} =  state;
            var {data_image}= action;

            if(media_fields.images.length){
                // If this image is selected as the main image, delete the current main image.
                if(action.data_image.primaryImage){
                    for(var i=0;i<media_fields.images.length;i++){
                        var data = media_fields.images[i];
                        if((data.primaryImage === "1" || data.primaryImage)&& data.id !== data_image.id
                        ){
                            data.primaryImage = false;
                        }
                    }
                }
                // Add or update this image to list
                let position =  media_fields.images.map(item=>item.id).indexOf(data_image.id);
                state.media_fields.images[position]=data_image;
            }
            return {...state}
        }
        case UPDATE_TAB_DOCUMENT_FIELDS:{
            state.document_fields.documents = state.document_fields.documents.concat(fields);
            state.doc_delete = action.files_delete;
            state.status_document_upload = action.status_upload;
            return {...state};
        }
        case UPDATE_TAB_MARKETING_FIELDS:{
            state.marketing_fields = Object.assign(state.marketing_fields,fields);
            return{...state};
        }
        case SAVE_PRETAB_PROPERTY:{
            state = Object.assign(state,{preTab:action.keys.preTab,readySubmit:action.keys.readySubmit});
            return {...state}
        }
        case CREATE_NEW_HOST:{
            var host = {
                id : action.payload.id,
                name : action.payload.name
            }
            if (action.payload.host_type === "host_1"){
                state.host_1= Object.assign(state.host_1,host);
                return {...state}
            }
            else if(action.payload.host_type === "host_2"){
                state.host_2= Object.assign(state.host_2,host);
                return {...state}
            }
            else {
                state.host_3= Object.assign(state.host_3,host);
                return {...state}
            }
        }
        case DETAIL_HOST:{
                state.host_1= Object.assign(state.host_1,action.host_1);
                state.host_2= Object.assign(state.host_2,action.host_2);
                state.host_3= Object.assign(state.host_3,action.host_3);
                return {...state}
        }
        case CHOOSE_CONTACT:{
            var host = {
                id : action.payload.id,
                name : action.payload.name
            };
            if (action.payload.host_type === "host_1"){
                state.host_1= Object.assign(state.host_1,host);
                return {...state}
            }
            else if(action.payload.host_type === "host_2"){
                state.host_2= Object.assign(state.host_2,host);
                return {...state}
            }
            else {
                state.host_3= Object.assign(state.host_3,host);
                return {...state};
            }
        }
        case TAB_HAS_FIELD_REQUIRED:{
            state.process_tab =  action.tab;
            return {...state};
        }
        default: return { ...state };
    }
}

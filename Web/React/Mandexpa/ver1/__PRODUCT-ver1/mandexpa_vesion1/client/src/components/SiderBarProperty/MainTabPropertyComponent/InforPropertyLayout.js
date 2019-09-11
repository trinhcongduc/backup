/**
 * App.js Layout Start Here
 */
import React, {Component} from 'react';
import {connect} from "react-redux";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker,{registerLocale} from 'react-datepicker';
import SelectAutoComplete from "../../ComponentHelper/SelectAutoComplete";
import IntlMessages from "Util/IntlMessages";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import {withFormik} from "formik";
import {withStyles} from '@material-ui/core/styles';
import AppConfig from 'Constants/AppConfig';
import {URL_SERVER} from 'Constants/GeneralConfig';
import {status_property, PROPERTY_TYPE} from "Constants/ComponentConfigs/PropertyConfig"
import {propertyUploadDocument, updateFieldsPropertyMainTab} from "Actions";
import {datebyFormat,} from "Helpers/date";
import moment from "moment";
import FR from 'date-fns/locale/fr';
import {configDateFormat} from "Constants/DateConfig";

const loading = require('Assets/img/gif/loading-2.gif');

registerLocale('fr', FR);

const styles = theme =>({
    loading:{
        maxHeight:'40px'
    }
});


class InforPropertyLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(moment().add(3,'months')),
            status_upload_doc:true,
            des_file:{},
            type_mandate: '',
            contract: '',
            checkChange: false,
        }
    }

    _isChanged = (status) => {
        this.setState({
            checkChange: status,
        })
    };

    onChangeFile = (e) => {
        e.preventDefault();
        this.setState({
            checkChange: true,
            status_upload_doc:false
        });
        this.props.setFieldValue('file_des', e.currentTarget.files[0]);
        this.props.propertyUploadDocument('des_file',e.target.files[0])
            .then(res=>{
                // console.log("des file path==->",res);
                let des_file= {
                    file_doc:res.data,
                    kind:'des_file',
                };
                // console.log("des_file",des_file);
                this.setState({
                    status_upload_doc:true,
                    checkChange: true,
                    des_file:des_file
                },()=>{
                    this._saveToRedux();
                })
            }).catch(err=>{
                console.log("Property upload des file error=>",err);
        })

    };
    handleChangeStartDate = (date) => {
        if(date){
            this._isChanged(true);
            let endDate = moment(date).add(3,'months');

            this.setState({
                startDate: date,
                endDate: new Date(endDate)
            }, () => {
                this.props.values.startDate = this.state.startDate;
                this.props.values.endDate = this.state.endDate;
            })
        }
    };
    handleChangeEndDate = (date) => {
        if(date){
            this._isChanged(true);
            this.setState({
                endDate: date
            }, () => {
                this.props.values.endDate = this.state.endDate;
            })
        }
    };
    handleChangeStatus = (value) => {
        this._isChanged(true);
        if(value === 'SOLD' || value ==="NEGOTIATING" || value ==="SOLD_SUCCESS"){
            this.props.updateFieldsPropertyMainTab({status_mandate:value});
            this.props.changeTab(7,true);
        }
        else if(value === 'CANCELLED'){
            this.props.action_cancel(true);
        }else{
            this.props.changeTab(1,false);
        }
        this.props.values.status_mandate = value;
    };
    _saveToRedux = () => {

        let {checkChange,des_file,status_upload_doc} = this.state;
        let {propertyFields} = this.props;
        let {preTab} = propertyFields;
        if (checkChange && (preTab === 1 || preTab === "1")) {
            // let data = [...this.props.values];
            let data = Object.assign(this.props.values);
            try{
                console.log("status_upload_doc====>",status_upload_doc);
                data.des_file = des_file;
                data.status_upload_doc = status_upload_doc;
                data.startDate = datebyFormat(data.startDate,configDateFormat.dateSaveDB);
                data.endDate = datebyFormat(data.endDate,configDateFormat.dateSaveDB);
            }catch (e) {
                console.log("ERROR",e);
            }
            this.props.updateFieldsPropertyMainTab(data);
            this._isChanged(false);
        }
    };

    render() {
        this._saveToRedux();
        let {classes} = this.props;
        let {startDate, endDate,status_upload_doc,checkChange} = this.state;
        // console.log("checkChange=->",checkChange);
        let {
            status_mandate,
        } = this.props.values;
        const {propertyFields} = this.props;
        const {type} = propertyFields;
        let {propertyDetail} = this.props;
        let file_des = "1";
        if(propertyDetail){
            propertyDetail.documents.map(item =>{
                if(item.kind === "des_file"){
                    file_des = item.file_doc;
                }
            })
        }
        let file_uploaded = null;
        let file = typeof this.props.propertyDetail!=="undefined"?this.props.propertyDetail.documents:[];
        file.map((item) => {
            if(item.kind==="des_file"){
                file_uploaded = item.file_doc;
            }
        });
        let href_file_uploaded = URL_SERVER+ file_uploaded;
        let file_uploaded_split = file_uploaded ? file_uploaded.split('/'):null;
        let name_file_uploaded =  file_uploaded_split ? file_uploaded_split[file_uploaded_split.length -1 ]:null;
        if(name_file_uploaded){
            name_file_uploaded = name_file_uploaded.split('_');
            name_file_uploaded.splice(0,1);
            name_file_uploaded = name_file_uploaded.join();
        }
        return (
            <div className="card">
                <div className="card-header">
                    <IntlMessages id="property.main.information_property"/>
                </div>
                <div className="card-body">
                    <div>
                        <div className="form-group row">
                            <label htmlFor="staticEmail" className="col-sm-4 col-form-label obligateField">
                                <span className="obligate">*</span><IntlMessages id="property.main.download_mandat"/>
                            </label>
                            <div className="col-sm-8 ">
                                <div>
                                    {
                                        !status_upload_doc &&
                                        (<img src={loading}
                                              className={classes.loading}
                                              alt="Loading..."/>)}
                                    {
                                        file_uploaded!==null && (<a href={href_file_uploaded} target="_blank">
                                            <i className="zmdi zmdi-download zmdi-hc-2x" > </i>
                                            {name_file_uploaded}
                                            </a>)

                                    }
                                    <input className="upload" type="file" name="file_des" onChange={this.onChangeFile} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="staticEmail" className="col-sm-4 col-form-label obligateField">
                                <span className="obligate">*</span><IntlMessages id="property.main.status_mandat"/>
                            </label>
                            <div className="col-sm-8 ">
                                <div>
                                    <SelectAutoComplete name='status_mandate'
                                                        value={status_mandate}
                                                        label_props='label'
                                                        value_props='value'
                                                        onChange={this.handleChangeStatus}
                                                        listOption={type === PROPERTY_TYPE.type.SALE ? status_property.sale : status_property.rent}
                                    />
                                    {this.props.touched.status_mandate &&<FormHelperText>{this.props.errors.status_mandate}</FormHelperText>}
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-4 col-form-label obligateField">
                                <span className="obligate">*</span> <IntlMessages id="property.main.first_date_mandat"/></label>
                            <div className="col-sm-8">
                                <DatePicker
                                    selected={startDate}
                                    className="form-control"
                                    name="startDate"
                                    locale="fr"
                                    placeholderText="Click to select a date"
                                    dateFormat={AppConfig.date_format}
                                    onChange={this.handleChangeStartDate}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-4 col-form-label obligateField">
                                <span className="obligate">*</span><IntlMessages id="property.main.due_date"/>
                            </label>
                            <div className="col-sm-8">
                                <DatePicker
                                    selected={endDate}
                                    className="form-control"
                                    name="endDate"
                                    locale="fr"
                                    dateFormat={AppConfig.date_format}
                                    placeholderText="Click to select a date"
                                    onChange={this.handleChangeEndDate}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return ({
        configdata: state.configdata,
        propertyFields: state.propertyFields
    })
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        updateFieldsPropertyMainTab: (fields) => {
            dispatch(updateFieldsPropertyMainTab(fields))
        },
        propertyUploadDocument:(type,file)=>{
            return dispatch(propertyUploadDocument(type,file))
        }
    }
};
const FormikForm = withFormik({
    mapPropsToValues(datas) { // Init form field
        let {propertyDetail} =datas;
        if(propertyDetail && propertyDetail.property && propertyDetail.property.id){
            var property_values = propertyDetail.property;
            return {
                status_mandate: property_values.status_mandate||{},
                startDate: new Date(property_values.startDate),
                endDate: new Date(property_values.endDate),
                file_des: "",
            }
        }
        return {
            file_des: "",
            status_mandate: datas.propertyFields.main_fields.status_mandate||{},
            startDate: datas.propertyFields.main_fields.startDate==="undefined"?new Date():datas.propertyFields.main_fields.startDate,
            endDate: datas.propertyFields.main_fields.endDate==="undefined"? new Date(moment().add(3,'months')):datas.propertyFields.main_fields.endDate,
        }
    },
    enableReinitialize: true,

})(InforPropertyLayout);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FormikForm));

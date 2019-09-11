/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {ACCOUNT_TYPE, URL_SERVER} from "Constants/GeneralConfig";
import {withFormik} from "formik";
import IntlMessages from "Util/IntlMessages";
import {PROPERTY_TYPE, status_property,sector_location} from "Constants/ComponentConfigs/PropertyConfig";
import AppConfig from "Constants/AppConfig";
import moment from "moment";
import FormControl from "@material-ui/core/FormControl/FormControl";
import {findDataLabel,numberWithCommas} from "Helpers";




class MainPropertyLayout extends Component {

    changeTab = (tab_number)=>{
        this.props.changeTab(tab_number);
    };

    render(){
        const {propertyDetail} = this.props;
        const {propertyFields} = this.props;
        var property_values = propertyDetail.property;
        var file_des = "1";
        const {type} = propertyFields;
        var option_status_mandate = (type === PROPERTY_TYPE.type.SALE ? status_property.sale : status_property.rent)
        if(propertyDetail){
            propertyDetail.documents.map(item =>{
                if(item.kind === "des_file"){
                    file_des = item.file_doc;
                }
            })
        }
        var file_uploaded = null;
        var file = typeof this.props.propertyDetail!=="undefined"?this.props.propertyDetail.documents:[];
        file.map((item,index) => {
            if(item.kind==="des_file"){
                file_uploaded = item.file_doc;
            }
        })
        let href_file_uploaded = URL_SERVER+ file_uploaded;
        let file_uploaded_split = file_uploaded ? file_uploaded.split('/'):null;
        let name_file_uploaded =  file_uploaded_split ? file_uploaded_split[file_uploaded_split.length -1 ]:null;
        if(name_file_uploaded){
            name_file_uploaded = name_file_uploaded.split('_');
            name_file_uploaded.splice(0,1);
            name_file_uploaded = name_file_uploaded.join();

        var href = URL_SERVER + file_uploaded;
        }

        return(
            <div className="col-xs-10 col-sm-10 col-md-10">
                <div className="row">
                    <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6 pdLeft0 radius0">
                        <div>
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
                                                <div className="data-filled doc-principal">
                                                    {
                                                        // file_uploaded!==null?<a href={href} target="_blank"> <i className="zmdi zmdi-download zmdi-hc-2x" > </i>{file_uploaded}</a>:""
                                                        file_uploaded!==null && (<a href={href} target="_blank" className="upload-doc-css">
                                                        <i className="zmdi zmdi-download zmdi-hc-2x" > </i>
                                                        {name_file_uploaded}
                                                        </a>)
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="staticEmail" className="col-sm-4 col-form-label obligateField">
                                                <span className="obligate">*</span><IntlMessages id="property.main.status_mandat"/>
                                            </label>
                                            <div className="col-sm-8 ">
                                                <div  className="data-filled">
                                                    {property_values.status_mandate?findDataLabel(property_values.status_mandate,option_status_mandate):""}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputPassword" className="col-sm-4 col-form-label obligateField">
                                                <span className="obligate">*</span> <IntlMessages id="property.main.first_date_mandat"/></label>
                                            <div className="col-sm-8">
                                            <div className="data-filled">
                                                {property_values.startDate!==null?moment(new Date(property_values.startDate)).format('DD/MM/YYYY'):""}
                                            </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputPassword" className="col-sm-4 col-form-label obligateField">
                                                <span className="obligate">*</span><IntlMessages id="property.main.due_date"/>
                                            </label>
                                            <div className="col-sm-8">
                                            <div className="data-filled">
                                                {property_values.endDate!==null?moment(new Date(property_values.endDate)).format('DD/MM/YYYY'):""}
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <IntlMessages id="property.main.price.information"/>
                                </div>
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label obligateField"><span className="obligate">*</span>
                                            Prix (en €)
                                        </label>
                                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                            <div className="data-filled">
                                                {numberWithCommas(propertyDetail.property.number_pay!==null?propertyDetail.property.number_pay:"")}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label obligateField"><IntlMessages id="property.main.price.charge"/></label>
                                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                            <div className="data-filled">
                                                {propertyDetail.property.number_charge!==null?propertyDetail.property.number_charge:""}
                                            </div>
                                        </div>
                                    </div>
                                    {propertyFields.type === PROPERTY_TYPE.type.RENT && (
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label obligateField"><span className="obligate">*</span>
                                                <IntlMessages id="property.main.price.caution.title"/>
                                            </label>
                                            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                                <div className="row">
                                                    <div className="col-sm-5">
                                                    <div className="data-filled">
                                                        {propertyDetail.property.caution!==null?propertyDetail.property.caution:""}
                                                    </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <IntlMessages id="property.main.commission"/>
                                </div>
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label htmlFor="inputPassword" className="col-sm-12 col-form-label obligateField question-tooltip">
                                            <span className="obligate">*</span><IntlMessages id="property.main.type_mandat"/>
                                            <i className="zmdi zmdi-help zmdi-hc-2x" title="Recommandations Mandexpa :
                                1er mois : vendeur 70% - acheteur 30%
                                2ème mois : vendeur 60% - acheteur 40%
                                3ème mois : vendeur 50% - acheteur 50%"> </i>
                                        </label>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col-sm-4 col-md-4 col-lg-4 obligateField">
                                        <span className="obligate">*</span>
                                            <IntlMessages id="property.main.total_commission_inclusive"/>
                                        </div>
                                        <div className="col-sm-8 col-md-8 col-lg-8">
                                            <div className="data-filled">
                                                {propertyDetail.property.total_commission_inclusive!==null?propertyDetail.property.total_commission_inclusive:""}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label obligateField">
                                            <span className="obligate">*</span> Commission<br/> vendeur
                                        </label>
                                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3  height40px">
                                            <div className="displayFlex">
                                            <div className="data-filled">
                                                {propertyDetail.property.commission_seller!==null?propertyDetail.property.commission_seller:""}
                                            </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2  pdLeft0">
                                            <div className="displayFlex">
                                                {/* <Radio
                                    checked={fee_seller === "%"}
                                    name="fee_seller"
                                    value="%"
                                    onChange={this.handleChange}
                                /> */}
                                                <span className="percent">%</span>
                                            </div>
                                        </div>
                                        {/*<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3  pdLeft0">*/}
                                        {/*<div className="displayFlex">*/}
                                        {/*<Radio*/}
                                        {/*checked={fee_seller === "fix"}*/}
                                        {/*name="fee_seller"*/}
                                        {/*value="fix"*/}
                                        {/*onChange={this.handleChange}*/}
                                        {/*/><span className="percent2">Frais fixes</span>*/}
                                        {/*</div>*/}
                                        {/*</div>*/}
                                        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                                            {/* <i className="zmdi zmdi-help zmdi-hc-lg mdc-text-light-blue"> </i> */}
                                        </div>

                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label obligateField">
                                            <span className="obligate">*</span> Commission<br/> acheteur
                                        </label>
                                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 height40px">
                                            <div className="displayFlex">
                                            <div className="data-filled">
                                                {propertyDetail.property.commission_buyer!==null?propertyDetail.property.commission_buyer:""}
                                            </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 pdLeft0 ">
                                            <div className="displayFlex">
                                                {/* <Radio
                                    checked={fee_buyer === "%"}
                                    name="fee_buyer"
                                    value="%"
                                    onChange={this.handleChange}
                                /> */}
                                                <span className="percent">%</span>
                                            </div>
                                        </div>
                                        {/*<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 pdLeft0 ">*/}
                                        {/*<div className="displayFlex">*/}
                                        {/*<Radio*/}
                                        {/*checked={fee_buyer === "fix"}*/}
                                        {/*name="fee_buyer"*/}
                                        {/*value="fix"*/}
                                        {/*onChange={this.handleChange}*/}
                                        {/*/><span className="percent2">Frais fixes</span>*/}
                                        {/*</div>*/}
                                        {/*</div>*/}
                                        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                                            {/* <i className="zmdi zmdi-help zmdi-hc-lg mdc-text-light-blue"> </i> */}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6 radius0">
                        <div>
                            {/*{accountCurrent.type !== ACCOUNT_TYPE.PROMOTER &&( <div><HostPropertyLayout propertyDetail={propertyDetail}/><br/></div>)}*/}
                            <div className="card">
                                <div className="card-header">
                                    <IntlMessages id="property.tab.principal.location"/>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="width100">
                                            <FormControl className="form-group flexNone" >
                                                <label  className="col-form-label obligateField col-4"><span className="obligate">*</span>{<IntlMessages id= "property.location.streetname" />}</label>
                                                <div className="col-6">
                                                    <div className="heightIP40 data-filled">
                                                    <div className="">
                                                        {propertyDetail.location[0].street_name!==null?propertyDetail.location[0].street_name:""}
                                                    </div>
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="width100">
                                            <FormControl className="form-group  flexNone" >
                                                <label  className="col-form-label obligateField col-4"><span className="obligate">*</span>{<IntlMessages id= "property.location.temperature" />}</label>
                                                <div className="col-6">
                                                    <div className="heightIP40 data-filled">
                                                        {propertyDetail.location[0].temperature!==null?propertyDetail.location[0].temperature:""}
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="width100">
                                            <FormControl className="form-group  flexNone">
                                                <label  className="col-form-label obligateField col-4">{<IntlMessages id= "property.location.app" />}</label>
                                                <div className="col-6">
                                                    <div className="heightIP40 data-filled">
                                                        {propertyDetail.location[0].app!==null?propertyDetail.location[0].app:""}
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                    </div>

                                    {/*<div className="row">*/}
                                        {/*<div className="width100">*/}
                                            {/*<FormControl className="form-group flexNone" >*/}
                                                {/*<label className="col-form-label obligateField col-4"><span className="obligate">*</span>{<IntlMessages id="property.location.floor" />}</label>*/}
                                                {/*<div className="col-6">*/}
                                                    {/*<div className="heightIP40 data-filled">*/}
                                                        {/*{propertyDetail.location[0].floor!==null?propertyDetail.location[0].floor:""}*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                            {/*</FormControl>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    <div className="row">
                                        <div className="width100">
                                            <FormControl className="form-group flexNone">
                                                <label className="col-form-label obligateField col-4"><span className="obligate">*</span>{<IntlMessages id="property.location.sector" />}</label>
                                                <div className="col-6">
                                                    <div className="heightIP40 data-filled">
                                                        {propertyDetail.location[0].sector!==null?findDataLabel(propertyDetail.location[0].sector,sector_location):""}
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="width100">
                                            <FormControl className="form-group flexNone">
                                                <label  className="col-form-label obligateField col-4"><span className="obligate">*</span>{<IntlMessages id= "property.location.town" />}</label>
                                                <div className="col-6">
                                                <div className="data-filled">
                                                    {propertyDetail.location[0].title_town!==null?propertyDetail.location[0].title_town:""}
                                                </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="width100">
                                            <FormControl className="form-group flexNone">
                                                <label  className="col-form-label col-4">{<IntlMessages id= "property.location.area" />}</label>
                                                <div className="col-6">
                                                    <div className="data-filled">
                                                        {propertyDetail.location[0].title_area!==null?propertyDetail.location[0].title_area:""}
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="width100">
                                            <FormControl className="form-group flexNone" >
                                                <label  className="col-form-label obligateField col-4"><span className="obligate">*</span>{<IntlMessages id= "property.location.postal_code" />}</label>
                                                <div className="col-6">
                                                    <div className="heightIP40 data-filled">
                                                        {propertyDetail.location[0].postal_code!==null?propertyDetail.location[0].postal_code:""}
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/*/!*<Representation propertyDetail={propertyDetail}/>*!/*/}
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

// map state to props
const mapStateToProps = ( state ) => {
    return {
        propertyFields:state.propertyFields,
        accountCurrent:state.authLogin
    };
};

const mapDispatchToProps = (dispatch, props)=>{
    return{

    }
};

const FormikForm = withFormik({
    mapPropsToValues() {
        return {

        }
    },

})(MainPropertyLayout);

export default connect(mapStateToProps,mapDispatchToProps)(FormikForm);

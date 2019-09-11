import React, { Component } from 'react';
import reactCSS from 'reactcss'
import IntlMessages from "Util/IntlMessages";
import FormControl from "@material-ui/core/FormControl/FormControl";
import {findDataLabel} from "Helpers/helpers";
import {GET_AGENCYS} from "Actions/types";
import {getListAccountByConditions} from "Actions";
import connect from "react-redux/es/connect/connect";
class Marketing extends Component{
    componentWillMount(){
        const {agencys} = this.props;
        if(agencys.length < 1) {
            this.props.getListAccountByConditions({type: "agency"},null, GET_AGENCYS)
        }
    }
    render(){
        var {agencys} = this.props;
        const styles = reactCSS({
            'default': {
                card_margin : {
                    marginTop : "20px",
                },
            },
        });
        const {propertyDetail} = this.props
        const optionMarkeing = [{
            value : "1",
            label : " Mon agence ",
        },
            {
                value : "2",
                label : " Agence de préférence ",
            },
            {
                value : "3",
                label : "Le vendeur ne souhaite pas de communication sur ce support ",
            },
            {
                value : "4",
                label : " Je laisse le choix à la 1ère agence qui souhaite faire la publicité  ",
            },
            {
                value : "5",
                label : "Libre de publicité ",
            }]
        return(
            <div>
                <div className="row">
                    <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <IntlMessages id="property.marketing.ad"/>
                            </div>
                            <div className="card-body">
                                <div>
                                    <div className="row">
                                        <div className="col-sm-6 col-12">
                                            <FormControl className="form-group">
                                                <label  className="col-form-label obligateField" ><span className="obligate">*</span>{<IntlMessages id="property.marketing.title.at_home"  />}</label>
                                                <div className="heightIP40">
                                                    <div className="col-sm-10 col-12">
                                                        <div className="data-filled height40px">{propertyDetail.market[0] !==undefined && propertyDetail.market[0].at_home!==null? findDataLabel(propertyDetail.market[0].at_home,optionMarkeing):""}</div>
                                                        <p></p>
                                                        {propertyDetail.market[0] !==undefined && propertyDetail.market[0].at_home!==null&&propertyDetail.market[0].at_home!=="3"&&propertyDetail.market[0].at_home!==""?<div className="data-filled height40px">{propertyDetail.market[0].at_home_input!==null? propertyDetail.market[0].at_home_input:""}</div>:""}
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                        <div className="col-sm-6 col-12">
                                            <FormControl className="form-group" >
                                                <label  className="col-form-label obligateField" ><span className="obligate">*</span>{<IntlMessages id="property.marketing.title.immotop" />}</label>
                                                <div className="heightIP40">
                                                    <div className="col-sm-10 col-12">
                                                        <div className="data-filled height40px"> {propertyDetail.market[0] !==undefined && propertyDetail.market[0].immotop!==null? findDataLabel(propertyDetail.market[0].immotop,optionMarkeing):""}</div>
                                                        <p></p>
                                                        {propertyDetail.market[0] !==undefined && propertyDetail.market[0].immotop!==null&&propertyDetail.market[0].immotop!=="3"&&propertyDetail.market[0].immotop!==""?<div className="data-filled height40px">{propertyDetail.market[0].immotop_input!==null? propertyDetail.market[0].immotop_input:""}</div>:""}
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6 col-12">
                                            <FormControl className="form-group" >
                                                <label  className="col-form-label obligateField" ><span className="obligate">*</span>{<IntlMessages id="property.marketing.title.wortimmo" />}</label>
                                                <div className="heightIP40">
                                                    <div className="col-sm-10 col-12">
                                                        <div className="data-filled height40px">{propertyDetail.market[0] !==undefined && propertyDetail.market[0].wortimmo!==null? findDataLabel(propertyDetail.market[0].wortimmo,optionMarkeing):""}</div>
                                                        <p></p>
                                                        {propertyDetail.market[0] !==undefined && propertyDetail.market[0].wortimmo!==null&&propertyDetail.market[0].wortimmo!=="3"&&propertyDetail.market[0].wortimmo!==""?<div className="data-filled height40px">{propertyDetail.market[0].wortimmo_input!==null? propertyDetail.market[0].wortimmo_input:""}</div>:""}
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                        <div className="col-sm-6 col-12">
                                            <FormControl className="form-group"  >
                                                <label  className="col-form-label obligateField"><span className="obligate">*</span>{<IntlMessages id="property.marketing.title.luxbazard" />}</label>
                                                <div className="heightIP40">
                                                    <div className="col-sm-10 col-12">
                                                        <div className="data-filled height40px"> {propertyDetail.market[0] !==undefined && propertyDetail.market[0].luxbazard!==null?findDataLabel(propertyDetail.market[0].luxbazard,optionMarkeing):""}</div>
                                                        <p></p>
                                                        {propertyDetail.market[0] !==undefined && propertyDetail.market[0].luxbazard!==null&&propertyDetail.market[0].luxbazard!=="3"&&propertyDetail.market[0].luxbazard!==""?<div className="data-filled height40px">{propertyDetail.market[0].luxbazard_input!==null? propertyDetail.market[0].luxbazard_input:""}</div>:""}
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6 col-12">
                                            <FormControl className="form-group">
                                                <label  className="col-form-label obligateField" ><span className="obligate">*</span>{<IntlMessages id="property.marketing.title.immo.lu" />}</label>
                                                <div className="heightIP40">
                                                    <div className="col-sm-10 col-12">
                                                        <div className="data-filled height40px"> {propertyDetail.market[0] !==undefined && propertyDetail.market[0].immo_lu!==null? findDataLabel(propertyDetail.market[0].immo_lu,optionMarkeing):""}</div>
                                                        <p></p>
                                                        {propertyDetail.market[0] !==undefined && propertyDetail.market[0].immo_lu!==null&&propertyDetail.market[0].immo_lu!=="3"&&propertyDetail.market[0].immo_lu!==""?<div className="data-filled height40px">{propertyDetail.market[0].immo_lu_input!==null? propertyDetail.market[0].immo_lu_input:""}</div>:""}
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                        <div className="col-sm-6 col-12">
                                            <FormControl className="form-group" >
                                                <label  className="col-form-label obligateField" ><span className="obligate">*</span>{<IntlMessages id="property.marketing.title.home.editus.lu" />}</label>
                                                <div className="heightIP40">
                                                    <div className="col-sm-10 col-12">
                                                        <div className="data-filled height40px"> {propertyDetail.market[0] !==undefined && propertyDetail.market[0].editus_lu!==null? findDataLabel(propertyDetail.market[0].editus_lu,optionMarkeing):""}</div>
                                                        <p></p>
                                                        {propertyDetail.market[0] !==undefined && propertyDetail.market[0].editus_lu!==null&&propertyDetail.market[0].editus_lu!=="3"&&propertyDetail.market[0].editus_lu!==""?<div className="data-filled height40px">{propertyDetail.market[0].editus_lu_input!==null? propertyDetail.market[0].editus_lu_input:""}</div>:""}
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <IntlMessages id="property.marketing.magazine"/>
                            </div>
                            <div className="card-body">
                                <div>
                                    <div className="row">
                                        <div className="col-sm-6 col-12">
                                            <FormControl className="form-group">
                                                <label className="col-form-label obligateField"><span className="obligate">*</span>{
                                                    <IntlMessages id="property.marketing.title.editus_home" />}</label>
                                                <div className="heightIP40">
                                                    <div className="col-sm-10 col-12">
                                                        <div className="data-filled height40px"> {propertyDetail.market[0] !==undefined && propertyDetail.market[0].editus_home!==null? findDataLabel(propertyDetail.market[0].editus_home,optionMarkeing):""}</div>
                                                        <p></p>
                                                        {propertyDetail.market[0] !==undefined && propertyDetail.market[0].editus_home!==null&&propertyDetail.market[0].editus_home!=="3"&&propertyDetail.market[0].editus_home!==""?<div className="data-filled height40px">{propertyDetail.market[0].editus_home_input!==null? propertyDetail.market[0].editus_home_input:""}</div>:""}
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                        <div className="col-sm-6 col-12">
                                            <FormControl className="form-group" >
                                                <label className="col-form-label obligateField">
                                                    <span className="obligate">*</span>
                                                    {<IntlMessages id="property.marketing.title.luxembourg_wort" />}
                                                </label>
                                                <div className="heightIP40">
                                                    <div className="col-sm-10 col-12">
                                                        <div className="data-filled height40px"> {propertyDetail.market[0] !==undefined && propertyDetail.market[0].luxembourg_wort!==null? findDataLabel(propertyDetail.market[0].luxembourg_wort,optionMarkeing):""}</div>
                                                        <p></p>
                                                        {propertyDetail.market[0] !==undefined && propertyDetail.market[0].editus_home!==null&&propertyDetail.market[0].editus_home!=="3"&&propertyDetail.market[0].editus_home!==""?<div className="data-filled height40px">{propertyDetail.market[0].editus_home_input!==null? propertyDetail.market[0].editus_home_input:""}</div>:""}
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6 col-12">
                                            <FormControl className="form-group">
                                                <label className="col-form-label obligateField"><span className="obligate">*</span>{
                                                    <IntlMessages id="property.marketing.title.distribution_flyers" />}</label>
                                                <div className="heightIP40">
                                                    <div className="col-sm-10 col-12">
                                                        <div className="data-filled height40px"> {propertyDetail.market[0] !==undefined && propertyDetail.market[0].distribution_flyers!==null? findDataLabel(propertyDetail.market[0].distribution_flyers,optionMarkeing):""}</div>
                                                        <p></p>
                                                        {propertyDetail.market[0] !==undefined && propertyDetail.market[0].distribution_flyers!==null&&propertyDetail.market[0].distribution_flyers!=="3"&&propertyDetail.market[0].distribution_flyers!==""?<div className="data-filled height40px">{propertyDetail.market[0].distribution_flyers_input!==null? propertyDetail.market[0].distribution_flyers_input:""}</div>:""}
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={styles.card_margin}>
                    <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <IntlMessages id="property.marketing.social_network"/>
                            </div>
                            <div className="card-body">
                                <div>
                                    <div className="row">
                                        <div className="col-sm-6 col-12">
                                            <FormControl className="form-group" >
                                                <label  className="col-form-label" >{<IntlMessages id="property.marketing.title.facebook_personnel" />}</label>
                                                <div className="heightIP40">
                                                    <div >
                                                        <div className="heightIP40 data-filled height40px">
                                                            {propertyDetail.market[0] !==undefined && propertyDetail.market[0].facebook_personnel!==null?propertyDetail.market[0].facebook_personnel:""}
                                                        </div>
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                        <div className="col-sm-6 col-12">
                                            <label  className="col-form-label" >{<IntlMessages id="property.marketing.title.sponsored_facebook_announcement" />}</label>
                                            <div className="heightIP40">
                                                <div >
                                                    <div className="heightIP40 data-filled height40px">
                                                        {propertyDetail.market[0] !==undefined && propertyDetail.market[0].sponsored_facebook_announcement!==null?propertyDetail.market[0].sponsored_facebook_announcement:""}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6 col-12">
                                            <label  className="col-form-label" >{<IntlMessages id="property.marketing.title.instagram" />}</label>
                                            <div className="heightIP40">
                                                <div >
                                                    <div className="heightIP40 data-filled height40px">
                                                        {propertyDetail.market[0] !==undefined && propertyDetail.market[0].instagram!==null?propertyDetail.market[0].instagram:""}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-12">
                                            <label  className="col-form-label" >{<IntlMessages id="property.marketing.title.linkedin" />}</label>
                                            <div className="heightIP40">
                                                <div >
                                                    <div className="heightIP40 data-filled height40px">
                                                        {propertyDetail.market[0] !==undefined && propertyDetail.market[0].linkedin!==null?propertyDetail.market[0].linkedin:""}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {propertyDetail.market[0] !==undefined && propertyDetail.market[0].agency_for_marketing!==null?<div className="row">

                                            <div className="col-sm-6 col-12">
                                                <label  className="col-form-label" >{<IntlMessages id="property.marketing.title.choose_agency_for_makerting" />}</label>
                                                <div className="data-filled height40px" >
                                                    {findDataLabel(JSON.parse(propertyDetail.market[0].agency_for_marketing),agencys)}
                                                </div>
                                            </div>
                                        </div>:""}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <IntlMessages id="property.marketing.public_agency"/>
                            </div>
                            <div className="card-body">
                                <div>
                                    <div className="row">
                                        <div className="col-sm-6 col-12">
                                            <FormControl className="form-group">
                                                <label className="col-form-label obligateField"><span className="obligate">*</span>{
                                                    <IntlMessages id="property.marketing.title.client_files_agency" />}</label>
                                                <div className="heightIP40">
                                                    <div className="col-sm-10 col-12">
                                                    <div className="data-filled height40px">
                                                        {propertyDetail.market[0] !==undefined && propertyDetail.market[0].agency_file!==null?(propertyDetail.market[0].agency_file!=="1"?<IntlMessages id="choose.no" />:<IntlMessages id="choose.yes" />):""}
                                                    </div>
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                        <div className="col-sm-6 col-12">
                                            <FormControl className="form-group" >
                                                <label className="col-form-label obligateField"><span className="obligate">*</span>{
                                                    <IntlMessages id="property.marketing.title.vitrine_agences" />}</label>
                                                <div className="heightIP40">
                                                    <div className="col-sm-10 col-12">
                                                    <div className="data-filled height40px">
                                                        {propertyDetail.market[0] !==undefined && propertyDetail.market[0].vitrine_agences!==null?findDataLabel(propertyDetail.market[0].vitrine_agences,optionMarkeing):""}
                                                    </div>
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6 col-12">
                                            <FormControl className="form-group">
                                                <label className="col-form-label">{<IntlMessages
                                                    id="property.marketing.title.autre_publicite" />}</label>
                                                <div className="heightIP40">
                                                    <div className="col-sm-10 col-12">
                                                        <div className="heightIP40 data-filled height40px">
                                                            {propertyDetail.market[0] !==undefined && propertyDetail.market[0].autre_publicite!==null?propertyDetail.market[0].autre_publicite:""}
                                                        </div>
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
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
        propertyFields: state.propertyFields,
        agencys :state.accounts.agencys
    })
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        getListAccountByConditions:(conditions,pagination_cond,typeReducer)=>{
            return dispatch(getListAccountByConditions(conditions,pagination_cond,typeReducer))
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Marketing);
import React, { Component } from 'react';
import FormControl from "@material-ui/core/FormControl/FormControl";
import IntlMessages from "Util/IntlMessages";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import Select from "./SelectMarketing";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {withFormik} from "formik";
import * as Yup from "yup";
import {getListAccountByConditions, updateFieldsPropertyMarketingTab} from "Actions";
import connect from "react-redux/es/connect/connect";

class MarketPortals extends Component{
    constructor(props) {
        super(props);
        this.state = {
            checkChange:false,
            check_input_1 : false,
        };
    }
    onChange = (e) =>{
        this.setState({
            checkChange : true
        });
        this.props.handleChange(e);
    };
    _saveToRedux=()=>{
        var {checkChange} =  this.state;
        var {propertyFields} =  this.props;
        var {preTab} =  propertyFields;
        if(checkChange &&( preTab ===6|| preTab ==="6")){
            this.props.updateFieldsPropertyMarketingTab(this.props.values);
            this.setState({
                checkChange : false
            });
            this.props.handleSubmit();
        }
    };
    onChangeAgencyAtHome = (value) => {
        this.props.values.at_home_agency = value;
    }
    onChangeAgencyEditusLu = (value) => {
        this.props.values.editus_lu_agency = value;
    }
    onChangeAgencyImmoLu = (value) => {
        this.props.values.immo_lu_agency = value;
    }
    onChangeAgencyLuxbazard = (value) => {
        this.props.values.luxbazard_agency = value;
    }
    onChangeAgencyWortimmo = (value) => {
        this.props.values.wortimmo_agency = value;
    }
    onChangeAgencyImmotop = (value) => {
        this.props.values.immotop_agency = value;
    }
    render(){
        const {
            at_home,
            immotop,
            wortimmo,
            luxbazard,
            immo_lu,
            editus_lu,
        } = this.props.values
        this._saveToRedux();
        return(
            <div>
                <div className="row">
                    <div className="col-sm-6 col-12">
                        <FormControl className="form-group" error={!!this.props.errors.at_home}>
                            <label  className="col-form-label obligateField" ><span className="obligate">*</span>{<IntlMessages id="property.marketing.title.at_home"  />}</label>
                            <div className="heightIP40">
                                <div className="col-sm-10 col-12">
                                    <Select
                                        name="at_home"
                                        value={this.props.values.at_home}
                                        onChange={this.onChange}
                                        onBlur={this.props.handleBlur}
                                        valueInput={this.props.values.at_home_input}
                                        nameInput="at_home_input"
                                        onChangeAgency={this.onChangeAgencyAtHome}
                                        valueAgency={this.props.values.at_home_agency}
                                    />
                                </div>
                            </div>
                        </FormControl>
                    </div>
                    <div className="col-sm-6 col-12">
                        <FormControl className="form-group" error={!!this.props.errors.immotop}>
                            <label  className="col-form-label obligateField" ><span className="obligate">*</span>{<IntlMessages id="property.marketing.title.immotop" />}</label>
                            <div className="heightIP40">
                                <div className="col-sm-10 col-12">
                                    <Select
                                        name="immotop"
                                        value={this.props.values.immotop}
                                        onChange={this.onChange}
                                        onBlur={this.props.handleBlur}
                                        valueInput={this.props.values.immotop_input}
                                        nameInput="immotop_input"
                                        onChangeAgency={this.onChangeAgencyImmotop}
                                        valueAgency={this.props.values.immotop_agency}
                                    />
                                    {/*{this.props.touched.immotop &&<FormHelperText>{this.props.errors.immotop}</FormHelperText>}*/}
                                </div>
                            </div>
                        </FormControl>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-12">
                        <FormControl className="form-group" error={!!this.props.errors.wortimmo}>
                            <label  className="col-form-label obligateField" ><span className="obligate">*</span>{<IntlMessages id="property.marketing.title.wortimmo" />}</label>
                            <div className="heightIP40">
                                <div className="col-sm-10 col-12">
                                    <Select
                                        name="wortimmo"
                                        value={this.props.values.wortimmo}
                                        onChange={this.onChange}
                                        onBlur={this.props.handleBlur}
                                        nameInput="wortimmo_input"
                                        valueInput={this.props.values.wortimmo_input}
                                        onChangeAgency={this.onChangeAgencyWortimmo}
                                        valueAgency={this.props.values.wortimmo_agency}
                                    />

                                </div>
                            </div>
                        </FormControl>
                    </div>
                    <div className="col-sm-6 col-12">
                        <FormControl className="form-group" error={!!this.props.errors.luxbazard} >
                            <label  className="col-form-label obligateField"><span className="obligate">*</span>{<IntlMessages id="property.marketing.title.luxbazard" />}</label>
                            <div className="heightIP40">
                                <div className="col-sm-10 col-12">
                                    <Select
                                        name="luxbazard"
                                        value={this.props.values.luxbazard}
                                        onChange={this.onChange}
                                        onBlur={this.props.handleBlur}
                                        nameInput="luxbazard_input"
                                        valueInput={this.props.values.luxbazard_input}
                                        onChangeAgency={this.onChangeAgencyLuxbazard}
                                        valueAgency={this.props.values.luxbazard_agency}

                                    />

                                    {/*{this.props.touched.luxbazard &&<FormHelperText>{this.props.errors.luxbazard}</FormHelperText>}*/}
                                </div>
                            </div>
                        </FormControl>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-12">
                        <FormControl className="form-group" error={!!this.props.errors.immo_lu}>
                            <label  className="col-form-label obligateField" ><span className="obligate">*</span>{<IntlMessages id="property.marketing.title.immo.lu" />}</label>
                            <div className="heightIP40">
                                <div className="col-sm-10 col-12">
                                    <Select
                                        name="immo_lu"
                                        value={this.props.values.immo_lu}
                                        onChange={this.onChange}
                                        onBlur={this.props.handleBlur}
                                        valueInput={this.props.values.immo_lu_input}
                                        nameInput="immo_lu_input"
                                        onChangeAgency={this.onChangeAgencyImmoLu}
                                        valueAgency={this.props.values.immo_lu_agency}
                                    />
                                    {/*{this.props.touched.immo_lu &&<FormHelperText>{this.props.errors.immo_lu}</FormHelperText>}*/}
                                </div>
                            </div>
                        </FormControl>
                    </div>
                    <div className="col-sm-6 col-12">
                        <FormControl className="form-group" error={!!this.props.errors.editus_lu}>
                            <label  className="col-form-label obligateField" ><span className="obligate">*</span>{<IntlMessages id="property.marketing.title.editus_home" />}</label>
                            <div className="heightIP40">
                                <div className="col-sm-10 col-12"> 
                                    <Select
                                        name="editus_lu"
                                        value={this.props.values.editus_lu}
                                        onChange={this.onChange}
                                        onBlur={this.props.handleBlur}
                                        nameInput="editus_lu_input"
                                        valueInput={this.props.values.editus_lu_input}
                                        onChangeAgency={this.onChangeAgencyEditusLu}
                                        valueAgency={this.props.values.editus_lu_agency}
                                    />
                                </div>
                            </div>
                        </FormControl>
                    </div>
                </div>
            </div>
        )
    }
}
const FormikForm = withFormik({

    mapPropsToValues(datas) { // Init form field
        var {propertyDetail} = datas;
        if(typeof propertyDetail !== "undefined" && propertyDetail.market[0] ){

            return {
                at_home: propertyDetail.market[0].at_home||"",
                immotop: propertyDetail.market[0].immotop||"",
                wortimmo:propertyDetail.market[0].wortimmo||"",
                luxbazard:propertyDetail.market[0].luxbazard||"",
                immo_lu: propertyDetail.market[0].immo_lu||"",
                editus_lu: propertyDetail.market[0].editus_lu||"",
                at_home_input: propertyDetail.market[0].at_home_input||"http://",
                immotop_input: propertyDetail.market[0].immotop_input||"http://",
                wortimmo_input:propertyDetail.market[0].wortimmo_input||"http://",
                luxbazard_input:propertyDetail.market[0].luxbazard_input||"http://",
                immo_lu_input: propertyDetail.market[0].immo_lu_input||"http://",
                editus_lu_input: propertyDetail.market[0].editus_lu_input||"http://",
                at_home_agency: propertyDetail.market[0].at_home_agency||"",
                immotop_agency: propertyDetail.market[0].immotop_agency||"",
                wortimmo_agency:propertyDetail.market[0].wortimmo_agency||"",
                luxbazard_agency:propertyDetail.market[0].luxbazard_agency||"",
                immo_lu_agency: propertyDetail.market[0].immo_lu_agency||"",
                editus_lu_agency: propertyDetail.market[0].editus_lu_agency||"",
            }
        }
        return {
            at_home: "",
            immotop: "",
            wortimmo:"",
            luxbazard:"",
            immo_lu: "",
            editus_lu: "",
            at_home_agency: "",
            immotop_agency: "",
            wortimmo_agency:"",
            luxbazard_agency:"",
            immo_lu_agency: "",
            editus_lu_agency: "",
            at_home_input: "http://",
            immotop_input: "http://",
            wortimmo_input:"http://",
            luxbazard_input:"http://",
            immo_lu_input: "http://",
            editus_lu_input: "http://",
        }
    },
    validationSchema: Yup.object().shape({ // Validate form field

        at_home: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
        immotop: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
        wortimmo: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
        luxbazard: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
        immo_lu: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
        editus_lu: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
    }),
    enableReinitialize: true,
    handleSubmit(values, { props, setSubmitting,resetForm }) {
        // props.updateFieldsPropertyMarketingTab(values);
        // console.log(props.propertyFields);
    },

})(MarketPortals);
const mapStateToProps = (state) => {
    return ({
        propertyFields: state.propertyFields,
        agencys :state.accounts.agencys
    })
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        updateFieldsPropertyMarketingTab:(fields)=>{
            return dispatch(updateFieldsPropertyMarketingTab(fields))
        },
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(FormikForm);
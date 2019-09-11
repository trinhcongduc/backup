import React, { Component } from 'react';
import FormControl from "@material-ui/core/FormControl/FormControl";
import IntlMessages from "Util/IntlMessages";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import Select from "./SelectMarketing";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { withFormik } from "formik";
import * as Yup from "yup";
import { updateFieldsPropertyMarketingTab } from "Actions";
import connect from "react-redux/es/connect/connect";

class PublishMagazines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkChange: false,
        };
    }

    onChange = (e) => {
        this.setState({
            checkChange: true
        });
        this.props.handleChange(e);
    };
    _saveToRedux = () => {
        var { checkChange } = this.state;
        var { propertyFields } = this.props;
        var { preTab } = propertyFields;
        if (checkChange && (preTab === 6 || preTab === "6")) {

            this.props.updateFieldsPropertyMarketingTab(this.props.values);
            this.setState({
                checkChange: false
            });
            this.props.handleSubmit();
        }
    };
    onChangeAgencyEditusHome = (value) =>{
        this.props.values.editus_home_agency = value;
    }
    onChangeAgencyLuxembourgWort = (value) =>{
        this.props.values.luxembourg_wort_agency= value;
    }
    onChangeAgencyDistributionFlyers = (value) =>{
        this.props.values.distribution_flyers_agency = value;
    }
    render() {
        const {
            editus_home,
            luxembourg_wort,
            distribution_flyers,
        } = this.props.values
        this._saveToRedux();
        this._saveToRedux();
        return (
            <div>
                <div className="row">
                    <div className="col-sm-6 col-12">
                        <FormControl className="form-group" error={!!this.props.errors.editus_home}>
                            <label className="col-form-label obligateField"><span className="obligate">*</span>{
                                <IntlMessages id="property.marketing.title.editus_home" />}</label>
                            <div className="heightIP40">
                                <div className="col-sm-10 col-12">
                                    <Select
                                        name="editus_home"
                                        value={this.props.values.editus_home}
                                        onChange={this.onChange}
                                        onBlur={this.props.handleBlur}
                                        nameInput="editus_home_input"
                                        valueInput={this.props.values.editus_home_input}
                                        onChangeAgency={this.onChangeAgencyEditusHome}
                                        valueAgency={this.props.values.editus_home_agency}
                                    />
                                    {this.props.touched.editus_home &&
                                        <FormHelperText>{this.props.errors.editus_home}</FormHelperText>}
                                </div>
                            </div>
                        </FormControl>
                    </div>
                    <div className="col-sm-6 col-12">
                        <FormControl className="form-group" error={!!this.props.errors.luxembourg_wort}>
                            <label className="col-form-label obligateField">
                                <span className="obligate">*</span>
                                {<IntlMessages id="property.marketing.title.luxembourg_wort" />}
                            </label>
                            <div className="heightIP40">
                                <div className="col-sm-10 col-12">
                                    <Select
                                        name="luxembourg_wort"
                                        value={this.props.values.luxembourg_wort}
                                        onChange={this.onChange}
                                        onBlur={this.props.handleBlur}
                                        nameInput="luxembourg_wort_input"
                                        valueInput={this.props.values.luxembourg_wort_input}
                                        onChangeAgency={this.onChangeAgencyLuxembourgWort}
                                        valueAgency={this.props.values.luxembourg_wort_agency}
                                    />
                                    {this.props.touched.luxembourg_wort &&
                                        <FormHelperText>{this.props.errors.luxembourg_wort}</FormHelperText>}
                                </div>
                            </div>
                        </FormControl>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-12">
                        <FormControl className="form-group" error={!!this.props.errors.distribution_flyers}>
                            <label className="col-form-label obligateField"><span className="obligate">*</span>{
                                <IntlMessages id="property.marketing.title.distribution_flyers" />}</label>
                            <div className="heightIP40">
                                <div className="col-sm-10 col-12">
                                    <Select
                                        name="distribution_flyers"
                                        value={this.props.values.distribution_flyers}
                                        onChange={this.onChange}
                                        onBlur={this.props.handleBlur}
                                        nameInput="distribution_flyers_input"
                                        valueInput={this.props.values.distribution_flyers_input}
                                        onChangeAgency={this.onChangeAgencyDistributionFlyers}
                                        valueAgency={this.props.values.distribution_flyers_agency}
                                    />
                                    {this.props.touched.distribution_flyers &&
                                        <FormHelperText>{this.props.errors.distribution_flyers}</FormHelperText>}
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

        var { propertyDetail } = datas;
        if (typeof datas.propertyDetail !== "undefined" && propertyDetail.market[0] ) {
            return {
                editus_home: propertyDetail.market[0].editus_home || "",
                luxembourg_wort: propertyDetail.market[0].luxembourg_wort || "",
                distribution_flyers: propertyDetail.market[0].distribution_flyers || "",
                editus_home_input: propertyDetail.market[0].editus_home_input || "",
                luxembourg_wor_input: propertyDetail.market[0].luxembourg_wort_input || "",
                distribution_flyers_input: propertyDetail.market[0].distribution_flyers_input || "",
                editus_home_agency: propertyDetail.market[0].editus_home_agency || "",
                luxembourg_wort_agency: propertyDetail.market[0].luxembourg_wort_agency || "",
                distribution_flyers_agency: propertyDetail.market[0].distribution_flyers_agency || "",
                // vitrine_agences: propertyDetail.market[0].vitrine_agences || "",
                // autre_publicite: propertyDetail.market[0].autre_publicite || "",
            }
        }
        return {
            editus_home: "",
            luxembourg_wort: "",
            distribution_flyers: "",
            editus_home_input: "http://",
            luxembourg_wort_input:  "http://",
            distribution_flyers_input:  "http://",
            editus_home_agency:"",
            luxembourg_wort_agency: "",
            distribution_flyers_agency: "",
        }
    },
    validationSchema: Yup.object().shape({ // Validate form field

        editus_home: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
        luxembourg_wort: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
        distribution_flyers: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
        // vitrine_agences: Yup.string()
        //     .required((<IntlMessages id='notification.required' />)),
    }),
    enableReinitialize: true,
    handleSubmit(values, { props, setSubmitting, resetForm }) {
        // props.updateFieldsPropertyMarketingTab(values);
        // console.log(props.propertyFields);
    },

})(PublishMagazines);
const mapStateToProps = (state) => {
    return ({
        propertyFields: state.propertyFields
    })
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        updateFieldsPropertyMarketingTab: (fields) => {
            return dispatch(updateFieldsPropertyMarketingTab(fields))
        }

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(FormikForm);
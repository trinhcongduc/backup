import React, { Component } from 'react';
import FormControl from "@material-ui/core/FormControl/FormControl";
import IntlMessages from "Util/IntlMessages";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { withFormik } from "formik";
import * as Yup from "yup";
import { updateFieldsPropertyMarketingTab } from "Actions";
import connect from "react-redux/es/connect/connect";

class PublicAgency extends Component {
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

    render() {

        this._saveToRedux();
        return (
            <div>
                <div className="row">
                    <div className="col-sm-6 col-12">
                        <FormControl className="form-group" error={!!this.props.errors.agency_file}>
                            <label className="col-form-label obligateField"><span className="obligate">*</span>{
                                <IntlMessages id="property.marketing.title.client_files_agency" />}</label>
                            <div className="heightIP40">
                                <div className="col-sm-10 col-12">
                                    <Select
                                        className="form-control"
                                        name="agency_file"
                                        value={this.props.values.agency_file}
                                        onChange={this.onChange}
                                        displayEmpty
                                    >
                                        <MenuItem value="" disabled>
                                            {<IntlMessages id="property.marketing.select" />}
                                        </MenuItem>
                                        <MenuItem value={"1"}>{<IntlMessages id="choose.yes" />}</MenuItem>
                                        <MenuItem value={"2"}>{<IntlMessages id="choose.no" />}</MenuItem>
                                    </Select>
                                </div>
                            </div>
                        </FormControl>
                    </div>
                     <div className="col-sm-6 col-12">
                        <FormControl className="form-group" error={!!this.props.errors.vitrine_agences}>
                            <label className="col-form-label obligateField"><span className="obligate">*</span>{
                                <IntlMessages id="property.marketing.title.vitrine_agences" />}</label>
                            <div className="heightIP40">
                                <div className="col-sm-10 col-12">
                                    <Select
                                        className="form-control"
                                        name="vitrine_agences"
                                        value={this.props.values.vitrine_agences}
                                        onChange={this.onChange}
                                        onBlur={this.props.handleBlur}
                                        displayEmpty
                                    >
                                        <MenuItem value="" disabled>
                                            {<IntlMessages id="property.marketing.select" />}
                                        </MenuItem>
                                        <MenuItem value={"1"}>{<IntlMessages id="choose.yes" />}</MenuItem>
                                        <MenuItem value={"2"}>{<IntlMessages id="choose.no" />}</MenuItem>
                                    </Select>
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
                                    <div className="heightIP40">
                                        <input type="text"
                                            className="form-control"
                                            name="autre_publicite"
                                            value={this.props.values.autre_publicite}
                                            onChange={this.onChange}

                                        />
                                    </div>
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
        if (typeof propertyDetail !== "undefined" && propertyDetail.market[0]) {
            return {
                vitrine_agences: propertyDetail.market[0].vitrine_agences || "",
                autre_publicite: propertyDetail.market[0].autre_publicite || "",
                agency_file:propertyDetail.market[0].agency_file||"",
            }
        }
        return {
            vitrine_agences: "1",
            autre_publicite: "",
            agency_file:"",
        }
    },
    validationSchema: Yup.object().shape({ // Validate form field

        vitrine_agences: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
    }),
    enableReinitialize: true,
    handleSubmit(values, { props, setSubmitting, resetForm }) {
        // props.updateFieldsPropertyMarketingTab(values);
        // console.log(props.propertyFields);
    },

})(PublicAgency);
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
/**
 * App.js Layout Start Here
 */
import React, {Component} from 'react';
import {connect} from "react-redux";
import {withFormik} from "formik";
import IntlMessages from "Util/IntlMessages";
import {updateFieldsPropertyMainTab} from "Actions";
import {PROPERTY_TYPE} from "Constants/ComponentConfigs/PropertyConfig"
import * as Yup from "yup";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import {numberWithCommas} from "Helpers";


class InforPriceLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: "",
            checkChange: false,
        }
    }

    handleChange = (event) => {
        event.target.value = event.target.value.split(' ').join('');
        if(event.target.name === "number_pay"){
            this.props.propery_price(event.target.value);
        }
        this._isChanged(true);
        this.props.handleChange(event)
    };

    _isChanged = (status) => {
        this.setState({
            checkChange: status
        })
    };

    _saveToRedux = () => {
        var {checkChange} = this.state;
        var {propertyFields} = this.props;
        var {preTab} = propertyFields;
        if (checkChange && (preTab === 1 || preTab === "1")) {
            var data = this.props.values;
            this.props.updateFieldsPropertyMainTab(data);
            this._isChanged(false);
            this.props.handleSubmit();
        }
    };

    render() {
        this._saveToRedux();
        const {propertyFields} = this.props;
        const {
            number_pay,
            number_charge,
            caution,
        } = this.props.values; // get prop of Formik return
        return (
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
                            <div>
                                <input type="text"
                                       min = {0}
                                       className="form-control"
                                       name="number_pay"
                                       value={numberWithCommas(number_pay)}
                                       onChange={this.handleChange}
                                />
                                {this.props.touched.number_pay&&<FormHelperText error={true}>{this.props.errors.number_pay}</FormHelperText>}
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label obligateField"><IntlMessages id="property.main.price.charge"/></label>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            <div>
                                <input type="text"
                                       min = {0}
                                       className="form-control"
                                       name="number_charge"
                                       value={numberWithCommas(number_charge)}
                                       onChange={this.handleChange}
                                />
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
                                        <input type="number"
                                               min = {0}
                                               className="form-control"
                                               name="caution"
                                               value={caution}
                                               onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

}

const mapStatetoProps = (state) => {
    return ({
        configdata: state.configdata,
        propertyFields: state.propertyFields

    })
};

const mapDispatchToProp = (dispatch, props) => {
    return {
        updateFieldsPropertyMainTab: (fields) => {
            dispatch(updateFieldsPropertyMainTab(fields))
        }
    }
};

const FormikForm = withFormik({
    mapPropsToValues(datas) { // Init form field
        if(typeof datas.propertyDetail != "undefined" ){
            var {propertyDetail} = datas;
            return {
                number_pay: propertyDetail.property.number_pay||'',
                currency: propertyDetail.property.currency||'',
                number_charge: propertyDetail.property.number_charge||'',
                caution: propertyDetail.property.caution||'',
            }
        }
        return {
            number_pay: '',
            currency: '',
            number_charge: '',
            caution: '',
        }
    },
    validationSchema: Yup.object().shape({ // Validate form field
        number_pay: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
    }),
    enableReinitialize: true,
    handleSubmit(values, { props, setSubmitting, resetForm }) {

    },
})(InforPriceLayout);

export default connect(mapStatetoProps, mapDispatchToProp)(FormikForm);

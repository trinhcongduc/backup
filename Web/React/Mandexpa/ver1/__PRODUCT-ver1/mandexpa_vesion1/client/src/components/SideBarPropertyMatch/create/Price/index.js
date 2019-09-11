/**
 * Siderbar
 */

'use strict'
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {withFormik} from "formik";
import IntlMessages from "Util/IntlMessages";
import {numberWithCommas} from "Helpers";
import * as Yup from "yup";


class Price extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check_values: true,
            loadCom:true
        }
    }



    _validateValues = () => {
        var {check_values} = this.state;
        const {
            price_min,
            price_max,

        } = this.props.values;
        this.setState({
            check_values: price_max >-1 ? (price_min <= price_max) : (price_min >= 0 || price_max >= 0),

        })
    };

    _loadCom=()=>{
        this.setState({
            loadCom:!this.state.loadCom
        })
    };


    handleChange = (event) =>{
        event.target.value = event.target.value.split(' ').join('');
        this.props.handleChange(event);
        this._loadCom();
    };


    render() {
        var {check_values} = this.state;
        var {propertyMatchesDetail} = this.props;
        var {price_min, price_max} = this.props.values;
        this.props.parent_get_data(this.props.values);
        return (
            <div className="card">
                <div className="card-header">
                    <IntlMessages id="property.property_match.price.title"/>
                </div>
                <div className="card-body">
                    <label><IntlMessages id="property.property_match.price.des"/></label>
                    <div className="row">
                        <div className="form-group col-sm-3 col-md-3 col-lg-3">
                            <label className="obligateField"><span
                                    className="obligate">*</span><IntlMessages id="min"/></label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control"
                                       min={0}
                                       name="price_min"
                                       value={numberWithCommas(price_min)}
                                       onClick={this._validateValues}
                                       onChange={this.handleChange}
                                       aria-describedby="basic-addon2"/>
                                <div className="input-group-append">
                                    <span className="input-group-text" id="basic-addon2">
                                        <IntlMessages id="euro.symbol"/>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group col-sm-3 col-md-3 col-lg-3">
                            <label className="obligateField"><span
                                    className="obligate">*</span><IntlMessages id="max"/></label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control"
                                       min={0}
                                       name="price_max"
                                       value={numberWithCommas(price_max)}
                                       onClick={this._validateValues}
                                       onChange={this.handleChange}
                                       aria-describedby="basic-addon2"/>
                                <div className="input-group-append">
                                    <span className="input-group-text" id="basic-addon2">
                                        <IntlMessages id="euro.symbol"/>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {!check_values &&<small className="text-danger font-weight-bold"><IntlMessages id="notify.error.min_max_validate"/></small>}

                </div>
            </div>

        )

    }
}

const mapStateToProp = (state) => {
    return ({
        propertyMatchesDetail: state.property_matches.property_matches_edit
    })
};

const mapDispatchToProps = (dispatch, props) => {
    return {}
};


const FormikForm = withFormik({
    mapPropsToValues(datas) { // Init form field
        const {propertyMatchesDetail} = datas;
        if(propertyMatchesDetail && propertyMatchesDetail.id){
            return {
                price_min: propertyMatchesDetail.price_min||'',
                price_max: propertyMatchesDetail.price_max||'',
            }
        }
        return {
            price_min: '',
            price_max: '',
        }
    },
    handleSubmit(values, {props, setSubmitting}) {
        setSubmitting(false);
    },
    enableReinitialize: true,
    validationSchema:Yup.object().shape({
        price_min:Yup.string()
            .required((<IntlMessages id='notification.required' />)),
        price_max:Yup.string()
            .required((<IntlMessages id='notification.required' />)),
    })
})(Price);


export default connect(mapStateToProp, mapDispatchToProps)(withRouter(FormikForm));

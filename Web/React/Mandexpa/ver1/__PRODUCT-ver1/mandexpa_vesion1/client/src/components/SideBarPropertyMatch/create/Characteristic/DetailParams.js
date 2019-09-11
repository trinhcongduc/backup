/**
 * Siderbar
 */

'use strict'
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {withFormik} from "formik";
import IntlMessages from "Util/IntlMessages";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from "@material-ui/core/Radio/Radio";

class DetailParams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check_values: {
                bedrooms: true,
                rooms: true,
                bathrooms: true,
                separate_wc: true,
                living_space: true,
                floor_property: true,
                area: true,
                park_place: true,
            }
        }
    }


    _updateData = () => {
        this.props.parent_get_data(this.props.values);
    };

    handleChange = (event) => {
        this.props.handleChange(event);
        setTimeout(() => {
            this._validateValues();
        }, 500)

    };


    _validateValues = () => {
        var {check_values} = this.state;
        const {
            bedrooms_min,
            bedrooms_max,
            rooms_min,
            rooms_max,
            bathrooms_min,
            bathrooms_max,
            separate_wc_min,
            separate_wc_max,
            living_space_min,
            living_space_max,
            floor_property_min,
            floor_property_max,
            area_min,
            area_max,
            park_place_min,
            park_place_max,

        } = this.props.values;
        this.setState({
            check_values: {
                bedrooms: bedrooms_max ? (bedrooms_min <= bedrooms_max) : (bedrooms_min >= 0 || bedrooms_max >= 0),
                rooms: rooms_max ? (rooms_min <= rooms_max) : (rooms_min >= 0 || rooms_max >= 0),
                bathrooms: bathrooms_max ? (bathrooms_min <= bathrooms_max) : (bathrooms_min >= 0 || bathrooms_max >= 0),
                separate_wc: separate_wc_max ? (separate_wc_min <= separate_wc_max) : (separate_wc_min >= 0 || separate_wc_max >= 0),
                living_space: living_space_max ? (living_space_min <= living_space_max) : (living_space_min >= 0 || living_space_max >= 0),
                floor_property: floor_property_max ? (floor_property_min <= floor_property_max) : (floor_property_min >= 0 || floor_property_max >= 0),
                area: area_max ? (area_min <= area_max) : (area_min >= 0 || area_max >= 0),
                park_place: park_place_max ? (park_place_min <= park_place_max) : (park_place_min >= 0 || park_place_max >= 0),
            }
        })
    };

    render() {
        const {
            bedrooms_min,
            bedrooms_max,
            rooms_min,
            rooms_max,
            bathrooms_min,
            bathrooms_max,
            separate_wc_min,
            separate_wc_max,
            living_space_min,
            living_space_max,
            floor_property_min,
            floor_property_max,
            area_min,
            area_max,
            outdoor_space

        } = this.props.values;

        var {check_values} = this.state;
        this._updateData();

        return (
            <div>
                <div className="row">
                    <div className="col-sm-4 form-group ">
                        <label htmlFor="exampleInputEmail1"><IntlMessages
                            id="property.property_match.characteristic.params.bedrooms"/></label>
                        <div className="row">
                            <div className="col-sm-5">
                                <input type="number" min="0"
                                       className="form-control"
                                       name="bedrooms_min"
                                       value={bedrooms_min}
                                       onChange={this.handleChange}
                                       onClick={this._validateValues}
                                       placeholder="Min"/>
                            </div>
                            <div className="col-sm-5">
                                <input type="number" min="0" className="form-control"
                                       name="bedrooms_max"
                                       value={bedrooms_max}
                                       onChange={this.handleChange}
                                       onClick={this._validateValues}
                                       placeholder="Max"/>
                            </div>
                            {!check_values.bedrooms && <small className="text-danger font-weight-bold"><IntlMessages
                                id="notify.error.min_max_validate"/></small>}
                        </div>
                    </div>
                    <div className="col-sm-4 form-group ">
                        <label htmlFor="exampleInputEmail1"><IntlMessages
                            id="property.property_match.characteristic.params.rooms"/></label>
                        <div className="row">
                            <div className="col-sm-5">
                                <input type="number" min="0" className="form-control"
                                       name="rooms_min"
                                       value={rooms_min}
                                       onClick={this._validateValues}
                                       onChange={this.handleChange}
                                       placeholder="Min"/>
                            </div>
                            <div className="col-sm-5">
                                <input type="number" min="0" className="form-control"
                                       name="rooms_max"
                                       value={rooms_max}
                                       onClick={this._validateValues}
                                       onChange={this.handleChange}
                                       placeholder="Max"/>
                            </div>
                            {!check_values.rooms && <small className="text-danger font-weight-bold"><IntlMessages
                                id="notify.error.min_max_validate"/></small>}
                        </div>
                    </div>
                    <div className="col-sm-4 form-group ">
                        <label htmlFor="exampleInputEmail1"><IntlMessages
                            id="property.property_match.characteristic.params.bathrooms"/></label>
                        <div className="row">
                            <div className="col-sm-5">
                                <input type="number" min="0" className="form-control"
                                       name="bathrooms_min"
                                       value={bathrooms_min}
                                       onClick={this._validateValues}
                                       onChange={this.handleChange}
                                       placeholder="Min"/>
                            </div>
                            <div className="col-sm-5">
                                <input type="number" min="0" className="form-control"
                                       name="bathrooms_max"
                                       value={bathrooms_max}
                                       onClick={this._validateValues}
                                       onChange={this.handleChange}
                                       placeholder="Max"/>
                            </div>
                            {!check_values.bathrooms && <small className="text-danger font-weight-bold"><IntlMessages
                                id="notify.error.min_max_validate"/></small>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 form-group ">
                        <label htmlFor="exampleInputEmail1"><IntlMessages
                            id="property.property_match.characteristic.params.separate_wc"/></label>
                        <div className="row">
                            <div className="col-sm-5">
                                <input type="number" min="0" className="form-control"
                                       name="separate_wc_min"
                                       value={separate_wc_min}
                                       onClick={this._validateValues}
                                       onChange={this.handleChange}
                                       placeholder="Min"/>
                            </div>
                            <div className="col-sm-5">
                                <input type="number" min="0" className="form-control"
                                       name="separate_wc_max"
                                       value={separate_wc_max}
                                       onClick={this._validateValues}
                                       onChange={this.handleChange}
                                       placeholder="Max"/>
                            </div>
                            {!check_values.separate_wc && <small className="text-danger font-weight-bold"><IntlMessages
                                id="notify.error.min_max_validate"/></small>}
                        </div>
                    </div>
                    <div className="col-sm-4 form-group ">
                        <label htmlFor="exampleInputEmail1"><IntlMessages
                            id="property.property_match.characteristic.params.living_space"/></label>
                        <div className="row">
                            <div className="col-sm-5">
                                <input type="number" min="0" className="form-control"
                                       name="living_space_min"
                                       value={living_space_min}
                                       onClick={this._validateValues}
                                       onChange={this.handleChange}
                                       placeholder="Min"/>
                            </div>
                            <div className="col-sm-5">
                                <input type="number" min="0" className="form-control"
                                       name="living_space_max"
                                       value={living_space_max}
                                       onClick={this._validateValues}
                                       onChange={this.handleChange}
                                       placeholder="Max"/>
                            </div>
                            {!check_values.living_space && <small className="text-danger font-weight-bold"><IntlMessages
                                id="notify.error.min_max_validate"/></small>}
                        </div>
                    </div>
                    <div className="col-sm-4 form-group ">
                        <label htmlFor="exampleInputEmail1"><IntlMessages
                            id="property.property_match.characteristic.params.floor_property"/></label>
                        <div className="row">
                            <div className="col-sm-5">
                                <input type="number" min="0" className="form-control"
                                       name="floor_property_min"
                                       value={floor_property_min}
                                       onClick={this._validateValues}
                                       onChange={this.handleChange}
                                       placeholder="Min"/>
                            </div>
                            <div className="col-sm-5">
                                <input type="number" min="0" className="form-control"
                                       name="floor_property_max"
                                       value={floor_property_max}
                                       onClick={this._validateValues}
                                       onChange={this.handleChange}
                                       placeholder="Max"/>
                            </div>
                            {!check_values.floor_property &&
                            <small className="text-danger font-weight-bold"><IntlMessages
                                id="notify.error.min_max_validate"/></small>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 form-group ">
                        <label htmlFor="exampleInputEmail1"><IntlMessages
                            id="property.property_match.characteristic.params.area"/></label>
                        <div className="row">
                            <div className="col-sm-5">
                                <input type="number" min="0" className="form-control"
                                       name="area_min"
                                       value={area_min}
                                       onClick={this._validateValues}
                                       onChange={this.handleChange}
                                       placeholder="Min"/>
                            </div>
                            <div className="col-sm-5">
                                <input type="number" min="0" className="form-control"
                                       name="area_max"
                                       value={area_max}
                                       onClick={this._validateValues}
                                       onChange={this.handleChange}
                                       placeholder="Max"/>
                            </div>
                            {!check_values.area && <small className="text-danger font-weight-bold"><IntlMessages
                                id="notify.error.min_max_validate"/></small>}
                        </div>
                    </div>
                    <div className="col-sm-4 form-group ">
                        <label htmlFor="exampleInputEmail1"><IntlMessages
                            id="property.property_match.characteristic.params.outdoor"/></label>
                        <FormGroup row>
                            <FormControlLabel
                                label={<IntlMessages id="choose.yes"/>}
                                control={
                                    <Radio checked={outdoor_space === 1 || outdoor_space === "1"}
                                           onChange={this.props.handleChange}
                                           name="outdoor_space"
                                           value="1"/>}
                            />
                            <FormControlLabel
                                label={<IntlMessages id="choose.no"/>}
                                control={
                                    <Radio checked={outdoor_space === "0" || outdoor_space === 0 }
                                           onChange={this.props.handleChange}
                                           name="outdoor_space"
                                           value="0"/>}
                            />
                        </FormGroup>
                    </div>
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
                bedrooms_min: propertyMatchesDetail.bedrooms_min||'',
                bedrooms_max: propertyMatchesDetail.bedrooms_max||'',
                rooms_min: propertyMatchesDetail.rooms_min||'',
                rooms_max: propertyMatchesDetail.rooms_max||'',
                bathrooms_min: propertyMatchesDetail.bathrooms_min||'',
                bathrooms_max: propertyMatchesDetail.bathrooms_max||'',
                separate_wc_min: propertyMatchesDetail.separate_wc_min||'',
                separate_wc_max: propertyMatchesDetail.separate_wc_max||'',
                living_space_min: propertyMatchesDetail.living_space_min||'',
                living_space_max: propertyMatchesDetail.living_space_max||'',
                floor_property_min: propertyMatchesDetail.floor_property_min||'',
                floor_property_max: propertyMatchesDetail.floor_property_max||'',
                area_min: propertyMatchesDetail.area_min||'',
                area_max: propertyMatchesDetail.area_max||'',
                outdoor_space: propertyMatchesDetail.outdoor_space === 1?1:0,
            }
        }
        return {
            bedrooms_min: '',
            bedrooms_max: '',
            rooms_min: '',
            rooms_max: '',
            bathrooms_min: '',
            bathrooms_max: '',
            separate_wc_min: '',
            separate_wc_max: '',
            living_space_min: '',
            living_space_max: '',
            floor_property_min: '',
            floor_property_max: '',
            area_min: '',
            area_max: '',
            // park_place_min: '',
            // park_place_max: '',
            outdoor_space: "1"
        }
    },
    enableReinitialize:true
})(DetailParams);


export default connect(mapStateToProp, mapDispatchToProps)(withRouter(FormikForm));

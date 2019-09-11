/**
 * App.js Layout Start Here
 */
import React, {Component} from 'react';
import {connect} from "react-redux";
import {withFormik} from "formik";

import DatePicker,{registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import AppConfig from "Constants/AppConfig";
import {setSalePlan, updateFieldsPropertyMainTab} from "Actions";
import {types_property} from "../../../constants/ComponentConfigs/PropertyConfig"
import IntlMessages from "../../../util/IntlMessages";
import {dateFormat} from "../../../helpers/date";
import {DAY_OF_WEEK} from "Constants/DateConfig";
import {listAlphabet, createListIndex} from "../../../helpers/helpers";
import FR from 'date-fns/locale/fr';
import SelectAutoComplete from "../../ComponentHelper/SelectAutoComplete";
import moment from "moment";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import * as Yup from "yup";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
registerLocale('fr', FR);


var select_key = 10;


class InforDetailsPropertyLayout extends Component {
    constructor(props) {
        super(props);
        let {propertyDetail} = props;   // Data edit
        var date = new Date();
        if ((propertyDetail && propertyDetail.property.id)) {
            this.state = {
                checkChange: false,
                date_avai: date,
                date_visit: JSON.parse(propertyDetail.property.date_visit) || null,
                certificate_date: new Date(propertyDetail.property.certificate_date),
                hour_visit_start: new Date(propertyDetail.property.hour_visit_start),
                hour_visit_end: new Date(propertyDetail.property.hour_visit_end),
                uploadDocument: "0",
                listOptionSubtype: [],
            }
        } else {
            this.state = {
                checkChange: false,
                date_avai: date,
                date_visit: null,
                certificate_date: date,
                hour_visit_start: new Date(moment(date.setHours(8,0,0))),
                hour_visit_end: new Date(moment(date.setHours(20,0,0))),
                uploadDocument: "0",
                listOptionSubtype: [],
            };
        }
    }
    componentWillReceiveProps = (nextProps) => {
        const {propertyDetail} = nextProps;
        if (propertyDetail && propertyDetail.property.type_property) {
            var subtype = types_property.filter((item) => item.value === propertyDetail.property.type_property)[0];
            this.setState({
                listOptionSubtype: subtype && subtype.child || []
            });
        }
        if (propertyDetail !== this.props.propertyDetail) {
            this.setState({
                hour_visit_start: new Date(propertyDetail.property.hour_visit_start),
                hour_visit_end: new Date(propertyDetail.property.hour_visit_end),
                date_visit: JSON.parse(propertyDetail.property.date_visit) || null,
            })
        }
    }
    handleChange = (event) => {
        this._isChanged(true);
        this.props.handleChange(event)
    };

    handleChangeStartDate = (date) => {
        this._isChanged(true);
        this.setState({
            date_avai: date
        })
    };

    handleChangeCertificateDate = (date) => {
        this._isChanged(true);
        this.setState({
            certificate_date: date,
        })
    };

    handleChangeHourVisitStart = (date) => {
        if (date !== null) {
            this._isChanged(true);
            if(date.getHours()<21){
                let endDate = moment(date).add(3, 'hours');
                this.setState({
                    hour_visit_start: date,
                    hour_visit_end: new Date(endDate),
                })
            }
            else {
                let endDate = new Date(moment(date)).setHours(23);
                endDate = new Date(moment(endDate)).setMinutes(45);
                this.setState({
                    hour_visit_start: date,
                    hour_visit_end: endDate,
                })
            }
        }
    };
    handleChangeHourVisitEnd = (date) => {
        this._isChanged(true);
        this.setState({
            hour_visit_end: date
        })
    };
    handleChangSalePlan = (e) => {
        this._isChanged(true);
        this.setState({
            uploadDocument: e.target.value
        });
        this.props.setSalePlan(e.target.value)
    };

    handleChangeSelectTypeProperty = (value) => {
        this._isChanged(true);
        if (value) {
            var subtype = types_property.filter((item) => item.value === value)[0];
            this.props.values.sub_type_property = "";
            this.setState({
                listOptionSubtype: subtype.child || []
            });
        }
        this.props.values.type_property = value;
    };
    handleChangeSelectSubTypeProperty = (value) => {
        this._isChanged(true);
        this.props.values.sub_type_property = value;
    };
    handleChangeSelectTypeConstruction = (value) => {
        this._isChanged(true);
        this.props.values.type_construction = value;
    };
    handleChangeSelectKeyProperty = (value) => {
        this._isChanged(true);
        this.props.values.key_property = value;
    };
    handleChangeSelectKeyAvai = (value) => {
        this._isChanged(true);
        this.props.values.key_avai = value;
    };
    handleChangeSelectNumFloor = (value) => {
        this._isChanged(true);
        this.props.values.number_floors = value;
    };
    handleChangeSelectEnergyEfficient = (event) => {
        this._isChanged(true);
        this.props.values.energy_efficiency = event.target.value;
    };
    handleChangeSelect = (event) => {
        this._isChanged(true);
        this.setState({
            date_visit: event.target.value
        });
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
        if (checkChange && (preTab === 2 || preTab === "2")) {
            var data = Object.assign(this.props.values, this.state);
            data.date_avai = dateFormat(data.date_avai);
            // data.date_visit = dateFormat(data.date_visit);
            data.certificate_date = dateFormat(data.certificate_date);
            data.hour_visit_start = dateFormat(data.hour_visit_start);
            data.hour_visit_end = dateFormat(data.hour_visit_end);
            delete data.checkChange;
            delete data.listOptionSubtype;
            this.props.updateFieldsPropertyMainTab(data);
            this._isChanged(false);
            this.props.handleSubmit();
        }

    };

    render() {
        this._saveToRedux();
        var {
            year_construction,
            month_construction,
            number_floors,
            living_space,
            number_floors_building,
            total_area_building,
            total_area,
            park_inside,
            park_outdoor,
            energy_efficiency,
            refreshments_topredict,
            key_property,
            outdoor_space,
            type_property,
            sub_type_property,
            type_construction,
            key_avai
        } = this.props.values;
        const {date_avai, date_visit, hour_visit_start, hour_visit_end, listOptionSubtype} = this.state;
        return (

            <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="form-group row">
                                <label htmlFor="staticEmail"
                                       className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                    <span className="obligate">*</span>
                                    <IntlMessages id="property.main.type_of_property"/>
                                </label>
                                <div className="col-sm-5 col-md-5 col-lg-5 ">
                                    <div>
                                        <SelectAutoComplete
                                            key={select_key}
                                            label_props='label'
                                            value_props='value'
                                            name='type_property'
                                            value={type_property}
                                            onChange={this.handleChangeSelectTypeProperty}
                                            listOption={types_property}
                                        />
                                    </div>
                                    {this.props.touched.type_property &&<FormHelperText error={true}>{this.props.errors.type_property}</FormHelperText>}
                                </div>
                                <div className="col-sm-4 col-md-4 col-lg-4">
                                    <div>
                                        <SelectAutoComplete
                                            key={select_key+1}
                                            name='sub_type_property'
                                            label_props='label'
                                            value_props='value'
                                            value={sub_type_property}
                                            onChange={this.handleChangeSelectSubTypeProperty}
                                            listOption={listOptionSubtype}
                                        />
                                    </div>
                                    {/*{this.props.touched.sub_type_property &&<FormHelperText error={true}>{this.props.errors.sub_type_property}</FormHelperText>}*/}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticEmail"
                                       className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                    <span className="obligate">*</span>
                                    <IntlMessages id="property.main.type_of_construction"/>
                                </label>
                                <div className="col-sm-9 col-md-9 col-lg-9 ">
                                    <div>
                                        <SelectAutoComplete
                                            key={select_key+2}
                                            name='type_construction'
                                            label_props='label'
                                            value_props='value'
                                            value={type_construction}
                                            onChange={this.handleChangeSelectTypeConstruction}
                                            listOption={
                                                [
                                                    {label: "neuf", value: "new"},
                                                    {label: "existant", value: "existing"},
                                                ]
                                            }
                                        />
                                        {this.props.touched.type_construction &&<FormHelperText error={true}>{this.props.errors.type_construction}</FormHelperText>}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                    <span className="obligate">*</span><IntlMessages
                                    id="property.main.availability_date"/>
                                </label>
                                <div className="col-sm-7 col-md-7">
                                    <div>
                                        <DatePicker
                                            selected={date_avai}
                                            className="form-control"
                                            name="date_avai"
                                            locale="fr"
                                            placeholderText="Click to select a date"
                                            dateFormat={AppConfig.date_format}
                                            onChange={this.handleChangeStartDate}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-2 col-md-2 ">
                                    {/* <i className="zmdi zmdi-calendar-note"> </i> */}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-md-3 col-lg-3 col-form-label">
                                    <IntlMessages id="property.main.possible_date_visit"/>
                                </label>
                                <div className="col-sm-7 col-md-7 ">
                                    <div>
                                        <SelectAutoComplete
                                            key={select_key+3}
                                            multiple={true}
                                            label_props='label'
                                            value_props='value'
                                            value={date_visit}
                                            name="date_visit"
                                            listOption={DAY_OF_WEEK}
                                            onChange={this.handleChangeSelect}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-2 col-md-2">
                                    {/* <i className="zmdi zmdi-calendar-note"> </i> */}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-md-3 col-lg-3 col-form-label">
                                    <IntlMessages id="property.main.possible_visit_time"/></label>
                                <div className="col-sm-4 col-md-4 col-lg-4 timeProperty">
                                    <div>
                                        <DatePicker
                                            selected={hour_visit_start}
                                            onChange={this.handleChangeHourVisitStart}
                                            name="hour_visit_start"
                                            locale="fr"
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            dateFormat="HH:mm"
                                            timeFormat="HH:mm"
                                            timeCaption="Time"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-1 col-md-1 col-lg-1">
                                    <IntlMessages id="to"/>
                                </div>
                                <div className="col-sm-4 col-md-4 col-lg-4 timeProperty">
                                    <div>
                                        <DatePicker
                                            selected={hour_visit_end}
                                            onChange={this.handleChangeHourVisitEnd}
                                            name="hour_visit_end"
                                            locale="fr"
                                            showTimeSelect
                                            className="form-control"
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            dateFormat="HH:mm"
                                            timeFormat="HH:mm"
                                            timeCaption="Time"
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                    <IntlMessages id="property.main.key_property"/>
                                </label>
                                <div className="col-sm-7 col-md-7 col-lg-7">
                                    <div>
                                        <SelectAutoComplete
                                            key={select_key+4}
                                            value={key_property}
                                            label_props='label'
                                            value_props='value'
                                            name="key_property"
                                            onChange={this.handleChangeSelectKeyProperty}
                                            listOption={
                                                [
                                                    {label: "oui", value: "1"},
                                                    {label: "non", value: "0"},
                                                ]
                                            }
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-md-3 col-lg-3 col-form-label">
                                    Etat du bien
                                </label>
                                <div className="col-sm-7 col-md-7">
                                    <div>
                                        <SelectAutoComplete
                                            key={select_key+5}
                                            value={key_avai}
                                            label_props='label'
                                            value_props='value'
                                            name="key_avai"
                                            onChange={this.handleChangeSelectKeyAvai}
                                            listOption={
                                                [
                                                    {label: "Occupé", value: "1"},
                                                    {label: "Libre", value: "0"},
                                                ]
                                            }
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="card">
                        <div className="card-header"></div>
                        <div className="card-body">
                            <div className="form-group row">
                                <label className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                    <span className="obligate">*</span> Année de construction
                                </label>
                                <div className="col-sm-3 col-md-3 height40px">
                                    <div>
                                        <input type="number"
                                               min={0}
                                               className="form-control"
                                               name="year_construction"
                                               value={year_construction}
                                               onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                    <span className="obligate">*</span>Etage du bien
                                </label>
                                <div className="col-sm-4 col-md-4 col-lg-4 ">
                                    <div>
                                        <SelectAutoComplete
                                            key={select_key + 6}
                                            value={number_floors}
                                            label_props='label'
                                            value_props='value'
                                            name="number_floors"
                                            onChange={this.handleChangeSelectNumFloor}
                                            listOption={createListIndex(0, 50)}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="row form-group">
                                <div className="col-sm-3 col-md-3 col-lg-3">
                                    <IntlMessages id="property.main.refreshments_topredict"/>
                                </div>
                                <div className="col-sm-9 col-md-9 col-lg-9">
                                <textarea name="refreshments_topredict" value={refreshments_topredict}
                                          onChange={this.handleChange}
                                          className="form-control"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                    <span className="obligate">*</span>Surface habitable
                                </label>
                                <div className="col-sm-3 col-md-3 height40px">
                                    <div>
                                        <input type="number"
                                               className="form-control"
                                               name="living_space"
                                               min={1}
                                               value={living_space}
                                               onChange={this.handleChange}
                                        />
                                        {this.props.touched.living_space &&<FormHelperText error={true}>{this.props.errors.living_space}</FormHelperText>}
                                    </div>
                                </div>

                                <label className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                    <span className="obligate">*</span><IntlMessages id="property.main.number_floors_building"/>
                                </label>
                                <div className="col-sm-3 col-md-3 height40px">
                                    <div>
                                        <input type="number"
                                               className="form-control"
                                               name="number_floors_building"
                                               min={1}
                                               value={number_floors_building}
                                               onChange={this.handleChange}
                                        />
                                    </div>
                                    {this.props.touched.number_floors_building &&<FormHelperText error={true}>{this.props.errors.number_floors_building}</FormHelperText>}
                                </div>
                                {/*)}*/}

                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                    <span className="obligate">*</span>Surface Totale (m²)
                                </label>
                                <div className="col-sm-3 col-md-3 height40px">
                                    <div>
                                        <input type="number"
                                               className="form-control"
                                               name="total_area_building"
                                               min={1}
                                               value={total_area_building}
                                               onChange={this.handleChange}
                                        />
                                    </div>
                                    {this.props.touched.total_area_building &&<FormHelperText error={true}>{this.props.errors.total_area_building}</FormHelperText>}

                                </div>
                                <label className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                    <span className="obligate">*</span>
                                    <IntlMessages id="property.location.park_inside"/>
                                </label>
                                <div className="col-sm-3 col-md-3 height40px">
                                    <div>
                                        <input type="number"
                                               className="form-control"
                                               name="park_inside"
                                               min={1}
                                               value={park_inside}
                                               onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                    <span className="obligate">*</span>
                                    <IntlMessages id="property.main.surface"/>
                                </label>
                                <div className="col-sm-3 col-md-3 height40px">
                                    <div>
                                        <input type="number"
                                               className="form-control"
                                               name="total_area"
                                               min={1}
                                               value={total_area}
                                               onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <label className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                    <span className="obligate">*</span>
                                    <IntlMessages id="property.location.park_outdoor"/>
                                </label>
                                <div className="col-sm-3 col-md-3 height40px">
                                    <div>
                                        <input type="number"
                                               className="form-control"
                                               name="park_outdoor"
                                               min={1}
                                               value={park_outdoor}
                                               onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="form-group row">
                                <label  className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField"><IntlMessages
                                    id="property.property_match.characteristic.params.outdoor"/></label>
                                <div className="col-sm-7 col-md-7">
                                    <FormGroup row>
                                        <FormControlLabel
                                            label={<IntlMessages id="choose.yes"/>}
                                            control={
                                                <Radio checked={outdoor_space == 1}
                                                       onChange={this.handleChange}
                                                       name="outdoor_space"
                                                       value={1}/>}
                                        />
                                        <FormControlLabel
                                            label={<IntlMessages id="choose.no"/>}
                                            control={
                                                <Radio checked={outdoor_space != 1}
                                                       onChange={this.handleChange}
                                                       name="outdoor_space"
                                                       value={0}/>}
                                        />
                                    </FormGroup>
                                </div>

                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                    <span className="obligate">*</span>
                                    <IntlMessages id="property.main.energy_efficiency"/>
                                </label>
                                <div className="col-sm-6 col-md-6 col-lg-6 ">
                                    <div>
                                        <SelectAutoComplete
                                            key={select_key+7}
                                            label_props='label'
                                            value_props='value'
                                            value={energy_efficiency}
                                            name="energy_efficiency"
                                            multiple={true}
                                            repeatOption = {true}
                                            maxOption = {2}
                                            value_only={{label:"En cours d’élaboration ",value:"in_develop"}}
                                            hideSelectedOptions={false}
                                            onChange={this.handleChangeSelectEnergyEfficient}
                                            listOption={[{label:"En cours d’élaboration ",value:"in_develop"}].concat(listAlphabet('A', 'I'))}
                                        />
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
        configdata: state.configdata,
        propertyFields: state.propertyFields
    })
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        setSalePlan: (uploadDocument) => {
            dispatch(setSalePlan(uploadDocument))
        },
        updateFieldsPropertyMainTab: (fields) => {
            dispatch(updateFieldsPropertyMainTab(fields))
        }

    }
};
const FormikForm = withFormik({
    mapPropsToValues(datas) {
        var {propertyDetail} = datas;
        if (propertyDetail && propertyDetail.property.id) {
            var {property} = propertyDetail;
            return {
                month_construction: property.month_construction || '',
                year_construction: property.year_construction || '',
                number_floors: property.number_floors ? JSON.parse(property.number_floors) : '',
                living_space: property.living_space || '',
                number_floors_building: property.number_floors_building || '',
                total_area_building: property.total_area_building || '',
                total_area: property.total_area || '',
                park_inside: property.park_inside || '',
                park_outdoor: property.park_outdoor || '',
                energy_efficiency: property.energy_efficiency ? JSON.parse(property.energy_efficiency) : '',
                refreshments_topredict: property.refreshments_topredict || '',
                key_property: property.key_property || {},
                keyword: property.keyword || '',
                type_property: property.type_property ? property.type_property : "",
                sub_type_property: property.sub_type_property ? property.sub_type_property: "",
                type_construction: property.type_construction ? property.type_construction: "",
                key_avai: property.key_avai ? property.key_avai : 0,
                outdoor_space: property.outdoor_space||false
            }
        }
        return {
            month_construction: '',
            year_construction: '',
            number_floors: 0,
            living_space: '',
            number_floors_building: '',
            total_area_building: '',
            total_area: '',
            park_inside: '',
            park_outdoor: '',
            energy_efficiency: '',
            refreshments_topredict: '',
            key_property: 0,
            keyword: '',
            type_property: "",
            sub_type_property: "",
            type_construction: "",
            key_avai: 0,
            outdoor_space: 1,
        }

    },
    validationSchema: Yup.object().shape({ // Validate form field
        type_property: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
        sub_type_property: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
        type_construction: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
        number_floors_building: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
        living_space: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
        total_area_building: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
    }),
    enableReinitialize: true,
    handleSubmit(values, { props, setSubmitting, resetForm }) {

    },
})(InforDetailsPropertyLayout);

export default connect(mapStateToProps, mapDispatchToProps)(FormikForm);

/**
 * Siderbar
 */

'use strict'
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {withFormik} from "formik";

import {getListParentFacility,getAllChildFacility} from  "Actions";
import SelectAutoComplete from "Components/ComponentHelper/SelectAutoComplete";
import {UPDATE_TYPE_PROPERTY_PARENT, UPDATE_CAT_PROPERTY, UPDATE_TYPE_PROPERTY_CHILD} from "Actions/types";
import {property_match_search_type} from "Constants/ComponentConfigs/PropertyConfig";

import IntlMessages from "Util/IntlMessages";
import  DetailParams from "./DetailParams";
import  FacilityLayout from "./FacilityLayout";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import * as Yup from "yup";

var key_select = 10;
class Characteristic extends Component {
    constructor(props) {
        super(props);
        this.state={
            loadpage:1,
        }
        
    }


    componentWillMount(){
        var {propertyDatas} = this.props;
        if(!propertyDatas.type_property_parent.length){
            this.props.getListParentFacility({type:"type_property",state:1,parent_id:0},UPDATE_TYPE_PROPERTY_PARENT);
            this.props.getListParentFacility({type:"cat_property",state:1},UPDATE_CAT_PROPERTY);
        }
    }
    componentWillReceiveProps(nextProps){
        const {propertyMatchesDetail} = nextProps;
        if(propertyMatchesDetail !== this.props.propertyMatchesDetail){
            if(propertyMatchesDetail.type_property && propertyMatchesDetail.type_property !== ""){
                // var buf = JSON.parse(propertyMatchesDetail.type_property);
                var buf = propertyMatchesDetail.type_property;
                this.props.getAllChildFacility([{id:buf}],UPDATE_TYPE_PROPERTY_CHILD);
            }
        }
    }
    
    _loadCom = () =>{
        this.setState({
            loadpage:1
        })
    };
    handleChangeSelectTypeProperty = (value) => {
        this.props.values.type_property = value;
        this.props.values.type_property_child = [];
        this.props.getAllChildFacility([{id:value}],UPDATE_TYPE_PROPERTY_CHILD);
    };
    handleChangeSelectTypePropertyChild = (event) => {
        this._loadCom();
        this.props.values.type_property_child = event.target.value;
    };

    handleChangeSelectTypeConstruction = (value) => {
        this._loadCom();
        this.props.values.type_construction = value;
    };


    get_child_data=(data)=>{
        this.props.parent_get_data(data);
    };
    render() {
        var {propertyDatas} = this.props;
        const {
            type_property,
            type_construction,
            type_property_child,
            search_type,
        }= this.props.values;
        // if(propertyDatas.type_property_parent.length && propertyDatas.type_property_child[0]){
        //     propertyDatas.type_property_child[0].child.push(type_property);
        // }

        console.log("=========>",propertyDatas.type_property_child.length?propertyDatas.type_property_child[0].child:[]);
        this.get_child_data(this.props.values);
        return (
            <div className="card">
                <div className="card-header">
                    <IntlMessages id="property.property_match.characteristic.title"/>
                </div>
                <div className="card-body">
                    <label><IntlMessages id="property.property_match.characteristic.des"/></label>
                    <div className=" card">
                        <div className="card-body row">
                            <div className="col-sm-6 col-md-6 col-lg-6">
                                <div className="form-group row">
                                    <label  className="col-sm-5 col-form-label obligateField">
                                    <span
                                    className="obligate">*</span>
                                        <IntlMessages id="property.property_match.characteristic.type_property"/>
                                    </label>
                                    <div className="col-sm-7">
                                        <div>

                                            <SelectAutoComplete name='type_property'
                                                                label_props='title'
                                                                value_props='id'
                                                                key={key_select}
                                                                value={type_property}
                                                                onChange={this.handleChangeSelectTypeProperty}
                                                                listOption={propertyDatas.type_property_parent}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="staticEmail"
                                           className="col-sm-5 col-form-label ">
                                        <IntlMessages id="property.main.type_of_construction"/>
                                    </label>
                                    <div className="col-sm-7 ">
                                        <div>
                                            <SelectAutoComplete name='type_construction'
                                                                key={key_select+1}
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-6">
                                <SelectAutoComplete name='type_property_child'
                                                    value={type_property_child}
                                                    key={key_select+2}
                                                    multiple={true}
                                                    label_props='title'
                                                    value_props='id'
                                                    onChange={this.handleChangeSelectTypePropertyChild}
                                                    listOption={propertyDatas.type_property_child.length?propertyDatas.type_property_child[0].child:[]}
                                />
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className=" card">
                        <div className="card-body">
                            <DetailParams parent_get_data={this.get_child_data} />
                        </div>
                    </div>
                    <br/>
                    <div className=" card">
                        <div className="card-body">
                            <FacilityLayout parent_get_data={this.get_child_data}/>
                        </div>
                    </div>
                    <br/>
                    <div className=" card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-4">
                                    <label><IntlMessages id="property.property_match.characteristic.search_type"/></label>
                                </div>
                                <div className="col-sm-4">
                                    <FormControlLabel
                                        value="female"
                                        control={
                                            <Radio
                                                color="primary"
                                                name="search_type"
                                                value={property_match_search_type.SEARCH_ALL_FIELD}
                                                onChange={this.props.handleChange}
                                                checked={search_type===property_match_search_type.SEARCH_ALL_FIELD}
                                            />
                                        }
                                        label={
                                            <IntlMessages id="property.property_match.characteristic.search_type.all_conditions"/>
                                        }
                                    />
                                </div>
                                <div className="col-sm-4">
                                    <FormControlLabel
                                        value="female"
                                        control={
                                            <Radio
                                                color="primary"
                                                name="search_type"
                                                value={property_match_search_type.LEAST_ONE_FIELD}
                                                onChange={this.props.handleChange}
                                                checked={search_type===property_match_search_type.LEAST_ONE_FIELD}
                                            />
                                        }
                                        label={
                                            <IntlMessages id="property.property_match.characteristic.search_type.least_one"/>
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )

    }
}

const mapStateToProp = (state) => {
    return ({
        propertyDatas:state.propertyDatas,
        propertyMatchesDetail: state.property_matches.property_matches_edit
    })
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        getListParentFacility:(conditions,type)=>{
            return dispatch(getListParentFacility(conditions,type))
        },
        getAllChildFacility:(data,type)=>{
            return dispatch(getAllChildFacility(data,type))
        }
    }
};


const FormikForm = withFormik({
    mapPropsToValues(datas) { // Init form field
        const {propertyMatchesDetail} = datas;
        if(propertyMatchesDetail && propertyMatchesDetail.id){
            return {
                search_type:propertyMatchesDetail.search_type,
                type_property:propertyMatchesDetail.type_property||{},
                type_construction:propertyMatchesDetail.type_construction||{},
                type_property_child:propertyMatchesDetail.type_property_child?JSON.parse(propertyMatchesDetail.type_property_child):{}
            }
        }
        return {
            type_property:[],
            cat_property:[],
            type_construction:{},
            type_property_child:[],
            search_type:property_match_search_type.LEAST_ONE_FIELD,
        }
    },
    enableReinitialize:true,
    validationSchema:Yup.object().shape({
        type_property:Yup.string()
            .required((<IntlMessages id='notification.required' />)),
    })
})(Characteristic);


export default connect(mapStateToProp, mapDispatchToProps)(withRouter(FormikForm));

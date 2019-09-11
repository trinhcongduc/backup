/**
 * App.js Layout Start Here
 */

'use strict'
import React, { Component } from 'react';
import {connect} from "react-redux";
import {withFormik} from "formik";
import SelectAutoComplete from "Components/ComponentHelper/SelectAutoComplete";
import IntlMessages from "Util/IntlMessages";
import {getListParentFacility, getListPropertyMatch} from "Actions";
import { UPDATE_TYPE_PROPERTY_PARENT} from "Actions/types";

var key_select = 10;
class SearchPropertyMatch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            check_mandate : true,
            thanMore : false
        }
    }
    componentWillMount(){
        var {propertyDatas} = this.props;
        if(!propertyDatas.type_property_parent.length){
            this.props.getListParentFacility({type:"type_property",state:1,parent_id:0},UPDATE_TYPE_PROPERTY_PARENT);
        }
    }
    // handleChangeCurrency = (value) => {
    //
    //     this.props.values.currency = value;
    //     if(value==null){
    //         this.setState({ check_mandate: true});
    //         this.props.values.max_currency = '';
    //         this.props.values.min_currency = '';
    //     }
    //     else {
    //         this.setState({ check_mandate: false});
    //     }
    //
    // };
    handleChangeSelectTypeProperty = (value) => {
        this.props.values.type_property = value;
    };
    handleChangeSelectTypeConstruction = (value) => {
        this.props.values.type_construction = value;
    };
    thanMore = () => {
        // this.props.values.town = "";
        // this.props.values.sector = "";
        this.props.values.surface_min = "";
        this.props.values.surface_max = "";
        this.props.values.number_bedroom_max="";
        this.props.values.number_bedroom_min ="";
        this.setState({ thanMore: !this.state.thanMore});
    };
    handleSubmit = () => {
        var {values} = this.props;
        this.props.getListPropertyMatch(values);


    }
    render(){
        const {currencies} =this.props.configdata;
        const {max_currency,min_currency,type_property,type_construction,town,sector,surface_min,surface_max,
            number_bedroom_max,number_bedroom_min} = this.props.values;
        var {propertyDatas} = this.props;
        return(
            <div className="bgWhite">
                <div className="titleSearch">
                    <strong>Recherche de biens</strong>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12">

                    <div className="row">
                        <div className="col-sm-2 col-12">
                            <label className=" col-form-label ">
                                <IntlMessages id="property.main.type_of_property"/>
                            </label>
                            <SelectAutoComplete name='type_property'
                                                key={key_select}
                                                value={type_property}
                                                onChange={this.handleChangeSelectTypeProperty}
                                                listOption={propertyDatas.type_property_parent}
                            />
                        </div>
                        <div className="col-sm-2 col-12">
                            <label className=" col-form-label ">
                                <IntlMessages id="property.main.type_of_construction"/>
                            </label>
                            <SelectAutoComplete name='type_construction'
                                                value={type_construction}
                                                onChange={this.handleChangeSelectTypeConstruction}
                                                listOption={
                                                    [
                                                        {label:"neuf",value:"new"},
                                                        {label:"existant",value:"existing"},
                                                    ]
                                                }
                            />
                        </div>
                        <div className="col-sm-4 col-12">
                            <div className="row">
                                <div className="col-sm-8 col-12">
                                    <div className="row">
                                        <div className="col-sm-6 col-12">
                                            <label className="col-form-label">
                                                Prix min
                                            </label>
                                            <div className="heightIP40">
                                                <input name="min_currency"
                                                       type="number"
                                                       className="form-control "
                                                       onChange={this.props.handleChange}
                                                       value={min_currency}
                                                />
                                            </div>

                                        </div>
                                        <div className="col-sm-6 col-12">
                                            <label className="col-form-label">
                                                Prix max
                                            </label>
                                            <div className="heightIP40">
                                                <input name="max_currency"
                                                       type="number"
                                                       className="form-control "
                                                       onChange={this.props.handleChange}
                                                       value={max_currency}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*<div className="col-4">*/}
                                {/*<label className="col-form-label">*/}
                                {/*Devise*/}
                                {/*</label>*/}
                                {/*<SelectAutoComplete name="currency"*/}
                                {/*onChange={this.handleChangeCurrency}*/}
                                {/*value={currency}*/}
                                {/*listOption={currencies}*/}
                                {/*/>*/}
                                {/*</div>*/}

                            </div>
                        </div>

                    </div>
                    {this.state.thanMore?
                        <div className="row">
                            {/*<div className="col-sm-2 col-12">*/}
                                {/*<label className="col-form-label">{<IntlMessages id="property.location.sector" />}</label>*/}
                                {/*<div className="heightIP40">*/}
                                    {/*<input name="sector"*/}
                                           {/*value={sector}*/}
                                           {/*className="form-control "*/}
                                           {/*onChange={this.props.handleChange}/>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<div className="col-2">*/}
                                {/*<label  className="col-form-label" >{<IntlMessages id= "property.location.town" />}</label>*/}
                                {/*<div className="heightIP40">*/}
                                    {/*<input  name="town"*/}
                                            {/*value={town}*/}
                                            {/*className="form-control "*/}
                                            {/*onChange={this.props.handleChange}*/}
                                    {/*/>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            <div className="col-2">
                                <label className="col-form-label">Surface habitable min</label>
                                <div className="heightIP40">
                                    <input name="surface_min"
                                           type="number"
                                           className="form-control "
                                           value={surface_min}
                                           onChange={this.props.handleChange}/>
                                </div>

                            </div>
                            <div className="col-2">
                                <label className="col-form-label">Surface habitable max</label>
                                <div className="heightIP40">
                                    <input name="surface_max"
                                           type="number"
                                           className="form-control "
                                           value={surface_max}
                                           onChange={this.props.handleChange}/>
                                </div>
                            </div>
                            <div className="col-sm-2 col-12">
                                <label className="col-form-label">Nombre de chambres min</label>
                                <div className="heightIP40">
                                    <input name="number_bedroom_min"
                                           type="number"
                                           className="form-control "
                                           value={number_bedroom_min}
                                           onChange={this.props.handleChange}/>
                                </div>
                            </div>
                            <div className="col-sm-2 col-12">
                                <label className="col-form-label">Nombre de chambres max</label>
                                <div className="heightIP40">
                                    <input name="number_bedroom_max"
                                           type="number"
                                           className="form-control "
                                           value={number_bedroom_max}
                                           onChange={this.props.handleChange}/>
                                </div>

                            </div>
                        </div>:""}
                    <div className="row">
                        <div className="col-sm-2 col-12 mt-2">
                            <button className="btn btn-large" onClick={this.thanMore}>Plus d’options</button>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-2 col-12 offset-md-10">
                            <button  className="btn btn-primary" onClick={this.handleSubmit}> Lancer la recherche</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state)=>{
    return ({
        propertyDatas:state.propertyDatas,
        configdata: state.configdata,
    });
};

const mapDispatchToProps = (dispatch,props)=>{
    return {
        getListPropertyMatch: (filter) => dispatch(getListPropertyMatch(filter)),
        getListParentFacility:(conditions,type)=>{
            return dispatch(getListParentFacility(conditions,type))
        },
    }
};


const FormikForm = withFormik({
    mapPropsToValues() { // Init form field
        return {
            // currency: null,
            max_currency : "",
            min_currency : "",
            type_property: "",
            type_construction: "",
            // town : "",
            // sector : "",
            surface_min: "",
            surface_max:"",
            number_bedroom_max:"",
            number_bedroom_min :"",
        }
    },
    enableReinitialize: true,

})(SearchPropertyMatch);


export default connect(mapStateToProps,mapDispatchToProps)(FormikForm);

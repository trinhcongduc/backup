/**
 * App.js Layout Start Here
 */

'use strict'
import React, { Component } from 'react';
import {connect} from "react-redux";
import {withFormik} from "formik";
import SelectAutoComplete from "Components/ComponentHelper/SelectAutoComplete";
import IntlMessages from "Util/IntlMessages";
import {types_property} from "Constants/ComponentConfigs/PropertyConfig";
import {getListProperty} from "Actions";
import {withStyles} from "@material-ui/core";
const loading_icon = require('Assets/img/gif/loading-2.gif');


const styles = theme =>({
    loading:{
        maxHeight:'40px'
    }
});

class SearchProperty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            check_mandate : true,
            thanMore : false,
            loading:false
        }
    }
    handleChangeSelectTypeProperty = (value) => {
        this.props.values.type_property = value;
    };
    handleChangeSelectTypeConstruction = (value) => {
        this.props.values.type_construction = value;
    };
    thanMore = () => {
        this.props.values.town = "";
        this.props.values.sector = "";
        this.props.values.surface_min = "";
        this.props.values.surface_max = "";
        this.props.values.number_bedroom_max="";
        this.props.values.number_bedroom_min ="";
        this.setState({ thanMore: !this.state.thanMore});
    };
    handleSubmit = () => {
        let {values} = this.props;
        this.setState({loading:true},()=>{
            this.props.getListProperty(values).then(res=>{
                this.setState({loading:false})
            });
        })


    }
    render(){
        const {currencies} =this.props.configdata;
        const {classes} =this.props;
        const {loading} = this.state;
        const {max_currency,min_currency,type_property,type_construction,town,sector,surface_min,surface_max,
            number_bedroom_max,number_bedroom_min} = this.props.values;
        return(
            <div className="bgWhite">
            <div className="titleSearch d-flex">
                <strong>Recherche de biens</strong>
                {   loading &&
                (<div className="bd-highlight">
                    <img src={loading_icon}
                         className={classes.loading}
                         alt="Loading..."/>
                </div>)
                }
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12">
                
                <div className="row">
                    <div className="col-sm-2 col-12">
                        <label className=" col-form-label ">
                            <IntlMessages id="property.main.type_of_property"/>
                        </label>
                        <SelectAutoComplete name='type_property'
                                            value={type_property}
                                            isClearable={true}
                                            value_props="value"
                                            label_props="label"
                                            onChange={this.handleChangeSelectTypeProperty}
                                            listOption={types_property}
                        />
                    </div>
                    <div className="col-sm-2 col-12">
                        <label className=" col-form-label ">
                            <IntlMessages id="property.main.type_of_construction"/>
                        </label>
                        <SelectAutoComplete name='type_construction'
                                            value={type_construction}
                                            isClearable={true}
                                            value_props="value"
                                            label_props="label"
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
                        </div>
                    </div>

                </div>
                {this.state.thanMore?
                <div className="row">
                    <div className="col-sm-2 col-12">
                        <label className="col-form-label">{<IntlMessages id="property.location.sector" />}</label>
                        <div className="heightIP40">
                            <input name="sector"
                                   value={sector}
                                   className="form-control "
                                   onChange={this.props.handleChange}/>
                        </div>
                    </div>
                    <div className="col-2">
                        <label  className="col-form-label" >{<IntlMessages id= "property.location.town" />}</label>
                        <div className="heightIP40">
                            <input  name="town"
                                    value={town}
                                    className="form-control "
                                    onChange={this.props.handleChange}
                            />
                        </div>
                    </div>
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
        configdata: state.configdata,
    });
};

const mapDispatchToProps = (dispatch,props)=>{
    return {
        getListProperty: (filter) => dispatch(getListProperty(filter))
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
            town : "",
            sector : "",
            surface_min: "",
            surface_max:"",
            number_bedroom_max:"",
            number_bedroom_min :"",
        }
    },
    enableReinitialize: true,

})(SearchProperty);


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(FormikForm));

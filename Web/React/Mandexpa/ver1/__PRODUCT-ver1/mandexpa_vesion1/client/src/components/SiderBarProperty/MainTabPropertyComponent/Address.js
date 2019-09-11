import React, { Component } from 'react';
import FormControl from "@material-ui/core/FormControl/FormControl";
import IntlMessages from "Util/IntlMessages";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import {withFormik} from "formik";
import * as Yup from "yup";
import Select from "@material-ui/core/Select/Select";
import {updateFieldsPropertyLocationTab,getCity,getRegions} from "Actions";
import connect from "react-redux/es/connect/connect";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import SelectAutoComplete from '../../ComponentHelper/SelectAutoComplete'

class Address extends Component{
    constructor(props) {
        super(props);
        this.state = {
            checkChange:false,
            listCity : [],
            listRegions : [],
        };
    }
    componentWillMount() {
        const {propertyDetail} = this.props;
        if(propertyDetail){
            // console.log("DETAIL++++>",propertyDetail);
            if(propertyDetail.location[0].sector !== "" && propertyDetail.location[0].sector !==null){
                this.getCity(propertyDetail.location[0].sector)
            }
            if(propertyDetail.location[0].town !== "" && propertyDetail.location[0].town !== null && propertyDetail.location[0].town !=="null" ){
                this.getRegions(propertyDetail.location[0].town);
            }
        }
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.propertyDetail !== this.props.propertyDetail) {
            const {propertyDetail} = nextProps;
            if(propertyDetail){
                if(propertyDetail.location[0].sector !== "" && propertyDetail.location[0].sector !==null && propertyDetail.location[0].sector !=="null"){
                    this.getCity(propertyDetail.location[0].sector)
                }
                if(propertyDetail.location[0].town !== "" && propertyDetail.location[0].town !== null && propertyDetail.location[0].town !=="null" ){
                    this.getRegions(propertyDetail.location[0].town);
                }
            }
        }
    }
    onChange = (e) =>{
        this.setState({
            checkChange : true
        });
        this.props.handleChange(e);
    };
    getCity = (value) =>{
        this.props.getCity(value).then(res => {
            var listCity = []
            res.map((item,index)=>{
                listCity.push({value:item.id,label:item.title})
            })
            this.setState({
                listCity : listCity
            });
        });
    };
    getRegions = (value) => {
        this.props.getRegions(value).then(res => {

            var listRegions = []
            res.map((item,index)=>{
                // console.log('item',item)
                listRegions.push({value:item.id,label:item.title})
            })
            this.setState({
                listRegions : listRegions
            });
        });
    }
    onChangeSector = (e) =>{
        this.setState({
            checkChange : true
        });
        this.getCity(e.target.value);
        this.props.values.town = "";
        this.props.handleChange(e);
    };
    onChangeTown = (value) =>{

        this.setState({
            checkChange : true
        });
        if(value !== null){
            this.getRegions(value);
            this.props.values.town = value;
        }
        else {
            this.setState({
                listRegions : []
            });
            this.props.values.town = {};
        }
        this.props.values.area = {};
    };
    onChangeRegions = (e) =>{
        this.setState({
            checkChange : true
        });
        if(e !== null){
            this.props.values.area = e;
        }
        else {
            this.props.values.area = {};
        }
    };
    _saveToRedux=()=>{
        var {checkChange} =  this.state;
        var {propertyFields} =  this.props;
        var {preTab} =  propertyFields;
        if(checkChange &&( preTab ===1|| preTab ==="1")){
            this.props.updateFieldsPropertyLocationTab(this.props.values);
            this.setState({
                checkChange : false
            });
            this.props.handleSubmit();
        };

    };
    render(){
        this._saveToRedux();
        return(
            <div className="card">
                <div className="card-header">
                    <IntlMessages id="property.tab.principal.location"/>
                </div>
                <div className="card-body">
                <div className="row">
                    <div className="width100">
                        <FormControl className="form-group flexNone" error={!!this.props.errors.street_name}>
                            <label  className="col-form-label obligateField col-4"><span className="obligate">*</span>{<IntlMessages id= "property.location.streetname" />}</label>
                            <div className="col-6">
                                <div className="heightIP40">
                                    <input type="text"
                                           className="form-control"
                                           name="street_name"
                                           value={this.props.values.street_name}
                                           onChange={this.onChange}
                                           onBlur={this.props.handleBlur}
                                           />
                                    {this.props.touched.street_name &&<FormHelperText>{this.props.errors.street_name}</FormHelperText>}
                                </div>
                            </div>
                        </FormControl>
                    </div>
                </div>
                
                    <div className="row">
                        <div className="width100"> 
                        <FormControl className="form-group  flexNone" error={!!this.props.errors.temperature}>
                            <label  className="col-form-label obligateField col-4"><span className="obligate">*</span>{<IntlMessages id= "property.location.temperature" />}</label>
                            <div className="col-6">
                                <div className="heightIP40">
                                    <input type="text"
                                           className="form-control"
                                           name="temperature"
                                           value={this.props.values.temperature}
                                           onChange={this.onChange}
                                           onBlur={this.props.handleBlur}
                                    />
                                    {this.props.touched.temperature&&<FormHelperText>{this.props.errors.temperature}</FormHelperText>}
                                </div>
                            </div>
                        </FormControl>
                        </div>
                    </div>
                    <div className="row">
                    <div className="width100">
                        <FormControl className="form-group  flexNone" error={!!this.props.errors.app} >
                            <label  className="col-form-label obligateField col-4">{<IntlMessages id= "property.location.app" />}</label>
                            <div className="col-6">
                                <div className="heightIP40">
                                    <input type="text"
                                           className="form-control"
                                           name="app"
                                           value={this.props.values.app}
                                           onChange={this.onChange}
                                           onBlur={this.props.handleBlur}
                                    />
                                    {this.props.touched.app&&<FormHelperText>{this.props.errors.app}</FormHelperText>}
                                </div>
                            </div>
                        </FormControl>
                        </div>
                    </div>

                <div className="row">
                    <div className="width100">
                        <FormControl className="form-group flexNone" error={!!this.props.errors.sector}>
                            <label className="col-form-label obligateField col-4"><span className="obligate">*</span>{<IntlMessages id="property.location.sector" />}</label>
                            <div className="col-6">
                                <div className="heightIP40">
                                    <Select
                                        className="form-control"
                                        name="sector"
                                        value={this.props.values.sector}
                                        onChange={this.onChangeSector}
                                        onBlur={this.props.handleBlur}
                                        displayEmpty
                                    >
                                        <MenuItem value="" disabled>
                                            {<IntlMessages id="property.location.type.select" />}
                                        </MenuItem>
                                        <MenuItem value={"center"}>{<IntlMessages id="property.location.type.center" />}</MenuItem>
                                        <MenuItem value={"east"}>{<IntlMessages id="property.location.type.east" />}</MenuItem>
                                        <MenuItem value={"north"}>{<IntlMessages id="property.location.type.north" />}</MenuItem>
                                        <MenuItem value={"south"}>{<IntlMessages id="property.location.type.south" />}</MenuItem>
                                        <MenuItem value={"west"}>{<IntlMessages id="property.location.type.west" />}</MenuItem>
                                    </Select>
                                    {this.props.touched.sector &&<FormHelperText>{this.props.errors.sector}</FormHelperText>}
                                </div>
                            </div>
                        </FormControl>
                    </div>
                    </div>
                    <div className="row">
                    <div className="width100">
                        <FormControl className="form-group flexNone" error={!!this.props.errors.town}>
                            <label  className="col-form-label col-4 obligateField"><span className="obligate">*</span>{<IntlMessages id= "property.location.town" />}</label>
                            <div className="col-6">
                                <div className="">
                                    <SelectAutoComplete name='town'
                                                        label_props='label'
                                                        value_props='value'
                                                        value={this.props.values.town}
                                                        onChange={this.onChangeTown}
                                                        listOption={this.state.listCity}
                                    />
                                    {this.props.touched.town &&<FormHelperText>{this.props.errors.town}</FormHelperText>}
                                </div>
                            </div>
                        </FormControl>
                    </div>
                    </div>
               
                    <div className="row">
                    <div className="width100">
                        <FormControl className="form-group flexNone" error={!!this.props.errors.area}>
                            <label  className="col-form-label col-4">{<IntlMessages id= "property.location.area" />}</label>
                            <div className="col-6">
                                <div className="">
                                    <SelectAutoComplete name='area'
                                                        label_props='label'
                                                        value_props='value'
                                                        value={this.props.values.area}
                                                        onChange={this.onChangeRegions}
                                                        listOption={this.state.listRegions}
                                    />
                                    {this.props.touched.area &&<FormHelperText>{this.props.errors.area}</FormHelperText>}
                                </div>
                            </div>
                        </FormControl>
                    </div>
                    </div>
                    <div className="row">
                    <div className="width100">
                        <FormControl className="form-group flexNone" error={!!this.props.errors.postal_code} >
                            <label  className="col-form-label obligateField col-4"><span className="obligate">*</span>{<IntlMessages id= "property.location.postal_code" />}</label>
                            <div className="col-6">
                                <div className="heightIP40">
                                    <input type="text"
                                           className="form-control"
                                           name="postal_code"
                                           value={this.props.values.postal_code}
                                           onChange={this.onChange}
                                           onBlur={this.props.handleBlur}
                                    />
                                    {this.props.touched.postal_code &&<FormHelperText>{this.props.errors.postal_code}</FormHelperText>}
                                </div>
                            </div>
                        </FormControl>
                    </div>
                    </div>
                
             </div>
            </div>
        )
    }
}
const FormikForm = withFormik({

    mapPropsToValues(datas) { // Init form field
        if(typeof datas.propertyDetail != "undefined" ){
            var {propertyDetail} = datas;
            return {
                street_name: propertyDetail.location[0].street_name||"",
                temperature: propertyDetail.location[0].temperature||"",
                app:propertyDetail.location[0].app||"",
                floor:propertyDetail.location[0].floor||"",
                sector: propertyDetail.location[0].sector||"",
                town: propertyDetail.location[0].town?JSON.parse(propertyDetail.location[0].town): "",
                area:propertyDetail.location[0].area?JSON.parse(propertyDetail.location[0].area): "",
                postal_code:propertyDetail.location[0].postal_code||"",
            }
        }
        return {
            street_name: "",
            temperature: "",
            app:"",
            floor:0,
            sector: "",
            town: '',
            area:"",
            postal_code:"",

        }
    },
    validationSchema: Yup.object().shape({ // Validate form field

        street_name: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
        temperature: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
        // app: Yup.string()
        //     .required((<IntlMessages id='notification.required' />)),
        // floor: Yup.string()
        //     .required((<IntlMessages id='notification.required' />)),
        town: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
        postal_code: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
        sector: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
    }),
    enableReinitialize: true,

})(Address);
const mapStateToProps = (state) => {
    return ({
        propertyFields: state.propertyFields
    })
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        updateFieldsPropertyLocationTab:(fields)=>{
            return dispatch(updateFieldsPropertyLocationTab(fields))
        },
        getCity:(type)=>{
            return dispatch(getCity(type))
        },
        getRegions:(id)=>{
            return dispatch(getRegions(id))
        }

    }
};
export default connect(mapStateToProps,mapDispatchToProps)(FormikForm);
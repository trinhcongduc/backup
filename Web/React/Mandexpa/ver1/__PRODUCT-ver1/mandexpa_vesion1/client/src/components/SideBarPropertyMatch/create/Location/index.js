import React, {Component} from "react";
import {withFormik} from "formik";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getAllCountry, getCity, getRegions} from "Actions";
import * as Yup from "yup";

import IntlMessages from "Util/IntlMessages";
import CriteraItem from "./CriteraItem";
import SelectAutoComplete from "Components/ComponentHelper/SelectAutoComplete";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import FormControl from "@material-ui/core/FormControl/FormControl";

var position = 0;
const pre_text={
    TOWN: "La ville est ",
    AREA: "Le quartier est ",
    PERUMETER: "Le périmètre est ",
    POSTAL_CODE: "Le code postal est ",
};
var buf

class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            criterias: [],
            listCity: [],
            listRegions: [],
        }

    }

    componentWillMount() {
        var {countries} = this.props;
        if (!countries.length) {
            this.props.getAllCountry();
        }
    }
    componentWillReceiveProps(nextProps){
        const {propertyMatchesDetail} = nextProps;
        if(propertyMatchesDetail && propertyMatchesDetail.id && propertyMatchesDetail !== this.props.propertyMatchesDetail  ){
            const {propertyMatchesDetail} = nextProps;
            const {criterias} = propertyMatchesDetail;
            if(criterias){
                var data =  JSON.parse(criterias);
                var list_criterias = [];
                Object.keys(data).map(item =>{
                    data[item].map(criteria =>{
                        var pre_txt="";
                        switch (item) {
                            case "town":{
                                pre_txt = pre_text.TOWN;
                                break;
                            }
                            case "area":{
                                pre_txt = pre_text.AREA;
                                break;
                            }
                            case "perimeter":{
                                pre_txt = pre_text.PERUMETER;
                                break;
                            }
                            default:{
                                pre_txt = pre_text.POSTAL_CODE;
                                break;
                            }
                        }
                        var buf = {
                            position: position++,
                            type: item,
                            pre_text: pre_txt,
                            value: criteria.value || criteria,
                            label:criteria.label !== ""?criteria.label : ""
                        };
                        list_criterias.push(buf);
                    })
                });
                this.setState({
                    criterias:list_criterias,
                },async ()=>{
                    if(propertyMatchesDetail.sector){
                        this.getCity(propertyMatchesDetail.sector);
                    }
                    this.getRegions();
                });
            }
        }

    }

    _updateData = () => {
        var {criterias} = this.state;
        var criterias_list = {};
        if (criterias.length) {
            for (var i = 0; i < criterias.length; i++) {
                let item = criterias[i];
                if (typeof criterias_list[item.type] === "undefined") {
                    criterias_list[item.type] = [];
                }
                criterias_list[item.type].push(item.value);
            }
        }

        // var data = Object.assign({country:this.props.values.country},{});
        this.props.parent_get_data({criterias: criterias_list});
    };

    // Check Does the value exist in the list value?
    isExistValueCriteria(data) {
        var {criterias} = this.state;
        if (criterias.length) {
            var value_byType = criterias.filter(item => {
                return item.type === data.type;
            });
            if (value_byType.length) {
                var values = value_byType.filter(item => {
                    return item.value === data.value;
                });
                return values.length>0;
            }
            return false;
        }
        return false;

    }

    onChangeTown = (e) => {
        this.getRegions(e.value);
        this.props.values.town = e;
        this.props.values.area = "";
    };


    onChangeRegions = (e) => {
        this.props.values.area = e;
    };

    onChangeSector = (e) => {
        this.getCity(e.target.value);
        this.props.values.town = "";
        this.props.handleChange(e);
    };

    getCity = (value) => {
        this.props.getCity(value).then(res => {
            var listCity = [];
            res.map((item, index) => {
                listCity.push({value: item.id, label: item.title})
            });
            this.setState({
                listCity: listCity
            },()=>{
                if(this.state.listCity.length ){
                    var cris =  this.state.criterias.map((item,index)=>{
                        if(item.type === "town"){
                            item.label =  this.state.listCity.filter(it=>it.value===item.value)[0].label;
                        }
                        return item
                    });
                    this.setState({
                        criterias : cris
                    })
                }
            });
        });
    };
    getRegions = (value) => {
        this.props.getRegions(value).then(res => {
            var listRegions = [];
            res.map((item, index) => {
                listRegions.push({value: item.id, label: item.title})
            });
            this.setState({
                listRegions: listRegions
            },()=>{
                if(this.state.listRegions.length ){
                    var cris =  this.state.criterias.map((item,index)=>{
                        if(item.type === "area"){
                            let obj =  this.state.listRegions.filter(it=>it.value===item.value)[0];
                            item.label =  typeof obj !== "undefined" ? obj.label:null;
                        }
                        return item
                    });
                    this.setState({
                        criterias : cris
                    })

                }
            });
        });
    };

    addTownParam = () => {
        var {town} = this.props.values;
        if (town && !this.isExistValueCriteria({type: "town", value: town.value})) {
            this.add_criteria({
                type: "town",
                pre_text: pre_text.TOWN,
                value: town.value,
                label:town.label
            })
        }
    };
    addAreaParam = () => {
        var {area} = this.props.values;
        if (area && !this.isExistValueCriteria({type: "area", value: area.value})) {
            this.add_criteria({
                type: "area",
                pre_text: pre_text.AREA,
                value: area.value,
                label:area.label
            })
        }
    };


    addPerimeterParam = () => {
        var {perimeter} = this.props.values;
        if (perimeter && !this.isExistValueCriteria({type: "perimeter", value: perimeter})) {
            this.add_criteria({
                type: "perimeter",
                pre_text: pre_text.PERUMETER,
                value: perimeter
            })
        }
    };
    addPostalCodeParam = () => {
        var {postal_code} = this.props.values;
        if (postal_code && !this.isExistValueCriteria({type: "postal_code", value: postal_code})) {
            this.add_criteria({
                type: "postal_code",
                pre_text: pre_text.POSTAL_CODE,
                value: postal_code
            });
        }
    };

    add_criteria = (data) => {
        var item = {
            position: position,
            type: data.type,
            pre_text: data.pre_text,
            value: data.value,
            label:data.label !== ""?data.label : ""
        };
        position++;
        this.setState({
            criterias: [...this.state.criterias, item]
        }, () => {
            this._updateData();
        })
    };

    render_criterias = () => {
        var res = null;
        var {criterias} = this.state;
        if (criterias.length) {
            res = criterias.map((item, index) => {
                var value  = item.label !== ""&&item.label !==undefined?item.label:item.value;
                return (
                    <CriteraItem id={item.position} type={item.type} value={item.pre_text + value} key={index}
                                 remove={this.removeItemCriteria}/>
                )
            })
        }
        return res;
    };

    removeItemCriteria = (id) => {
        var {criterias} = this.state;
        var res = criterias.filter(item => {
            return item.position !== id;
        });
        this.setState({
            criterias: res
        }, () => {
            this._updateData();
        })

    };

    render() {
        this.props.parent_get_data({sector: this.props.values.sector});
        const {
            perimeter,
            postal_code,
            sector,
        } = this.props.values;
        return (
            <div className="card">
                <div className="card-header"><IntlMessages id="property.property_match.location.title"/></div>
                <div className="card-body">
                    <label> <IntlMessages id="property.property_match.location.description"/></label><br/>
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <FormControl className="form-group flexNone" error={!!this.props.errors.sector}>
                                <label className="col-form-label obligateField col-3"><span
                                    className="obligate">*</span>{<IntlMessages id="property.location.sector"/>}</label>
                                <div className="col-7">
                                    <div className="heightIP40">
                                        <Select
                                            className="form-control"
                                            name="sector"
                                            value={sector}
                                            onChange={this.onChangeSector}
                                            onBlur={this.props.handleBlur}
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled>
                                                {<IntlMessages id="property.location.type.select"/>}
                                            </MenuItem>
                                            <MenuItem value={"center"}>{<IntlMessages
                                                id="property.location.type.center"/>}</MenuItem>
                                            <MenuItem value={"east"}>{<IntlMessages
                                                id="property.location.type.east"/>}</MenuItem>
                                            <MenuItem value={"north"}>{<IntlMessages
                                                id="property.location.type.north"/>}</MenuItem>
                                            <MenuItem value={"south"}>{<IntlMessages
                                                id="property.location.type.south"/>}</MenuItem>
                                            <MenuItem value={"west"}>{<IntlMessages
                                                id="property.location.type.west"/>}</MenuItem>
                                        </Select>
                                        {this.props.touched.sector &&
                                        <FormHelperText>{this.props.errors.sector}</FormHelperText>}
                                    </div>
                                </div>
                            </FormControl>
                            <div className="form-group row">
                                <label className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                <span
                                    className="obligate">*</span>
                                    <IntlMessages id="property.property_match.location.town"/>
                                </label>
                                <div className="col-sm-7 col-md-7 col-lg-7">
                                    <div>
                                        <SelectAutoComplete name='town'
                                                            getlabel={true}
                                                            value={this.props.values.town}
                                                            onChange={this.onChangeTown}
                                                            listOption={this.state.listCity}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-2 col-md-2 col-lg-2">
                                    <i className="zmdi zmdi-forward zmdi-hc-2x" onClick={this.addTownParam}> </i>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-md-3 col-lg-3 col-form-label ">
                                    <IntlMessages id="property.property_match.location.area"/>
                                </label>
                                <div className="col-sm-7 col-md-7 col-lg-7">
                                    <div>
                                        <SelectAutoComplete name='area'
                                                            getlabel={true}
                                                            value={this.props.values.area}
                                                            onChange={this.onChangeRegions}
                                                            listOption={this.state.listRegions}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-2 col-md-2 col-lg-2">
                                    <i className="zmdi zmdi-forward zmdi-hc-2x" onClick={this.addAreaParam}> </i>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-md-3 col-lg-3 col-form-label ">
                                    <IntlMessages id="property.property_match.location.perimeter"/>
                                </label>
                                <div className="col-sm-5 col-md-5 col-lg-5">
                                    <div>
                                        <input type="text"
                                               className="form-control"
                                               name="perimeter"
                                               value={perimeter}
                                               onChange={this.props.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-2 col-md-2 col-lg-2">
                                    <IntlMessages id="dimension.km"/>
                                </div>
                                <div className="col-sm-2 col-md-2 col-lg-2">
                                    <i className="zmdi zmdi-forward zmdi-hc-2x" onClick={this.addPerimeterParam}> </i>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-md-3 col-lg-3 col-form-label ">
                                    <IntlMessages id="property.property_match.location.postal_code"/>
                                </label>
                                <div className="col-sm-7 col-md-7 col-lg-7">
                                    <div>
                                        <input type="text"
                                               className="form-control"
                                               name="postal_code"
                                               value={postal_code}
                                               onChange={this.props.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-2 col-md-2 col-lg-2">
                                    <i className="zmdi zmdi-forward zmdi-hc-2x" onClick={this.addPostalCodeParam}> </i>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <div className="card Scroll">
                                <div className="card-header">
                                    <IntlMessages id="property.property_match.location.criteria"/>
                                </div>
                                <div className="card-body" style={{overflow: "scroll"}}>
                                    {this.render_criterias()}

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
        countries: state.country,
        propertyMatchesDetail: state.property_matches.property_matches_edit
    })
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        getAllCountry: () => {
            dispatch(getAllCountry())
        },
        getCity: (type) => {
            return dispatch(getCity(type))
        },
        getRegions:(id)=>{
            return dispatch(getRegions(id))
        }
    }
};

const FormikForm = withFormik({
    mapPropsToValues(datas) { // Init form field
        const {propertyMatchesDetail} = datas;
        if(propertyMatchesDetail && propertyMatchesDetail.id){
            return {
                sector: propertyMatchesDetail.sector||"",
                town: '',
                area: '',
                perimeter: '',
                postal_code: '',
            }
        }
        return {
            sector: "",
            town: '',
            area: '',
            perimeter: '',
            postal_code: '',
        }
    },
    enableReinitialize:true,
    validationSchema:Yup.object().shape({
        sector:Yup.string()
            .required((<IntlMessages id='notification.required' />)),
        town:Yup.string()
            .required((<IntlMessages id='notification.required' />)),
    })
})(Location);
export default connect(mapStateToProp, mapDispatchToProps)(withRouter(FormikForm))
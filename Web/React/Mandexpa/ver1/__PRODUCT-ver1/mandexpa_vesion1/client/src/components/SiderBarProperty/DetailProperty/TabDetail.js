import React, { Component } from 'react';
import IntlMessages from "Util/IntlMessages";
import {types_property} from "Constants/ComponentConfigs/PropertyConfig";
import AppConfig from "Constants/AppConfig";
import {DAY_OF_WEEK} from "Constants/DateConfig";
import {createListIndex, listAlphabet} from "Helpers";
import moment from "moment";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import {UPDATE_FAC_CHILD} from "Actions/types";
import {getAllChildFacility, getListParentFacility, getListRoomTypes} from "Actions";
import {connect} from "react-redux";
import {findDataLabel,findDataLabelFacility} from "Helpers/helpers";
class Localistation extends Component{
    constructor(props) {
        super(props);
        const {propertyDetail} =  props;
        this.state = {
            listOptionSubtype: {},
            facility_parent: [],
            facilityChild: [],
            facilityDetails:{},
            facilityValue:propertyDetail && propertyDetail.property.id && propertyDetail.character[0].facilityDetails?propertyDetail.character[0].facilityDetails.split(','):[],
        }
    }
    componentWillMount = () => {
        let {propertyDatas} = this.props;
        let {facility_parent} = propertyDatas;
        if (facility_parent && facility_parent.length <= 0) {
            this.props.getListParentFacility({type:"facility",state:1,parent_id:0},"UPDATE_FAC_PARENT").then(datas => {
                this.props.getAllChildFacility(datas.data,UPDATE_FAC_CHILD)
            });
        }
        var {room_type} = propertyDatas;
        if (room_type && room_type.length <= 0) {
            // console.log("getListRoomType");
            this.props.getListRoomTypes();
        }
    };
    componentWillReceiveProps  = (nextProps) => {
        if(nextProps.propertyDetail!== this.props.propertyDetail){
            const {propertyDetail} =  nextProps;
            this.setState({
                facilityValue:propertyDetail && propertyDetail.property.id && propertyDetail.character[0].facilityDetails ? propertyDetail.character[0].facilityDetails.split(','):[],
            })
        }
    };
    renderFacilityParent = (propertyDatas, eee) => {
        var result = null;
        var {facilityDetails, facilityValue} = this.state;
        var {facility_parent, facility_child} = propertyDatas;
        if (facility_parent !== null && facility_parent !== undefined && facility_parent.length) {
            result = facility_parent.map((item, index) => {
                var findChild = [];
                var data_child = null;
                if (facility_child && facility_child.length) {
                    findChild = facility_child.filter(child => {
                        return child.parent_id === item.id
                    });
                    data_child = findChild[0];
                }
                var value = facilityDetails && facilityDetails["fac-" + item.id] ? facilityDetails["fac-" + item.id] : facilityValue;
                var options = data_child ? data_child.child : []
                return (
                    <div className="col-sm-4 col-md-4 col-lg-4" key={index}>
                        <div className="card">
                            <h5 className="card-header">{item.title}</h5>
                            <div className="card-body">
                                {value!==null?value.map((item,index) =>{
                                     return(<div key={index} >{findDataLabelFacility(item,options)}</div>)
                                }):""}

                            </div>
                        </div>
                    </div>
                )
            })
        }

        return result;


    }
    render(){
        var {propertyDetail} = this.props;
        const {propertyFields} = this.props;
        var {property} = propertyDetail;
        const {propertyDatas} = this.props;
        const {room_type} = this.props.propertyDatas;
        return(
            <div>
                <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-6">
                        <div className="card">
                            <div className="card-header"> </div>
                            <div className="card-body">
                                <div className="form-group row">
                                    <label htmlFor="staticEmail"
                                           className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                        <span className="obligate">*</span>
                                        <IntlMessages id="property.main.type_of_property"/>
                                    </label>
                                    <div className="col-sm-5 col-md-5 col-lg-5 ">
                                        <div className="data-filled">
                                            {property.type_property!==null?findDataLabel(property.type_property,types_property):""}
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 col-lg-4">
                                        <div className="data-filled">
                                            {property.sub_type_property!==null?property.sub_type_property:""}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="staticEmail"
                                           className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                        <span className="obligate">*</span>
                                        <IntlMessages id="property.main.type_of_construction"/>
                                    </label>
                                    <div className="col-sm-9 col-md-9 col-lg-9 ">
                                        <div className="data-filled">
                                            {property.type_construction!==null?(property.type_construction==="new"?"neuf":"existant"):""}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                        <span className="obligate">*</span><IntlMessages
                                        id="property.main.availability_date"/>
                                    </label>
                                    <div className="col-sm-7 col-md-7">
                                        <div className="data-filled">
                                            {property.date_avai!==null?moment(new Date(property.date_avai)).format('DD/MM/YYYY'):""}
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
                                        <div className="data-filled">
                                            {property.date_visit !== null && property.date_visit !== "null" && property.date_visit!==undefined && property.date_visit!=="" ?
                                                (
                                                    JSON.parse(propertyDetail.property.date_visit)).map(item=>{
                                                        if(item === null){
                                                            item = 0;
                                                        }
                                                        return <div>{findDataLabel(item,DAY_OF_WEEK)}</div>
                                                    }
                                                ):""}
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
                                        <div className="data-filled">
                                            {property.hour_visit_start!==null?moment(new Date(property.hour_visit_start)).format('HH:mm'):""}
                                        </div>
                                    </div>
                                    <div className="col-sm-1 col-md-1 col-lg-1">
                                        <IntlMessages id="to"/>
                                    </div>
                                    <div className="col-sm-4 col-md-4 col-lg-4 timeProperty">
                                        <div className="data-filled">
                                            {property.hour_visit_end!==null?moment(new Date(property.hour_visit_end)).format('HH:mm'):""}
                                        </div>
                                    </div>

                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                        <IntlMessages id="property.main.key_property"/>
                                    </label>
                                    <div className="col-sm-7 col-md-7 col-lg-7">
                                        <div className="data-filled">
                                            {property.key_property!==null?(property.key_property==="1"?"oui":"non"):""}
                                        </div>
                                    </div>

                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-md-3 col-lg-3 col-form-label">
                                        Etat du bien
                                    </label>
                                    <div className="col-sm-7 col-md-7">
                                        <div className="data-filled">
                                            {property.type_property!==null?(property.type_property==="1"?"Occupé":"Libre"):""}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6">
                        <div className="card">
                            <div className="card-header"> </div>
                            <div className="card-body">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                        <span className="obligate">*</span> Année de construction
                                    </label>
                                    <div className="col-sm-3 col-md-3 height40px">
                                        <div className="data-filled">
                                            {property.year_construction!==null?property.year_construction:""}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                        <span className="obligate">*</span>Etage du bien
                                    </label>
                                    <div className="col-sm-4 col-md-4 col-lg-4 ">
                                        <div className="data-filled">
                                            {property.number_floors!==null?property.number_floors:""}
                                        </div>
                                    </div>

                                </div>
                                <div className="row form-group">
                                    <div className="col-sm-3 col-md-3 col-lg-3">
                                        <IntlMessages id="property.main.refreshments_topredict"/>
                                    </div>
                                    <div className="col-sm-9 col-md-9 col-lg-9">
                                    <div className="data-filled">
                                        {property.refreshments_topredict!==null?property.refreshments_topredict:""}
                                    </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                        <span className="obligate">*</span>Surface habitable
                                    </label>
                                    <div className="col-sm-3 col-md-3 height40px">
                                        <div className="data-filled">
                                            {property.living_space!==null?property.living_space:""}
                                        </div>
                                    </div>

                                    <label className="col-sm-3 col-md-3 col-lg-3 col-form-label">
                                        <IntlMessages id="property.main.number_floors_building"/>
                                    </label>
                                    <div className="col-sm-3 col-md-3 height40px">
                                        <div className="data-filled">
                                            {property.number_floors_building!==null?property.number_floors_building:""}

                                        </div>
                                    </div>
                                    {/*)}*/}

                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                        <span className="obligate">*</span>Surface Totale (m²)
                                    </label>
                                    <div className="col-sm-3 col-md-3 height40px">
                                        <div className="data-filled">
                                            {property.total_area_building!==null?property.total_area_building:""}
                                        </div>
                                    </div>
                                    <label className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                        <span className="obligate">*</span>
                                        <IntlMessages id="property.location.park_inside"/>
                                    </label>
                                    <div className="col-sm-3 col-md-3 height40px">
                                        <div className="data-filled">
                                            {property.park_inside!==null?property.park_inside:""}
                                        </div>
                                    </div>

                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                        <span className="obligate">*</span>
                                        <IntlMessages id="property.main.surface"/>
                                    </label>
                                    <div className="col-sm-3 col-md-3 height40px">
                                        <div className="data-filled">
                                            {property.total_area!==null?property.total_area:""}
                                        </div>
                                    </div>
                                    <label className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                        <span className="obligate">*</span>
                                        <IntlMessages id="property.location.park_outdoor"/>
                                    </label>
                                    <div className="col-sm-3 col-md-3 height40px">
                                        <div className="data-filled">
                                            {property.park_outdoor!==null?property.park_outdoor:""}
                                        </div>
                                    </div>

                                </div>
                                <div className="form-group row">
                                    <label  className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField"><IntlMessages
                                        id="property.property_match.characteristic.params.outdoor"/></label>
                                    <div className="col-sm-7 col-md-7">
                                    <div className="data-filled">
                                        <FormGroup row>
                                            {property.outdoor_space!==null?(property.outdoor_space===1?<IntlMessages id="choose.yes"/>:<IntlMessages id="choose.no"/>):""}
                                        </FormGroup>
                                    </div>
                                    </div>

                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-md-3 col-lg-3 col-form-label obligateField">
                                        <span className="obligate">*</span>
                                        <IntlMessages id="property.main.energy_efficiency"/>
                                    </label>
                                    <div className="col-sm-6 col-md-6 col-lg-6 ">
                                        <div className="data-filled">
                                            {property.energy_efficiency!==null&&property.energy_efficiency!==""&&property.energy_efficiency!==undefined&&property.energy_efficiency!=={}?(typeof JSON.parse(property.energy_efficiency) ==="array"?
                                                JSON.parse(property.energy_efficiency).map((item,index) =>{
                                                return (
                                                    <div key={index}>{item}</div>
                                                )
                                            }):""):""}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <br/>
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div>
                            <div className="card">
                                <strong className="card-header">
                                    <IntlMessages id="character.characteristics.title"/>
                                </strong>
                                <div className="card-body characterDes">
                                    {/* <IntlMessages id="character.characteristics.title_detail"/> */}
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    {/* <IntlMessages id="character.characteristics.title"/> */}
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        {this.renderFacilityParent(propertyDatas)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div>
                            {/* <strong>
                    <IntlMessages id="character.room.title"/>
                </strong>
                <div>
                    <IntlMessages id="character.room.title_detail"/>
                </div> */}
                            <div className="card">
                                <div className="card-header ">
                                    <IntlMessages id="character.room.title.child"/>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3 col-md-3 col-lg-3">
                                            <div className="row">
                                                <div className="col-sm-6 col-md-6 col-lg-6 ">
                                                    <IntlMessages
                                                    id="character.room.number_room"/>
                                                </div>
                                                <div className="col-sm-4 col-md-4 col-lg-4">
                                                    <div className="data-filled">
                                                        {propertyDetail.character[0].number_room!==null?propertyDetail.character[0].number_room:""}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-sm-3 col-md-3 col-lg-3">
                                            <div className="row">
                                                <div className="col-sm-6 col-md-6 col-lg-6 obligateField">
                                                    <span className="obligate">*</span><IntlMessages
                                                    id="character.room.number_bedroom"/>
                                                </div>
                                                <div className="col-sm-4 col-md-4 col-lg-4">
                                                    <div className="data-filled">
                                                        {propertyDetail.character[0].number_bedroom!==null?propertyDetail.character[0].number_bedroom:""}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-sm-3 col-md-3 col-lg-3">
                                            <div className="row">
                                                <div className="col-sm-6 col-md-6 col-lg-6 obligateField">
                                                    <span className="obligate">*</span><IntlMessages
                                                    id="character.room.number_bathroom"/>
                                                </div>
                                                <div className="col-sm-4 col-md-4 col-lg-4">
                                                    <div className="data-filled">
                                                        {propertyDetail.character[0].number_bathroom!==null?propertyDetail.character[0].number_bathroom:""}

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-sm-3 col-md-3 col-lg-3">
                                            <div className="row">
                                                <div className="col-sm-6 col-md-6 col-lg-6 obligateField">
                                                    <span className="obligate">*</span><IntlMessages id="character.room.number_wc"/>
                                                </div>
                                                <div className="col-sm-4 col-md-4 col-lg-4">
                                                    <div className="data-filled">
                                                        {propertyDetail.character[0].number_wc!==null?propertyDetail.character[0].number_wc:""}
                                                    
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-sm-3 col-md-3 col-lg-3"><IntlMessages id="character.room.type"/></div>
                                        <div className="col-sm-3 col-md-3 col-lg-3"><IntlMessages id="character.room.dimension"/>
                                        </div>
                                        <div className="col-sm-3 col-md-3 col-lg-3"><IntlMessages id="character.room.description"/>
                                        </div>
                                    </div>
                                </div>
                                <div id="detail_room" className="card-body">
                                    {propertyDetail.character[0].detail_rooms_values!==null&&propertyDetail.character[0].detail_rooms_values!==undefined &&propertyDetail.character[0].detail_rooms_values!==""?
                                        (JSON.parse(propertyDetail.character[0].detail_rooms_values).length>0?
                                    JSON.parse(propertyDetail.character[0].detail_rooms_values).map((item,index) =>{

                                        return(
                                            <div className="row" key={index}>

                                                <div className="col-sm-3 col-md-3 col-lg-3">
                                                    <div className="row">
                                                        <div className="col-sm-1 col-md-1">

                                                        </div>
                                                        <div className="col-sm-11 col-md-11">
                                                            {item.room_type!==null?findDataLabelFacility(item.room_type,room_type):""}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-3 col-md-2 col-lg-3">
                                                    <div className="row">
                                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                                            <div className="row">
                                                                <div className="offset-sm-2 col-sm-8  offset-md-2 col-md-8 offset-lg-2  col-lg-8">
                                                                    <div>
                                                                        {item.dimension}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-sm-5 col-md-5 col-lg-5">
                                                    <div>

                                                        {item.description}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }):""):""}
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
        propertyFields: state.propertyFields,
        propertyDatas: state.propertyDatas,
    })
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        getListParentFacility: (conditions,type) => {
            return dispatch(getListParentFacility(conditions,type))
        },
        getAllChildFacility: (data,type) => {
            return dispatch(getAllChildFacility(data,type))
        },
        getListRoomTypes: () => {
            return dispatch(getListRoomTypes())
        },

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Localistation);
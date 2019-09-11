import React, {Component} from 'react';
import IntlMessages from "../../../util/IntlMessages";
import {connect} from "react-redux";
import {getListParentFacility, getAllChildFacility, updateFieldsPropertyCharacterTab} from "Actions";
import {UPDATE_FAC_CHILD} from "Actions/types";


import SelectAutoComplete from '../../ComponentHelper/SelectAutoComplete';
import {withFormik} from "formik";

class FacilityLayout extends Component {
    constructor(props) {
        super(props);
        const {propertyDetail} =  props;
        this.state = {
            facility_parent: [],
            facilityChild: [],
            facilityDetails:{},
            facilityValue:propertyDetail && propertyDetail.property.id && propertyDetail.character[0].facilityDetails?propertyDetail.character[0].facilityDetails.split(','):[],
            checkChange: false,
        }
    }
    componentWillMount = () => {
        var {propertyDatas} = this.props;
        var {facility_parent} = propertyDatas;
        if (facility_parent && facility_parent.length <= 0) {
            this.props.getListParentFacility({type:"facility",state:1,parent_id:0},"UPDATE_FAC_PARENT").then(datas => {
                this.props.getAllChildFacility(datas.data,UPDATE_FAC_CHILD)
            });
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


    // handleChangeSelect=(event)=>{
    //     this._isChanged(true);
    //     this.setState({
    //         facilityDetails:{...this.state.facilityDetails,[event.target.name]:[...event.target.value]}
    //     })
    // };

    handleChangeSelect = (event) => {
        this._isChanged(true);
        const {facilityValue} = this.state;
        let facilityVals_clone = [].concat(facilityValue);
        const {old_value} = event;

        // handle data for save function
        if (Array.isArray(facilityVals_clone) && facilityVals_clone.length) {
            if(old_value){
                old_value.map(item => {
                    if (facilityVals_clone.indexOf(item + "") > -1 ) {
                        facilityVals_clone.splice(facilityVals_clone.indexOf(item + ""), 1)
                    }
                    if(facilityVals_clone.indexOf(item) > -1){
                        facilityVals_clone.splice(facilityVals_clone.indexOf(item), 1)
                    }
                });
            }
            facilityVals_clone = facilityVals_clone.concat(event.target.value);
            this.setState({
                facilityDetails: {...this.state.facilityDetails, [event.target.name]: [...event.target.value]},
                facilityValue: facilityVals_clone

            })
        } else {
            this.setState({
                facilityDetails: {...this.state.facilityDetails, [event.target.name]: [...event.target.value]},
                facilityValue: [...event.target.value]

            })
        }

    };
    renderFacilityParent = (propertyDatas, eee) => {
        var result = null;
        var {facilityDetails, facilityValue} = this.state;
        var {facility_parent, facility_child} = propertyDatas;
        if (facility_parent && facility_parent.length) {
            result = facility_parent.map((item, index) => {
                var findChild = [];
                var data_child = null;
                if (facility_child && facility_child.length) {
                    findChild = facility_child.filter(child => {
                        return child.parent_id === item.id
                    });
                    data_child = findChild[0];
                }
                return (
                    <div className="col-sm-4 col-md-4 col-lg-4" key={index}>
                        <div className="card">
                            <h5 className="card-header">{item.title} {item.title === "Orientation"?<span>
                            <i className="zmdi zmdi-help zmdi-hc-2x" title="Préciser l'orientation par rapport à votre espace extérieur, si il n'y en a pas, préciser par rapport au living "> </i>
                            </span>:""}</h5>
                            <div className="card-body">
                                <SelectAutoComplete key={index}
                                                    multiple={true}
                                                    // value={facilityDetails && facilityDetails["fac-"+item.id]?facilityDetails["fac-"+item.id]:[]}
                                                    value={facilityDetails && facilityDetails["fac-" + item.id] ? facilityDetails["fac-" + item.id] : facilityValue}
                                                    name={"fac-"+item.id}
                                                    listOption={data_child ? data_child.child : []}
                                                    get_oldData={true}
                                                    onChange={this.handleChangeSelect}
                                />
                            </div>
                        </div>
                    </div>
                )
            })
        }

        return result;


    };
    _isChanged = (status)=>{
        this.setState({
            checkChange:status
        })
    };

    _saveToRedux=()=>{
        var {checkChange} =  this.state;
        var {propertyFields} =  this.props;
        var {preTab} =  propertyFields;
        if(checkChange &&( preTab ===2|| preTab ==="2")){
            var data =  this.state;
            data.facilityDetails = data.facilityValue.join();
            delete data.facility_parent;
            delete data.facilityChild;
            delete data.checkChange;
            delete data.facilityValue;
            this.props.updateFieldsPropertyCharacterTab(data);
            this._isChanged(false);
        }
    };

    render() {
        this._saveToRedux();
        const {propertyDatas} = this.props;
        return (
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        propertyDatas: state.propertyDatas,
        propertyFields: state.propertyFields
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        getListParentFacility: (conditions,type) => {
            return dispatch(getListParentFacility(conditions,type))
        },
        getAllChildFacility: (data,type) => {
            return dispatch(getAllChildFacility(data,type))
        },
        updateFieldsPropertyCharacterTab:(fields)=>{
            dispatch(updateFieldsPropertyCharacterTab(fields))
        }

    }
};
const FormikForm = withFormik({
    mapPropsToValues(datas) {
        return {
        }
    },
})(FacilityLayout);

export default connect(mapStateToProps, mapDispatchToProps)(FormikForm);
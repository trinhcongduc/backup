import React, {Component} from 'react';
import {connect} from "react-redux";
import {getListParentFacility, getAllChildFacility, updateFieldsPropertyCharacterTab} from "Actions";
import {UPDATE_FAC_CHILD} from "Actions/types";


import SelectAutoComplete from 'Components/ComponentHelper/SelectAutoComplete';
import {withFormik} from "formik";

class FacilityLayout extends Component {
    constructor(props) {
        super(props);
        const {propertyMatchesDetail} = props;
        this.state = {
            facility_parent: [],
            facilityChild: [],
            facilityDetails: {},
            facilityValue: propertyMatchesDetail && propertyMatchesDetail.id && propertyMatchesDetail.more_infor ? propertyMatchesDetail.more_infor.split(",") : [],
            checkChange: false,
        }
    }

    componentWillMount = () => {
        var {propertyDatas} = this.props;
        var {facility_parent} = propertyDatas;
        if (facility_parent && facility_parent.length <= 0) {
            this.props.getListParentFacility({
                type: "facility",
                state: 1,
                parent_id: 0
            }, "UPDATE_FAC_PARENT").then(datas => {
                this.props.getAllChildFacility(datas.data, UPDATE_FAC_CHILD)
            });
        }
    };

    componentWillReceiveProps(nextProps) {
        const {propertyMatchesDetail} = nextProps;
        if (propertyMatchesDetail && propertyMatchesDetail.id && propertyMatchesDetail !== this.props.propertyMatchesDetail) {
            this.setState({
                facilityValue: propertyMatchesDetail && propertyMatchesDetail.id && propertyMatchesDetail.more_infor ? propertyMatchesDetail.more_infor.split(",") : [],
            })
        }
    }


    handleChangeSelect = (event) => {
        this._isChanged(true);
        const {facilityValue} = this.state;
        let more_info = [].concat(facilityValue);
        const {old_value} = event;

        // handle data for save function
        if (Array.isArray(more_info) && more_info.length ) {
            if(old_value){
                old_value.map(item => {
                    if (more_info.indexOf(item + "") > -1 ) {
                        more_info.splice(more_info.indexOf(item + ""), 1)
                    }
                    if(more_info.indexOf(item) > -1){
                        more_info.splice(more_info.indexOf(item), 1)
                    }
                });
            }
            more_info = more_info.concat(event.target.value);
            this.setState({
                facilityDetails: {...this.state.facilityDetails, [event.target.name]: [...event.target.value]},
                facilityValue: more_info

            }, () => {
                // console.log("___facilityDetails__->", this.state.facilityDetails);
                this.props.parent_get_data({more_infor: this.state.facilityValue.join()});
            })
        } else {
            this.setState({
                facilityDetails: {...this.state.facilityDetails, [event.target.name]: [...event.target.value]},
                facilityValue: [...event.target.value]

            }, () => {
                this.props.parent_get_data({more_infor: this.state.facilityValue.join()});
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
                    <div className="col-sm-6 col-md-6 col-lg-6" key={index}>
                        <div className="card">
                            <h5 className="card-header">{item.title}</h5>
                            <div className="card-body">
                                <SelectAutoComplete key={index}
                                                    multiple={true}
                                                    value_props='id'
                                                    label_props='title'
                                                    value={facilityDetails && facilityDetails["fac-" + item.id] ? facilityDetails["fac-" + item.id] : facilityValue}
                                                    name={"fac-" + item.id}
                                                    get_oldData={true}
                                                    listOption={data_child ? data_child.child : []}
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
    _isChanged = (status) => {
        this.setState({
            checkChange: status
        })
    };


    render() {
        const {propertyDatas} = this.props;
        return (
            <div className="row">
                {this.renderFacilityParent(propertyDatas)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        propertyDatas: state.propertyDatas,
        propertyFields: state.propertyFields,
        propertyMatchesDetail: state.property_matches.property_matches_edit
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        getListParentFacility: (conditions, type) => {
            return dispatch(getListParentFacility(conditions, type))
        },
        getAllChildFacility: (data, type) => {
            return dispatch(getAllChildFacility(data, type))
        },
        updateFieldsPropertyCharacterTab: (fields) => {
            dispatch(updateFieldsPropertyCharacterTab(fields))
        }

    }
};
const FormikForm = withFormik({
    mapPropsToValues(datas) {
        return {}
    },
    enableReinitialize: true
})(FacilityLayout);

export default connect(mapStateToProps, mapDispatchToProps)(FormikForm);
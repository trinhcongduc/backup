/**
 * Siderbar
 */

'use strict'
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {withFormik} from "formik";
import IntlMessages from "Util/IntlMessages";
import Title from "./Title";
import MainDescription from "./MainDescription";
import Location from "./Location";
import Price from "./Price";
import Characteristic from "./Characteristic";
import OwnerPropertyLayout from "./Host/OwnerPropertyLayout";
import {clear_data_edit} from "Actions";


import {updateFieldsPropertyMatches, createPropertyMatch, getListPropertyMatch} from "Actions";


class SideBarPropertyMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property_data: {}
        }
    }
    componentWillMount(){
        this.props.clear_data_edit();
    }

    get_child_data = (data) => {
        this.setState({
            property_data :Object.assign(this.state.property_data,data)
        },()=>{
            // console.log("DATA-===>",this.state.property_data);
        })
    };


    handleSave = () => {
        this.setState({
            property_data:this.state.property_data
        },()=>{
            this.props.createPropertyMatch(this.state.property_data)
                .then(
                    this.props.getListPropertyMatch(),
                )
                .then(
                    this.props.history.push("/app/dashboard/property-matches/list")
                );
        })
    };
    handleEdit = () => {
        this.setState({
            property_data:this.state.property_data
        },()=>{
            var data = Object.assign(this.state.property_data,{id:this.props.propertyMatchesDetail.id});

            this.props.updateFieldsPropertyMatches(data)
                .then(()=>{
                    this.props.clear_data_edit();
                    this.props.getListPropertyMatch();
                })
                .then(
                    this.props.history.push("/app/dashboard/property-matches/list")
                )
                .catch(err=>{
                    console.log("ERROR===>",err);
                })
        })
    };

    render() {
        const {propertyMatchesDetail} = this.props;
        return (
            <div>
                <div className="row">
                    <div className="offset-sm-2 col-sm-8 offset-md-2 col-md-8 offset-lg-2 col-lg-8">
                        <Title parent_get_data={this.get_child_data}/>
                        <br/>
                        <OwnerPropertyLayout parent_get_data={this.get_child_data}/>
                        <br/>
                        <MainDescription     parent_get_data={this.get_child_data}/>
                        <br/>
                        <Location            parent_get_data={this.get_child_data}/>
                        <br/>
                        <Price               parent_get_data={this.get_child_data}/>
                        <br/>
                        <Characteristic      parent_get_data={this.get_child_data}/>
                        <br/>
                    </div>
                </div>
                <div className="row pd20px" style={{marginBottom: '5%'}}>
                    <div className="col-sm-3  col-md-3 col-lg-3 offset-md-7">
                        {
                            propertyMatchesDetail && propertyMatchesDetail.id?
                                (   <button className="btn btn-primary" onClick={this.handleEdit}>
                                        <IntlMessages id="property_matches.edit"/>
                                    </button>
                                ):
                                (
                                    <button className="btn btn-primary" onClick={this.handleSave}>
                                        <IntlMessages id="property_matches.save"/>
                                    </button>
                                )
                        }
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
    return {
        createPropertyMatch:(datas)=>{
            return dispatch(createPropertyMatch(datas))
        },
        updateFieldsPropertyMatches:(datas)=>{
            return dispatch(updateFieldsPropertyMatches(datas))
        },
        getListPropertyMatch: () => dispatch(getListPropertyMatch()),
        clear_data_edit:()       => dispatch(clear_data_edit())
    }
};


const FormikForm = withFormik({
    mapPropsToValues() { // Init form field
        return {}
    }
})(SideBarPropertyMatch);


export default connect(mapStateToProp, mapDispatchToProps)(withRouter(FormikForm));

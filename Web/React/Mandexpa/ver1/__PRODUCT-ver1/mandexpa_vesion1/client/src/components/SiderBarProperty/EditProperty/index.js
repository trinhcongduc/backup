/**
 * App.js Layout Start Here
 */

'use strict'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from "react-redux";
import {withFormik} from "formik";
import {clearDataPropertyDetails, getPropertyDetail, updateFieldsPropertyReorderTab} from "Actions";
import Property from '../index'
import {getAccountCurrent, isEmpty} from "Helpers/helpers";


class EditProperty extends Component {

    componentWillMount() {
        this.props.updateFieldsPropertyReorderTab({});
        const {match} = this.props;
        let id;
        id =  match.params.id;
        if(!isNaN(id)){
            this.props.getPropertyDetail(id)
                .then(res=>{
                    let user_id = getAccountCurrent().id;
                    if(isEmpty(res) || user_id !== res.property.created_by){
                        this.props.history.push('/app/dashboard/not-found');
                    }
                })
                .catch((err)=>{
                    this.props.history.push('app/dashboard/not-found')
                });
        }else{
            this.props.history.push('app/dashboard/not-found')
        }
    }


    componentWillUnmount(){
        this.props.clearDataPropertyDetails();
    }

    render(){
        let { propertyDetail} = this.props;
        let check = isEmpty(propertyDetail);
        let user_id = getAccountCurrent().id;
        let check_title = false;
        let title_property = "";
        let created_by = "";
        if(!check){
            created_by = this.props.propertyDetail?this.props.propertyDetail.property.created_by:getAccountCurrent().id;
            if(user_id !== created_by){
                check_title = true;
                title_property = this.props.propertyDetail.property.title_des!==null?this.props.propertyDetail.property.title_des:"";
            }
        }
        this.props.parent_get_check(check_title,title_property);
        return(
            <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="row">
                    {(!check)?<Property  propertyDetail={ propertyDetail} />:""}
                </div>
            </div>
        )
    }
}

const mapStateToProp = (state)=>{
    return ({
        propertyDetail : state.propertyDatas.detail_propertyFields,
    });
};

const mapDispatchToProps = (dispatch,props)=>{
    return {
        getPropertyDetail:(id)=>{
            return dispatch(getPropertyDetail(id));
        },
        updateFieldsPropertyReorderTab: (fields) => {
            dispatch(updateFieldsPropertyReorderTab(fields))
        },
        clearDataPropertyDetails: () => {
            return dispatch(clearDataPropertyDetails());
        },
    }
};



const FormikForm = withFormik({
    mapPropsToValues() { // Init form field
        return {}
    }
})(EditProperty);



export default connect(mapStateToProp,mapDispatchToProps)(withRouter(FormikForm));

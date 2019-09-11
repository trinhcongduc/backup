/**
 * App.js Layout Start Here
 */

'use strict'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from "react-redux";
import {withFormik} from "formik";
import PropertyMatches from '../create';
import {getPropertyMatchesDetail} from "Actions";


class EditPropertyMatches extends Component {
    componentWillMount() {
        const {match} = this.props;
        var id;
        id =  match.params.id;
        if(!isNaN(id)){
            this.props.getPropertyMatchesDetail(id)
                .catch((err)=>{
                    this.props.history.push('app/dashboard/not-found')
                });
        }
    }

    render(){
        const { propertyMatchesDetail} = this.props;
        return(
            <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="row">
                    <PropertyMatches   />
                </div>
            </div>
        )
    }
}

const mapStateToProp = (state)=>{
    return ({
        propertyMatchesDetail: state.property_matches.property_matches_edit
    });
};

const mapDispatchToProps = (dispatch,props)=>{
    return {
        getPropertyMatchesDetail:(id)=>{
            return dispatch(getPropertyMatchesDetail(id))
        }
    }
};



const FormikForm = withFormik({
    mapPropsToValues() {
        return {}
    }
})(EditPropertyMatches);



export default connect(mapStateToProp,mapDispatchToProps)(withRouter(FormikForm));

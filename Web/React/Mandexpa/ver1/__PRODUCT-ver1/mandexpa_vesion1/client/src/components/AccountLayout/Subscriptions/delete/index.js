/**
 * Component  create a subscriptions
 */



import React, {Component} from 'react';
import IntlMessages from "Util/IntlMessages";
import * as Yup from "yup";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withFormik} from "formik";
import {CreateSubscription,EditSubscription} from "Actions";


class DeleteSubscriptions extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="row">
                <IntlMessages id="subscriptions.delete.label"/>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        detail_subs : state.subscriptions.detail
    };
};

const mapDispatchtoProps = (dispatch,props)=>{
    return{
        CreateSubscription:(data)=>{
            return dispatch(CreateSubscription(data))
        },
        EditSubscription:(data)=>{
            return dispatch(EditSubscription(data))
        },

    }
};

const FormikForm = withFormik({
    mapPropsToValues(props){
        return{}
    },
    validationSchema: Yup.object().shape({  // Validate form field
    })
})(DeleteSubscriptions);

export default connect(mapStateToProps,mapDispatchtoProps)(withRouter(FormikForm));
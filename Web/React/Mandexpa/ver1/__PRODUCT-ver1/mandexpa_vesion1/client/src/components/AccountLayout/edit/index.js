/**
 * App.js Layout Start Here
 */

'use strict'
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {withFormik} from "formik";
import {getAccountByID} from '../../../actions/AuthActions';
import CreateAccountLayout from '../create/index';



class EditUserLayout extends Component {
    componentWillMount() {
        const {match} = this.props;
        var id;
        id =  match.params.id;
        if(!isNaN(id)){
            this.props.getAccountByID(id)
                .catch((err)=>{
                    this.props.history.push('app/dashboard/not-found-account')
                });
        }
    }

    render(){
        let {accountEdit} = this.props;
        return(
            <CreateAccountLayout inforAccount={accountEdit.user} typeCom="edit"/>
        )
    }
}

const mapStateToProp = (state)=>{
    return ({
        accountEdit:state.authUser
    });
};

const mapDispatchToProps = (dispatch,props)=>{
    return {
        getAccountByID:(id)=>{
            return dispatch(getAccountByID(id));
        },
    }
};


const FormikForm = withFormik({
    mapPropsToValues() { // Init form field
        return {}
    }
})(EditUserLayout);



export default connect(mapStateToProp,mapDispatchToProps)(withRouter(FormikForm));

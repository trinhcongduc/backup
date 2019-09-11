/**
 * App.js Layout Start Here
 */

'use strict'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from "react-redux";
import {withFormik} from "formik";
import {getAccountByID} from '../../../actions/AuthActions';
import CreateAccountLayout from '../create/index'



class EditAccountProfile extends Component {

    constructor(props) {
        super(props);
        const {location} = this.props;
        let state =  (typeof location.state === "undefined") || (location.state.length ===0 )?'':location.state;
        this.state = {
            id:state
        }
    }

    componentWillMount() {
        const {currentAccount}= this.props;
        if(currentAccount.id>-1){
            this.props.getAccountByID(currentAccount.id);
        }
    }
    render(){
        const {accountEdit} = this.props;
        return(
            <CreateAccountLayout inforAccount={accountEdit.user} typeCom="profile" loadpage={true}/>
        )
    }
}

const mapStateToProp = (state)=>{
    return ({
        accountEdit:state.authUser,
        currentAccount:state.authLogin,
    });
};

const mapDispatchToProps = (dispatch,props)=>{
    return {
        getAccountByID:(id)=>{
            dispatch(getAccountByID(id));
        },
    }
};



const FormikForm = withFormik({
    mapPropsToValues() { // Init form field
        return {}
    }
})(EditAccountProfile);



export default connect(mapStateToProp,mapDispatchToProps)(withRouter(FormikForm));

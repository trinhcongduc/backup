/**
 * Component  upgrade package for a subscriber
 */



import React, {Component} from 'react';
import IntlMessages from "Util/IntlMessages";
import PropTypes from 'prop-types';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker,{registerLocale} from 'react-datepicker';
import * as Yup from "yup";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withFormik} from "formik";
import {withStyles} from "@material-ui/core";
import {

} from "Actions";


import {} from "Actions/types";

import {configDateFormat} from "Constants/DateConfig";
import enGB from "date-fns/locale/en-GB";

import moment from "moment";
import {datebyFormat} from "Helpers"

registerLocale('en', enGB);


const styles = () =>({

});



class Core extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }


    componentDidMount(){

    }

    componentWillReceiveProps(nextProps,nextState){

    }


    render() {
        const {} = this.state;
        return (
            <div>

            </div>
        )
    }
}


Core.defaultProps = {

};


Core.propTypes  = {

};

const mapStateToProps = (state)=>{
    return{
        subscribers : state.subscribers,
        subscriptions : state.subscriptions,
    };
};

const mapDispatchtoProps = (dispatch,props)=>{
    return{

    }
};

const FormikForm = withFormik({
    mapPropsToValues(props){
        return{
        }
    },
    validationSchema: Yup.object().shape({  // Validate form field
    }),
    enableReinitialize: true,
    handleSubmit(values, { props, setSubmitting, resetForm }) {

    },
})(Core);

export default connect(mapStateToProps,mapDispatchtoProps)(withRouter(withStyles(styles)(FormikForm)));
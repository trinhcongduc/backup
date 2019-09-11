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
import {} from "Actions";
import {} from "Actions/types";

import {configDateFormat} from "Constants/DateConfig";
import enGB from "date-fns/locale/en-GB";

import moment from "moment";
import {datebyFormat} from "Helpers"
import classNames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AppConfig from "Constants/AppConfig";

registerLocale('en', enGB);

const styles = () =>({
    statistic_icon:{
        fontSize:'3em'
    },
    statistic_content:{
        // textTransform:'uppercase'
    },
    mg_auto_10:{
        margin:'auto 10px'
    },
    pd_none:{
        padding:'0px',
    },
    number_statistic_size:{
        fontSize:'14px'
    },
    action_label:{
        fontSize:'14px',
        fontWeight:'bold'
    },
    dateLabel:{
        fontSize:'12px',
        fontWeight:'800',
        margin:'0px'
    },
    dateInput:{
        paddingTop:'0px',
        paddingBottom:'0px',
    }
});


class ActionFrontOffice extends Component{
    constructor(props){
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
        }
    }


    componentDidMount(){

    }

    componentWillReceiveProps(nextProps,nextState){

    }

    handleChangeStartDate = (date) =>{
        console.log("date",date);
        if(date){
            let endDate = moment(date).add(1,'days');
            this.setState({
                startDate: date,
                endDate: new Date(endDate)
            })
        }
    };
    handleChangeEndDate = (date) =>{
        if(date){
            this.setState({
                endDate: date,
            })
        }
    };


    render() {
        const {startDate,endDate} = this.state;
        const {classes} = this.props;
        return (
            <div className="row">
                <div className="col-md-3">
                    <div className="card">
                        <div className={classNames("card-body d-flex bd-highlight",classes.pd_none)}>
                            <div className={classNames("p-2 bd-highlight",classes.statistic_icon)}>
                                <FontAwesomeIcon icon={['far','file-medical-alt']}/>
                            </div>
                            <div className={classNames("p-2 bd-highlight",classes.statistic_content)}>
                                <span className={classes.action_label}>
                                    <IntlMessages id="dashboard.admin.public_new_to_front"/>
                                </span><br/>
                                <strong className={classes.number_statistic_size}>
                                    00{  }
                                </strong>

                            </div>
                            <div className={classNames("ml-auto p-2 bd-highlight",classes.mg_auto_10)}>
                                <FontAwesomeIcon icon={['fas','chevron-right']}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className={classNames("card-body d-flex bd-highlight",classes.pd_none)}>
                            <div className={classNames("p-2 bd-highlight",classes.statistic_icon)}>
                                <FontAwesomeIcon icon={['far','handshake']}/>
                            </div>
                            <div className={classNames("p-2 bd-highlight",classes.statistic_content)}>
                                <span className={classes.action_label}>
                                    <IntlMessages id="dashboard.admin.list_news"/>
                                </span>
                                <br/>
                                <strong className={classes.number_statistic_size}>00{}</strong>
                            </div>
                            <div className={classNames("ml-auto p-2 bd-highlight",classes.mg_auto_10)}>
                                <FontAwesomeIcon icon={['fas','chevron-right']}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className={classNames("card-body d-flex bd-highlight",classes.pd_none)}>
                            <div className={classNames("p-2 bd-highlight",classes.statistic_icon)}>
                                <FontAwesomeIcon icon={['far','house-flood']}/>
                            </div>
                            <div className={classNames("p-2 bd-highlight",classes.statistic_content)}>
                                <span className={classes.action_label}>
                                    <IntlMessages id="dashboard.admin.date_period"/>
                                </span>
                                <br/>
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex flex-column">
                                        <label className={classes.dateLabel} htmlFor="adminDashboardStartDate">
                                            <IntlMessages id="date.start"/>
                                        </label>
                                        <DatePicker
                                            id="adminDashboardStartDate"
                                            selected={startDate}
                                            className={classNames("form-control",classes.dateInput)}
                                            name="endDate"
                                            locale="en"
                                            dateFormat={AppConfig.date_format}
                                            placeholderText="Click to select a date"
                                            onChange={this.handleChangeStartDate}
                                        />
                                    </div>
                                    <div className="d-flex flex-column">
                                        <label className={classes.dateLabel} htmlFor="adminDashboardEndDate">
                                            <IntlMessages id="date.end"/>
                                        </label>
                                        <DatePicker
                                            selected={endDate}
                                            id="adminDashboardEndDate"
                                            className={classNames("form-control",classes.dateInput)}
                                            name="endDate"
                                            locale="en"
                                            dateFormat={AppConfig.date_format}
                                            placeholderText="Click to select a date"
                                            onChange={this.handleChangeEndDate}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={classNames("ml-auto p-2 bd-highlight",classes.mg_auto_10)}>
                                <FontAwesomeIcon icon={['fas','chevron-right']}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


ActionFrontOffice.defaultProps = {

};


ActionFrontOffice.propTypes  = {

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
})(ActionFrontOffice);

export default connect(mapStateToProps,mapDispatchtoProps)(withRouter(withStyles(styles)(FormikForm)));
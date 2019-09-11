/**
 * App.js Layout Start Here
 */

'use strict'
import React, { Component } from 'react';

import {connect} from "react-redux";
import {withFormik} from "formik";
import IntlMessages from "Util/IntlMessages";
import {withStyles} from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DatePicker,{registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import FormControl from '@material-ui/core/FormControl';
import {createAgenda} from "Actions";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import AppConfig from "Constants/AppConfig";
import FR from 'date-fns/locale/fr';
registerLocale('fr', FR);
const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const {children, classes, onClose} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent);
const DialogAgenda = withStyles(theme => ({
    paperFullWidth: {
        height : "400px"
    }
}))(Dialog);
const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
}))(MuiDialogActions);
class ButtonAgenda extends Component {

    constructor(props) {
        super(props);
        let date_visit = this.props.propertyDetail.property.date_visit !== null ? JSON.parse(this.props.propertyDetail.property.date_visit) : [];
        let enableDate = [];
        if (date_visit !== null &&date_visit !== undefined && date_visit.length > 0) {
            date_visit.map(item => {
                enableDate.push(item);
            });
        }
        this.state = {
            open: false,
            date: null,
            hour :null,
            subject: "",
            enableDate : enableDate,
            id : this.props.propertyDetail.property.id,
            hour_visit_start: new Date(this.props.propertyDetail.property.hour_visit_start),
            hour_visit_end: new Date(this.props.propertyDetail.property.hour_visit_end),
        };
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.propertyDetail !== this.props.propertyDetail) {

            const {propertyDetail} = nextProps;
            var date_visit = propertyDetail.property.date_visit !== null ? JSON.parse(propertyDetail.property.date_visit) : [];
            var enableDate = [];
            if (date_visit.length > 0) {
                date_visit.map(item => {
                    enableDate.push(item);
                });
            }
            this.setState({
                enableDate : enableDate,
                id : propertyDetail.property.id,
                hour_visit_start: new Date(propertyDetail.property.hour_visit_start),
                hour_visit_end: new Date(propertyDetail.property.hour_visit_end),
            })
        }
    }
    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };
    handleClose = () => {
        this.setState({
            open: false,
        });
    };
    handleSubmit = () => {
        if(this.state.date !== null && this.state.hour !== null && this.state.subject!==""){
            var data = {
                date : this.state.date,
                hour : this.state.hour,
                property_id : this.state.id,
                subject : this.state.subject
            }
            this.props.createAgenda(data);
            this.setState({
                open: false,
            });
        }
    };
    handleChangeDate = (date) => {
        this.setState({
            date: date
        });
    }
    handleChangeHour = (date) => {
        this.setState({
            hour : date
        });
    }
    onChange = (event) => {
        this.setState({subject : event.target.value})
    }
    isWeekday = (date) => {
        const day = date.getDay();
        var a= this.state.enableDate;
        if(a.length === 0 || a.length > 6){
            return day === 0 || day === 1 || day === 2 || day === 3 || day === 4 || day === 5 || day === 6
        }
        else if(a.length === 1){
            return day === a[0];
        }
        else if(a.length === 2){
            return day === a[0] || day === a[1]
        }
        else if(a.length === 3){
            return day === a[0] || day === a[1] || day === a[2]
        }
        else if(a.length === 4){
            return day === a[0] || day === a[1] || day === a[2] || day === a[3]
        }
        else if(a.length === 5){
            return day === a[0] || day === a[1] || day === a[2] || day === a[3] || day === a[4]
        }
        else if(a.length === 6){
            return day === a[0] || day === a[1] || day === a[2] || day === a[3] || day === a[4] || day === a[5]
        }
        else {
            return day === 0 || day === 1 || day === 2 || day === 3 || day === 4 || day === 5 || day === 6
        }
    }
    render(){
        return(
            <div> <i className="zmdi zmdi-calendar-note zmdi-hc-2x iconMg1" onClick={this.handleClickOpen}> </i>
                {/*<button className="btn btn-primary btn-lg btnAgenda" onClick={this.handleClickOpen}>*/}
                    {/*<IntlMessages id="property.agenda"/>*/}
                {/*</button>*/}
                <DialogAgenda
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.open}
                    fullWidth={true}
                    maxWidth={"xs"}
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        <IntlMessages id="property.agenda"/>
                    </DialogTitle>
                    <DialogContent>
                        <div className="row justifyCenter">
                            <FormControl className="text-center col-sm-8 heightIP40">
                                <DatePicker
                                    className="form-control"
                                    name="date"
                                    locale="fr"
                                    selected={this.state.date}
                                    minDate={new Date()}
                                    onChange={this.handleChangeDate}
                                    filterDate={this.isWeekday}
                                    placeholderText="Choisir une date"
                                    dateFormat={AppConfig.date_format}
                                    // withPortal
                                />
                            </FormControl>
                        </div>
                        <div className="mt-3 row justifyCenter">
                            <FormControl className="text-center col-sm-8 heightIP40">
                                <DatePicker
                                    name="hour"
                                    locale="fr"
                                    selected={this.state.hour}
                                    onChange={this.handleChangeHour}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    dateFormat="HH:mm"
                                    timeFormat="HH:mm"
                                    timeCaption="Heure"
                                    minTime={this.state.hour_visit_start}
                                    maxTime={this.state.hour_visit_end}
                                    className="form-control"
                                    placeholderText="Choisir une heure"
                                />
                            </FormControl>
                        </div>
                        <div className="mt-3 row justifyCenter">
                            <FormControl className="text-center col-sm-8">
                                <Select
                                    name="subject"
                                    value={this.state.subject}
                                    onChange={this.onChange}
                                    displayEmpty
                                    className="form-control"
                                >
                                    <MenuItem value={""} disabled>
                                        {<IntlMessages id="agenda.subject.select" />}
                                    </MenuItem>
                                    <MenuItem value={1}>{<IntlMessages id="agenda.subject.booking_visit" />}</MenuItem>
                                    <MenuItem value={0}>{<IntlMessages id="agenda.subject.other" />}</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button onClick={this.handleSubmit} className="btn btn-primary ">
                            {<IntlMessages id="save"/>}
                        </button>
                        <button onClick={this.handleClose} className="btn btn-danger">
                            {<IntlMessages id="cancel"/>}
                        </button>
                    </DialogActions>
                </DialogAgenda>
            </div>
        )
    }
}

const mapStateToProp = (state)=>{
    return ({
    });
};

const mapDispatchToProps = (dispatch,props)=>{
    return {
        createAgenda: (data) => {
            return dispatch(createAgenda(data))
        },
    }
};



const FormikForm = withFormik({
    mapPropsToValues() { // Init form field
        return {

        }
    }
})(ButtonAgenda);



export default connect(mapStateToProp,mapDispatchToProps)(FormikForm);

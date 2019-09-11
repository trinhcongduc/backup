
/**
 * High Order Component is used for function show modal confirm by any action on sys.
 * By ductrinh
 * Upgrade 30/6/2019
 */


import React,{Component} from "react";
import IntlMessages from "Util/IntlMessages";
import {IconButton,Button,DialogActions,DialogContent,DialogTitle,Dialog} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {withFormik} from "formik";
import * as  Yup from "yup";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';



const styles = theme => ({
    root: {
        margin: 0,
        padding: '16px',
    },
    closeButton: {
        position: 'absolute',
        right: '8px',
        padding: '5px',
        color: theme.palette.grey[500],
    },
});

class ModalConfirmHOCs extends Component{
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false
        }
    }

    _close = () => {
        this.props.onClose(false);
        this.setState({
            openDialog: false
        });
    };

    componentWillReceiveProps(nextProps,nextState){
        if(nextProps.openDialog !== this.state.openDialog){
            this.setState({
                openDialog:nextProps.openDialog
            })
        }
    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.openDialog !== this.state.openDialog){
            return true
        }
        return false;
    }

    handleCloseDialog = () => {
        this._close();
    };
    handleConfirm = () => {
        let run = this.props.handleConfirm();
        run();
    };
    handleCancel = () => {
        let cancel = this.props.handleCancel();
        cancel();
    };


    render() {
        const {openDialog} = this.state;
        const {children,title,classes} = this.props;
        return (
            <Dialog
                open={openDialog}
                fullWidth={true}
                maxWidth="sm"
                height="auto"
                aria-labelledby="form-dialog-title"
            >
                <div className="card popupProperty">
                    <div className="card-header">
                        <DialogTitle id="form-dialog-title" >
                            {title}
                            <IconButton aria-label="Close" className={classes.closeButton} onClick={this.handleCloseDialog}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                    </div>
                    <div className="card-body">
                        <DialogContent>
                            {/*Component Wrapper in here*/}
                            {children}
                        </DialogContent>
                    </div>
                    <div className="card-footer">
                        <DialogActions>
                            <Button onClick={this.handleCancel} className="btn btn-secondary">
                        <IntlMessages id="cancel"/>
                        </Button>
                            <Button onClick={this.handleConfirm} className="btn  btn-primary">
                            <IntlMessages id="confirm"/>
                            </Button>
                        </DialogActions>
                    </div>
                </div>
            </Dialog>
        )
    }
}
ModalConfirmHOCs.defaultProps = {
    openDialog:false,
    title:<IntlMessages id="modal.confirm.title"/>
};

ModalConfirmHOCs.propTypes = {
    onClose : PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    openDialog:PropTypes.bool
};


const mapStateToProps = (state) =>{
    return {
        propertyFields: state.propertyFields
    }
};


const mapDispatchToProps = (dispatch,props) =>{
    return {
    }
};


const FormikForm = withFormik({
    mapPropsToValues(){
        return {

        }
    },
    validationSchema: Yup.object().shape({
    }),
    enableReinitialize:true,
})(ModalConfirmHOCs);

export  default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(withRouter(FormikForm)));
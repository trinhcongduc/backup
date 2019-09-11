/**
 * High Order Component is used for show modal in layout.
 * By ductrinh
 * Upgrade 30/6/2019
 */


import React,{Component} from "react";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {withFormik} from "formik";
import * as  Yup from "yup";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';



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

class ModalHOCs extends Component{
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

    render() {
        const {openDialog} = this.state;
        const {children,title,classes,maxWidth} = this.props;
         return (
            <Dialog
                open={openDialog}
                fullWidth={true}
                maxWidth={maxWidth}
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
                    {/*<div className="card-footer">*/}
                        {/*<DialogActions>*/}
                            {/*<Button onClick={this.handleCloseDialog} className="btn btn-secondary">*/}
                                {/*<IntlMessages id="cancel"/>*/}
                            {/*</Button>*/}
                            {/*<Button onClick={this.SubmitDialog} className="btn  btn-primary">*/}
                                {/*<IntlMessages id="cancel.submit"/>*/}
                            {/*</Button>*/}
                        {/*</DialogActions>*/}
                    {/*</div>*/}
                </div>
            </Dialog>
        )
    }
}

ModalHOCs.defaultProps = {
    maxWidth : 'md',
    openDialog:false
};
ModalHOCs.propsType = {
    maxWidth : PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
    openDialog:PropTypes.bool.isRequired,
    onClose:PropTypes.func.isRequired,
    title:PropTypes.string.isRequired,
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
})(ModalHOCs);

export  default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(withRouter(FormikForm)));
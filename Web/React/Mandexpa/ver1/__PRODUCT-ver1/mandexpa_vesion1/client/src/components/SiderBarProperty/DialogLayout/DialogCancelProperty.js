import React,{Component} from "react";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import IntlMessages from "Util/IntlMessages";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import {withFormik} from "formik";
import * as  Yup from "yup";
import {connect} from "react-redux";
import {cancelProperty, clearDataProperty} from "Actions";
import {withRouter} from "react-router-dom";

class DialogCancel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            loadCom:true
        }
    }

    componentWillReceiveProps(nextProps){
        const {openDialog} = nextProps;
        if(openDialog !==  this.state.openDialog){
            this.setState({
                openDialog:openDialog
            })
        }

    }


    _close = () => {
        this.setState({
            openDialog: false
        },()=>{
            this.props.action_cancel(false);
        });
    };
    _loadCom=()=>{
        this.setState({
            loadCom: !this.state.loadCom
        })
    };

    handleCloseDialog = () => {
        this._close();
    };
    SubmitDialog = () => {
        let data = {
            id:this.props.propertyDetail.property.id,
            status_mandate:'CANCELLED',
            cancel_reason:this.props.values.cancel_reason,
        };
        this.props.cancelProperty({...data})
            .then(() => {
                this.props.history.push('/app/dashboard/property/list');
                this.props.clearDataProperty();
            });
        this._close();
    };


    render() {
        const {cancel_reason} = this.props.values;
        const {openDialog} = this.state;

        return (
            <Dialog
                open={openDialog}
                fullWidth={true}
                onClose={this.handleClose}
                maxWidth="sm"
                aria-labelledby="form-dialog-title"
            >
                <div className="card popupProperty">
                    <div className="card-header">
                        <DialogTitle id="form-dialog-title"><IntlMessages id="property.popup.cancel_property.title"/></DialogTitle>
                    </div>
                    <div className="card-body">
                        <DialogContent>
                            <form>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <IntlMessages id="property.popup.cancel_property.cancel_reason.title"/>
                                    </div>
                                    <div className="col-sm-9">
                                        <textarea
                                            rows="5"
                                            name="cancel_reason"
                                            className="form-control"
                                            value={cancel_reason}
                                            onChange={this.props.handleChange}
                                        />
                                    </div>
                                </div>

                            </form>
                        </DialogContent>
                    </div>
                    <div className="card-footer">
                        <DialogActions>
                            <Button onClick={this.handleCloseDialog} className="btn btn-secondary">
                                <IntlMessages id="cancel"/>
                            </Button>
                            <Button onClick={this.SubmitDialog} className="btn  btn-primary">
                                <IntlMessages id="cancel.submit"/>
                            </Button>
                        </DialogActions>
                    </div>
                </div>
            </Dialog>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        propertyFields: state.propertyFields
    }
};


const mapDispatchToProps = (dispatch,props) =>{
    return {
        cancelProperty:(data)=>{
            return dispatch(cancelProperty(data))
        },
        clearDataProperty: () => {
            return dispatch(clearDataProperty());
        },
    }
};


const FormikForm = withFormik({
    mapPropsToValues(){
        return {
            cancel_reason:''
        }
    },
    validationSchema: Yup.object().shape({
        cancel_reason:Yup.string().required((<IntlMessages id='notification.required' />))
    }),
    enableReinitialize:true,
})(DialogCancel);





export  default connect(mapStateToProps,mapDispatchToProps)(withRouter(FormikForm));
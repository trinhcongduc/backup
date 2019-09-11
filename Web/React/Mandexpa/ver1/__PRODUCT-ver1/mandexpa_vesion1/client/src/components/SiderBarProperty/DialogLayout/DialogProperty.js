import React, {Component} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import IntlMessages from "Util/IntlMessages";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {withFormik} from "formik";
import PropTypes from "prop-types";
import {getAllCountry, updateFieldsPropertyMainTab,updateTypeofProperty} from "Actions";
import connect from "react-redux/es/connect/connect";
import {withStyles} from "@material-ui/core";
import {withRouter} from "react-router-dom";



const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        height: 250,
    },
});

class DialogProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: true,
            loadCom:true
        }
    }

    _close = () => {
        this.setState({
            openDialog: false
        });
    };
    _loadCom=()=>{
        this.setState({
            loadCom: !this.state.loadCom
        })
    };
    handleChange = (event)=>{
        this.props.handleChange(event);
        this._loadCom();
    };



    handleCloseDialog = () => {
        this._close();
        this.props.history.push('/');
    };
    SubmitDialog = () => {
        this.props.updateTypeofProperty(this.props.values);
        this._close();
    };

    render() {
        const {classes} = this.props;
        const {openDialog} = this.state;
        const {
            kind_property,
            type,
        } = this.props.values;

        // console.log("--->",this.props.values.kind_property);
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
                        <DialogTitle id="form-dialog-title"><IntlMessages id="property.popup.title"/></DialogTitle>
                    </div>
                    <div className="card-body">
                        <DialogContent>
                            <form>
                                <div className="card">
                                    <div className="card-header">
                                        <IntlMessages id="property.popup.kind_property"/>
                                    </div>
                                    <div className="card-body">
                                        <RadioGroup
                                            name="kind_property"
                                            className={classes.group}
                                            value={kind_property}
                                            onChange={this.handleChange}
                                        >
                                            <FormControlLabel value="residential" control={<Radio/>}
                                                              label={<IntlMessages id="property.popup.kind.residential"/>}/>
                                            <FormControlLabel value="commercial" control={<Radio/>}
                                                              label={<IntlMessages
                                                                  id="property.popup.kind.commercial"/>}/>
                                        </RadioGroup>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header">
                                        <IntlMessages id="property.popup.purpose"/>
                                    </div>
                                    <div className="card-body">
                                        <RadioGroup
                                            name="type"
                                            className={classes.group}
                                            value={type}
                                            onChange={this.handleChange}
                                        >
                                            <FormControlLabel value="sale" control={<Radio/>}
                                                              label={<IntlMessages
                                                                  id="property.popup.purpose.sale"/>}/>
                                            <FormControlLabel value="rent" control={<Radio/>}
                                                              disabled
                                                              label={<IntlMessages
                                                                  id="property.popup.purpose.rent"/>}/>
                                        </RadioGroup>
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
                                <IntlMessages id="submit"/>
                            </Button>
                        </DialogActions>
                    </div>
                </div>
            </Dialog>
        )
    }
}

DialogProperty.propTypes = {
    classes: PropTypes.object.isRequired,
};


const FormikForm = withFormik({

    mapPropsToValues(datas) {
        return {
            kind_property: 'residential',
            type: 'sale',
        }
    },
    enableReinitialize: true

})(DialogProperty);

const mapStateToProp = (state) => {
    return ({
        propertyDatas: state.propertyDatas,
        countries: state.country,
    })
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        updateFieldsPropertyMainTab: (field) => {
            dispatch(updateFieldsPropertyMainTab(field))
        },
        getAllCountry: () => {
            return dispatch(getAllCountry());
        },
        updateTypeofProperty: (fields)=>{
            dispatch(updateTypeofProperty(fields))
        }
    }
};

export default connect(mapStateToProp, mapDispatchToProps)(withStyles(styles)(withRouter(FormikForm)));
import React, {Component} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import IntlMessages from "Util/IntlMessages";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {withFormik} from "formik";
import PropTypes from "prop-types";
import {editImagePropertyMediaTab} from "Actions";
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

class DialogMediaImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            id_Edit: null,
            image_Edit: null,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.openDialog) {
            this.setState({
                openDialog: true,
                id_Edit: nextProps.id ? nextProps.id : null,
                image_Edit: nextProps.data ? nextProps.data : null,
            })
        }
    }

    _clear = () => {
        this.props.values.title  =  "";
        this.props.values.primaryImage  =  false;
        this.setState({
            openDialog: false,
            id_Edit: null,
            image_Edit: null,
        })
    };


    handleCloseDialog = () => {
        this.setState({
            openDialog: false
        });
        this._clear();
        this.props.closeDialog();
    };
    SubmitDialog = () => {
        var {image_Edit} = this.state;
        var {title,primaryImage} =  this.props.values;
        image_Edit.title=title;
        image_Edit.primaryImage=primaryImage;
        this.props.editImagePropertyMediaTab(image_Edit);


    };
    EndTask = () => {
        var {image_Edit} = this.state;
        var {title,primaryImage} =  this.props.values;
        image_Edit.title=title;
        image_Edit.primaryImage=primaryImage;
        this.props.editImagePropertyMediaTab(image_Edit);
        this._clear();
        this.props.closeDialog();
    };

    render() {
        const {media_fields} = this.props;
        const {openDialog, image_Edit} = this.state;
        const {title, primaryImage} = this.props.values;
        return (
            <Dialog
                open={openDialog}
                fullWidth={true}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <div className="card popupProperty">
                    <div className="card-header">
                        <DialogTitle id="form-dialog-title"><IntlMessages
                            id="property.media.popup.title"/></DialogTitle>
                    </div>
                    <div className="card-body">
                        <DialogContent>
                            <div className="row">
                                <div className="offset-sm-1 col-sm-9 offset-md-1 col-md-9 offset-lg-1 col-lg-9">
                                    <img className="" src={image_Edit && image_Edit.image}
                                         style={{
                                             height: '200px',
                                             width: 'auto',
                                             minHeight: '150px',
                                             margin: 'auto'
                                         }}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="offset-sm-2 col-sm-8 offset-md-2 col-md-8 offset-lg-2 col-lg-8">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1"><IntlMessages
                                                id="property.media.image.name"/></label>
                                            <input type="text" className="form-control" name="title"
                                                   value={title}
                                                   onChange={this.props.handleChange}
                                                   aria-describedby="emailHelp"
                                            />
                                        </div>
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" name="primaryImage"
                                                   onChange={this.props.handleChange}
                                                   checked={primaryImage}/>
                                            <label className="form-check-label" htmlFor="exampleCheck1">
                                                <IntlMessages id="property.media.image.imageMain.check_me"/>
                                            </label>
                                            <small className="form-text text-muted">
                                                <IntlMessages id="property.media.image.imageMain.description"/>
                                            </small>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </DialogContent>
                    </div>
                    <div className="card-footer">
                        <DialogActions>
                            <Button onClick={this.handleCloseDialog} className="btn btn-secondary">
                                <IntlMessages id="cancel"/>
                            </Button>
                            <Button onClick={this.SubmitDialog} className="btn  btn-primary">
                                <IntlMessages id="save"/>
                            </Button>
                            <Button onClick={this.EndTask} className="btn  btn-primary">
                                <IntlMessages id="done"/>
                            </Button>
                        </DialogActions>
                    </div>
                </div>

            </Dialog>
        )
    }
}

DialogMediaImage.propTypes = {
    classes: PropTypes.object.isRequired,
};


const FormikForm = withFormik({
    mapPropsToValues(datas) {
        var {data} = datas;
        var check = data !== null && typeof data !== "undefined";
        // console.log("data->",data);

        if (check) {
            return {
                title: data.title || '',
                primaryImage: false,
            }
        }
        return {
            title: '',
            primaryImage: false,
        }
    },
    enableReinitialize: true,

})(DialogMediaImage);

const mapStateToProp = (state) => {
    return ({
        media_fields: state.propertyFields.media_fields
    })
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        editImagePropertyMediaTab: (data_image) => {
            return dispatch(editImagePropertyMediaTab(data_image))
        }
    }
};

export default connect(mapStateToProp, mapDispatchToProps)(withStyles(styles)(withRouter(FormikForm)));
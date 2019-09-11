import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IntlMessages from "Util/IntlMessages";
import {withStyles} from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Dialog from "@material-ui/core/Dialog/Dialog";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {connect} from "react-redux";
import {updateFieldsPropertyDocumentTab,getFileServer,propertyUploadDocument} from "Actions";
import {DownloadFileFromResAPI} from "Helpers/helpers";
import {URL_SERVER} from "Constants/GeneralConfig";


const doc = require("Assets/img/file/doc.svg");
const pdf = require("Assets/img/file/pdf.svg");
const ppt = require("Assets/img/file/ppt.svg");
const xls = require("Assets/img/file/xlsx.svg");
const img = require("Assets/img/file/image.svg");
const fil = require("Assets/img/file/file.svg");
const loading = require('Assets/img/gif/loading-2.gif');



const styles = theme =>({
    loading:{
        maxHeight:'40px'
    }
});

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
    loading:{
        maxHeight:'70px'
    }
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

const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
}))(MuiDialogActions);

class TabDocument extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: [],
            status_upload:[],
            doc_type: "",
            doc_description: "",
            doc_file: null,
            checkChange: false,
            date: "",
            files_uploaded: typeof this.props.propertyDetail !== "undefined" ? this.props.propertyDetail.documents : [],
            files_delete: [],
        };
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.propertyDetail !== this.props.propertyDetail) {

            let {propertyDetail} = nextProps;
            this.setState({
                files_uploaded: typeof propertyDetail !== "undefined" ? propertyDetail.documents : [],
            })
        }
    };
    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({open: false});
    };
    handleHandChange = (event) => {
        const target = event.target;
        const value = target.name !== 'doc_file' ? target.value : target.files[0];
        const name = target.name;
        this.setState({
            [name]: value
        });
    };
    check_document_upload_status = () =>{
        let status_upload =  [].concat(this.state.status_upload);
        let waiting = status_upload.filter(item=>{return item === 0});
        let success = status_upload.filter(item=>{return item === 1});

        // console.log("waiting",waiting);
        // console.log("success",success);
        if(waiting.length === success.length) {

            return true;
        }

        return false;
    };



    handleSubmit = (event) => {
        event.preventDefault();
        let now = new Date();
        let y = now.getFullYear();
        let m = now.getMonth() + 1;
        let d = now.getDate();
        let date = '' + y + '/' + (m < 10 ? '0' : '') + m + '/' + (d < 10 ? '0' : '') + d;

        if (this.state.doc_type !== ""  && this.state.doc_file !== null) {
            this.setState({
                status_upload: [...this.state.status_upload,0],
                checkChange: true,
                open: false,
            },()=>{
                let that = this;
                this.props.propertyUploadDocument('document',this.state.doc_file).then(res=>{
                    let objectFile = {
                        file: this.state.doc_file,
                        file_doc:res.data,
                        kind:'document',
                        description: this.state.doc_description,
                        type: this.state.doc_type,
                    };
                    that.setState(prevState => ({
                        files: [...prevState.files, objectFile],
                        doc_type: "",
                        doc_description: "",
                        doc_file: null,
                        status_upload: [...this.state.status_upload,1],
                        date: date,
                    }),()=>{
                        console.log("success=========>",this.state.files)
                    });
                }).catch(err=>{
                    console.log("UPLOAD DOCUMENT ERROR");
                    that.setState({
                        status_upload: [...this.state.status_upload,1],
                    })
                });
            });
        }
    };
    typeDoc = (value) => {
        if (value === "1") {
            return <IntlMessages id="property.document.type.specifications"/>;
        } else if (value === "2") {
            return <IntlMessages id="property.document.type.price_listing_book"/>;
        } else if (value === "3") {
            return <IntlMessages id="property.document.type.brochure_photo_property"/>;
        } else {
            return <IntlMessages id="property.document.type.energy"/>;
        }
    };
    deleteFile = (index) => {
        let file = this.state.files;
        file.splice(index, 1);
        this.setState({
            files: file
        });
        // console.log(this.state.files)
    };
    deleteFileUploaded = (index) => {
        let file = this.state.files_uploaded;
        // console.log('index', file[index].id);
        let id = file[index].id;
        file.splice(index, 1);
        this.setState({
            files_uploaded: file,
            checkChange: true,
        });
        this.setState(prevState => ({
            files_delete: [...prevState.files_delete, id],

        }));

    };

    viewImage=(image_path)=>{

        this.props.getFileServer(image_path).then(res=>{
            DownloadFileFromResAPI(res);
        });
    };
    _saveToRedux = () => {
        let {checkChange} = this.state;
        let {files, files_delete} = this.state;
        let status_upload = this.check_document_upload_status();

        let {propertyFields} = this.props;
        let {preTab} = propertyFields;
        if (checkChange && (preTab === 5 || preTab === "5")) {
            // console.log("check_document_upload_status==>",status_upload);
            this.props.updateFieldsPropertyDocumentTab(files, files_delete,status_upload).then(
                this.setState({
                    checkChange: false
                })
            )
        }
    };

    render() {
        const divIcon = {
            width: '20%',
        };
        let {classes} = this.props;
        let {files, files_uploaded,status_upload} = this.state;
        this._saveToRedux();
        return (
            <div>
                {
                    !this.check_document_upload_status() &&
                    (<img src={loading}
                          className={classes.loading}
                          alt="Loading..."/>)
                }
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><IntlMessages id="property.document.file"/></TableCell>
                                <TableCell align="right"><IntlMessages id="property.document.type"/></TableCell>
                                <TableCell align="right"><IntlMessages id="property.document.description"/></TableCell>
                                <TableCell align="right"><IntlMessages id="property.document.date"/></TableCell>
                                <TableCell align="right"><IntlMessages id="property.document.action"/></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {
                                files_uploaded.map((file, index) => {
                                    if (file.kind === "document") {
                                        let logo = (/[.]/.exec(file.file_doc)) ? /[^.]+$/.exec(file.file_doc) : "";
                                        let icon = "";
                                        if (logo[0] === "pdf") {
                                            icon = pdf;
                                        } else if (logo[0] === "docx" || logo[0] === "doc") {
                                            icon = doc;
                                        } else if (logo[0] === "png" || logo[0] === "jpg" || logo[0] === "gif" || logo[0] === "svg") {
                                            icon = img;

                                        } else if (logo[0] === "ppt") {
                                            icon = ppt
                                        } else if (logo[0] === "xls" || logo[0] === "xlsx") {
                                            icon = xls

                                        } else {
                                            icon = fil
                                        }
                                        let href = URL_SERVER + file.file_doc;
                                        return (

                                            <TableRow key={index}>
                                                <TableCell style={divIcon}>
                                                    <img className="card-img-top"
                                                         style={divIcon}
                                                         src={icon}
                                                         alt="Card image cap"/>
                                                </TableCell>
                                                <TableCell align="right">{this.typeDoc(file.type)}</TableCell>
                                                <TableCell align="right">{file.description}</TableCell>
                                                <TableCell align="right">{file.created_date}</TableCell>
                                                <TableCell align="right" ><a href={href} target="_blank"><i className="zmdi zmdi-eye  zmdi-hc-3x"></i></a>   <i className="zmdi zmdi-close-circle  zmdi-hc-3x" onClick={() =>this.deleteFileUploaded(index)}></i></TableCell>
                                                {/*<TableCell align="right">*/}
                                                {/*<div onClick={()=>{this.viewImage(image_path)}}>*/}
                                                {/*<i className="zmdi zmdi-eye  zmdi-hc-3x"> </i>*/}
                                                {/*</div>*/}
                                                {/*<i className="zmdi zmdi-close-circle  zmdi-hc-3x"*/}
                                                {/*onClick={() => this.deleteFileUploaded(index)}>*/}

                                                {/*</i>*/}
                                                {/*</TableCell>*/}
                                            </TableRow>


                                        );
                                    }
                                })
                            }
                            {
                                files.map((file, index) => {
                                    let logo = (/[.]/.exec(file.file.name)) ? /[^.]+$/.exec(file.file.name) : "";
                                    let icon = "";
                                    if (logo[0] === "pdf") {
                                        icon = pdf;
                                    } else if (logo[0] === "docx" || logo[0] === "doc") {
                                        icon = doc;
                                    } else if (logo[0] === "png" || logo[0] === "jpg" || logo[0] === "gif" || logo[0] === "svg") {
                                        icon = img;

                                    } else if (logo[0] === "ppt") {
                                        icon = ppt
                                    } else if (logo[0] === "xls" || logo[0] === "xlsx") {
                                        icon = xls

                                    } else {
                                        icon = fil
                                    }

                                    return (
                                        <TableRow key={index}>
                                            <TableCell style={divIcon}>
                                                <img className="card-img-top"
                                                     style={divIcon}
                                                     src={icon}
                                                     alt="Card image cap"/>
                                            </TableCell>
                                            <TableCell align="right">{this.typeDoc(file.type)}</TableCell>
                                            <TableCell align="right">{file.description}</TableCell>
                                            <TableCell align="right">{this.state.date}</TableCell>
                                            <TableCell align="right">
                                                <i className="zmdi zmdi-close-circle  zmdi-hc-3x"
                                                  onClick={() => this.deleteFile(index)}> </i>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </Paper>
                <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.open}
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        <IntlMessages id="property.document.load_file"/>
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            <IntlMessages id="property.document.explain"/>
                        </Typography>
                        <div className="row">
                            <div className="col-6">
                                <FormControl className="form-group ">
                                    <label className="col-form-label">{<IntlMessages
                                        id="property.document.type"/>}</label>
                                    <div>
                                        <div className="heightIP40">
                                            <Select
                                                className="form-control"
                                                name="doc_type"
                                                onChange={this.handleHandChange}
                                                value={this.state.doc_type}
                                                displayEmpty
                                            >
                                                <MenuItem value="" disabled>
                                                    {<IntlMessages id="property.marketing.select"/>}
                                                </MenuItem>
                                                <MenuItem value={"1"}>{<IntlMessages
                                                    id="property.document.type.specifications"/>}</MenuItem>
                                                <MenuItem value={"2"}>{<IntlMessages
                                                    id="property.document.type.price_listing_book"/>}</MenuItem>
                                                <MenuItem value={"3"}>{<IntlMessages
                                                    id="property.document.type.brochure_photo_property"/>}</MenuItem>
                                                <MenuItem value={"4"}>{<IntlMessages
                                                    id="property.document.type.energy"/>}</MenuItem>
                                                <MenuItem value={"5"}>{<IntlMessages
                                                    id="property.document.type.plan"/>}</MenuItem>
                                                <MenuItem value={"6"}>{<IntlMessages
                                                    id="property.document.type.autre"/>}</MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                </FormControl>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <FormControl className="form-group">
                                    <label className="col-form-label">{<IntlMessages
                                        id="property.document.description"/>}</label>
                                    <div>
                                        <div className="heightIP40">
                                            <input type="text"
                                                   className="form-control"
                                                   name="doc_description"
                                                   onChange={this.handleHandChange}

                                            />
                                            {/*{this.props.touched.streetname &&<FormHelperText>{this.props.errors.streetname}</FormHelperText>}*/}
                                        </div>
                                    </div>
                                </FormControl>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <FormControl className="form-group">
                                    <label className="col-form-label">{<IntlMessages
                                        id="property.document.file_name"/>}</label>
                                    <div>
                                        <div className="heightIP40">
                                            <input className="upload" type="file" name="doc_file"
                                                   onChange={this.handleHandChange}/>
                                            {/*{this.props.touched.streetname &&<FormHelperText>{this.props.errors.streetname}</FormHelperText>}*/}
                                        </div>
                                    </div>
                                </FormControl>
                            </div>
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
                </Dialog>
                <div className="text-right mt-2">
                    <button className="btn btn-primary " onClick={this.handleClickOpen}>{<IntlMessages
                        id="property.document.upload"/>}</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        uploadDocument: state.uploadDocument,
        propertyFields: state.propertyFields
    })

};
const mapDispatchToProps = (dispatch, props) => {
    return {
        updateFieldsPropertyDocumentTab: (fields, files_delete,status_upload) => {
            return dispatch(updateFieldsPropertyDocumentTab(fields, files_delete,status_upload))
        },
        getFileServer:(filePath)=>{
            return dispatch(getFileServer(filePath));
        },
        propertyUploadDocument:(type,file)=>{
            return dispatch(propertyUploadDocument(type,file))
        }

    }
};
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TabDocument));
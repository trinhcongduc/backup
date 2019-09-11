import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IntlMessages from "Util/IntlMessages";
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Dialog from "@material-ui/core/Dialog/Dialog";
import FormControl from "@material-ui/core/FormControl/FormControl";
import {connect} from "react-redux";
import {uploadDocument, getAllFile,deleteDocument} from "Actions";
const doc =  require("Assets/img/file/doc.svg");
const pdf =  require("Assets/img/file/pdf.svg");
const ppt =  require("Assets/img/file/ppt.svg");
const xls =  require("Assets/img/file/xlsx.svg");
const img =  require("Assets/img/file/image.svg");
const fil =  require("Assets/img/file/file.svg");
import {URL_SERVER} from "Constants/GeneralConfig";

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
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
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
class DocAdmin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open : false,
            doc_description:"",
            doc_file: null,
            all_file: [],
        };
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        this.props.getAllFile(this.props.category).then((resolve) => {
            this.setState({
                all_file:  this.props.all_file,
            })
            console.log("all_file", this.props.all_file)
            console.log("all_file", this.state.all_file)
        });

    }
    componentWillReceiveProps  = (nextProps) => {
        if(nextProps.all_file!== this.props.all_file){

            this.setState({
                all_file:  nextProps.all_file,
            })
        }
    }
    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleHandChange = (event) =>{
        const target = event.target;
        const value = target.name!=='doc_file'?target.value:target.files[0];
        const name = target.name;
        this.setState({
            [name]: value
        });
    };
    handleSubmit=(event) =>{
        event.preventDefault();
        var objectFile = {
            file : this.state.doc_file,
            description : this.state.doc_description,
            category : this.props.category
        };
        if(this.state.doc_description !=="" && this.state.doc_file!== null){
            this.props.uploadDocument(objectFile).then(
                    this.setState({
                        file : "",
                        description : null,
                        open : false
                    })
            );
        }
    };
    deleteFile = (id,category) =>{
        this.props.deleteDocument(id,this.props.category)
        // var file = this.state.files;
        // file.splice(index,1);
        // this.setState({
        //     files: file
        // });
        // console.log(this.state.files)
    };
    // deleteFileUploaded = (index) =>{
    //     var file = this.state.files_uploaded;
    //     console.log('index',file[index].id);
    //     var id = file[index].id;
    //     file.splice(index,1);
    //     this.setState({
    //         files_uploaded: file,
    //         checkChange:true,
    //     });
    //     this.setState(prevState => ({
    //         files_delete: [...prevState.files_delete,id],
    //
    //     }));
    //
    // }
    // _saveToRedux=()=>{
    //     var {checkChange} =  this.state;
    //     var {files,files_delete} = this.state;
    //     var {propertyFields} =  this.props;
    //     var {preTab} =  propertyFields;
    //     if(checkChange &&( preTab ===5|| preTab ==="5")){
    //         this.props.updateFieldsPropertyDocumentTab(files,files_delete).then(
    //             this.setState({
    //                 checkChange : false
    //             })
    //         )
    //     }
    // };
    render(){
        const divIcon = {
            width: '20%',
        };
        // var {uploadDocument}= this.props;
        // this._saveToRedux();
        return(
            <div>
                <Paper >
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell ><IntlMessages id="property.document.file"/></TableCell>
                                <TableCell align="right"><IntlMessages id="property.document.description"/></TableCell>
                                <TableCell align="right"><IntlMessages id="property.document.date"/></TableCell>
                                <TableCell align="right"><IntlMessages id="property.document.action"/></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.all_file.map((file,index) =>{
                                        var logo = (/[.]/.exec(file.file_doc)) ? /[^.]+$/.exec(file.file_doc) : "";
                                        var icon = "";
                                        if(logo[0]==="pdf"||logo[0]==="PDF"){
                                            icon = pdf;
                                        }
                                        else if(logo[0]==="docx"||logo[0]==="doc"||logo[0]==="DOCX"||logo[0]==="DOC"){
                                            icon = doc;
                                        }
                                        else if(logo[0]==="png"||logo[0]==="jpg"||logo[0]==="gif"||logo[0]==="svg"||logo[0]==="PNG"||logo[0]==="JPG"||logo[0]==="GIF"||logo[0]==="SVG")
                                        {
                                            icon = img;

                                        }
                                        else if(logo[0]==="ppt"||logo[0]==="PPT"){
                                            icon = ppt
                                        }
                                        else if(logo[0]==="xls"||logo[0]==="xlsx"||logo[0]==="XLS"||logo[0]==="XLSX"){
                                            icon = xls

                                        }
                                        else {
                                            icon = fil
                                        }
                                        var href = URL_SERVER + file.file_doc;
                                        return(
                                            <TableRow key={index}>
                                                <TableCell style={divIcon}><img className="card-img-top" style={divIcon} src={icon} alt="Card image cap"/></TableCell>
                                                <TableCell align="right">{file.description}</TableCell>
                                                <TableCell align="right">{file.created_date}</TableCell>
                                                <TableCell align="right" ><a href={href} target="_blank"><i className="zmdi zmdi-eye  zmdi-hc-3x"></i></a>   <i className="zmdi zmdi-close-circle  zmdi-hc-3x" onClick={() =>this.deleteFile(file.id)}></i></TableCell>
                                            </TableRow>
                                        );
                                })
                            }
                            {/*{*/}
                                {/*files.map((file,index) =>{*/}
                                    {/*var logo = (/[.]/.exec(file.file.name)) ? /[^.]+$/.exec(file.file.name) : "";*/}
                                    {/*var icon = "";*/}
                                    {/*if(logo[0]==="pdf"){*/}
                                        {/*icon = pdf;*/}
                                    {/*}*/}
                                    {/*else if(logo[0]==="docx"||logo[0]==="doc"){*/}
                                        {/*icon = doc;*/}
                                    {/*}*/}
                                    {/*else if(logo[0]==="png"||logo[0]==="jpg"||logo[0]==="gif"||logo[0]==="svg")*/}
                                    {/*{*/}
                                        {/*icon = img;*/}

                                    {/*}*/}
                                    {/*else if(logo[0]==="ppt"){*/}
                                        {/*icon = ppt*/}
                                    {/*}*/}
                                    {/*else if(logo[0]==="xls"||logo[0]==="xlsx"){*/}
                                        {/*icon = xls*/}

                                    {/*}*/}
                                    {/*else {*/}
                                        {/*icon = fil*/}
                                    {/*}*/}

                                    {/*return(*/}
                                        {/*<TableRow key={index}>*/}
                                            {/*<TableCell style={divIcon}><img className="card-img-top" style={divIcon} src={icon} alt="Card image cap"/></TableCell>*/}
                                            {/*<TableCell align="right">{this.typeDoc(file.type)}</TableCell>*/}
                                            {/*<TableCell align="right">{file.description}</TableCell>*/}
                                            {/*<TableCell align="right">{this.state.date}</TableCell>*/}
                                            {/*<TableCell align="right" ><i className="zmdi zmdi-close-circle  zmdi-hc-3x" onClick={() =>this.deleteFile(index)}></i></TableCell>*/}
                                        {/*</TableRow>*/}
                                    {/*);*/}
                                {/*})*/}
                            {/*}*/}
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
                                <FormControl className="form-group" >
                                    <label  className="col-form-label">{<IntlMessages id= "property.document.description" />}</label>
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
                                <FormControl className="form-group" >
                                    <label  className="col-form-label">{<IntlMessages id= "property.document.file_name" />}</label>
                                    <div>
                                        <div className="heightIP40">
                                            <input className="upload" type="file" name="doc_file" onChange={this.handleHandChange}/>
                                            {/*{this.props.touched.streetname &&<FormHelperText>{this.props.errors.streetname}</FormHelperText>}*/}
                                        </div>
                                    </div>
                                </FormControl>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button onClick={this.handleSubmit} className="btn btn-primary ">
                            {<IntlMessages id= "save" />}
                        </button>
                        <button onClick={this.handleClose} className="btn btn-danger">
                            {<IntlMessages id= "cancel" />}
                        </button>
                    </DialogActions>
                </Dialog>
                {/*{(uploadDocument==="1")?<div className="text-right mt-2">*/}
                {/*<button className="btn btn-primary " onClick={this.handleClickOpen}>{<IntlMessages id= "property.document.upload"/>}</button>*/}
                {/*</div>:""}*/}
                <div className="text-right mt-2">
                    <button className="btn btn-primary " onClick={this.handleClickOpen}>{<IntlMessages id= "property.document.upload"/>}</button>
                </div>
            </div>
        )
    }
}
const  mapStateToProps = (state)=>{
    return({
        all_file : state.documents.documents,
    })

};
const mapDispatchToProps = (dispatch, props) => {
    return {
        uploadDocument:(file)=>{
            return dispatch(uploadDocument(file))
        },
        deleteDocument:(id,category)=>{
            return dispatch(deleteDocument(id,category))
        },
        getAllFile: (category) => dispatch(getAllFile(category))

    }
};
export default connect(mapStateToProps,mapDispatchToProps)(DocAdmin);
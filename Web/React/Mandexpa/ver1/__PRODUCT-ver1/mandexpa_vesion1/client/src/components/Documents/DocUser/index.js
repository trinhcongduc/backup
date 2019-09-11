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
import {connect} from "react-redux";
import {URL_SERVER} from "Constants/GeneralConfig";
import { getAllFile} from "Actions";
const doc =  require("Assets/img/file/doc.svg");
const pdf =  require("Assets/img/file/pdf.svg");
const ppt =  require("Assets/img/file/ppt.svg");
const xls =  require("Assets/img/file/xlsx.svg");
const img =  require("Assets/img/file/image.svg");
const fil =  require("Assets/img/file/file.svg");


// const DialogTitle = withStyles(theme => ({
//     root: {
//         borderBottom: `1px solid ${theme.palette.divider}`,
//         margin: 0,
//         padding: theme.spacing.unit * 2,
//     },
//     closeButton: {
//         position: 'absolute',
//         right: theme.spacing.unit,
//         top: theme.spacing.unit,
//         color: theme.palette.grey[500],
//     },
// }))(props => {
//     const { children, classes, onClose } = props;
//     return (
//         <MuiDialogTitle disableTypography className={classes.root}>
//             <Typography variant="h6">{children}</Typography>
//             {onClose ? (
//                 <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
//                     <CloseIcon />
//                 </IconButton>
//             ) : null}
//         </MuiDialogTitle>
//     );
// });

// const DialogContent = withStyles(theme => ({
//     root: {
//         margin: 0,
//         padding: theme.spacing.unit * 2,
//     },
// }))(MuiDialogContent);
//
// const DialogActions = withStyles(theme => ({
//     root: {
//         borderTop: `1px solid ${theme.palette.divider}`,
//         margin: 0,
//         padding: theme.spacing.unit,
//     },
// }))(MuiDialogActions);
class DocUser extends Component{
    constructor(props) {
        super(props);
        this.state = {
            all_file: [],
        };
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {

        switch (this.props.category) {
            case 'order-invoices':{

                break;
            }
            default :{
                this.props.getAllFile(this.props.category).then((resolve) => {
                    this.setState({
                        all_file:  this.props.all_file,
                    })
                });
            }
        }



    }
    componentWillReceiveProps  = (nextProps) => {
        if(nextProps.all_file!== this.props.all_file){

            this.setState({
                all_file:  nextProps.all_file,
            })
        }
    }
    render(){
        const divIcon = {
            width: '20%',
        };
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
                                    var href = URL_SERVER+ file.file_doc;
                                    return(
                                        <TableRow key={index}>
                                            <TableCell style={divIcon}><img className="card-img-top" style={divIcon} src={icon} alt="Card image cap"/></TableCell>
                                            <TableCell align="right">{file.description}</TableCell>
                                            <TableCell align="right">{file.created_date}</TableCell>
                                            <TableCell align="right" ><a href={href} target="_blank"><i className="zmdi zmdi-eye  zmdi-hc-3x"></i></a></TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </Paper>
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
        getAllFile: (category) => dispatch(getAllFile(category))

    }
};
export default connect(mapStateToProps,mapDispatchToProps)(DocUser);
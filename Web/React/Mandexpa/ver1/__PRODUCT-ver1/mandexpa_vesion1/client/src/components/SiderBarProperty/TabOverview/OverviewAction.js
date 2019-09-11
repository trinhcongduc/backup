import React, { Component } from 'react';
import IntlMessages from "Util/IntlMessages";
import {getFilePDF} from "Actions";
import {URL_SERVER} from "Constants/GeneralConfig";
import ButtonAgenda from "../ButtonAgenda";
import {getAccountCurrent} from "Helpers/helpers";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {withStyles} from "@material-ui/core";
const portrait =  require("Assets/img/pdf_brochure_demo/portrait.png");
const landscape =  require("Assets/img/pdf_brochure_demo/landscape.png");
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
class OverviewAction extends Component{
    constructor(props) {
        super(props);
        this.state = {
           loading : false,
            openDialog: false,
            selected: "1",
        }
    }
    _close = () => {
        this.setState({
            openDialog: false
        });
    };
    handleClose = () => {
        this.setState({
            openDialog: false,
        });
    };
    handleOpenDialog = () => {
        this.setState({
            openDialog: true
        });
    };
    SubmitDialog = (type_print) => {
        this.print_PDF(type_print);
        this._close();
    };
    print_PDF = async (type_print) => {
        this.setState({ loading : true,openDialog: false})
        let id = this.props.propertyDetail.property.id;
        let data={
            id:id,
            type_print:type_print
        }
        try {
            let path = await getFilePDF(data)
            this.setState({ loading : false})
            if(path=== null || path === undefined || path === ""){
                alert("Not found")
            }
            else {
                let url = URL_SERVER + path.data;
                let win = window.open(url,'_blank');
                win.focus();
            }

        }
        catch (e) {
            this.setState({ loading : false})
            alert("Not found")
        }

    };
    render(){
        const {openDialog} = this.state;
        let user_id = getAccountCurrent().id;
        let created_by = this.props.propertyDetail?this.props.propertyDetail.property.created_by:getAccountCurrent().id;
        return(
            <div>
                <Dialog
                    open={openDialog}
                    fullWidth={true}
                    onClose={this.handleClose}
                    maxWidth="md"
                    aria-labelledby="form-dialog-title"
                >
                            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                                Propriété
                            </DialogTitle>
                            <DialogContent>
                               <div className="row">
                                    <div className="col-sm-5">

                                            <img className="click-img" src={portrait} onClick={() => this.SubmitDialog('1')}/>

                                    </div>

                                    <div className="col-sm-7">

                                            <img className="click-img" src={landscape} onClick={() => this.SubmitDialog('2')} />


                                    </div>
                               </div>
                            </DialogContent>


                            <DialogActions>

                            </DialogActions>
                </Dialog>
            <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <IntlMessages id="property.general.print_brochure"/>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-2 col-md-2 col-lg-2"  >
                                    {this.state.loading?<div className="text-center iconMg1 loading1">
                                        <p>
                                            <img src="http://www.green4future.in/theme/green/images/loading.gif" className="loading" alt="Loading..."/>
                                        </p>
                                    </div>:
                                        <i className="zmdi zmdi-assignment zmdi-hc-2x  iconMg1 " onClick={this.handleOpenDialog}>
                                        </i>
                                    }

                                </div>
                                <div className="col-sm-10 col-md-10 col-lg-10">
                                    <IntlMessages id="property.general.print_brochure.description"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    {/*<div className="card">*/}
                        {/*<div className="card-header">*/}
                            {/*<IntlMessages id="property.general.find_buyer"/>*/}
                        {/*</div>*/}
                        {/*<div className="card-body">*/}
                            {/*<div className="row">*/}
                                {/*<div className="col-sm-2 col-md-2 col-lg-2">*/}
                                    {/*<i className="zmdi zmdi-search-in-file zmdi-hc-2x"> </i>*/}
                                {/*</div>*/}
                                {/*<div className="col-sm-10 col-md-10 col-lg-10">*/}
                                    {/*<IntlMessages id="property.general.find_buyer.description"/>*/}
                                {/*</div>*/}
                            {/*</div>*/}

                        {/*</div>*/}
                    {/*</div>*/}

                </div>
                {(this.props.propertyDetail && user_id !== created_by) ?
                <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <IntlMessages id="property.general.book_viewing"/>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-2 col-md-2 col-lg-2">
                                    <div>
                                        <ButtonAgenda propertyDetail={this.props.propertyDetail}/>
                                    </div>

                                </div>
                                <div className="col-sm-10 col-md-10 col-lg-10">

                                    <IntlMessages id="property.general.book_viewing.description"/>
                                </div>
                            </div>

                        </div>
                    </div>
                    <br/>
                    {/*<div className="card">*/}
                        {/*<div className="card-header">*/}
                            {/*<IntlMessages id="property.general.upload_document"/>*/}
                        {/*</div>*/}
                        {/*<div className="card-body">*/}
                            {/*<div className="row">*/}
                                {/*<div className="col-sm-2 col-md-2 col-lg-2">*/}
                                    {/*<i className="zmdi zmdi-upload zmdi-hc-2x"> </i>*/}
                                {/*</div>*/}
                                {/*<div className="col-sm-10 col-md-10 col-lg-10">*/}
                                    {/*<IntlMessages id="property.general.upload_document.description"/>*/}
                                {/*</div>*/}
                            {/*</div>*/}

                        {/*</div>*/}
                    {/*</div>*/}
                </div>
                    :""}

            </div>
            </div>
        )
    }
}
export default OverviewAction;
import React, {Component} from 'react';

import IntlMessages from "Util/IntlMessages";
import {withStyles} from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Dialog from "@material-ui/core/Dialog/Dialog";
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

import SelectAutoComplete from "Components/ComponentHelper/SelectAutoComplete";
import {createHost, getAllCountry, getListContact, chooseHost} from "Actions";
import connect from "react-redux/es/connect/connect";
import {withFormik} from "formik";
import * as Yup from "yup";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Paper from "@material-ui/core/Paper/Paper";

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

const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
}))(MuiDialogActions);

class DialogHostProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            info: true
        };
    }

    componentWillMount() {
        this.props.getListContact();
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };
    handleClickList = () => {
        this.setState({
            info: !this.state.info,
        });
    };
    chooseHost = (info_contact) => {
        this.props.chooseHost(info_contact, this.props.name);
        this.setState({open: false, info: true});
    }
    handleClose = () => {
        this.setState({open: false, info: true});
    };
    handldeChangeCountry = value => {
        this.props.setFieldValue("country_id", value);
    }
    handleSubmit = () => {
        var {
            source_prospect,
            firstname,
            lastname,
            email,
            telephone,
            mobile,
            streetname
        } = this.props.values;
        if (firstname !== "" && lastname !== "" && email !== "" && mobile !== "" ) {
            this.setState({open: false});
        }
    }

    render() {
        const divStyle = {
            cursor: 'pointer',
            color: '#614194',
        };
        const {countries, contacts} = this.props;
        return (
            <div>

                {this.state.info ?
                    <Dialog
                        onClose={this.handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={this.state.open}
                        fullWidth={true}
                        maxWidth={"md"}
                    >
                        <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                            Ajouter
                        </DialogTitle>
                        <DialogContent>
                            <div>
                                <form onSubmit={this.props.handleSubmit}>
                                    <div>
                                        <div className="card">
                                            <div className="card-header">

                                            </div>
                                            <div className="card-body">
                                                <div className="">
                                                    <div className="">
                                                        {/* <FormControl className="form-group"
                                                                     error={!!this.props.errors.source_prospect}>
                                                            <label className="obligateField"><span
                                                                className="obligate">*</span>{<IntlMessages
                                                                id="property.main.source_prospect"/>}</label>
                                                            <div className="heightIP40 col-8">
                                                                <div>
                                                                    <input type="text"
                                                                           className="form-control"
                                                                           name="source_prospect"
                                                                           value={this.props.values.source_prospect}
                                                                           onChange={this.props.handleChange}
                                                                           onBlur={this.props.handleBlur}
                                                                    />
                                                                    {this.props.touched.source_prospect &&
                                                                    <FormHelperText>{this.props.errors.source_prospect}</FormHelperText>}
                                                                </div>
                                                            </div>
                                                        </FormControl> */}
                                                    </div>
                                                    <div className="">
                                                        <div className="mt-3">
                                                            <button className="btn btn-primary mt-3"
                                                                    onClick={this.handleClickList
                                                                    }>{<IntlMessages
                                                                id="propery.main.choose_existing"/>}</button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header">
                                            <IntlMessages id="property.main.host.communication"/>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col-sm-6 col-12">
                                                            <FormControl className="form-group">
                                                                <label className="col-form-label ">{<IntlMessages
                                                                    id="contact.title"/>}</label>
                                                                <div className=" noPadding heightIP40">
                                                                    <div className="col-sm-6 col-12">
                                                                        <Select
                                                                            className="form-control "
                                                                            name="title"
                                                                            value={this.props.values.title}
                                                                            onChange={this.props.handleChange}
                                                                            displayEmpty
                                                                        >
                                                                            <MenuItem value="" disabled>
                                                                                {<IntlMessages
                                                                                    id="contact.selecttitle"/>}
                                                                            </MenuItem>
                                                                            <MenuItem value={"Mr"}>{<IntlMessages
                                                                                id="contact.mr"/>}</MenuItem>
                                                                            <MenuItem value={"Mrs"}>{<IntlMessages
                                                                                id="contact.mrs"/>}</MenuItem>
                                                                        </Select>
                                                                    </div>
                                                                </div>
                                                            </FormControl>
                                                        </div>
                                                        <div className="col-sm-6 col-12">
                                                            <FormControl className="form-group"
                                                                         error={!!this.props.errors.telephone}>
                                                                <label className="col-form-label">{<IntlMessages
                                                                    id="contact.home_phone"/>}</label>
                                                                <div>
                                                                    <div className="heightIP40 col-sm-6 col-12">
                                                                        <input type="text"
                                                                               className="form-control"
                                                                               name="telephone"
                                                                               value={this.props.values.telephone}
                                                                               onChange={this.props.handleChange}
                                                                               onBlur={this.props.handleBlur}
                                                                        />
                                                                        {this.props.touched.telephone &&
                                                                        <FormHelperText>{this.props.errors.telephone}</FormHelperText>}
                                                                    </div>
                                                                </div>
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6 col-12">
                                                            <FormControl className="form-group"
                                                                         error={!!this.props.errors.company}>
                                                                <label className="col-form-label">{<IntlMessages
                                                                    id="contact.company"/>}</label>
                                                                <div>
                                                                    <div className="heightIP40 col-sm-6 col-12">
                                                                        <input type="text"
                                                                               className="form-control"
                                                                               name="company"
                                                                               value={this.props.values.company}
                                                                               onChange={this.props.handleChange}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </FormControl>
                                                        </div>
                                                        <div className="col-sm-6 col-12">
                                                            <FormControl className="form-group"
                                                                         error={!!this.props.errors.mobile}>
                                                                <label className="col-form-label obligateField"><span
                                                                    className="obligate">*</span>{<IntlMessages
                                                                    id="contact.cell_phone"/>}</label>
                                                                <div>
                                                                    <div className="heightIP40 col-sm-6 col-12">
                                                                        <input type="text"
                                                                               className="form-control"
                                                                               name="mobile"
                                                                               value={this.props.values.mobile}
                                                                               onChange={this.props.handleChange}
                                                                               onBlur={this.props.handleBlur}
                                                                        />
                                                                        {this.props.touched.mobile &&
                                                                        <FormHelperText>{this.props.errors.mobile}</FormHelperText>}
                                                                    </div>
                                                                </div>
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6 col-12">
                                                            <FormControl className="form-group"
                                                                         error={!!this.props.errors.firstname}>
                                                                <label className="col-form-label obligateField"><span
                                                                    className="obligate">*</span>{<IntlMessages
                                                                    id="contact.first_name"/>}</label>
                                                                <div>
                                                                    <div className="heightIP40 col-sm-6 col-12">
                                                                        <input type="text"
                                                                               className="form-control"
                                                                               name="firstname"
                                                                               placeholder=""
                                                                               value={this.props.values.firstname}
                                                                               onChange={this.props.handleChange}
                                                                               onBlur={this.props.handleBlur}
                                                                        />
                                                                        {this.props.touched.firstname &&
                                                                        <FormHelperText>{this.props.errors.firstname}</FormHelperText>}
                                                                    </div>
                                                                </div>
                                                            </FormControl>
                                                        </div>
                                                        <div className="col-sm-6 col-12">
                                                            <FormControl className="email"
                                                                         error={!!this.props.errors.email}>
                                                                <label className="col-form-label obligateField"><span
                                                                    className="obligate">*</span>{<IntlMessages
                                                                    id="contact.email"/>}</label>
                                                                <div>
                                                                    <div className="heightIP40 col-sm-6 col-12">
                                                                        <input type="text"
                                                                               className="form-control"
                                                                               name="email"
                                                                               value={this.props.values.email}
                                                                               onChange={this.props.handleChange}
                                                                               onBlur={this.props.handleBlur}
                                                                        />
                                                                        {this.props.touched.email &&
                                                                        <FormHelperText>{this.props.errors.email}</FormHelperText>}
                                                                    </div>
                                                                </div>
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6 col-12">
                                                            <FormControl className="form-group"
                                                                         error={!!this.props.errors.lastname}>
                                                                <label className="col-form-label obligateField"> <span
                                                                    className="obligate">*</span>{<IntlMessages
                                                                    id="contact.last_name"/>}</label>
                                                                <div>
                                                                    <div className="heightIP40 col-sm-6 col-12">
                                                                        <input type="text"
                                                                               className="form-control"
                                                                               name="lastname"
                                                                               placeholder=""
                                                                               value={this.props.values.lastname}
                                                                               onChange={this.props.handleChange}
                                                                               onBlur={this.props.handleBlur}
                                                                        />
                                                                        {this.props.touched.lastname &&
                                                                        <FormHelperText>{this.props.errors.lastname}</FormHelperText>}
                                                                    </div>
                                                                </div>
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header">
                                            Adresse
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-3 col-12">
                                                    <FormControl className="form-group">
                                                        <label>{<IntlMessages id="contact.type"/>}</label>
                                                        <div className="heightIP40">
                                                            <div>
                                                                <Select
                                                                    className="form-control"
                                                                    name="type"
                                                                    value={this.props.values.type}
                                                                    onChange={this.props.handleChange}
                                                                    displayEmpty
                                                                >
                                                                    <MenuItem value="" disabled>
                                                                        {<IntlMessages id="contact.selecttype"/>}
                                                                    </MenuItem>
                                                                    <MenuItem value={"Office"}>{<IntlMessages
                                                                        id="contact.office"/>}</MenuItem>
                                                                    <MenuItem value={"Office address"}>{<IntlMessages
                                                                        id="contact.officeaddress"/>}</MenuItem>
                                                                    <MenuItem value={"Office 2"}>{<IntlMessages
                                                                        id="contact.office2"/>}</MenuItem>
                                                                    <MenuItem value={"Residence"}>{<IntlMessages
                                                                        id="contact.residence"/>}</MenuItem>
                                                                    <MenuItem value={"Other address"}>{<IntlMessages
                                                                        id="contact.otheraddress"/>}</MenuItem>
                                                                    <MenuItem value={"Mailing address"}>{<IntlMessages
                                                                        id="contact.mailingaddress"/>}</MenuItem>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    </FormControl>
                                                </div>
                                                <div className="col-sm-3 col-12">
                                                    <FormControl className="form-group">
                                                        <label className="obligateField">{<IntlMessages
                                                            id="contact.app"/>}</label>
                                                        <div>
                                                            <div className="heightIP40">
                                                                <input type="text"
                                                                       className="form-control "
                                                                       name="unit"
                                                                       value={this.props.values.unit}
                                                                       onChange={this.props.handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </FormControl>
                                                </div>
                                                <div className="col-sm-3 col-12">
                                                    <FormControl className="form-group"
                                                                 error={!!this.props.errors.streetname}>
                                                        <label className="obligateField">{<IntlMessages
                                                            id="contact.street_name"/>}</label>
                                                        <div>
                                                            <div className="heightIP40">
                                                                <input type="text"
                                                                       className="form-control "
                                                                       name="streetname"
                                                                       value={this.props.values.streetname}
                                                                       onChange={this.props.handleChange}
                                                                       onBlur={this.props.handleBlur}
                                                                />
                                                                {this.props.touched.streetname &&
                                                                <FormHelperText>{this.props.errors.streetname}</FormHelperText>}
                                                            </div>
                                                        </div>
                                                    </FormControl>
                                                </div>
                                                <div className="col-sm-3 col-12">
                                                    <FormControl className="form-group ">
                                                        <label>{<IntlMessages id="contact.street_number"/>}</label>
                                                        <div>
                                                            <div className="heightIP40">
                                                                <input type="text"
                                                                       className="form-control "
                                                                       name="streetnumber"
                                                                       value={this.props.values.streetnumber}
                                                                       onChange={this.props.handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </FormControl>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-3 col-12">
                                                    <FormControl className="form-group ">
                                                        <label><span></span>{<IntlMessages id="contact.city"/>}</label>
                                                        <div>
                                                            <div className="heightIP40">
                                                                <input type="text"
                                                                       className="form-control "
                                                                       name="city"
                                                                       value={this.props.values.city}
                                                                       onChange={this.props.handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </FormControl>
                                                </div>
                                                <div className="col-sm-3 col-12">
                                                    <FormControl className="form-group ">
                                                        <label>{<IntlMessages id="contact.country"/>}</label>
                                                        <div>
                                                            <div className="heightIP40 selectCountry">
                                                                {countries.length ? (
                                                                    <SelectAutoComplete listOption={countries}
                                                                                        onChange={this.handldeChangeCountry}/>) : null}

                                                            </div>
                                                        </div>
                                                    </FormControl>
                                                </div>
                                                <div className="col-sm-3 col-12">
                                                    <FormControl className="form-group">
                                                        <label>{<IntlMessages id="contact.zipcode"/>}</label>
                                                        <div>
                                                            <div className="heightIP40 noPadding">
                                                                <input type="text"
                                                                       className="form-control"
                                                                       name="zipcode"
                                                                       value={this.props.values.zipcode}
                                                                       onChange={this.props.handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="text-right">
                                        <button type="submit" className="btn btn-primary"
                                                disabled={this.props.isSubmitting} onClick={this.handleSubmit}>{
                                            <IntlMessages id="submit"/>}</button>
                                    </div>
                                </form>
                            </div>
                        </DialogContent> </Dialog> :
                    <Dialog
                        onClose={this.handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={this.state.open}
                        fullWidth={true}
                        maxWidth={"md"}
                    >
                        <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                            Ajouter
                        </DialogTitle>
                        <DialogContent>
                            <div>
                                <div>
                                    <div className="card">
                                        <div className="card-header">
                                            <IntlMessages id="propery.host.find_contact"/>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-6 col-12"><p>{<IntlMessages
                                                    id="propery.main.choose_contact"/>}</p>
                                                </div>
                                                <div className="col-sm-6 col-12">
                                                    <button className="btn btn-primary col-sm-6 col-12"
                                                            onClick={this.handleClickList}>{<IntlMessages
                                                        id="propery.main.create_contact"/>}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="card">
                                        <div className="card-header">
                                            <IntlMessages id="propery.host.find_contact"/>
                                        </div>
                                        <div className="card-body">
                                            <Paper>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align="right"><IntlMessages
                                                                id="property.contact.name"/></TableCell>
                                                            <TableCell align="right"><IntlMessages
                                                                id="property.contact.address"/></TableCell>
                                                            <TableCell align="right"><IntlMessages
                                                                id="property.contact.telephone"/></TableCell>
                                                            <TableCell align="right"><IntlMessages
                                                                id="property.contact.mobile"/></TableCell>
                                                            <TableCell align="right"><IntlMessages
                                                                id="property.contact.email"/></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            contacts.map((contact, index) => {
                                                                var info_contact = {
                                                                    name: contact.firstname + ' ' + contact.lastname,
                                                                    id: contact.id
                                                                };
                                                                return (
                                                                    <TableRow key={index}>
                                                                        <TableCell style={divStyle} align="right"
                                                                                   onClick={() => this.chooseHost(info_contact)}>{contact.firstname + ' ' + contact.lastname}</TableCell>
                                                                        <TableCell
                                                                            align="right">{contact.streetnumber + ',' + contact.streetname + ',' + contact.city}</TableCell>
                                                                        <TableCell
                                                                            align="right">{contact.telephone}</TableCell>
                                                                        <TableCell
                                                                            align="right">{contact.mobile}</TableCell>
                                                                        <TableCell
                                                                            align="right">{contact.email}</TableCell>
                                                                    </TableRow>
                                                                );
                                                            })
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </Paper>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogContent> </Dialog>}
                <span style={divStyle}>
                    <button className="btn btn-primary"
                            onClick={this.handleClickOpen}>
                        <IntlMessages id="property.main.host.add"/>
                    </button>
                </span>
            </div>
        )
    }
}

const createForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues(datas) { // Init form field
        return {
            source_prospect: "",
            title: "",
            company: "",
            firstname: "",
            lastname: "",
            type: "",
            unit: "",
            streetname: "",
            streetnumber: "",
            country_id: {},
            zipcode: "",
            telephone: "",
            mobile: "",
            email: "",
            city: "",
        }
    },

    validationSchema: Yup.object().shape({ // Validate form field
        firstname: Yup.string()
            .required((<IntlMessages id='noti.first.name.required'/>)),
        lastname: Yup.string()
            .required((<IntlMessages id='noti.last.name.required'/>)),
        mobile: Yup.number()
            .typeError((<IntlMessages id='noti.not.phoneNumber'/>))
            .positive((<IntlMessages id='noti.phone.minus'/>))
            .required((<IntlMessages id='noti.phone.required'/>)),
        email: Yup.string()
            .required((<IntlMessages id='noti.email.required'/>))
            .email((<IntlMessages id='noti.enterEmail'/>))
    }),
    handleSubmit(values, {props, setSubmitting, resetForm}) {
        setSubmitting(false);
        values.country_id = JSON.stringify(values.country_id);
        var {
            firstname,
            lastname,
            email,
            mobile,
        } = values;
        if (firstname !== "" && lastname !== "" && email !== "" && mobile !== "" ) {
            props.createHost(values, props.name);
            resetForm();
            props.getListContact();

        }
    },
})(DialogHostProperty);
const mapStateToProp = (state) => {
    return ({
        propertyField: state.propertyField,
        countries: state.country,
        contacts: state.contact.contacts
    })
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        createHost: (data, host) => {
            return dispatch(createHost(data, host));
        },
        chooseHost: (data, host) => {
            return dispatch(chooseHost(data, host));
        },
        getAllCountry: () => {
            return dispatch(getAllCountry());
        },
        getListContact: () => {
            return dispatch(getListContact());
        }
    }
};
export default connect(mapStateToProp, mapDispatchToProps)(createForm);
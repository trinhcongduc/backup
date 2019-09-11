import React from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import {getDeleteContactByID, getListContact,getReceiveMailByID} from 'Actions/index'
import IntlMessages from "Util/IntlMessages";

import ContactTableToolbar from  "./ContactTableToolbar";
import ContactTableHead from "./ContactTableHead";
import {Link} from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
let counter = 0;
function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function createData(id,name,telephone,email,mobile,city,country_name,zipcode,address,state_email) {
    counter += 1;
    return { index: counter,id,name,telephone,email,mobile,city,country_name,zipcode,address,state_email };
}
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {
    state = {
        order: 'desc',
        orderBy: 'name',
        selected: [],
        data: [],
        page: 0,
        rowsPerPage: 10,
        open: false,
        id_contact : null,
        open_email: false,
        id_mail_contact : null,
    };

    componentWillMount() {
        this.props.getListContact();
    }
    componentWillReceiveProps(nextProps, nextContext) {
        var {contacts} =  nextProps;
        if(contacts && typeof contacts !== "undefined"){
            try {
                var datas = contacts.map((contact)=>{
                    var firstname = (contact.firstname)?contact.firstname:"";
                    var lastname = (contact.lastname)?contact.lastname:"";
                    var name = firstname + " " + lastname;
                    var streetnumber = (contact.streetnumber)?contact.streetnumber:"";
                    var streetname = (contact.streetname)?", "+contact.streetname:"";
                    var address = streetnumber  + streetname;
                    var state_email = (contact.state_email)?contact.state_email:"";
                    var country_name = (JSON.parse(contact.country_id)).label;

                    return createData(contact.id,name,contact.telephone,contact.email,contact.mobile,contact.city,country_name,contact.zipcode,address,state_email );
                });
                this.setState({
                    data:datas
                })
            }
            catch (err) {
                console.log(err);
                return false;
            }
        }
    }


    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    handleClickOpen(id) {
        this.setState({ open: true,id_contact : id });
    }

    handleClose() {
        this.setState({ open: false,id_contact : null });
    }
    deleteContact = (id) => {
        this.props.getDeleteContactByID(id).then(
            this.props.getListContact()
        ).then(
            this.handleClose()
        )
    };
    handleClickOpenEmail(id) {
        this.setState({ open_email: true,id_mail_contact: id });
    }

    handleCloseEmail() {
        this.setState({ open_email: false,id_mail_contact : null });
    }
    receiveEmail = (id) => {
        this.props.getReceiveMailByID(id).then(
            this.props.getListContact()
        ).then(
            this.handleCloseEmail()
        )
    };
    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes} = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        return (
            <div>
                <Dialog open={this.state.open} onClose={() => this.handleClose()} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"CONFIRMER LA SUPPRESSION?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Êtes-vous sûr de vouloir supprimer ce contact ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button raised="true" onClick={() => this.deleteContact(this.state.id_contact)} className="btn-primary text-white" autoFocus> J’accepte </Button>
                        <Button raised="true" onClick={() => this.handleClose()} className="btn-danger text-white"> Annuler </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.state.open_email} onClose={() => this.handleCloseEmail()} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"CONFIRMER LA SUPPRESSION?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Supprimer l'adresse email de ce contact ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button raised="true" onClick={() => this.receiveEmail(this.state.id_mail_contact)} className="btn-primary text-white" autoFocus>J’accepte </Button>
                        <Button raised="true" onClick={() => this.handleCloseEmail()} className="btn-danger text-white"> Annuler </Button>
                    </DialogActions>
                </Dialog>
                    <Paper className={classes.root}>
                        <ContactTableToolbar numSelected={selected.length} itemsSelected={this.state.selected} />
                        <div className={classes.tableWrapper}>
                            <Table className={classes.table} aria-labelledby="tableTitle">
                                <ContactTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={this.handleSelectAllClick}
                                    onRequestSort={this.handleRequestSort}
                                    rowCount={data.length}
                                />
                                <TableBody>
                                    {stableSort(data, getSorting(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((n) => {
                                            const isSelected = this.isSelected(n.id);
                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={event => this.handleClick(event, n.id)}
                                                    role="checkbox"
                                                    aria-checked={isSelected}
                                                    tabIndex={-1}
                                                    key={n.index}
                                                    selected={isSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox checked={isSelected} />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Link to={{
                                                            pathname:'/app/dashboard/contact/edit/'+n.id,
                                                        }}
                                                        >{n.name}</Link>
                                                    </TableCell>
                                                    <TableCell align="right">{n.telephone}</TableCell>
                                                    <TableCell align="right">{n.mobile}</TableCell>
                                                    <TableCell align="right">{n.email}</TableCell>
                                                    <TableCell align="right">{n.address}</TableCell>
                                                    <TableCell align="right">{n.city}</TableCell>
                                                    <TableCell align="right">{n.country_name}</TableCell>
                                                    <TableCell align="right">{n.zipcode}</TableCell>
                                                    <TableCell align="right" className="text-center"><button className="col-sm-3 iconMg"><i className="zmdi zmdi-delete  zmdi-hc-3x" onClick={() =>this.handleClickOpen(n.id)}></i></button>
                                                        {n.state_email===1?<button className="col-sm-3 iconMg"><i className="zmdi zmdi-notifications-off" onClick={() =>this.handleClickOpenEmail(n.id)}></i></button>:""}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 49 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <TablePagination
                            rowsPerPageOptions={[10, 20, 30]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page',
                            }}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </Paper>
            </div>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state)=>{
    return {
        contacts :state.contact.contacts
    }
};

const  mapDispatchToProps = (dispatch)=>{
    return {
        getListContact:()=>{
            return dispatch(getListContact())
        },
        getDeleteContactByID:(id)=>{
            return dispatch(getDeleteContactByID(id))
        },
        getReceiveMailByID:(id)=>{
            return dispatch(getReceiveMailByID(id))
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(EnhancedTable));
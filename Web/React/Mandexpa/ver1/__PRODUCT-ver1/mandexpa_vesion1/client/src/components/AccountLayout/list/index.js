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
import {getListAccount,getDeleteAccountByID,getListAccountByConditions} from 'Actions/AuthActions'
import IntlMessages from "Util/IntlMessages";
import EnhancedTableHead from "Components/AccountLayout/list/EnhancedTableHead";
import EnhancedTableToolbar from "Components/AccountLayout/list/EnhancedTableToolbar";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {getAccountCurrent} from "Helpers/helpers";
import {GET_LIST_ACCOUNTS_BY_CONDITIONS} from "Actions/types";
let counter = 0;
const currentUser = getAccountCurrent();
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

function createData(id,reason_social, name_account, email, mobile, city,type) {
    counter += 1;
    return { index: counter,id, reason_social, name_account, email, mobile, city,type };
}
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: '100%',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'reason_social',
        selected: [],
        data: [],
        page: 0,
        rowsPerPage: 5,
        open: false,
        id_account : null,
    };

    componentDidMount() {
        let {accounts} = this.props;
        this.props.getListAccountByConditions({created_by:currentUser.id},accounts.condition_listing,GET_LIST_ACCOUNTS_BY_CONDITIONS);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let {accounts} =  nextProps;
        if(accounts && typeof accounts.list !== "undefined"){

            try {
                let {list} = accounts;
                let  datas = list.data.map((acc) => {
                     acc.type = "account.type."+acc.type.toLowerCase();
                    return createData(acc.id, acc.reason_social, acc.firstname + " " + acc.lastname, acc.email, acc.mobile, acc.city, acc.type);
                });
                this.setState({
                    data: datas
                })
            }
            catch (err) {
                    console.log(err);
                    return false;
            }
        }
    }

    updateTableData = () =>{
        let {order,orderBy,rowsPerPage,page} = this.state;
        if(orderBy === "fullname"){
            orderBy = "lastname";
        }
        this.props.getListAccountByConditions({created_by:currentUser.id},
            {
                page:page +1,
                rowsPerPage:rowsPerPage,
                order:order,
                orderBy:orderBy,
            }
            ,GET_LIST_ACCOUNTS_BY_CONDITIONS);
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        this.setState({ order, orderBy },()=>{
            this.updateTableData();
        });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };
    handleClickOpen(id) {
        this.setState({ open: true,id_account : id });
    }

    handleClose() {
        this.setState({ open: false,id_account : null });
    }
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
        this.setState({ page },()=>{
            this.updateTableData();
        });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value },()=>{
            this.updateTableData();
        });
    };
    deleteAccount = (id) => {
        this.props.getDeleteAccountByID(id).then(()=>{
            this.updateTableData();
            }).then(()=>{
                this.handleClose()
        });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes,accounts} = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const user_type = getAccountCurrent().type;
        return (
            <div>
                <Dialog open={this.state.open} onClose={() => this.handleClose()} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"CONFIRMER LA SUPPRESSION?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            CONFIRMER LA SUPPRESSION
                            Content : Êtes-vous sûr de vouloir supprimer cet {user_type==="admin"?"compte":"agent"} ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button raised="true" onClick={() => this.deleteAccount(this.state.id_account)} className="btn-primary text-white" autoFocus> J’accepte </Button>
                        <Button raised="true" onClick={() => this.handleClose()} className="btn-danger text-white"> Je refuse </Button>
                    </DialogActions>
                </Dialog>
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} itemsSelected={this.state.selected} />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
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
                                .map(n => {
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
                                            <TableCell component="th" scope="row" padding="none">
                                                {n.reason_social}
                                            </TableCell>
                                            <TableCell align="right">{n.name_account}</TableCell>
                                            <TableCell align="right">{n.email}</TableCell>
                                            <TableCell align="right">{n.mobile}</TableCell>
                                            <TableCell align="right">{n.city}</TableCell>
                                            <TableCell align="right">
                                                <IntlMessages id={n.type}/>
                                            </TableCell>
                                            <TableCell align="right" >
                                                <button className="col-sm-3 iconMg" onClick={() =>this.handleClickOpen(n.id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                    {/*<i className="zmdi zmdi-delete  zmdi-hc-3x" ></i>*/}
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {/*{emptyRows > 0 && (*/}
                                {/*<TableRow style={{ height: 49 * emptyRows }}>*/}
                                    {/*<TableCell colSpan={6} />*/}
                                {/*</TableRow>*/}
                            {/*)}*/}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[1,5, 10, 25]}
                    component="div"
                    count={accounts.list.count || 0 }
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
        accounts:state.accounts
    }
};

const  mapDispatchToProps = (dispatch,props)=>{
        return {
            getListAccount:()=>{
                return dispatch(getListAccount())
            },
            getListAccountByConditions:(condition,pagination,type_reducer)=>{
                return dispatch(getListAccountByConditions(condition,pagination,type_reducer))
            },
            getDeleteAccountByID:(id)=>{
               return dispatch(getDeleteAccountByID(id))
            }
        }
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(EnhancedTable));
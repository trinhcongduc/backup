import React from 'react';
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
import {getOrderInvoices} from 'Actions'
import PropertyMatchTableToolbar from "./OrderInvoicesTableToolbar";
import PropertyMatchTableHead from "./OrderInvoicesTableHead";
import {getAccountCurrent,datebyFormat} from "Helpers";
import {Link} from "react-router-dom";
import {URL_SERVER} from  "Constants/GeneralConfig";
import AppConfig from "Constants/AppConfig"

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

function createData(id,property_title,seller_name,seller_invoice,buyer_name,buyer_invoice,created_date) {
    counter += 1;
    return { index: counter,id,property_title,seller_name,seller_invoice,buyer_name,buyer_invoice,created_date};
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
    };

    componentWillMount() {
        let currentAccount = getAccountCurrent();
        this.props.getOrderInvoices(currentAccount.type);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        var {order_invoices} =  nextProps;
        if(order_invoices && order_invoices.length > 0){
            var datas = order_invoices.map((item)=>{
                item.seller_firstname = item.seller_firstname?item.seller_firstname:'';
                item.seller_lastname  = item.seller_lastname?item.seller_lastname:'';
                item.buyer_firstname = item.buyer_firstname?item.buyer_firstname:'';
                item.buyer_lastname = item.buyer_lastname?item.buyer_lastname:'';
                item.seller_invoice = item.seller_invoice?item.seller_invoice:'';
                item.buyer_invoice = item.buyer_invoice?item.buyer_invoice:'';
                return createData(item.id,item.property_title,item.seller_firstname+" "+item.seller_lastname,item.seller_invoice,item.buyer_firstname+" "+item.buyer_lastname,item.buyer_invoice,item.created_date);
            });
            this.setState({
                data:datas
            })
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

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        // console.log(this.props.property_match)
        const { classes} = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        return (
            <Paper className={classes.root}>
                <PropertyMatchTableToolbar numSelected={selected.length} itemsSelected={this.state.selected} />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <PropertyMatchTableHead
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
                                            <TableCell align="center" className="border0">{n.property_title}</TableCell>
                                            <TableCell align="center" className="border0">{n.seller_name}</TableCell>
                                            <TableCell align="center" className="border0">
                                                {
                                                    n.seller_invoice?(
                                                        <a href={URL_SERVER+n.seller_invoice} target="_blank">
                                                            <i className="zmdi zmdi-download zmdi-hc-2x" > </i>
                                                        </a>
                                                    ):''
                                                }

                                            </TableCell>
                                            <TableCell align="center" className="border0">{n.buyer_name}</TableCell>
                                            <TableCell align="center" className="border0">
                                                {
                                                    n.buyer_invoice?(
                                                        <a href={URL_SERVER+n.buyer_invoice} target="_blank">
                                                            <i className="zmdi zmdi-download zmdi-hc-2x" > </i>
                                                        </a>
                                                    ):''
                                                }
                                            </TableCell>
                                            <TableCell align="center" className="border0">
                                                {
                                                    datebyFormat(n.created_date,AppConfig.dateFormatDisplay)
                                                }
                                            </TableCell>
                                            <TableCell align="center" className="row iconListProperty border0">
                                                <button className=" offset-sm-3 col-sm-6 iconMg">
                                                    <i className="zmdi zmdi-delete zmdi-hc-2x"> </i>
                                                </button>


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
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state)=>{
    return {
        order_invoices:state.documents.invoices,
    }
};

const  mapDispatchToProps = (dispatch)=>{
    return {
        getOrderInvoices: (permission) => dispatch(getOrderInvoices(permission))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(EnhancedTable));
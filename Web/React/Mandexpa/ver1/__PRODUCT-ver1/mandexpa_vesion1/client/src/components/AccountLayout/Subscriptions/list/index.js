import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'

import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {ListSubscription} from "Actions";
import {numberWithCommas,displayPriceWithCurrency} from "Helpers";

import SubscriptionsTableHead from "./SubscriptionsTableHead";
import SubscriptionsTableToolbar from "./SubscriptionsTableToolbar";

let counter = 0;

function createData(id,title, main_price, second_price, package_type, number_package) {
    counter += 1;
    return { index: counter,id, title, main_price, second_price, package_type, number_package};
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

class SubscriptionsTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'id',
        selected: [],
        data: [],
        page: 0,
        rowsPerPage: 5,
        open: false,
        id_account : null,
    };


    componentWillReceiveProps(nextProps, nextContext) {
        var {subscriptions} =  nextProps;
        if(subscriptions !== undefined && subscriptions.data !== undefined ){
            try {
                let datas = subscriptions.data.map((subs) => {
                    return createData(subs.id, subs.title, subs.main_price, subs.second_price, subs.package_type, subs.number_package);
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

    componentDidMount() {
        this.updateList();
    }


    updateList = () =>{
        let {page,rowsPerPage,order,orderBy} =  this.state;
        // number page in this component init from 0
        this.props.ListSubscription(
            {
                page: page + 1,
                rowsPerPage: rowsPerPage,
                order,
                orderBy,
            });
    };


    handleRequestSort = (event, property) => {
        console.log(property);
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        this.setState({ order, orderBy },()=>this.updateList());
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
        this.setState({ page },()=>{this.updateList();});
    };

    handleChangeRowsPerPage = event => {
        this.setState({
            rowsPerPage: event.target.value
        },()=>{
            this.updateList();
        });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    editSubs = (value) =>{
        this.props.editSubs(value)
    };

    deleteSubs = (value) => {
        this.props.deleteSubs(value)
    };


    render() {
        const { classes,subscriptions} = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        let count_subs = subscriptions !== undefined && subscriptions.count > 0 ?subscriptions.count:0;
        return (

            <Paper className={classes.root}>
                <SubscriptionsTableToolbar numSelected={selected.length} itemsSelected={this.state.selected} />
                <div className={classes.tableWrapper}>

                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <SubscriptionsTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {data.map(item => {
                                const isSelected = this.isSelected(item.id);
                                return (
                                    <TableRow
                                        hover
                                        onClick={event => this.handleClick(event, item.id)}
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        key={item.index}
                                        selected={isSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={isSelected} />
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none">
                                            {item.title}
                                        </TableCell>
                                        <TableCell align="right">{displayPriceWithCurrency(numberWithCommas(item.main_price))}</TableCell>
                                        <TableCell align="right">{displayPriceWithCurrency(numberWithCommas(item.second_price))}</TableCell>
                                        <TableCell align="right">{item.package_type}</TableCell>
                                        <TableCell align="right">{item.number_package}</TableCell>
                                        <TableCell align="center" >
                                            <button className="col-sm-3 btn-default iconMg" onClick={()=>this.editSubs(item.id)} >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            <button className="col-sm-3 btn-default iconMg" onClick={()=>this.deleteSubs(item.id)} >
                                                <FontAwesomeIcon icon={faTrash} />
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
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={count_subs}
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

SubscriptionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state)=>{
    return {
        subscriptions:state.subscriptions.list
    }
};

const  mapDispatchToProps = (dispatch,props)=>{
        return {
            ListSubscription:(conditions)=>{
                return dispatch(ListSubscription(conditions))
            }
        }
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SubscriptionsTable));
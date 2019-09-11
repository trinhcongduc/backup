import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import IntlMessages from "Util/IntlMessages";
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEdit,
    faTrash,
    faArrowAltCircleUp,
    faHistory,
    faEllipsisV,
} from '@fortawesome/free-solid-svg-icons'

import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {listSubscriberAPI} from "Actions";
import {numberWithCommas,displayPriceWithCurrency,dateDisplayFormat} from "Helpers";

import SubscribersTableHead from "./SubscribersTableHead";
import SubscribersTableToolbar from "./SubscribersTableToolbar";

let counter = 0;

function createData(id,fullname,title , main_price, second_price, start_date,end_date,user_id) {
    counter += 1;
    return { index: counter,id,fullname, title, main_price, second_price, start_date,end_date,user_id};
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
    Dropdownmenu:{
        minWidth:"100%",
        border:"1px #614194 solid"
    }
});

class SubscribersTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'id',
        selected: [],
        data: [],
        page: 0,
        rowsPerPage: 5,
        open: false,
        id_account : null,
        toggleDropMenu:null
    };


    componentWillReceiveProps(nextProps, nextContext) {
        var {subscribers} =  nextProps;
        if(subscribers !== undefined && subscribers.list !== undefined && subscribers.list.data !== undefined ){
            try {
                let datas = subscribers.list.data.map((subs) => {
                    return createData(subs.id,subs.firstname+' '+subs.lastname, subs.title, subs.main_price, subs.second_price, subs.start_date, subs.end_date,subs.user_id);
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

    toggleDropdownMenu  = (value) =>{
        const {toggleDropMenu} = this.state;
        if(toggleDropMenu === value){
            this.setState({
                toggleDropMenu:null
            })
        }
        else{
            this.setState({
                toggleDropMenu:value
            })
        }
    };


    updateList = () =>{
        let {page,rowsPerPage,order,orderBy} =  this.state;
        // number page in this component init from 0
        if(orderBy === "fullname"){
            orderBy = "lastname";
        }
        this.props.listSubscriberAPI(
            {
                page: page + 1,
                rowsPerPage: rowsPerPage,
                order,
                orderBy,
            });
    };


    handleRequestSort = (event, property) => {
        let orderBy = property;
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

    showHistory = (value) => {
        this.props.showHistory(value)
    };

    deleteSubs = (value) => {
        this.props.deleteSubs(value)
    };


    render() {
        const { classes,subscribers} = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page,toggleDropMenu } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        let count_subs = subscribers !== undefined && subscribers.list !== undefined && subscribers.list.count > 0 ?subscribers.list.count:0;
        return (

            <Paper className={classes.root}>
                <SubscribersTableToolbar numSelected={selected.length} itemsSelected={this.state.selected} />
                <div className={classes.tableWrapper}>

                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <SubscribersTableHead
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
                                        // onClick={event => this.handleClick(event, item.id)}
                                        onClick={event => {}}
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        key={item.index}
                                        selected={isSelected}
                                        className="list_row"
                                    >
                                        <TableCell align="center" padding="checkbox">
                                            {item.fullname}
                                        </TableCell>
                                        <TableCell align="right" padding="default">
                                            {item.title}
                                        </TableCell>
                                        <TableCell align="right" padding="default">{displayPriceWithCurrency(numberWithCommas(item.main_price))}</TableCell>
                                        <TableCell align="right" padding="default">{displayPriceWithCurrency(numberWithCommas(item.second_price))}</TableCell>
                                        <TableCell align="right" padding="default">{dateDisplayFormat(item.startdate)}</TableCell>
                                        <TableCell align="right" padding="default">{dateDisplayFormat(item.enddate)}</TableCell>
                                        <TableCell align="right" padding="default"  className="action_cell" >
                                            <Tooltip
                                                title={<IntlMessages id="upgrade_new" />}
                                                placement={'top-start'}
                                                enterDelay={100}
                                            >
                                                <button className="btn-default iconMg" onClick={()=>this.editSubs(item.id)} >
                                                    <FontAwesomeIcon icon={faArrowAltCircleUp} />
                                                </button>
                                            </Tooltip>
                                            <Tooltip
                                                title={<IntlMessages id="edit" />}
                                                placement={'top-start'}
                                                enterDelay={100}
                                            >
                                                <button className="btn-default iconMg" onClick={()=>this.editSubs(item.id)} >
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                            </Tooltip>


                                        </TableCell>
                                        <TableCell align="center" padding="none">
                                            <Dropdown
                                                isOpen={toggleDropMenu === item.id}
                                                toggle={() => this.toggleDropdownMenu(item.id)}
                                            >
                                                <DropdownToggle tag="div" caret >
                                                    <FontAwesomeIcon icon={faEllipsisV} />
                                                </DropdownToggle>
                                                <DropdownMenu className={classes.Dropdownmenu}>
                                                    <ul className="list-unstyled mb-0 d-flex">
                                                        <li className="p-2 flex-fill " onClick={() => {}}>
                                                            <Tooltip
                                                                title={<IntlMessages id="history" />}
                                                                placement={'top-start'}
                                                                enterDelay={100}
                                                            >
                                                                <button className="icon_action_radius" onClick={()=>this.showHistory(item.user_id)} >
                                                                    <FontAwesomeIcon icon={faHistory} />
                                                                </button>
                                                            </Tooltip>

                                                        </li>
                                                        <li className="p-2 flex-fill" onClick={() => {}}>
                                                            <Tooltip
                                                                title={<IntlMessages id="delete" />}
                                                                placement={'top-start'}
                                                                enterDelay={100}
                                                            >
                                                                <button className="icon_action_radius" onClick={()=>this.deleteSubs(item.id)} >
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </button>
                                                            </Tooltip>

                                                        </li>
                                                    </ul>
                                                </DropdownMenu>
                                            </Dropdown>
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

SubscribersTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state)=>{
    return {
        subscribers:state.subscribers
    }
};

const  mapDispatchToProps = (dispatch,props)=>{
        return {
            listSubscriberAPI:(conditions)=>{
                return dispatch(listSubscriberAPI(conditions))
            }
        }
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SubscribersTable));
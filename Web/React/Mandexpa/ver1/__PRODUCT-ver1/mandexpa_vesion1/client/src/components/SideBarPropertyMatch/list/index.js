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
import {getListPropertyMatch} from 'Actions/index'
import {findDataLabel} from "Helpers/helpers";
import {sector_location} from "Constants/ComponentConfigs/PropertyConfig";
import PropertyMatchTableToolbar from "./PropertyMatchTableToolbar";
import PropertyMatchTableHead from "./PropertyMatchTableHead";
import {Link} from "react-router-dom";
import SearchPropertyMatch from "./SearchPropertyMatch";
import  {dateDisplayFormat} from "Helpers";

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

function createData(id,kind_property,host_name,created_date,list_matches,sector,property_matches_edit,new_propertys) {
    counter += 1;
    return { index: counter,id,kind_property,host_name,created_date,list_matches,sector,property_matches_edit,new_propertys};
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
        order: 'desc',
        orderBy: 'name',
        selected: [],
        data: [],
        page: 0,
        rowsPerPage: 10,
    };

    componentWillMount() {
        this.props.getListPropertyMatch(null).then(res=>{
            console.log("RES====--->",res);
        });
    }
    componentWillReceiveProps(nextProps, nextContext) {
        var {property_match} =  nextProps;
            let datas = property_match.map((item)=>{
                let date =item.date_avai!==null?new Date(item.date_avai):"";
                let sale  = (item.sale)?"A vendre":"";
                let rent  = (item.rent)?"A louer":"";
                let list_matches = item.list_matches;
                let created_date = dateDisplayFormat(item.created_date);
                let sector = item.sector!==null?item.sector:"";
                let kind_property = item.kind_property!==null?item.kind_property:"";
                let property_matches_edit = item.title!==null?item.title:"";
                let new_propertys = item.new_propertys;
                return createData(item.id,kind_property,item.host_name,created_date,list_matches ,sector,property_matches_edit,new_propertys);
            });
            this.setState({
                data:datas
            })
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
            <div>
                <SearchPropertyMatch />

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
                                            <TableCell align="center" className="row iconListProperty border0">
                                                <button className=" offset-sm-3 col-sm-6 iconMg">
                                                    <Link  to={{
                                                        pathname:'/app/dashboard/property-matches/edit/'+n.id,
                                                    }}
                                                    > <i className="zmdi zmdi-eye zmdi-hc-1x mt-1"> </i></Link>
                                                </button>
                                                <button className="offset-sm-3  col-sm-6 iconMg">
                                                    <Link  to={{
                                                        pathname:'/app/dashboard/property-matches/property-matches-search/'+n.id,
                                                    }}
                                                    > <i className="zmdi zmdi-search zmdi-hc-1x mt-1"> </i></Link>
                                                </button>
                                                <div className="newMatch">
                                                    {n.new_propertys}
                                                </div>

                                            </TableCell>
                                            <TableCell align="center" className="border0">{n.property_matches_edit}</TableCell>
                                            <TableCell align="center" className="border0">{n.kind_property}</TableCell>
                                            <TableCell align="center" className="border0"> {n.created_date}</TableCell>
                                            <TableCell align="center" className="border0">{n.list_matches}</TableCell>
                                            <TableCell align="center" className="border0">{n.host_name}</TableCell>
                                            <TableCell align="center" className="border0">{findDataLabel(n.sector,sector_location)}</TableCell>
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
        property_match :state.property_matches.list_property_match
    }
};

const  mapDispatchToProps = (dispatch)=>{
    return {
        getListPropertyMatch: (filter) => dispatch(getListPropertyMatch(filter))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(EnhancedTable));
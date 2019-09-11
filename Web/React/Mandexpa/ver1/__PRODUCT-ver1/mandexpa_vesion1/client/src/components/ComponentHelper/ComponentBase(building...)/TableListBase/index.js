/**
 * Component base : create layout list
 * created at : 07/03/2019
 */
import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IntlMessages from "Util/IntlMessages";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'

import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {ListSubscription} from "Actions";
import {datebyFormat,numberWithCommas} from "Helpers";

import TableHeadBase from "./TableHeadBase";
import TableToolbarBase from "./TableToolbarBase";

import {TableColType} from "Constants/ComponentConfigs";

let counter = 0;

function createData(data) {
    counter += 1;
    return Object.assign({ index: counter},data) ;
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
    tableCellPadding:{

    }
});

class TableListBase extends React.Component {
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

    standardizedData = (data,type_standard,format) =>{
        if(type_standard){
            switch (type_standard) {
                case TableColType.date :{
                    data = datebyFormat(data,format);
                    break;
                }
                case TableColType.currency :{
                    data =  numberWithCommas(data);
                    break;
                }
                case TableColType.string:{
                    data =  data.toString();
                    break;
                }
                default :{
                    data =  data.toString();
                }
            }
            return data;
        }else{
            return data;
        }
    };



    componentWillReceiveProps(nextProps, nextContext) {
        let {listObject,listCol} =  nextProps;
        if(listObject !== undefined  && listCol !== undefined){
            try {
                let datas = listObject.map((item) => {
                    let object = {};
                    listCol.map((col) => {
                        let val;
                        if(typeof col === "object"){
                            let type =  col.type;
                            let format =  col.format;
                            col = col.key;
                            let item_clone   = item[col];
                            val = this.standardizedData(item_clone,type,format);
                        }else{
                            val = item[col];
                        }
                        object[col] = val;
                        return 1;
                    });
                    return createData(object);
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

    updateList = () =>{
        let {page,rowsPerPage,order,orderBy} =  this.state;
        // number page in this component init from 0
        this.props.parentActionUpdateList(
            {
                page: page + 1,
                rowsPerPage: rowsPerPage,
                order,
                orderBy,
            });
    };


    handleRequestSort = (event, property) => {
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
        let { selected } = this.state;
        const { numberSelected, checkboxRow } = this.props;
        if(checkboxRow){
            const selectedIndex = selected.indexOf(id);
            let newSelected = [];
            if (selectedIndex === -1) {
                if(selected.length >= numberSelected){
                    if(numberSelected !== "multiple"){
                        selected = selected.slice(1);
                    }
                }
                newSelected = newSelected.concat(selected, id);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                console.log("selected.slice(0, -1)",selected.slice(0, -1))
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
                );
            }

            this.setState({
                selected: newSelected
            },()=>{
                let {listObject} = this.props;
                let { selected } = this.state;
                let objects = listObject.filter(item=>{
                    return selected.indexOf(item.id) > -1;
                });

                this.props.handleSelectRow(objects);
            })
        }
        ;
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


    showTableCell = (data) =>{
        let result =  null;
        if(data !== undefined && data !== null){
            let data_key = Object.keys(data);
            if(data_key.indexOf('id') > -1 ){
                data_key.splice(data_key.indexOf('id'),1)
            }
            if(data_key.indexOf('index') > -1 ){
                data_key.splice(data_key.indexOf('index'),1)
            }
            result = data_key.map((item,index) => {
                return (
                    <TableCell
                        align="justify"
                        size="small"
                        key={data[item]+index}
                        component={index === 0 ?"th":""}
                        padding="default"
                    >
                        {data[item]}
                    </TableCell>
                )
            });
        }
        return result;
    };

    editSubs = (value) =>{
        this.props.editSubs(value)
    };

    deleteSubs = (value) => {
        this.props.deleteSubs(value)
    };


    render() {
        const { classes,selectAll,listCol,prefix_lang,tableAction,title,data_count,checkboxRow} = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        return (

            <Paper className={classes.root}>
                <TableToolbarBase numSelected={selected.length} title={title} />
                <div className={classes.tableWrapper}>

                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <TableHeadBase
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                            listCol={listCol || []}
                            prefix_lang={prefix_lang}
                            checkboxRow = {checkboxRow}

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
                                        {
                                            checkboxRow && (
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={isSelected} />
                                                </TableCell>
                                            )
                                        }

                                        {
                                            this.showTableCell({...item})
                                        }

                                        {
                                            tableAction && (<TableCell align="center" >
                                                <button className="col-sm-3 btn-default iconMg" onClick={()=>this.editSubs(item.id)} >
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                <button className="col-sm-3 btn-default iconMg" onClick={()=>this.deleteSubs(item.id)} >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </TableCell>)
                                        }
                                    </TableRow>
                                );
                            })}

                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={data_count}
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

TableListBase.defaultProps = {
    tableAction:false,
    selectAll:true,
    checkboxRow:true,
    numberSelected:"multiple",
    title:(<IntlMessages id="list"/>),
    prefix_lang:(<IntlMessages id="table_list"/>),
};

TableListBase.propTypes = {
    classes: PropTypes.object.isRequired,
    listObject:PropTypes.array.isRequired,
    data_count:PropTypes.number.isRequired,
    listCol:PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            key:PropTypes.string,
            type:PropTypes.string,
        }),
        PropTypes.shape({
            key:PropTypes.string,
            type:PropTypes.string,
            format:PropTypes.string,
        })
    ])).isRequired,
    handleSelectRow:PropTypes.func.isRequired,
    parentActionUpdateList:PropTypes.func.isRequired,
    title:PropTypes.any,
    selectAll: PropTypes.bool.isRequired,
    checkboxRow: PropTypes.bool,
    numberSelected: PropTypes.any,
    prefix_lang:PropTypes.string
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

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(TableListBase));